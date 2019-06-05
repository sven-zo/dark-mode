workflow "Build deepmoji container on push" {
  on = "push"
  resolves = ["deepmoji: push", "core: push"]
}

# deepmoji

action "deepmoji: build" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t eu.gcr.io/dark-mode-agent/deepmoji ./backend/deepmoji"
}

action "deepmoji: pust" {
  uses = "./.github/auth-and-push"
  secrets = ["GCLOUD_AUTH"]
  needs = ["deepmoji: build"]
  args = "push eu.gcr.io/dark-mode-agent/deepmoji"
}

# core

action "core: build" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  args = "build -t gcr.io/dark-mode-agent/core ./backend/core"
}

action "core: pust" {
  uses = "./.github/auth-and-push"
  secrets = ["GCLOUD_AUTH"]
  needs = ["core: build"]
  args = "push gcr.io/dark-mode-agent/core"
}
