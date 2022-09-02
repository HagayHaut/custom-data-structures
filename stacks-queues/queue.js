// First In, First Out (FOFI)
//     like a queue to get on a ride

// USED IN:
// 1. Background tasks
// 2. Print/Task processing
// 3. first thing in line gets done

// can use an array as a queue
// and limit to

// or make your own Queue class:
class QueueNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // adds a new node to queue
  // similar SLL push(), O(1) time
  enqueue(value) {
    const newNode = new QueueNode(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }

  // removes node from queue
  // similar to SLL shift(), O(1) time
  dequeue() {
    if (!this.first) return null;
    const removeNode = this.first;
    if (this.size === 1) {
      this.last = null;
    }
    this.first = removeNode.next;
    this.size--;
    return removeNode.value;
  }

  print() {
    const arr = [];
    let curr = this.first;
    while (curr) {
      arr.push(curr.value);
      curr = curr.next;
    }
    console.log(arr);
  }
}
