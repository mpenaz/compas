# Compas

description

## Getting started
### Prerequisities
#### Rails application 
1) Install Ruby >= 2.4.0
2) Install Rails >= 5.0.2

#### Angular application
1) Install node.js and npm 

#### Keycloak 
1) Install keycloak

### Setup development environment

#### Rails application
To start rails application, install bundles, get most recent migration, seed database and start server

starts on: localhost:3000
```
bundle install
rails db:migrate
rails db:seed
rails s
```

#### Angular application
To start angular application, install npm modules, then start server

starts on: localhost:4200 
```
npm install 
ng serve
```

#### Setup Keycloak 
Keycloak is used for authentication into application

Run keycloak startup script
```
..pathToKeycloak/bin/standalone.sh
```
default starts on: localhost:8080

import realm and user information from keycloak/configuration

you can login now with user: john.doe password: john


## 




