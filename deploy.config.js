module.exports = {
  apps: [
    {
      name: 'official_web_site_api',
      script: 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root', //SSH_USERNAME
      host: '47.94.144.41', //SSH_HOSTMACHINE
      ref: 'origin/main',
      repo: 'https://gitee.com/x_mitsui/txclass_api.git',
      path: '/www/official_web_site_api/production', //DESTINATION_PATH
      // 'pre-deploy': 'git fetch --all',
      'post-deploy': 'yarn && yarn prd'
    }
  }
}
