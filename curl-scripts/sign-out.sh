#!/bin/bash

curl "https://tic-tac-toe-api-production.herokuapp.com/games" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

echo
