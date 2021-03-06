# vue-page

```bash
<template>
  <div id="app">
      <navigation :pages="pages" :current.sync="pageNo" @navpage="msgListView"></navigation>
  </div>
</template>
```


```bash
var pageComponent = Vue.extend({
    template: `<nav aria-label="Page navigation"><ul class="pagination"><li><a href="javascript:;"@click="prePage()"aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li><li v-for="page in showPageBtn":class="{\'active\':page==current}"><a href="javascript:;"v-if="page"@click="goPage(page)">{{page}}</a><a href="javascript:;"v-else>···</a></li><li><a href="javascript:;"@click="nextPage()"aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav>`,
    props: {
        pages: {
            type: Number,
            default: 1
        },
        current: {
            type: Number,
            default: 1
        }
    },
    computed: {
        showPageBtn() {
            var pageNum = this.pages;
            var index = this.current;
            var arr = [];
            if (pageNum <= 5) {
                for (var i = 1; i <= pageNum; i++) {
                    arr.push(i)
                }
                return arr
            }
            if (index <= 2)
                return [1, 2, 3, 0, pageNum];
            if (index >= pageNum - 1)
                return [1, 0, pageNum - 2, pageNum - 1, pageNum];
            if (index === 3)
                return [1, 2, 3, 4, 0, pageNum];
            if (index === pageNum - 2)
                return [1, 0, pageNum - 3, pageNum - 2, pageNum - 1, pageNum];
            return [1, 0, index - 1, index, index + 1, 0, pageNum]
        }
    },
    methods: {
        prePage() {
            if (this.current != 1) {
                this.current--;
                this.$emit('navpage', this.current)
            } else {
                alert("已经是第一页了")
            }
        },
        nextPage() {
            if (this.current != this.pages) {
                this.current++;
                this.$emit('navpage', this.current)
            } else {
                alert("已经是最后一页了")
            }
        },
        goPage(index) {
            if (index !== this.current) {
                this.current = index;
                this.$emit('navpage', this.current)
            }
        }
    }
});
Vue.component('navigation', pageComponent);
```
