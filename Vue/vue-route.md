# vue-router 用法

### vue-router 基础用法
replace 无历史记录 tag 设置router-link渲染的标签，默认渲染为a标签 active-class 路由匹配后，添加class样式
```html
<router-link to="/admin" tag="li" active-class="active" replace></router-link>
```

push 动态定义路由页面 replace 动态定义路由页面，无历史记录 go 历史记录跳转到指定参数页面

```bash
export default {
  methods: {
    clickHandle() {
      this.router.push('/admin/123')
    }
  }
}
```


### vue-router 高级用法
```bash
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app'

Vue.use(VueRouter)
// 路由数组
const Routes = [
  {
    path: '/home',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['home.vue'], resolve)
  }
]
// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routes
}
// 创建路由
const router = new VueRouter(RouterConfig)

// 路由钩子
router.beforeEach((to, form, next) => {
  // 修改页面的title
  window.document.title = to.meta.title
  next()
  // 权限校验
  if(window.localStorage.getItem('token')) {
    next()
  }
  else {
    next('/login')
  }
})

router.afterEach((to, from, next) => {
  // 跳转页面后，让滚动条到页面顶部
  window.scrollTo(0, 0)
})

// 创建vue实例
new Vue({
  el: '#app',
  router: router,
  render: h => {
    return h(App)
  }
})
```
