// Custom array implementation
// I'll try to implement as many methods I can

class CustomArray {
  constructor() {
    this.length = 0;
    this.data = new Map();
  }

  push(value) {
    this.data.set(this.length, value);
    this.length++;
    return this.data.values();
  }

  pop() {
    if (!this.length) return undefined;
    const lastElement = this.data.get(this.length - 1);
    this.data.delete(this.length - 1);
    this.length--;
    return lastElement;
  }

  unshift(value) {
    const tempArray = new CustomArray();
    tempArray.push(value);
    for (const [_, value] of this.data) {
      tempArray.push(value);
    }
    this.data = tempArray.data;
    this.length++;
    return this.data.values();
  }

  shift() {
    if (!this.length) return undefined;
    const tempArray = new CustomArray();
    let firstElement;
    for (const [_, value] of this.data) {
      if (firstElement === undefined) {
        firstElement = value;
        continue;
      }
      tempArray.push(value);
    }
    this.data = tempArray.data;
    this.length--;
    return firstElement;
  }

  of(index) {
    return this.data.get(index);
  }

  map(cb) {
    const modified = new CustomArray();
    for (const [_, value] of this.data) {
      modified.push(cb(value));
    }
    return modified;
  }

  filter(cb) {
    const modified = new CustomArray();
    for (const [_, value] of this.data) {
      if (cb(value)) modified.push(value);
    }
    return modified;
  }

  find(cb) {
    for (const [_, value] of this.data) {
      if (cb(value)) return value;
    }
    return undefined;
  }
}

const array = new CustomArray();

array.push(1);
array.push(2);
array.push(3);
array.push(4);
array.push(5);

console.log(array.filter((n) => n % 2));
console.log(array.data);
