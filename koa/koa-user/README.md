# Koa 1.0 后台开发


### 开发中一些问题

报错信息：
.keys required for signed cookies

错误地方：
app.keys = ['fsdfsa']
写为
app.key = ['fsdfsa']
