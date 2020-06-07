const Directionary = require('./Dictionary')
const Queue = require('./Queue')

class Graph {
  constructor() {
    this.vertices = []
    this.adjList = new Directionary()
  }

  addVerticex(v) {
    this.vertices.push(v)
    this.adjList.set(v, [])
  }

  addEdge(v, w) {
    this.adjList.get(v).push(w)
    this.adjList.get(w).push(v)
  }

  getItems() {
    return this.adjList
  }

  toString() {
    let str = ''
    this.vertices.forEach(item => {
      str += item + ' => '
      let neighbors = this.adjList.get(item)
      neighbors.forEach(it => {
        str += it + ''
      })
      str += '\n'
    })
    return str 
  }
  // init color white
  initializeColor() {
    let color = []
    this.vertices.map(item => {
      color[item] = 'white'
    })
    return color 
  }
  // bfs search 
  bfsQueue(val, callback) {
    const color = this.initializeColor()
    const queue = new Queue()
    // set top 
    queue.enqueue(val)
    // while queue not empty then dequeue
    while(!queue.isEmpty) {
      // dequeue
      let u = queue.dequeue()
      // get u neighbors
      let neighbors = this.adjList.get(u)
      // set color 
      color[u] = 'gray'

      neighbors.forEach(item => {
        let w = item 
        if(color[w] == 'white') {
          color[w] = 'gray'
          queue.enqueue(w)
        }
      })
      color[u] = 'black'
      callback && callback(u)
    }
  }

  // breadth first search
  bfsStack(v, cb) {
    let read = []
    const adjList = this.adjList
    let pending = [v || this.vertices[0]]
    const readVertices = vertices => {
      vertices.forEach(key => {
        read.push(key)
        pending.shift()
        adjList.get(key).forEach(v => {
          if(!pending.includes(v) && !read.includes(v)) {
            pending.push(v)
          }
        })
        if(cb) cb(key)
        if(pending.length) readVertices(pending)
      })
    }
    readVertices(pending)
  }

  // 使用BFS寻找最短路径
  bfsShort(v, cb) {
    const read = []
    const distances = []
    const predecessors = []
    const adjList = this.adjList
    const pending = [v || this.vertices[0]]
    const readVertices = vertices => {
      vertices.forEach(key => {
        read.push(key)
        pending.shift()
        distances[key] = distances[key] || 0
        predecessors[key] = predecessors[key] || null
        adjList.get(key).forEach(v => {
          if(!pending.includes(v) && !read.includes(v)) {
            pending.push(v)
            distances[v] = distances[key] + 1
            predecessors[v] = key
          }
        })
        if(cb) cb(key)
        if(pending.length) readVertices(pending)
      })
    }
    readVertices(pending)
    return { distances, predecessors }
  }

  // deep first search 深度优先算法的实现
  bfsDeep(cb) {
    const read = []
    const adjList = this.adjList
    const readVertices = vertices => {
      vertices.forEach(key => {
        if(read.includes(key)) return false
        read.push(key)
        if(cb) cb(key)
        if(read.length !== this.vertices.length) {
          readVertices(adjList.get(key))
        }
      })
    }
    readVertices(adjList.keys)
  }

  // 探索深度优先算法
  bfsExplore(cb) {
    let readTimer = 0
    const read = []
    const readTimes = []
    const finishedTimes = []
    const predecessors = []
    const adjList = this.adjList
    const readVertices = vertices => {
      vertices.forEach(key => {
        if(adjList.get(key).every(v => read.includes(v)) && !finishedTimes[key]) {
          finishedTimes[key] = readTimer 
        }
        if(read.includes(key)) return false 
        readTimes[key] = readTimer
        read.push(key)
        if(cb) cb(key)
        predecessors[key] = predecessors[key] || predecessors || null 
        if(read.length != this.vertices.length ) {
          readVertices(this.adjList.get(key), key)
        }
      })
    }
    readVertices(adjList.keys)
    return { readTimes, finishedTimes, predecessors }
  }

  distance(formVertex) {
    const vertices = this.vertices
    const { distances, predecessors } = this.bfsShort(formVertex)
    vertices.forEach(toVertex => {
      if(!!distances[toVertex]) {
        let preVertex = predecessors[toVertex]
        let slug = ''
        while(formVertex !== preVertex) {
          slug = `${preVertex} - ${slug}`
          preVertex = predecessors[preVertex]
        }
        slug = `${formVertex} - ${slug}${toVertex}`
        console.log(slug)
      }
    })
  }

}

var graph = new Graph()
/*const myVertices = ['A','B','C','D','E','F','G','H','I']
myVertices.forEach(item => {
  graph.addVerticex(item)
})*/
;['A','B','C','D','E','F','G','H','I'].forEach(it => graph.addVerticex(it))

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

// console.log(graph.toString())

// graph iterator
/*function printNode(v) {
  console.log(`visitor vertex: ${v}`)
}
graph.bfs(myVertices[0], printNode)*/
// graph.bfsShort(graph.vertices[1], val => console.log(val))
// graph.distance(graph.vertices[1])
// graph.bfsDeep(val => console.log(val))
const r = graph.bfsExplore(val => console.log(val))
console.log(r)
