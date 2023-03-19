/**
 * 트리: 비선형 (non linear)데이터 구조로 root와 자식 노드로 이루어져 있다.
 * 이진 트리: root을 기준으로 root가 멀어지는 방향으로 최대 2개의 자식을 갖으며 뻣어있는 자료구조.
 * 이진 탐색 트리: 이진 트리에서 왼쪽에는 부모보다 작은 자식, 오른족에는 부모보다 큰 자식이 연결되어 있는 자료 구조.
 * 검색과 삽입이 best, normal case일 때는 O(logN)이지만
 * worst case에서는 (linear할 때) O(n) 시간 복잡도를 갖음.
 * => 정렬된 순서로 트리를 만들면 선형 트리가 되어 검색에 O(n)가 되기 때문에 무작위 순서로 균형 트리를 만드는게 좋다.
 */

/**
 * @정렬된 배열 vs 이진 탐색 트리
 * - 검색: O(logN)으로 동일
 * - 삽입: 정렬된 배열에서는 올바른 위치를 찾은 후 삽입할 공간을 위해 index 이동이 필요하므로 O(n), 이진 탐색은 O(logN)
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * @방법1 - 반복문
   */
  insert(value) {
    const inserted = new Node(value);

    if (!this.root) {
      this.root = inserted;
    } else {
      let target = this.root;

      while (1) {
        if (target.value > value) {
          if (!target.left) {
            target.left = inserted;

            break;
          }
          target = target.left;
        } else if (target.value < value) {
          if (!target.right) {
            target.right = inserted;
            break;
          }
          target = target.right;
        } else break;
      }
    }

    return this;
  }

  /**
   * @방법2 - 재귀
   */
  insert(value) {
    const inserted = new Node(value);

    function recursion(target) {
      if (target.value === value) return;

      if (target.value > value) {
        if (!target.left) {
          target.left = inserted;
          return;
        }
        recursion(target.left);
      } else {
        if (!target.right) {
          target.right = inserted;
          return;
        }
        recursion(target.right);
      }
    }

    if (!this.root) {
      this.root = inserted;
    } else {
      recursion(this.root);
    }
    return this;
  }

  search(value, target = this.root) {
    if (!target) return null;

    if (target.value === value) {
      return target;
    } else if (target.value > value) {
      return this.search(value, target.left);
    } else {
      return this.search(value, target.right);
    }
  }

  /**
   * @방법1 - 반복문
   */
  contains(value) {
    let target = this.root;

    while (!!target) {
      if (target.value === value) {
        return true;
      } else if (target.value > value) {
        target = target.left;
      } else {
        target = target.right;
      }
    }

    return false;
  }

  /**
   * @방법2 - 재귀
   */
  contains(value, target = this.root) {
    if (!target) return false;

    if (target.value === value) {
      return true;
    } else if (target.value > value) {
      return this.contains(value, target.left);
    } else {
      return this.contains(value, target.right);
    }
  }

  /**
   * 1. 삭제할 노드에 자식이 없으면 삭제한다.
   * 2. 삭제할 노드에 자식이 하나 있으면 삭제할 노드 자리에 자식을 넣는다.
   * 3. 삭제할 노드에 자식이 두개 있으면 후속자 노드를 찾아 넣는다.(삭제될 노드보다 큰  값 중 최소값을 갖는 노드)
   *    후속자 노드를 찾는 방법은 삭제할 노드의 오른쪽 노드에서 왼쪽 노드가 없는 노드를 찾는다.
   *    이때, 후속자 노드에 오른쪽 자식이 있으면 후속자 노드의 오른쪽 자식을 부모의 왼쪽에 넣는다.
   */
  delete(value, target = this.root) {
    if (!target) return;

    if (target.value > value) {
      target.left = this.delete(value, target.left);
      return target;
    } else if (target.value < value) {
      target.right = this.delete(value, target.right);
      return target;
    } else {
      if (!target.left) {
        return target.right;
      } else if (!target.right) {
        return target.left;
      } else {
        target.right = this.lift(target.right, target);
        return target;
      }
    }
  }

  lift(target, deleted) {
    if (target.left) {
      target.left = this.lift(target.left, deleted);
      return target;
    } else {
      deleted.value = target.value;

      return target.right;
    }
  }
}
