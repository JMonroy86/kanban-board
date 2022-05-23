#!/bin/sh
set -e

# Get environment variables to show up in SSH session
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)


sed -i "s/SSH_PORT/$SSH_PORT/g" /app/sshd_config
npm run start
service ssh start
