module.exports = {
  apps : [{
    name   : "transcribe-api",
    script : "npm run start",
    instances: 1,
    env: {
      PORT: 9483
    },
    increment_var : 'PORT',
  }]
}