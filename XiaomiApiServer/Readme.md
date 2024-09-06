1. node.js : 安装v14.15.4
2. 安装服务器相关的包（vscode打开jsplusplusApiServer目录，在terminal中安装）：
    1）npm install koa-generator -g （这一步不是必须的）
    2）安装项目依赖的其他包：npm install
3. 安装nodemon监听：npm install nodemon -g；
4. 启动服务器：到jsplusplusApiServer目录，使用npm run start启动（http://localhost:3001)

API 访问形式：http://localhost:3001   调通接口，接口全部采用jsonp形式。
比如，通过浏览器访问：http://localhost:3001/getDatas?swiper=true&phone=true&field=true&cb=jQuery17209621911793688185_1670154513547&_=1670154513628



 
