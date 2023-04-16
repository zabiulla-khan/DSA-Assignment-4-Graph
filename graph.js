//Que - 1 Breadth First Traversal for a Graph ========================================
console.log("ANSWER 1");

const airports = "PHX BKK OKC JFK LAX MEX EZE HEL LOS LAP LIM".split(" ");

const routes = [
  ["PHX", "LAX"],
  ["PHX", "JFK"],
  ["JFK", "OKC"],
  ["JFK", "HEL"],
  ["JFK", "LOS"],
  ["MEX", "LAX"],
  ["MEX", "BKK"],
  ["MEX", "LIM"],
  ["MEX", "EZE"],
  ["LIM", "BKK"],
];

// The graph
const adjacencyList = new Map();

// Add node
function addNode(airport) {
  adjacencyList.set(airport, []);
}

// Add edge, undirected
function addEdge(origin, destination) {
  adjacencyList.get(origin).push(destination);
  adjacencyList.get(destination).push(origin);
}

// Create the Graph
airports.forEach(addNode);
routes.forEach((route) => addEdge(...route));

function bfs(start) {
  const visited = new Set();

  const queue = [start];

  while (queue.length > 0) {
    const airport = queue.shift(); // mutates the queue

    const destinations = adjacencyList.get(airport);

    for (const destination of destinations) {
      if (destination === "BKK") {
        console.log("BFS found Bangkok!");
      }
      if (!visited.has(destination)) {
        visited.add(destination);
        queue.push(destination);
      }
    }
  }
}

bfs("PHX");

//Que - 2 Depth First Traversal for a Graph ========================================

console.log("ANSWER 2");

function dfs(start, visited = new Set()) {
  console.log(start);

  visited.add(start);

  const destinations = adjacencyList.get(start);

  for (const destination of destinations) {
    if (destination === "BKK") {
      console.log(`DFS found Bangkok`);
      return;
    }

    if (!visited.has(destination)) {
      dfs(destination, visited);
    }
  }
}

dfs("PHX");

//Que - 3 Count the number of nodes at given level in a tree using BFS===================

console.log("ANSWER 3");

let V;
// Pointer to an
// array containing
// adjacency lists
var adj = new Array(1001);
for (let i = 0; i < adj.length; i++) {
  adj[i] = [];
}

function addEdge(v, w) {
  // Add w to v’s list.
  adj[v].push(w);

  // Add v to w's list.
  adj[w].push(v);
}

function BFS(s, l) {
  V = 100;
  // Mark all the vertices
  // as not visited
  let visited = new Array(V);
  let level = new Array(V);

  for (let i = 0; i < V; i++) {
    visited[i] = false;
    level[i] = 0;
  }

  // Create a queue for BFS
  let queue = [];

  // Mark the current node as
  // visited and enqueue it
  visited[s] = true;
  queue.push(s);
  level[s] = 0;
  let count = 0;
  while (queue.length != 0) {
    // Dequeue a vertex from
    // queue and print it
    s = queue[0];
    queue.shift();

    let list = adj[s];
    // Get all adjacent vertices
    // of the dequeued vertex s.
    // If a adjacent has not been
    // visited, then mark it
    // visited and enqueue it
    for (let i = 0; i < list.length; i++) {
      if (!visited[list[i]]) {
        visited[list[i]] = true;
        level[list[i]] = level[s] + 1;
        queue.push(list[i]);
      }
    }

    count = 0;
    for (let i = 0; i < V; i++) if (level[i] == l) count++;
  }
  return count;
}
// Driver code

// Create a graph given
// in the above diagram
addEdge(0, 1);
addEdge(0, 2);
addEdge(1, 3);
addEdge(2, 4);
addEdge(2, 5);

let level = 2;
document.write(BFS(0, level));

// Que - 4 Count number of trees in a forest============================

console.log("ANSWER 4");

var Vv; // No. of vertices

// Array of lists for
// Adjacency List Representation
var adje;
// Constructor
function Graph(v) {
  Vv = v;
  adje = Array.from(Array(v), () => Array());
}
// Function to add an edge into the graph
function addEdge(v, w) {
  adje[v].push(w); // Add w to v's list.
}
// A function used by DFS
function DFSUtil(v, visited) {
  // Mark the current node as
  // visited and print it
  visited[v] = true;

  // Recur for all the vertices
  // adjacent to this vertex
  for (var i of adje[v]) {
    var n = i;
    if (!visited[n]) {
      DFSUtil(n, visited);
    }
  }
}
// The function to do DFS traversal.
// It uses recursive DFSUtil()
function countTrees() {
  // Mark all the vertices as not visited
  // (set as false by default in java)
  var visited = Array(V).fill(false);
  var res = 0;

  // Call the recursive helper function
  // to print DFS traversal starting from
  // all vertices one by one
  for (var i = 0; i < V; ++i) {
    if (visited[i] == false) {
      DFSUtil(i, visited);
      res++;
    }
  }
  return res;
}

// Driver code
Graph(5);
addEdge(0, 1);
addEdge(0, 2);
addEdge(3, 4);
document.write(countTrees());

//Que - 5 Detect Cycle in a Directed Graph==========================

console.log("ANSWER 5");

var WHITE = 0,
  GRAY = 1,
  BLACK = 2;

// Graph class represents a directed graph
// using adjacency list representation
class Graphe {
  // Constructor
  constructor(ver) {
    this.V = ver;
    this.adjList = Array.from(Array(this.V), () => Array(this.V));
  }
}

// Utility function to add an edge
function addEdge(g, u, v) {
  // Push v to u's list.
  g.adjList[u].push(v);
}

// Recursive function to find if there is back edge
// in DFS subtree tree rooted with 'u'
function DFSUtil(g, u, color) {
  // GRAY : This vertex is being processed (DFS
  // for this vertex has started, but not
  // ended (or this vertex is in function
  // call stack)
  color[u] = GRAY;

  // Iterate through all adjacent vertices
  for (var iN of g.adjList[u]) {
    // If there is
    if (color[iN] == GRAY) return true;

    // If v is not processed and there is a back
    // edge in subtree rooted with v
    if (color[iN] == WHITE && DFSUtil(g, iN, color) == true) return true;
  }

  // Mark this vertex as processed
  color[u] = BLACK;
  return false;
}

// Returns true if there is a cycle in graph
function isCyclic(g) {
  // Initialize color of all vertices as WHITE
  var color = Array(g.V);
  for (var i = 0; i < g.V; i++) {
    color[i] = WHITE;
  }

  // Do a DFS traversal beginning with all
  // vertices
  for (var i = 0; i < g.V; i++) {
    if (color[i] == WHITE) {
      if (DFSUtil(g, i, color) == true) return true;
    }
  }
  return false;
}

// Driver Code

// Create a graph given in the above diagram
var g = new Graphe(4);
addEdge(g, 0, 1);
addEdge(g, 0, 2);
addEdge(g, 1, 2);
addEdge(g, 2, 0);
addEdge(g, 2, 3);
addEdge(g, 3, 3);

if (isCyclic(g)) document.write("Graph contains cycle");
else document.write("Graph doesn't contain cycle");
