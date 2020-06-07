<template lang="pug">
  .element-wrap.pos-a(v-drag='')
    .item(v-show='getTextType', v-for='item in textList')
      //- .ctrl-box
      //-   .ctrl.ctrl-nw(@mousedown.stop="handleMove($event, 'nw')")
      //-   .ctrl.ctrl-ne(@mousedown.stop="handleMove($event, 'ne')")
      //-   .ctrl.ctrl-sw(@mousedown.stop="handleMove($event, 'sw')")
      //-   .ctrl.ctrl-se(@mousedown.stop="handleMove($event, 'se')")
      //-   .ctrl.ctrl-n(@mousedown.stop="handleMove($event, 'n')")
      //-   .ctrl.ctrl-e(@mousedown.stop="handleMove($event, 'e')")
      //-   .ctrl.ctrl-s(@mousedown.stop="handleMove($event, 's')")
      //-   .ctrl.ctrl-w(@mousedown.stop="handleMove($event, 'w')")
      .content(@dblclick='toggleEdit')
        div(contenteditable='true') {{ item }}

    .item.pos-a(v-show='getImageType', v-drag='', v-for='item in imageList')
      img(:src='item', draggable='false')

    .item.pos-a(v-show='getVideoType', v-drag='', v-for='item in videoList')
      video(:src='item')
</template>
<script>
import { dragItem } from '@/directives'
import scaleItem from '@/components/OperateNew'
export default {
  components: { scaleItem },
  data() {
    return {
      isEdit: false,
      textList: [],
      imageList: [],
      videoList: [],
      type: 'text'
    }
  },
  computed: {
    getTextType() {
      return this.type === 'text'
    },
    getImageType() {
      return this.type === 'image'
    },
    getVideoType() {
      return this.type === 'video'
    },
    getEditStatus() {
      return this.isEdit
    }
  },
  methods: {
    handleMove(downEvent, mark) {
      let startX = downEvent.clientX
      let startY = downEvent.clientY
      let ele = this.element
      let height = ele['height']
      let width = ele['width']
      let top = ele['top']
      let left = ele['left']
      let move = moveEvent => {
        let currX = moveEvent.clientX
        let currY = moveEvent.clientY
        let disY = currY - startY
        let disX = currX - startX
        let hasN = /n/.test(mark)
        let hasS = /s/.test(mark)
        let hasW = /w/.test(mark)
        let hasE = /e/.test(mark)
        let newHeight = +height + (hasN ? -disY : hasS ? disY : 0)
        let newWidth = +width + (hasW ? -disX : hasE ? disX : 0)
        ele['height'] = newHeight > 0 ? newHeight : 0
        ele['width'] = newWidth > 0 ? newWidth : 0
        ele['left'] = +left + (hasW ? disX : 0)
        ele['top'] = +top + (hasN ? disY : 0)
      }
      let up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },
    toggleEdit() {
      this.isEdit = true
    },
    add(type) {
      let content = '点击这里修改文字'
      this.type = type
      switch (type) {
        case 'image':
          content = 'http://user.vgoyun.cn/images/logo.png'
          this.imageList.push(content)
          break
        case 'video':
          content = 'http://user.vgoyun.cn/images/logo.png'
          this.videoList.push(content)
          break
        default:
          this.textList.push(content)
      }
    }
  },
  directives: {
    drag: dragItem
  }
}
</script>

<style lang="stylus">
.element-wrap
  .item
    padding: 2px
    // position: absolute
    // cursor: move
  .ctrl-box
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    border: 1px dashed #000
    .ctrl
      position: absolute
      background: #fff
      border: 1px solid #000
      width: 7px
      height: 7px
      z-index: 1
      &.ctrl-nw
        top: -3.5px
        left: -3.5px
        cursor: nw-resize
        border-radius: 50%
      &.ctrl-ne
        top: -3.5px
        right: -3.5px
        cursor: ne-resize
        border-radius: 50%
      &.ctrl-sw
        bottom: -3.5px
        left: -3.5px
        cursor: sw-resize
        border-radius: 50%
      &.ctrl-se
        bottom: -3.5px
        right: -3.5px
        cursor: se-resize
        border-radius: 50%
      &.ctrl-n
        top: -3.5px
        left: 50%
        margin-left: -3.5px
        cursor: n-resize
      &.ctrl-e
        right: -3px
        top: 50%
        margin-top: -3.5px
        cursor: e-resize
      &.ctrl-s
        bottom: -3px
        left: 50%
        margin-left: -3.5px
        cursor: s-resize
      &.ctrl-w
        left: -3.5px
        top: 50%
        margin-top: -3.5px
        cursor: w-resize
</style>
