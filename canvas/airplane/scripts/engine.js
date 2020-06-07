var Game = new function() {
  this.init = function(el, spriteData, callback) {
    this.canvas = document.getElementById(el)
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d')

    if (!this.ctx) {
      return alert('您的浏览器不支持canvas')
    }
    // 用户控制
    this.setupInput()

    this.loop()

    SprintSheete.onload(spriteData, callback)
  }

  var boards = []
  this.setBoard = function(num, board) {
    boards[num] = board
  }

  this.loop = function() {
    var dt = 30 / 1000
    for (var i = 0, len = boards.length; i < len; i++) {
      var item = boards[i]
      if (item) {
        item.step(dt)
        item && item.draw(Game.ctx)
      }
    }
    setTimeout(Game.loop, 30)
  }

  var KEY_CODES = { 37: 'left', 39: 'right', 32: 'fire' }
  this.keys = {}
  this.setupInput = function() {
    window.addEventListener(
      'keydown',
      function(e) {
        if (KEY_CODES[event.keyCode]) {
          Game.keys[KEY_CODES[event.keyCode]] = true
          e.preventDefault()
        }
      },
      false,
    )
    window.addEventListener(
      'keyup',
      function(e) {
        if (KEY_CODES[event.keyCode]) {
          Game.keys[KEY_CODES[event.keyCode]] = false
          e.preventDefault()
        }
      },
      false,
    )
  }
}

var SprintSheete = new function() {
  this.map = {}
  
  this.onload = function(spritSheete, callback) {
    this.map = spritSheete
    this.image = new Image()
    this.image.onload = function() {

      callback()
    }
    this.image.src = './img/plane.png'
  }
  
  this.draw = function(ctx, sprite, x, y, frame) {
    var s = this.map[sprite]
    frame = frame || 0
    ctx.drawImage(
      this.image,
      s.sx + frame * s.w,
      s.sy,
      s.w,
      s.h,
      x,
      y,
      s.w,
      s.h,
    )
  }
}

// 背景星空
var startFidle = function(speed, opacity, numStars, clear) {
  var stars = document.createElement('canvas')
  stars.width = Game.width
  stars.height = Game.height

  var starCtx = stars.getContext('2d')
  var offset = 0

  if (clear) {
    starCtx.fillStyle = '#000'
    starCtx.fillRect(0, 0, stars.width, stars.height)
  }

  starCtx.fillStyle = '#FFF'
  starCtx.globalAlpha = opacity

  for (let i = 0; i < numStars; i++) {
    var x = Math.floor(Math.random() * stars.width)
    var y = Math.floor(Math.random() * stars.height)
    starCtx.fillRect(x, y, 2, 2)
  }

  this.draw = function(ctx) {
    var intOffset = Math.floor(offset)
    var reminding = stars.height - intOffset
    // 星星的上部分
    if (intOffset > 0) {
      ctx.drawImage(
        stars,
        0,
        reminding,
        stars.width,
        intOffset,
        0,
        0,
        stars.width,
        intOffset,
      )
    }
    // 星星的下部分
    if (reminding > 0) {
      ctx.drawImage(
        stars,
        0,
        0,
        stars.width,
        reminding,
        0,
        intOffset,
        stars.width,
        reminding,
      )
    }
  }

  this.step = function(dt) {
    offset += dt * speed
    offset = offset % stars.height
  }
}

// 标题
var TitleSceen = function TitleSceen(title, subTitle, callback) {
  this.step = function(dt) {
    if (Game.keys['fire'] && callback) callback()
  }

  this.draw = function(ctx) {
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    // 标题
    ctx.font = 'normal normal bold 40px Roboto Mono'
    ctx.fillText(title, Game.width / 2, Game.height / 2)
    // 副标题
    ctx.font = 'bold 20px arial'
    ctx.fillText(subTitle, Game.width / 2, Game.height / 2 + 40)
  }
}

// 飞船
var PlayShip = function() {
  var ship = SprintSheete.map['ship']

  this.w = ship.w
  this.h = ship.h
  this.x = Game.width / 2 - this.w / 2
  this.y = Game.height - 10 - this.h
  this.vx = 0

  // this.step = function(dt) {
    this.maxVx = 200
    this.step = function(dt) {
      if (Game.keys['left']) {
        this.vx = -this.maxVx
      } else if (Game.keys['right']) {
        this.vx = this.maxVx
      } else {
        this.vx = 0
      }

      this.x += this.vx * dt

      if (this.x < 0) {
        this.x = 0
      } else if (this.x >= Game.width - this.w) {
        this.x = Game.width - this.w
      }
    }
  // }

  this.draw = function(ctx) {
    SprintSheete.draw(ctx, 'ship', this.x, this.y, 1)
  }
}
