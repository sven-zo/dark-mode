workflow "Build deepmoji container on push" {
  on = "push"
  resolves = ["Authenticate and Push"]
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

action "Authenticate and Push" {
  uses = "./.github/auth-and-push"
  needs = ["Google Cloud auth"]
  args = "push eu.gcr.io/dark-mode-agent/deepmoji"
}
