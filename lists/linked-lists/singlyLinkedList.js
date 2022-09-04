class SLLNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    const newNode = new SLLNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  pop() {
    if (!this.head) return;
    let cur = this.head;
    let prev = cur;
    while (cur.next) {
      prev = cur;
      cur = cur.next;
    }
    this.tail = prev;
    this.tail.next = null;
    this.length--;
    if (!this.length) {
      this.head = null;
      this.tail = null;
    }
    return cur;
  }

  shift() {
    if (!this.head) return;
    let cur = this.head;
    this.head = cur.next;
    this.length--;
    if (!this.head) this.tail = null;
    return cur;
  }

  unshift(val) {
    const newNode = new SLLNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }

  // gets node at given "index"
  get(index) {
    if (index < 0 || index >= this.length) {
      return null;
    }
    let cur = this.head;
    let i = 0;
    while (i < index) {
      cur = cur.next;
      i++;
    }
    return cur;
  }

  // set value of node at given index
  set(index, val) {
    const node = this.get(index);
    if (!node) return false;
    node.val = val;
    return true;
  }

  // inserts a new node at given index
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);

    const newNode = new SLLNode(val);
    const prevNode = this.get(index - 1);
    const temp = prevNode.next;
    prevNode.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }

  // removes the node at a given index
  remove(index) {
    if (index < 0 || index >= this.length) return;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prev = this.get(index - 1);
    const removeNode = prev.next;
    prev.next = removeNode.next;
    this.length--;
    return removeNode;
  }

  // reverse the linked in place
  reverse() {
    if (!this.head) return null;

    let curr = this.head;
    this.head = this.tail;
    this.tail = curr;
    let prev = null;
    let next = null;
    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    return this;
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

const list = new SinglyLinkedList();
list.push(0);
list.push(1);
list.push(2);
list.push(3);
list.push(4);
list.push(5);
list.push(6);
