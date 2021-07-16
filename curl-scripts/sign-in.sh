#!/bin/bash

curl "https://tic-tac-toe-api-production.herokuapp.com/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

##########
# EMAIL="future@succes.com" PASSWORD="isabella" sh curl-scripts/sign-up.sh
##########