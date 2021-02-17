#command for node
sudo apt update
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs


# commands for mongodb installation
curl -fsSL https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -

echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list

sudo apt update

sudo apt install -y mongodb-org

sudo systemctl start mongod

sudo systemctl status mongod

sudo systemctl enable mongod

mongo --eval 'db.runCommand({ connectionStatus: 1 })'
