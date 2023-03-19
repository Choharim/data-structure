/**
 * @차이점
 * SinglyLinkedList vs DoubleLinkedList
 * - 단일 연결 리스트는 prev 포인터가 없기 때문에 next로 밖에 이동하지 못함.
 * - 이중 연결 리스트는 prev 포인터도 있어서 이동 가능
 * - 이중 연결 리스트에서 검색할 때 index의 위치가 head/tail 중 가까운 곳에서 출발하여 단계를 줄일 수 있는 장점이 있음.
 * - 이중 연결리스트는 각 node에 prev 값도 저장을 하기 때문에 더 많은 메모리가 필요함.
 */

class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * @시간복잡도 O(1)
   */
  push(value) {
    const node = new Node(value);

    if (!this.length) {
      this.head = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
    }

    this.tail = node;
    this.length++;

    return this;
  }

  /**
   * @시간복잡도 O(1)
   */
  pop() {
    if (!this.length) return undefined;

    const tail = this.tail;
    const before = this.tail.prev;

    if (!before) {
      this.head = null;
    } else {
      before.next = null;
      tail.prev = null;
      /**
       * console.log("before", before, this.tail.prev);
       before = {
        value: "one",
        prev: { value: "zero", prev: null, next: node(one) },
        next: null,
      };
      before = null;
       */
    }

    this.tail = before;

    this.length--;

    return tail;
  }

  /**
   * @시간복잡도 O(1)
   */
  shift() {
    if (!this.length) return undefined;

    const removed = this.head;
    const newHead = this.head.next;

    if (!newHead) {
      this.tail = null;
    } else {
      removed.next = null;
      newHead.prev = null;
    }

    this.head = newHead;
    this.length--;

    return removed;
  }

  /**
   * @시간복잡도 O(1)
   */
  unshift(value) {
    const added = new Node(value);
    const shifted = this.head;

    if (!shifted) {
      this.tail = added;
    } else {
      added.next = shifted;
      shifted.prev = added;
    }

    this.head = added;
    this.length++;

    return this;
  }

  /**
   * @시간복잡도 O(n)
   */
  get(index) {
    if (!(0 <= index && index < this.length)) return undefined;

    const isUnderHalf = index < this.length / 2;
    let target;

    if (isUnderHalf) {
      target = this.head;
      for (let i = 0; i < index; i++) {
        target = target.next;
      }
    } else {
      target = this.tail;

      for (let i = this.length - 1; i > index; i--) {
        target = target.prev;
      }
    }

    return target;
  }

  /**
   * @시간복잡도 O(n)
   */
  set(index, value) {
    const target = this.get(index);

    if (target) {
      target.value = value;

      return true;
    }

    return false;
  }

  /**
   * @시간복잡도 O(n)
   */
  insert(index, value) {
    if (index === 0) {
      this.unshift(value);

      return true;
    } else if (index === this.length) {
      this.push(value);

      return true;
    } else {
      const forward = this.get(index - 1);

      if (!forward) return false;

      const backward = forward.next;
      const added = new Node(value);
      forward.next = added;
      added.prev = forward;
      added.next = backward;
      backward.prev = added;

      this.length++;

      return true;
    }
  }

  /**
   * @시간복잡도 O(n)
   */
  remove(index) {
    if (index === 0) {
      return this.shift();
    } else if (index === this.length - 1) {
      return this.pop();
    } else {
      const forward = this.get(index - 1);

      if (!forward) return undefined;

      const removed = forward.next;
      const backward = removed.next;

      forward.next = backward;
      backward.prev = forward;
      removed.prev = null;
      removed.next = null;

      this.length--;

      return removed;
    }
  }
}
