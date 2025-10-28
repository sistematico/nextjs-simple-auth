#!/usr/bin/env bash

PROJECT_PATH="/var/www/auth.paxa.dev"
TEMP_PATH="/tmp/auth.paxa.dev"
SERVICE="auth.paxa.dev.service"

rm -rf $TEMP_PATH
cp -r $PROJECT_PATH $TEMP_PATH
cd $TEMP_PATH
git clean -fdx
npm install
npm run build || exit 1
sudo /usr/bin/systemctl stop $SERVICE
rm -rf $PROJECT_PATH
cp -r $TEMP_PATH $PROJECT_PATH
sudo /usr/bin/systemctl start $SERVICE