#!/bin/sh

# https://forum.synology.com/enu/viewtopic.php?t=39107
# https://github.com/StephanThierry/nodejs4synologynas

# sudo chmod 700 nodeserverstart.sh
# sudo chmod +x nodeserverstart.sh

PATH=$PATH:/volume1/@appstore/Node.js_v8/usr/local/lib/node_modules/forever/bin
APP_PATH=/volume1/server/portfolio_api

# NODE_ENV=production forever start $APP_PATH/bin/www -l $APP_PATH/logs/log.txt  -o $APP_PATH/logs/output.txt -e $APP_PATH/logs/err.log
NODE_ENV=development forever start $APP_PATH/bin/www -l $APP_PATH/logs/log.txt  -o $APP_PATH/logs/output.txt -e $APP_PATH/logs/err.log
