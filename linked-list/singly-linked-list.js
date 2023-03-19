// let fist = new Node("hi");
// fist.next = new Node("there");
// fist.next.next = new Node("how");
// fist.next.next.next = new Node("are");
// fist.next.next.next.next = new Node("you");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * @시간복잡도 O(1)
   */
  push(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;

    return this;
  }

  /**
   * @시간복잡도 O(n)
   */
  pop() {
    if (!this.head) return undefined;

    let node = this.get(this.length - 2);

    this.length--;

    if (!node) {
      const removed = this.head;
      this.head = null;
      this.tail = null;

      return removed;
    } else {
      const removed = node.next;

      node.next = null;
      this.tail = node;

      return removed;
    }
  }

  //  @pop 다른 방법
  //   pop() {
  //     if (!this.head) return undefined;

  //     let current = this.head;
  //     let newTail = current;

  //     while (current.next) {
  //       newTail = current;
  //       current = current.next;
  //     }

  //     if (newTail === current) {
  //       this.head = null;
  //       this.tail = null;
  //     } else {
  //       newTail.next = null;
  //       this.tail = newTail;
  //     }

  //     this.length--;
  //     return current;
  //   }

  /**
   * @시간복잡도 O(1)
   */
  shift() {
    if (!this.head) return undefined;

    const first = this.head;

    if (!first.next) {
      this.tail = null;
    }

    this.head = this.head.next;
    this.length--;

    return first;
  }

  /**
   * @시간복잡도 O(1)
   */
  unshift(value) {
    const node = new Node(value);

    if (!this.head) {
      this.tail = node;
    } else {
      node.next = this.head;
    }

    this.head = node;
    this.length++;

    return this;
  }

  isIndex(index) {
    if (typeof index !== "number") return false;
    if (index >= this.length || index < 0) return false;

    return true;
  }

  /**
   * @시간복잡도 O(n)
   */
  get(index) {
    if (!this.isIndex(index)) return null;

    let target = this.head;

    for (let i = 1; i <= index; i++) {
      target = target.next;
    }

    return target;
  }

  /**
   * @시간복잡도 O(n)
   */
  set(index, value) {
    const node = this.get(index);
    if (node) {
      node.value = value;

      return true;
    }
    return false;
  }

  /**
   * @시간복잡도 O(n)
   */
  insert(index, value) {
    if (index === this.length) {
      this.push(value);
      return true;
    }
    if (index === 0) {
      this.unshift(value);
      return true;
    }

    const frontNode = this.get(index - 1);
    const backNode = frontNode.next;
    const node = new Node(value);

    if (!!frontNode) {
      frontNode.next = node;
      node.next = backNode;
      this.length++;
      return true;
    }

    return false;
  }

  /**
   * @시간복잡도 O(n)
   */
  remove(index) {
    if (index === this.length - 1) {
      return this.pop();
    }
    if (index === 0) {
      return this.shift();
    }

    const frontNode = this.get(index - 1);
    const removedNode = frontNode?.next;

    if (removedNode) {
      frontNode.next = removedNode.next;
      this.length--;
    }

    return removedNode;
  }

  /**
   * @시간복잡도 O(n)
   */
  reverse() {
    let current = this.head;
    this.head = this.tail;
    this.tail = current;

    let next = null;
    let prev = null;

    for (let i = 0; i < this.length; i++) {
      next = current.next;
      current.next = prev;

      prev = current;
      current = next;
    }

    return this;
  }
}
