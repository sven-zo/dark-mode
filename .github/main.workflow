workflow "Build deepmoji container on push" {
  on = "push"
  resolves = ["Build container"]
}

action "Build container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  runs = "build -t sven-zo/darkmode-deepmoji ./backend/deepmoji"
}
