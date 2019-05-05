#!/bin/sh

# https://forum.synology.com/enu/viewtopic.php?t=39107
# https://github.com/StephanThierry/nodejs4synologynas

# sudo chmod 700 nodeserverstart.sh
# sudo chmod +x nodeserverstart.sh

PATH=$PATH:/volume1/@appstore/Node.js_v8/usr/local/lib/node_modules/forever/bin

start() {
    forever start /volume1/server/hello/index.js -l /volume1/server/hello/logs/log.txt  -o /volume1/server/hello/logs/output.txt
}

stop() {
	killall -9 node
}

case "$1" in
	start)
		start
		;;
	stop)
		stop
		;;
	*)
echo "Usage: $0 {start|stop}"
