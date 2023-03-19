/**
 * @queue
 * FIFO (first in first out) 추가된 순서대로 제거된다.
 */

/**
 * @방법1 - 배열의 push, shift 또는 unshift, pop 이용
 */

/**
 * @방법2 - 연결 리스트 이용
 */
function Node(data) {
  this.data = data;
  this.next = null;
}

function Queue() {
  this.first = null;
  this.last = null;
}

Queue.prototype.enqueue = function (data) {
  const added = new Node(data);

  if (this.last) {
    this.last.next = added;
  } else {
    this.first = added;
  }
  this.last = added;
};

Queue.prototype.dequeue = function () {
  const removed = this.first;

  if (!removed) return null;

  if (!removed.next) {
    this.last = null;
  }

  this.first = removed.next;

  return removed.data;
};
