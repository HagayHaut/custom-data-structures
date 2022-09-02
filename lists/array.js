// Custom array implementation
// I'll try to implement as many methods I can

export class CustomArray {
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
}

const array = new CustomArray();

console.log(array);
