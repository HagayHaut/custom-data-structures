// GRAPH Implementation

// undirected, adjecency list

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  // add a vertex
  // takes vertex name
  // makes new key in aL with
  // value of empty array
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  // add edge between vertices
  // takes two vertices v1, v2
  // push v1 into aL[v2]
  // push v2 into aL[v1]
  addEdge(v1, v2) {
    this.adjacencyList[v1].push(v2);
    this.adjacencyList[v2].push(v1);
  }

  // takes two vertices v1, v2
  // remove v1 from aL[v2]
  // remove v2 from aL[v1]
  removeEdge(v1, v2) {
    const aL = this.adjacencyList;
    aL[v1] = aL[v1].filter((v) => v !== v2);
    aL[v2] = aL[v2].filter((v) => v !== v1);
  }

  // takes a vertex
  // loop x num of edges in aL[vertex]
  // remove edges with removeEdge()
  // delete vertex key in aL
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }

  dfsRecursive(start) {
    // need to define adjacency list,
    // bc 'this' context is diff in dfs()
    const result = [],
      visited = {},
      adjacencyList = this.adjacencyList;
    // immediately invoked with (start)
    // backtracking handled by callstack
    (function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      adjacencyList[vertex].forEach((neighbor) => {
        if (!visited[neighbor]) return dfs(neighbor);
      });
    })(start);

    return result;
  }

  dfsIterative(start) {
    // use a stack instead of callstack
    const stack = [start],
      result = [],
      visited = {};

    while (stack.length) {
      const vertex = stack.pop();
      // add all to stack, regardless if visited
      if (!visited[vertex]) {
        // visit, mark visited, add ALL neighbors to stack
        result.push(vertex);
        visited[vertex] = true;
        this.adjacencyList[vertex].forEach((neighbor) => {
          stack.push(neighbor);
        });
      }
    }
    return result;
  }

  bfs(start) {
    const queue = [start],
      result = [],
      visited = {};
    while (queue.length) {
      const vertex = queue.shift();
      if (!visited[vertex]) {
        result.push(vertex);
        visited[vertex] = true;
        this.adjacencyList[vertex].forEach((neighbor) => {
          queue.push(neighbor);
        });
      }
    }
    return result;
  }
}

const g = new Graph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");
g.addEdge("D", "E");
g.addEdge("D", "F");
g.addEdge("E", "F");

//       A
//     /   \
//    B     C
//    |     |
//    D --- E
//     \   /
//       F
