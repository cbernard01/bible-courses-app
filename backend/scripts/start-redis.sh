#!/bin/zsh
set -e

SERVER="bible-courses-redis";

echo "echo stop & remove old docker [$SERVER] and starting new fresh instance of [$SERVER]"
(docker kill $SERVER || :) && \
  (docker rm $SERVER || :) && \
  docker run --name $SERVER \
  -p 6379:6379 \
  -d redis

# wait for redis to start
echo "sleep wait for redis [$SERVER] to start";
SLEEP 3;

echo "REDIS IS UP"
