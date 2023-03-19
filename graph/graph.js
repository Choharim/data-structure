/**
 * @graph 사용 사례
 * - facebook, instagram 등 친구 연결 관계를 나타낼 때
 * - 지도에서 최단 경로를 나타낼 때
 */

/**
 * @tree vs graph
 * 경로 갯수
 * - tree는 a -> b로 갈 때 갈 수 있는 경로가 1개이다.
 * - graph는 여러 경로가 있을 수 있다.
 * 사이클 유무
 * - tree에는 사이클이 존재할 수 없다.
 * - graph에는 사이클이 있을 수 있다.
 * 노드간의 연결
 * - tree는 직/간접적으로 모든 노드간 연결이 된다.
 * - graph는 연결이 되지 않는 노드가 있을 수 있다. (연결이 되지 않고 동떨어진 노드가 존재할 수 있음) -> vertex가 모두 연결된 그래프를 연결 그래프라고 한다.
 * 용어 차이
 * - tree에서 node라고 불리는 데이터 조각이 graph에서는 정점(vertex)라고 부른다.
 * - vertext간 연결된 선을 간선(edge)라고 한다.
 * - edge로 연결된 두 vertex는 서로 인접한다(adjacent)고 한다.
 */

/**
 * @graph 종류
 * - 방향 그래프
 *   -  edge에 방향이 존재하는 그래프이다.
 *      ex) instagram에서 a는 b를 팔로우하지만 b는 a를 팔로우하지 않을 수 있다.
 * - 무방향 그래프
 * - 비중 없는 그래프
 * - 비중 그래프
 */

/**
 * @graph 정렬 방법
 * 1. 인접 행렬 (adjacent matrix)
 * 연속된 숫자로 이루어진 vertex의 경우 배열 index에 인접한 vertex들을 배열로 담을 수 있다.
 * 이는 vertex를 추가하거나 제거할 때 공간 복잡도가 O(v^2) (v: vertex 갯수)로 많은 임시 메모리 공간을 차지한다.
 * 공간 복잡도
 * - vertex 추가/삭제 O(v^2)
 * - edge 추가/삭제 O(1)
 * ex) 0 - 1 - 2 - 3 - 0 으로 연결된 사이클 모양 그래프를 다음과 같이 행렬로 나타낼 수 있다. [[1,3],[0,2],[1,3],[2,0]]
 * 
 * 2. 인접 리스트 (adjacent list)
 * vertex가 연속된 숫자가 아닐 때 사용할 수 있는 방법이다. object에 key에 해당 vertex와 value에 인접한 vertex 배열을 저장한다.
 * ex) 'a' - 'b' - 'c' - 'd' - 'a'로 연결된 사이클 모양 그래프를 다음과 같이 나타낼 수 있다. {
  a: ["b", "d"],
  b: ["a", "c"],
  c: ["b", "d"],
  d: ["c", "a"],
}
 * 공간 복잡도
 * - vertex 추가 O(1)
 * - vertex 삭제 O(v + e)
 * - edge 추가 O(1)
 * - edge 삭제 O(e)
 */

/**
 * @graph - 무방향 그래프
 */
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (this.adjacencyList[vertex]) return;

    this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);

    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] =
      this.adjacencyList[vertex1]?.filter((v) => v !== vertex2) || [];
    this.adjacencyList[vertex2] =
      this.adjacencyList[vertex2]?.filter((v) => v !== vertex1) || [];
  }

  removeVertex(vertex) {
    const removedEdge = this.adjacencyList[vertex];

    if (!removedEdge) return;

    for (const edge of removedEdge) {
      this.removeEdge(vertex, edge);
    }

    delete this.adjacencyList[vertex];
  }
}
