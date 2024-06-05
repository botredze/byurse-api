module.exports = {
  apps: [{
    name: "byurse-api",
    script: "npm",
    args: "run start",
    env: {
      NODE_ENV: "production"
    },
    node_args: "--max-old-space-size=4096"
  }]
}
