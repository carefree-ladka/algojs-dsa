[![npm version](https://img.shields.io/npm/v/algojs-dsa.svg)](https://www.npmjs.com/package/algojs-dsa)

# AlgoJS DSA

High-performance data structures for Data Structures and Algorithms practice in TypeScript. Includes Deque and PriorityQueue with optimal time complexity.

## Features

- ✅ **Deque**: O(1) operations for double-ended queue
- ✅ **PriorityQueue**: O(log n) heap-based priority queue
- ✅ **Type-Safe**: Full TypeScript support with generics
- ✅ **Memory Efficient**: Optimized implementations
- ✅ **Well-Documented**: JSDoc with time/space complexity annotations
- ✅ **Iterable**: Works with for...of loops and spread operator
- ✅ **Zero Dependencies**: Lightweight and standalone
- ✅ **Flexible Initialization**: Initialize with elements or capacity

## Installation

```bash
npm install algojs-dsa
```

## Quick Start

```typescript
import { Deque, PriorityQueue } from 'algojs-dsa';

// Deque usage
const deque = new Deque<number>([1, 2, 3]);

// PriorityQueue usage
const pq = new PriorityQueue<number>();
```

## Deque Usage

### As a Stack (LIFO)
```typescript
const stack = new Deque<number>();
stack.push(1);
stack.push(2);
console.log(stack.pop()); // 2
console.log(stack.peek()); // 1
```

### As a Queue (FIFO)
```typescript
const queue = new Deque<number>();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
console.log(queue.front()); // 2
```

### As a Deque (Both Ends)
```typescript
const deque = new Deque<number>();
deque.pushFront(1);
deque.pushBack(2);
console.log(deque.popFront()); // 1
console.log(deque.popBack());  // 2
```

### Initialize with Elements
```typescript
// BFS with initial node
const bfs = (root) => {
  const queue = new Deque([root]); // Initialize with root
  
  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    console.log(current.value);

    if (current.left) queue.enqueue(current.left);
    if (current.right) queue.enqueue(current.right);
  }
};
```

## PriorityQueue Usage

### Min Heap (Default)
```typescript
const minHeap = new PriorityQueue<number>();
minHeap.push(5);
minHeap.push(3);
minHeap.push(7);
console.log(minHeap.pop()); // 3
```

### Max Heap
```typescript
const maxHeap = new PriorityQueue<number>({ type: 'max' });
maxHeap.push(5);
maxHeap.push(3);
maxHeap.push(7);
console.log(maxHeap.pop()); // 7
```

### Custom Comparator
```typescript
const taskQueue = new PriorityQueue<{priority: number, task: string}>({
  comparator: (a, b) => a.priority - b.priority
});

taskQueue.push({ priority: 5, task: 'low' });
taskQueue.push({ priority: 1, task: 'high' });
console.log(taskQueue.pop()?.task); // 'high'
```

### Initialize with Elements
```typescript
const pq = new PriorityQueue<number>({
  initialValues: [5, 3, 7, 1, 9]
});
console.log(pq.pop()); // 1
```

## API Reference

### Deque

| Method | Description | Time |
|--------|-------------|------|
| `new Deque(elements?)` | Create deque | O(n) |
| `push(value)` | Add to back | O(1) amortized |
| `pop()` | Remove from back | O(1) |
| `pushFront(value)` | Add to front | O(1) amortized |
| `popFront()` | Remove from front | O(1) |
| `peek()` | View back element | O(1) |
| `peekFront()` | View front element | O(1) |
| `enqueue(value)` | Add to back (alias) | O(1) amortized |
| `dequeue()` | Remove from front (alias) | O(1) |
| `size` | Number of elements | O(1) |
| `isEmpty()` | Check if empty | O(1) |
| `clear()` | Remove all elements | O(1) |
| `toArray()` | Convert to array | O(n) |

### PriorityQueue

| Method | Description | Time |
|--------|-------------|------|
| `new PriorityQueue(options?)` | Create priority queue | O(n) if initial values |
| `push(value)` | Add element | O(log n) |
| `pop()` | Remove top element | O(log n) |
| `peek()` | View top element | O(1) |
| `size` | Number of elements | O(1) |
| `isEmpty()` | Check if empty | O(1) |
| `clear()` | Remove all elements | O(1) |
| `contains(value)` | Check if value exists | O(n) |
| `remove(value)` | Remove specific value | O(n) |
| `toArray()` | Convert to array | O(n) |
| `toSortedArray()` | Get sorted array | O(n log n) |

## Algorithm Examples

### Dijkstra's Algorithm
```typescript
import { PriorityQueue } from 'algojs-dsa';

const dijkstra = (graph: number[][], start: number) => {
  const pq = new PriorityQueue<[number, number]>({
    comparator: (a, b) => a[0] - b[0] // Compare by distance
  });
  
  pq.push([0, start]);
  const distances = new Array(graph.length).fill(Infinity);
  distances[start] = 0;
  
  while (!pq.isEmpty()) {
    const [dist, node] = pq.pop()!;
    
    if (dist > distances[node]) continue;
    
    for (let neighbor = 0; neighbor < graph[node].length; neighbor++) {
      const newDist = dist + graph[node][neighbor];
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }
  
  return distances;
};
```

### BFS with Deque
```typescript
import { Deque } from 'algojs-dsa';

const bfs = (graph: Map<string, string[]>, start: string) => {
  const queue = new Deque([start]);
  const visited = new Set([start]);

  while (!queue.isEmpty()) {
    const node = queue.dequeue()!;
    console.log(node);

    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.enqueue(neighbor);
      }
    }
  }
};
```

### Sliding Window Maximum
```typescript
import { Deque } from 'algojs-dsa';

const slidingWindowMaximum = (nums: number[], k: number): number[] => {
  const deque = new Deque<number>(); // Store indices
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove indices outside window
    while (!deque.isEmpty() && deque.peekFront()! < i - k + 1) {
      deque.popFront();
    }

    // Remove smaller elements
    while (!deque.isEmpty() && nums[deque.peekBack()!] < nums[i]) {
      deque.popBack();
    }

    deque.pushBack(i);

    if (i >= k - 1) {
      result.push(nums[deque.peekFront()!]);
    }
  }

  return result;
};
```

## Performance

**Deque Operations:**
- Push/Pop (both ends): O(1) amortized
- Peek (both ends): O(1)
- Size/isEmpty: O(1)
- Random access via `at()`: O(1)

**PriorityQueue Operations:**
- Push/Pop: O(log n)
- Peek: O(1)
- Size/isEmpty: O(1)
- Contains/Remove: O(n)

## Why This Implementation?

**Deque advantages over Array:**
- `Array.shift()` is O(n) - our `popFront()` is O(1)
- `Array.unshift()` is O(n) - our `pushFront()` is O(1)

**PriorityQueue advantages:**
- Efficient heap-based implementation
- Supports both min and max heaps
- Custom comparators for complex objects
- Additional operations like `replace()` and `pushPop()`

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
