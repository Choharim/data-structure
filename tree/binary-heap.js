/**
 * @binaryHeap
 * - 이진 트리의 종류로, 모든 자식이 존재함. (빠지 노드 없이 완전히 채워진 트리: 완전한 트리) O(logN)연산을 위해 균형 트리여야 함.
 * - heap은 왼쪽에서 오른쪽 방향으로 채워짐.
 * - 삽입과 삭제가 주요 연산이다.
 *
 * 이진 힙에서 순서대로 노드의 값을 나열하여 배열에 담았을 때,
 * - index n의 자식은 index 2n+1, 2n+2 이디.
 * - idnex m의 부모는 index Math.floor((m -1)/2)이다.
 */

/**
 * @MaxBinaryHeap (최대 힙)
 * 부모는 자식보다 크다는 규칙을 갖는 이진힙이다.
 * 루트 노드는 항상 최댓값이다.
 * @MinBinartHeap (최소 힙)
 * 부모는 자식보다 작다는 규칙을 갖는 이진힙이다.
 * 루트 노드는 항상 최솟값이다.
 */
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }

  /**
   * @bubbleUp
   * 1. 추가할 값을 트리의 마지막 위치에 넣는다.
   * 2. 자식보다 부모가 크다는 규칙을 지키기 위해, 추가된 자식이 부모보다 크면 부모와 위치를 바꾼다.
   * 3. 부모보다 작을 때까지 이를 반복하여 옳바른 위치를 찾아간다.
   */
  insert(value) {
    this.values.push(value);

    let index = this.values.length - 1;
    let parentIndex;

    while (index > 0) {
      parentIndex = Math.floor((index - 1) / 2);
      if (this.values[parentIndex] >= this.values[index]) break;

      [this.values[parentIndex], this.values[index]] = [
        this.values[index],
        this.values[parentIndex],
      ];
      index = parentIndex;
    }

    return this.values;
  }

  /**
   * @bubbleDown
   * 1. maxBinaryHeap에서 가장 큰 값은 트리에서 가장 상위 값이다. 첫번째 요소를 추출한다.
   * 2. 빈 공간을 채우기 위해 트리의 마지막 값을 넣는다.
   * 3. 자식보다 부모가 크다는 규칙을 지키기 위해, 자식이 더 크다면 둘 중 큰 자식과 위치를 바꾼다.
   * 4. 자식보다 클때까지 이를 반복한다.
   */
  extractMax() {
    let index = 0;
    const max = this.values[index];

    const end = this.values.pop();

    if (!this.values.length) return max;

    this.values[index] = end;

    let leftChildIndex;
    let rightChildIndex;
    let swapIndex;
    while (index < this.values.length) {
      leftChildIndex = 2 * index + 1;
      rightChildIndex = leftChildIndex + 1;

      if (
        this.values[index] >= (this.values?.[leftChildIndex] ?? -Infinity) &&
        this.values[index] >= (this.values?.[rightChildIndex] ?? -Infinity)
      )
        break;

      if (
        this.values[leftChildIndex] >
        (this.values?.[rightChildIndex] ?? -Infinity)
      ) {
        swapIndex = leftChildIndex;
      } else {
        swapIndex = rightChildIndex;
      }

      [this.values[index], this.values[swapIndex]] = [
        this.values[swapIndex],
        this.values[index],
      ];
      index = swapIndex;
    }

    return max;
  }
}

const heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.extractMax();
heap.insert(99);
heap.insert(10);
