module.exports = {
  apps: [
    {
      name: 'yourfreetime',
      script: './dist/index.js',
      env: {
        PORT: 80
      }
    }
  ]
};
