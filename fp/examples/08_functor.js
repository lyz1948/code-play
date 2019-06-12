C

ontainer.prototype.map = function(f) {
  return Container.of(f(this.__value))
}