FROM google/cloud-sdk:alpine

LABEL "name"="auth-and-push"
LABEL "version"="1.0.0"
LABEL "maintainer"="Sven Hoffmann <sven-zo@outlook.com>"

LABEL "com.github.actions.name"="Authenticate and Push"
LABEL "com.github.actions.description"="Sets up an authenticated Google Cloud and Docker environment."
LABEL "com.github.actions.icon"="command"
LABEL "com.github.actions.color"="purple"

RUN apk update && apk add docker bash
RUN gcloud auth configure-docker

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]