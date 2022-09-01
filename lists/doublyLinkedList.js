class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // similat to SLL, just need to update .prev
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // same as .push()
  pop() {
    if (!this.head) return;
    const oldTail = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = oldTail.prev;
      oldTail.prev = null;
      this.tail.next = null;
    }
    this.length--;
    return oldTail;
  }

  shift() {
    if (!this.head) return;
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }

  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // get node at given index
  // similar to SLL, but you can work from
  // end if index is closer to list.length - 1;
  // slightly more efficient than SLL on average (stil O(n))
  get(index) {
    if (index < 0 || index >= this.length) return null;
    if (index <= this.length / 2) {
      let currNode = this.head;
      let currIndex = 0;
      while (currIndex < index) {
        currNode = currNode.next;
        currIndex++;
      }
      return currNode;
    } else {
      let currNode = this.tail;
      let currIndex = this.length - 1;
      while (currIndex > index) {
        currNode = currNode.prev;
        currIndex--;
      }
      return currNode;
    }
  }

  // sets the value of node at given index
  set(index, val) {
    const node = this.get(index);
    if (node) {
      node.val = val;
      return true;
    } else {
      return false;
    }
  }

  // inserts new node at given index
  // takes advantage of .get()
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(val);
    if (index === this.length) return !!this.push(val);
    const newNode = new Node(val);
    const beforeNode = this.get(index - 1);
    const afterNode = beforeNode.next;
    (newNode.next = afterNode), (afterNode.prev = newNode);
    (newNode.prev = beforeNode), (beforeNode.next = newNode);
    this.length++;
    return true;
  }

  // removes node at given index
  remove(index) {
    if (index < 0 || index >= this.length) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    const removeNode = this.get(index);
    removeNode.prev.next = removeNode.next;
    removeNode.next.prev = removeNode.prev;
    (removeNode.next = null), (removeNode.prev = null);
    this.length--;
    return removeNode;
  }

  print() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
    console.log(arr);
  }
}

const list = new DoublyLinkedList();

list.push(0);
list.push(1);
list.push(2);
list.push(3);
list.push(4);
