var sprites = { ship: { sx: 0, sy: 0, w: 18, h: 35, frame: 1 } }

var startGame = function() {
  SprintSheete.draw(Game.ctx, 'ship', 100, 100, 1)
  // Game.setBoard(0, new startFidle(20, 0.4, 100, true))
  // Game.setBoard(1, new startFidle(50, 0.4, 100))
  // Game.setBoard(2, new startFidle(100, 0.4, 50))
  // Game.setBoard(3, new TitleSceen('飞机大战', '按空格键开始游戏', playGame))
}

var playGame = function() {
  Game.setBoard(3, new PlayShip())
}

window.addEventListener('load', function() {
  Game.init('game', sprites, startGame)
})
