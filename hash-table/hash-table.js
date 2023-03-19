/**
 * 대부분의 프로그래밍 언어에 해시 테이블이 구현되어 있다.
 * 간단한 방법으로 해시 테이블을 구현하여 내부 동작 방식을 이해해보자.
 *
 * 해쉬 테이블이란,
 * key-value로 데이터를 저장할 때 사용하기 좋은 데이터 구조. 좋은 해쉬 테이블의 경우, 검색/삭제/삽입에 O(1)의 시간 복잡도를 갖기 때문에 유용하다.
 * 해쉬 함수를 이용해 특정 key의 hashKey를 얻고 이를 hash의 key로 저장한다.
 * 다른 key도 동일한 hashKey를 얻을 수 있기 때문에 이런 해쉬 충돌을 해결해야 한다.
 *
 * 해쉬 함수
 * - 특정 방법으로 key를 이용해 hash key를 만든다.
 * - 같은 key는 항상 동일한 hash key를 반환해야 한다.
 * - 해쉬 충돌을 줄이기 위해 사용 가능한 모든 셀에 데이터를 분산시켜야 한다.
 *   - 모든 데이터가 해시 테이블 한 셀에 들어간 최약의 경우의 해시 테이블 룩업은 O(n)이다. 때문에 충돌이 거의 없도록 하여 O(1)의 성능을 내야 한다.
 * - 속도가 빨라야 한다.
 * - 해쉬 테이블 크기가 소수일 수록 충돌이 적다.
 *
 * 해쉬 충돌을 줄이는 빙법
 * 1. 분리 연결법 (separate chaining)
 * - 같은 자리에 이중 구조로 추가한다. (배열에 넣는다.)
 * 2. linear probing
 * - 충돌나면 근처 빈곳에 넣는다.
 * 등.. 그외 여러 방법이 있다.
 * 부하율
 * 데이터와 셀간의 비율을 부하율이라고 한다.
 * 필요한 셀의 수보다 더 많은 셀이 존재하면 충돌을 줄일 수 있다.
 * 불필요한 메모리를 많이 낭비하지 않기 위해 필요한 셀의 특정 비율 만큼 추가로 갖는 것이 좋다.
 * 이상적인 부하율은 0.7로, 데이터의 갯수가 7일 때 전체 셀의 갯수는 10개가 된다.
 */

class HashTable {
  constructor(size = 4) {
    this.keyMap = new Array(size);
  }

  /**
   * key를 특정 규칙을 이용해 변경한 후 hash key로 사용한다.
   */
  _hash(key) {
    let total = 0;
    let WEIRD_PRIME = 31;

    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt() - 96;

      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }

    return total;
  }

  /**
   * 개별 체이닝을 통해 충돌을 해결한다.
   */
  set(key, value) {
    if (this.get(key)) return;

    const hashKey = this._hash(key);

    if (!this.keyMap[hashKey]) {
      this.keyMap[hashKey] = [];
    }
    this.keyMap[hashKey].push([key, value]);

    return hashKey;
  }

  get(key) {
    const hashKey = this._hash(key);

    if (!this.keyMap[hashKey]) return;

    for (let i = 0; i < this.keyMap[hashKey].length; i++) {
      const [k, v] = this.keyMap[hashKey][i];
      if (k === key) {
        return v;
      }
    }
  }

  values() {
    let valuesArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) continue;

      for (let j = 0; j < this.keyMap[i].length; j++) {
        const [_, value] = this.keyMap[i][j];
        valuesArr.push(value);
      }
    }

    return valuesArr;
  }

  keys() {
    let keysArr = [];

    for (let i = 0; i < this.keyMap.length; i++) {
      if (!this.keyMap[i]) continue;

      for (let j = 0; j < this.keyMap[i].length; j++) {
        const [key] = this.keyMap[i][j];
        keysArr.push(key);
      }
    }

    return keysArr;
  }
}
let hash = new HashTable();
console.log(hash.set("hello world", "goodbye!!"));
console.log(hash.set("dogs", "are cool"));
console.log(hash.set("cats", "are fine"));
console.log(hash.set("i love", "pizza"));
console.log(hash.set("i love", "pizza2"));
console.log(hash.keyMap);
console.log(hash.keys());
