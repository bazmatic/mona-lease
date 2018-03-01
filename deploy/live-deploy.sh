
if [ -z "$1" ]
  then
    echo "Usage : live-deploy.sh BRANCH-NAME"
    echo 1
fi


# this script is to deploy a new live instance of this app to a server
# it is intended to be run by the github webhook

cd /projects/mona-lease

# --- get any changes and rebuild the environment --- 

git pull origin $1
npm install
npm run build


# --- now stop and restart the local webserver --- 

pm2 restart all # TODO - intelligently figure out which process to restart and only do that one

