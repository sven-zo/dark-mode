workflow "Build deepmoji container on push" {
  on = "push"
  resolves = ["Upload container"]
}

action "Build container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t eu.gcr.io/dark-mode-agent/deepmoji ./backend/deepmoji"
}

action "Google Cloud auth" {
  uses = "actions/gcloud/auth@ba93088eb19c4a04638102a838312bb32de0b052"
  secrets = ["GCLOUD_AUTH"]
  needs = ["Build container"]
}

action "Configure Docker" {
  uses = "actions/gcloud/cli@ba93088eb19c4a04638102a838312bb32de0b052"
  needs = ["Google Cloud auth"]
  args = "components install docker-credential-gcr && docker-credential-gcr configure-docker"
}

action "Upload container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["Configure Docker"]
  args = "push eu.gcr.io/dark-mode-agent/deepmoji"
}
