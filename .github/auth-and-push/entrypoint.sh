#!/bin/sh

set -e

echo "$GCLOUD_AUTH" | base64 -d > "$HOME"/gcloud.json
sh -c "gcloud auth activate-service-account --key-file=$HOME/gcloud.json $*"

sh -c "docker $*"