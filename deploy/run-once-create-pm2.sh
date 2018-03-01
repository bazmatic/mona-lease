
# this script should be run once on the server
# it sets up the 2 pm2 processes for (1) the webserver that servers the app,
# and (2) the webhook service that reacts to github pushes to the prod branch

pm2 start /projects/mona-lease/web-server.js --watch --name "MonaLease Web Server"
pm2 start /projects/mona-lease/deploy/webhook.js    --watch --name "MonaLease Github Webhook"
