module.exports = {
  apps: [
    {
      name: 'nexuron-website',
      script: 'server.js',
      cwd: process.env.DEPLOY_PATH || '.',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
        PORT: process.env.APP_PORT || 3000,
      },
    },
  ],
};
