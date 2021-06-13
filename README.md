## RUSK WEBSERVICE

Build on NestJS.

#### HOW TO RUN IT?

Requirements:
- Docker
- Docker Compose

Run `make dev` to launch local environment.
First launch may take few minutes to automatic `npm install`. 
 
Makefile commands:
- `make dev` will start dev environment, and bind webservice to port 3001
- `make bash` will attach to node container, where you can run `nest` and `npm` commands
- `make tests` will execute both unit and e2e tests on application
- `make test-coverage` will show test coverage