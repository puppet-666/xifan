/* 设置各个环境的服务器地址*/
// let baseUrl = 'http://localhost:3000/api'
 let baseUrl = 'https://www.runvirus.tech/api'
switch (process.env.NODE_ENV) {
  case 'serve':
    baseUrl = 'https://www.runvirus.tech/api'
    break
  case 'pre':
    baseUrl = 'https://www.runvirus.tech/api' // 预上线环境url
    break
  case 'production':
    baseUrl = 'https://www.runvirus.tech/api' // 生产环境url
    break
}

export default baseUrl
