// Last In, First Out (LIFO)

// USED IN:
// 1. Managing function calls
// 2. Undo/Redo functionality
// 3. Routing history
// 4. Used in many algorithms

// implemented with singly linked list
// Can use an array as a stack as well
// limit to .push() and .pop()

// or you make your own Stack class:
class StackNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  // push onto beginning
  // more similat to SLL unshift()
  // O(1)
  push(value) {
    const newNode = new StackNode(value);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      newNode.next = this.first;
      this.first = newNode;
    }
    return ++this.size;
  }

  // removes node from beginning
  // more similar to SLL shift()
  // O(1)
  pop() {
    if (!this.first) return null;
    const removeNode = this.first;
    if (this.size === 1) {
      this.last = null;
    }
    this.first = this.first.next;
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
