// HASH TABLE/MAP

// store key-value pairs
// keys are named and not ordered
// fast at search, insert, remove

// built into almost all languages
// but will make own model still:

// 1. Hashing
//   a. use funcs to turn keys to indices
//   b. same key results in same index
//   b. kay can be any length, index fixed

// Must be:
//  a. constant time (needs to be fast)
//  b. distribute outputs evenly
//  c. same output for same input

// const hash = (key, arrayLen) => {
//     let total = 0;
//     const WEIRD_PRIME = 31;
//     // make more 'constant' with Math.min()
//     for (let i = 0; i < Math.min(key.length,100); i++) {
//         const char = key[i];
//         // -96 gives 1-26 for a-z
//         const value = char.charCodeAt(0) - 96;
//         total = (total * WEIRD_PRIME + value) % arrayLen;
//     }
//     return total;
// }

// DEALING WITH HASHING COLLISIONS

// with example above:
// hash('pink',13) => 5
// hash('cyan',13) => 5

// not good, need to deal with those
// two options:
// 1. Separate chaining
//   a. store all in index, in nested structure
//   b. what i will do
// 2. Linear Probing
//   a. only one item per position
//   b. look ahead for next empty spot
//   c. more  logic but is good

// PUTTING IT ALL TOGETHER:

class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    // make more 'constant' with Math.min()
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      // -96 gives 1-26 for a-z
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    return total;
  }

  // accepts key and value
  // hashes key and stores in index
  // will be nested in array
  set(key, value) {
    const idx = this._hash(key);
    if (!this.keyMap[idx]) {
      this.keyMap[idx] = [];
    }
    this.keyMap[idx].push([key, value]);
  }

  // accepts key and hashes for idx
  // if there are multiple items there
  // find the one with matching key
  // if only one return that
  get(key) {
    const idx = this._hash(key);
    if (this.keyMap[idx]) {
      for (const item of this.keyMap[idx]) {
        if (item[0] === key) return item;
      }
    }
    return;
  }

  // get an array of all keys
  keys() {
    const result = [];
    this.keyMap.forEach((position) => {
      if (position) {
        position.forEach((entry) => {
          result.push(entry[0]);
        });
      }
    });
    return result;
  }

  // get an array of all values
  values() {
    const result = [];
    this.keyMap.forEach((position) => {
      if (position) {
        position.forEach((entry) => {
          result.push(entry[1]);
        });
      }
    });
    return [...new Set(result)];
  }

  // get an array of all key-value pairs
  entries() {
    const result = [];
    this.keyMap.forEach((position) => {
      if (position) {
        position.forEach((entry) => {
          result.push(entry);
        });
      }
    });
    return result;
  }
}

let ht = new HashTable();
ht.set("key1", "value1");
ht.set("key2", "value2");
ht.set("key3", "value3");
ht.set("key4", "value4");
ht.set("key11", "valueqw1");
ht.set("keys3", "valuqwe2");
ht.set("ke4y3", "vaqwlue3");
ht.set("kgey4", "vaqwlue4");
ht.set("key3451", "value1");
ht.set("key3452", "value1");
