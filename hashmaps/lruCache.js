class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

// Use Doubly Linked List
// Map keys to node references
// Update capacity as you insert/remove
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.cache = {};
    this.left = new Node(0, 0); // .next is LRU
    this.right = new Node(0, 0); // .prev is MRU
    this.left.next = this.right;
    this.right.prev = this.left;
  }

  get(key) {
    if (key in this.cache) {
      // move node to top of DLL
      this.remove(this.cache[key]);
      this.insert(this.cache[key]);
      return this.cache[key].val;
    }
    return -1;
  }

  put(key, value) {
    if (key in this.cache) {
      this.remove(this.cache[key]);
    }
    this.cache[key] = new Node(key, value);
    this.insert(this.cache[key]);
    // check capacity and evict if needed
    if (this.cap < 0) {
      const lru = this.left.next;
      this.remove(lru);
      delete this.cache[lru.key];
    }
  }

  // HELPERS

  remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.cap++;
  }
  // inserts on right (but inside this.right)
  insert(node) {
    node.next = this.right;
    node.prev = this.right.prev;
    node.prev.next = node;
    this.right.prev = node;
    this.cap--;
  }
}
