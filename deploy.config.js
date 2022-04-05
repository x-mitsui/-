module.exports = {
  apps: [
    {
      name: 'txclass_api',
      script: 'bin/www',
      // cwd: './', // 当前工作路径
      // watch: true, // 监控变化的目录
      // exec_mode: 'cluster', // 集群模式
      // instances: 'max', // 实例数量
      // max_memory_restart: '40M', // 如果超过指定内存就重启
      ignore_watch: [
        // 从监控目录中排除
        'node_modules',
        'logs'
      ],
      // error_file: './logs/app-err.log', // 错误日志路径
      // out_fileL: './logs/app-out.log', // 普通日志路径
      env: {
        // 默认环境变量
        NODE_ENV: 'production' // 环境变量
      },
      env_dev: {
        // 命令行可以指定当前环境变量为dev
        NODE_ENV: 'development'
      },
      env_prod: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      user: 'root', //SSH_USERNAME
      host: '47.94.144.41', //SSH_HOSTMACHINE
      ref: 'origin/main',
      repo: 'git@gitee.com:x_mitsui/txclass_api.git',
      ssh_options: 'StrictHostKeyChecking=no', // 取消 key 校验，针对ssh
      path: '/www/txclass_api/production', //DESTINATION_PATH
      'pre-deploy': 'git fetch --all', //如果是第二次运行此脚本，就需要先更新git
      'post-deploy': 'pnpm install && pnpm prd'
    }
  }
}
