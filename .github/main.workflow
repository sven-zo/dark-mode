workflow "Build deepmoji container on push" {
  on = "push"
  resolves = ["Authenticate and Push"]
}

action "Build container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t eu.gcr.io/dark-mode-agent/deepmoji ./backend/deepmoji"
}

action "Authenticate and Push" {
  uses = "./.github/auth-and-push"
  secrets = ["GCLOUD_AUTH"]
  needs = ["Build container"]
  args = "push eu.gcr.io/dark-mode-agent/deepmoji"
}
