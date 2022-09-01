// MAX BINARY HEAPS

// binary trees where each node is
// smaller than its parent

// only rule is that children < parent
// no rules for order of children
// need to fill row before new row (unlike BST)

// ......20.......
// ....8....17....
// ..5..3..11..4..

// you can make a Node class and Tree class
// but can be abstracted to array

// => [20,8,17,5,3,11,4]

// if n is parent index:
// 1. child-1 index is at (2n + 1)
// 2. child-2 index is at (2n + 2)

// if n is child index:
// 1. parent index is at Math.floor((n - 1)/2)

// TIME COMPLEXITIES:

// Insertion - O(log n)
// Removal - O(log n)
// Search - O(n)

class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  // To Add to Heap:
  // 1. Add to the end
  // 2. "Bubble up" to correct spot
  //    a. swap with parent until <= parent
  insert(value) {
    this.values.push(value);
    return this.bubbleUp();
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[idx] = parent;
      this.values[parentIdx] = element;
      idx = parentIdx;
    }
    return this.values;
  }

  // remove root from heap
  // will be max or min depending on heap
  // To Extract from Heap:
  // 1. Remove root, replace with last values
  // 2. "Sink down" to correct position
  //   a. compare w left and right
  //   b. if smaller than both, replace with bigger
  //   c. repeat until no childs/bigger than childs
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return max;
  }

  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (true) {
      const leftChildIdx = 2 * idx + 1;
      const rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap;

      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (!swap && rightChild > element) ||
          (swap && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      if (!swap) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }

  sort() {
    const sorted = [];
    while (heap.values.length) {
      sorted.push(this.extractMax());
    }
    sorted.forEach((val) => this.insert(val));
    return sorted.reverse();
  }
}

const heap = new MaxBinaryHeap();
heap.insert(20);
heap.insert(8);
heap.insert(17);
heap.insert(5);
heap.insert(3);
heap.insert(11);
heap.insert(4);
