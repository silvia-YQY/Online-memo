# Online-memo

# 技术栈
 + sass(css 预编译器)
 + webpack（自动化构建工具，实现LESS,CSS,JS编译和压缩代码）
 + express (基于 Node.js 平台的 web 开发框架)
 + html+css
 + Node.js(基于 Chrome V8 引擎的 JavaScript 运行环境)
 + jQuery(一个快速、简洁的JavaScript框架)
 + sequelize(Node的ORM框架Sequelize操作数据库)
 + passport(实现第三方登录)

# 实现功能
 + github第三方登录
 + 添加笔记（登录成功后）
 + 删除笔记
 + 修改笔记
 + 使用 markdown
 + 笔记拖拽

# 技术分配
*   前端：前端代码结构的组织、模块化开发方式、webpack 及loader和插件的使用、npm 的使用、前后端联调
*   后端：网站后端架构、MVC概念、Express的使用、路由、中间件、sqlite3、nodejs 调试
*   运维： linux 命令行、git、pm2、代理配置

# 前端

*   js 组件封装的写法
*   事件发布订阅模式的应用
*   webpack、npm script

# 后端

*   nodejs
*   express、路由、中间件、MVC、sequelize


# 安装
1. 将项目克隆到本地
`git clone git@github.com:silvia-YQY/Online-memo.git`

2. 启动本地后台服务器
`npm start`

3. 访问
`http://localhost:3000`

# 其他
若要修改项目内容，可在当前目录下运行以下命令
`npm run watch`

该命令监听 src 文件下的js、less文件，并打包压缩
