node {    
    def dockerImage
    def repositoryUri  
    def remote = [:]
    remote.name = "web"
    remote.user = "ubuntu"
    remote.identityFile = "~/.ssh/id_rsa"
    remote.allowAnyHosts = true

    stage('Checkout repo') { 
        checkout scm  
        sh 'git fetch --tags --force'
    }

    if (currentBuild.changeSets.size() == 0 && !sh(script: 'git tag -l --contains HEAD',returnStdout: true).trim().contains('stage')) {
        currentBuild.result = 'SUCCESS'
        return
    }

    stage('Test app') {   
        sh 'docker-compose -f docker-compose.test.yml build && \
            docker-compose -f docker-compose.test.yml run node npm run test && \
            docker-compose -f docker-compose.test.yml run node npm run test:e2e'
    } 

    if (env.BRANCH_NAME != 'prod' && !sh(script: 'git tag -l --contains HEAD',returnStdout: true).trim().contains('stage')) {
        // Execute build, push and deploy only for `prod` branch and commits tagged `stage`
        // In this particular example everything goes to one webworker, so there's no separate steps to handle `stage` tag
        currentBuild.result = 'SUCCESS'
        return
    }

    stage('Build image') { 
        repositoryUri = sh(
            script: 'aws ecr describe-repositories --repository-name rusk_app | jq -r ".repositories[0].repositoryUri"',
            returnStdout: true
        ).trim()

        dockerImage = docker.build(repositoryUri)    
    }   

    stage('Push image to registry') {
        sh '$(aws ecr get-login --no-include-email)'
        dockerImage.push("${env.BUILD_NUMBER}")
        dockerImage.push("latest")
    }

    stage('Deploy to webworker') {
        remote.host = sh(
            script: 'aws ec2 describe-instances --filters Name=tag:Type,Values=rusk_app_webworker Name=instance-state-name,Values=running | jq -r ".Reservations[0].Instances[0].PrivateIpAddress"',
            returnStdout: true
        ).trim()

        sshCommand remote: remote, command: "\$(aws ecr get-login --no-include-email) && docker pull ${repositoryUri}:${env.BUILD_NUMBER} && mkdir -p /srv/docker/rusk_app"
        sshPut remote: remote, from: 'docker-compose.prod.yml', into: '/srv/docker/rusk_app'
        sshCommand remote: remote, command: "WEBWORKER_IMAGE=${repositoryUri}:${env.BUILD_NUMBER} docker stack deploy -c /srv/docker/rusk_app/docker-compose.prod.yml rusk_app"
    }
    
}