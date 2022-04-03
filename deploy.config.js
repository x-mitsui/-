// pm2 ecosystem
// module.exports = {
//   apps: [
//     {
//       script: 'index.js',
//       watch: '.'
//     },
//     {
//       script: './service-worker/',
//       watch: ['./service-worker']
//     }
//   ],

//   deploy: {
//     production: {
//       user: 'SSH_USERNAME',
//       host: 'SSH_HOSTMACHINE',
//       ref: 'origin/master',
//       repo: 'GIT_REPOSITORY',
//       path: 'DESTINATION_PATH',
//       'pre-deploy-local': '',
//       'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
//       'pre-setup': ''
//     }
//   }
// }

module.exports = {
  app: {
    name: 'official_web_site_api',
    script: 'app.js',
    env: {
      COMMON_VARIABLE: 'true'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  },

  deploy: {
    production: {
      user: 'root',
      host: '47.94.144.41',
      ref: 'origin/main',
      repo: 'https://gitee.com/x_mitsui/txclass_api.git',
      path: '/www/official_web_site_api/production',
      'pre-deploy': 'git fetch --all',
      'post-deploy': 'yarn && yarn run prd && pm2 startOrRestart deploy'
    }
  }
}
