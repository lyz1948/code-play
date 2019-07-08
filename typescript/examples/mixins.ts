interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: number) {}
  counter.interval = 111
  counter.reset = function() {
    console.log(counter.interval)
    counter.interval = 0
  }
  return counter
}

let gc = getCounter()
gc(10)
gc.interval = 20
gc.reset()
console.log(gc.interval)