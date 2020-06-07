# Vue插件开发方法

### 插件核心代码
```bash
MyPlugin.install = function(vue, options) {
  Vue.component('my-component', {
    // 组件内容
  })
  Vue.prototype.$Notice = function() {

  }
  Vue.globalMethod = function() {

  }
  Vue.mixin({
    mounted: function() {}
  })
}
```

### 插件的使用方式
```bash
import Vue from 'vue'
import MyPlugin from 'MyPlugin'

Vue.use(MyPlugin)
// or
Vue.use(MyPlugin, {})
```

### vue中央事件总线插件

```bash
const install = function(Vue) {
  const Bus = new Vue({
    method: {
      emit(event, ...args) {
        this.$emit(event, ...args)
      },
      on(event, cb) {
        this.$on(event, cb)
      },
      off(event, cb) {
        this.$off(event, cb)
      }
    }
  })
  Vue.prototype.$bus = Bus
}

export default install
```

### 总线插件使用
```bash
import Vue form 'vue'
import Bus from './vue-bus'

Vue.use(Bus)

// 派发事件
export default {
  data() {
    return {}
  },
  method: {
    handleClick() {
      const num = Math.floor(Math.random() * 20 + 1)
      this.$bus.emit('add', num)
    }
  }
}

// 监听事件
export default {
  data() {
    return {
      num: 0
    }
  },
  methods: {
    handle() {
      this.$bus.on('add', (val) => {
        this.num = val
      })
    }
  }
}

```
### vue-ajax插件
```bash
const ajax = function({options = {}}) {
  options.type = (options.type || 'GET').toUpperCase()

  const data = []
  for(let i in options.data) {
    data.push(encodeURIComponent(i) + '=' + encodeURIComponent(options.data[i]))
  }
  data = data.join('&')

  const xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      const status = xhr.status
      if(status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      }
      else {
        options.error && options.error(xhr.status)
      }
    }
  }

  if(options.type === 'POST') {
    xhr.open('POST', options.url, true)
    xhr.setRequestHeader('Content-Type','application/x-www.form-urlencoded')
    xhr.send(data)
  }
  else {
    xhr.open('GET', options.url + '?' + data, true)
    xhr.send(null)
  }
}

export default ajax
```

