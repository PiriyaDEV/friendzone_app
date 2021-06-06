module.exports = {
  app: {
    name: "server",
    script: "npm start",
    watch: true,
    env: {
      PORT: 8080,
      NODE_ENV: "development"
    },
    env_production: {
      PORT: 80,
      NODE_ENV: "production"
    }
  }
};
