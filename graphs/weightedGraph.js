import { PQNode, PriorityQueue } from "../trees/binary-trees/priorityQueue.js";

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  // returns object containing shortest path and distance
  // ex:
  // input: graph.dijkstra(x,z)
  // output: { path: [x,y,z] distance: 67 }
  // runs in O()
  dijkstra(start, end) {
    const distances = {},
      previous = {},
      nodes = new PriorityQueue();
    let path = [],
      smallest;
    // initialize start node distance to 0, rest to Infinity
    // initialize all previous to null
    // add start node to q with priority of 0, rest with Infinity
    for (const vertex in this.adjacencyList) {
      distances[vertex] = vertex === start ? 0 : Infinity;
      previous[vertex] = null;
      nodes.enqueue(vertex, vertex === start ? 0 : Infinity);
    }

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === end) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] < Infinity) {
        for (const neighbor of this.adjacencyList[smallest]) {
          const { node, weight } = neighbor;
          // calc new dist to neighbor of smallest
          const dist = weight + distances[smallest];
          if (dist < distances[node]) {
            // new smallest dist to neighbor
            distances[node] = dist;
            // updating how we got to new smallest dist
            previous[node] = smallest;
            // add neighbor to priorityQ w new priority
            nodes.enqueue(node, dist);
          }
        }
      }
    }
    // start and reverse so path is start => end
    path.push(start);
    path.reverse();
    return {
      path,
      distance: distances[path[path.length - 1]],
    };
  }
}

const g = new WeightedGraph();

g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");
g.addEdge("B", "A", 4);
g.addEdge("B", "E", 3);
g.addEdge("C", "A", 2);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("E", "D", 3);
g.addEdge("D", "F", 1);
g.addEdge("E", "F", 1);

//      A
//     / \
//    2   4
//   /     \
//  C       B
//  |       |
//  2       |
//  |       |
//  D       3
//  | \     |
//  1  3   /
//  |   \ /
//  F--1-E
