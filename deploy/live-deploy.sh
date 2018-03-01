
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

cd build


# --- now stop and restart the local webserver --- 

CMD="serve -p 4552"

# a little logic here to kill the currently running instance :
nohup $CMD > my.log 2>&1 &
echo $! > save_pid.txt
rm my.log

# and now to start it up again
nohup $CMD &

