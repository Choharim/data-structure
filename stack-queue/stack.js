/**
 * @stack
 * LIFO(last in fitst out) 가장 마지막에 들어온 데이터부터 먼저 나가는 데이터 구조이다.
 */

/**
 * @방법1 - 배열의 push, pop 이용
 * - 간단한 방법
 */

/**
 * @방법2 - 연결 리스트 이용
 * - 불필요한 index가 없음
 * - 배열 내장 메소드를 불러올 필요가 없음
 * - 이중 연결 리스트도 가능하지만, 각 노드에 이전 포인터도 저장해서 메모리를 더 사용하므로 단일 연결 리스트 사용
 * - 시간 복잡도 O(1)으로 stack에 데이터를 추가하고 마지막에 추가한 순서대로 제거하기 위해 unshift, shift 사용
 */
function Node(data) {
  this.data = data;
  this.next = null;
}

function Stack() {
  this.first = null;
  this.last = null;
}

Stack.prototype.add = function (data) {
  const added = new Node(data);

  if (this.first) {
    added.next = this.first;
  } else {
    this.last = added;
  }
  this.first = added;
};

Stack.prototype.remove = function () {
  const removed = this.first;

  if (!removed) return null;

  if (!removed.next) {
    this.last = null;
  }
  this.first = removed.next;

  return removed.data;
};
