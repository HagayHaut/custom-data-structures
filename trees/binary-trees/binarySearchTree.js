class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  // inserts node at correct position in tree
  // O(log-n)
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let curr = this.root;
    while (true) {
      if (value === curr.value) return;
      if (value < curr.value) {
        if (!curr.left) {
          curr.left = newNode;
          return this;
        }
        curr = curr.left;
      } else if (value > curr.value) {
        if (!curr.right) {
          curr.right = newNode;
          return this;
        }
        curr = curr.right;
      }
    }
  }

  // searches for a value
  // returns node if exists, or false
  // O(log-n)
  find(value) {
    if (!this.root) return false;
    let curr = this.root;
    while (true) {
      if (curr.value === value) return curr;
      if (curr.value < value) {
        if (!curr.right) return false;
        curr = curr.right;
      } else {
        if (!curr.left) return false;
        curr = curr.left;
      }
    }
  }

  // searches for a value
  // returns true if exists, or false
  // O(log-n)
  contains(value) {
    if (!this.root) return false;
    let curr = this.root;
    while (true) {
      if (curr.value === value) return true;
      if (curr.value < value) {
        if (!curr.right) return false;
        curr = curr.right;
      } else {
        if (!curr.left) return false;
        curr = curr.left;
      }
    }
  }

  // Breadth First Search
  // root to leaf bfs. For:
  // ....10....
  // ..6...15...
  // .3.8....20.
  // => [10,6,15,3,8,20]

  // how it works:
  // keep queue of nodes that need checking
  // store value of node as it comes out of queue
  // put left and right in queue if exist
  BFS() {
    let node = this.root;
    const data = [],
      queue = [node];
    while (queue.length) {
      node = queue.shift();
      data.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return data;
  }

  // for each node starting at root:
  // traverse left side, then right side
  DFSPreOrder() {
    const data = [];
    const traverse = (node) => {
      data.push(node.value);
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return data;
  }

  // traverse left & right of each node
  // then visit the node itself
  // so last node vistied is root
  DFSPostOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
      data.push(node.value);
    };
    traverse(this.root);
    return data;
  }

  // 1, traverse entire left side
  // 2. Visit root
  // 3. traverse entire right
  DFSInOrder() {
    const data = [];
    const traverse = (node) => {
      if (node.left) traverse(node.left);
      data.push(node.value);
      if (node.right) traverse(node.right);
    };
    traverse(this.root);
    return data;
  }

  leftSideView() {
    const q = [this.root];
    const data = [];

    while (q.length) {
      const qLen = q.length;
      for (let i = 0; i < qLen; i++) {
        const node = q.shift();
        if (i === 0) data.push(node.value);
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
      }
    }

    return data;
  }

  rightSideView() {
    const q = [this.root];
    const data = [];

    while (q.length) {
      const qLen = q.length;
      let last;
      for (let i = 0; i < qLen; i++) {
        const node = q.shift();
        last = node.value;
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
      }

      data.push(last);
    }

    return data;
  }
}

tree = new BinarySearchTree();

tree.insert(10);
tree.insert(6);
tree.insert(15);
tree.insert(3);
tree.insert(8);
tree.insert(20);

// The Tree:
// ....10....
// ..6...15...
// .3.8....20.

// BFS():
// => [10,6,15,3,8,20]

// DFSPreOrder():
// => [10,6,3,8,15,20]

// DFSPostOrder():
// => [3,8,6,20,15,10]

// DFSInOrder():
// => [3,6,8,10,15,20]

// WHEN TO USE BFS vs DFS?

// DFS when the tree is full/wide
// 1. less memory by not storing nodes in queue

// BFS on a very lopsided tree is better
// less nodes in memory (only 1 if totally 1-sided)

// TIME COMPLEXITY IS THE SAME FOR BOTH
// space complexity depends on shape of tree

// WHEN TO USE Pre vs Post vs In Order?

// not too importantm but:
// 1. InOrder gives nodes in order
// 2. PreOrder good for flatten/duplicate a tree
