class Stack {
  items = []
  // 入栈
  push(item) {
    this.items.push(item);
  }
  // 出栈
  pop() {
    return this.items.pop();
  }
  size() {
    return this.items.length;.
  }
  isEmpty() {
    return this.items.length === 0;
  }
  clear() {
    this.items = [];
  }
}