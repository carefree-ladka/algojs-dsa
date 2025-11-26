A high-performance Deque (Double-Ended Queue) implementation in TypeScript, optimized for Data Structures and Algorithms practice. All operations are O(1) time complexity (amortized).

## Features

- ✅ **O(1) Operations**: All main operations run in constant time (amortized)
- ✅ **Versatile**: Use as Stack, Queue, or Deque
- ✅ **Type-Safe**: Full TypeScript support with generics
- ✅ **Memory Efficient**: Circular buffer with dynamic growth
- ✅ **Well-Documented**: JSDoc with time/space complexity annotations
- ✅ **Iterable**: Works with for...of loops and spread operator
- ✅ **Zero Dependencies**: Lightweight and standalone

## Installation

```bash
npm install arraydeque
```

## Quick Start

```typescript
import { Deque } from 'arraydeque';

const deque = new Deque<number>();

// Use as Stack (LIFO)
deque.push(1);
deque.push(2);
console.log(deque.pop()); // 2

// Use as Queue (FIFO)
deque.enqueue(1);
deque.enqueue(2);
console.log(deque.dequeue()); // 1

// Use as Deque
deque.pushFront(1);
deque.pushBack(2);
console.log(deque.popFront()); // 1
console.log(deque.popBack()); // 2
```

## API Reference

### Constructor

```typescript
new Deque<T>(initialCapacity?: number)
```

Creates a new deque with optional initial capacity (default: 16).

### Properties

| Property | Type | Description | Time |
|----------|------|-------------|------|
| `size` | `number` | Number of elements | O(1) |

### Stack Operations

| Method | Description | Time |
|--------|-------------|------|
| `push(value)` | Add to back | O(1) amortized |
| `pop()` | Remove from back | O(1) |
| `peek()` | View back element | O(1) |
| `top()` | Alias for peek | O(1) |

### Queue Operations

| Method | Description | Time |
|--------|-------------|------|
| `enqueue(value)` | Add to back | O(1) amortized |
| `dequeue()` | Remove from front | O(1) |
| `front()` | View front element | O(1) |
| `back()` | View back element | O(1) |

### Deque Operations

| Method | Description | Time |
|--------|-------------|------|
| `pushFront(value)` | Add to front | O(1) amortized |
| `pushBack(value)` | Add to back | O(1) amortized |
| `popFront()` | Remove from front | O(1) |
| `popBack()` | Remove from back | O(1) |
| `peekFront()` | View front element | O(1) |
| `peekBack()` | View back element | O(1) |

### Array-like Operations

| Method | Description | Time |
|--------|-------------|------|
| `unshift(value)` | Add to front | O(1) amortized |
| `shift()` | Remove from front | O(1) |
| `at(index)` | Access by index | O(1) |

### Utility Methods

| Method | Description | Time |
|--------|-------------|------|
| `isEmpty()` | Check if empty | O(1) |
| `clear()` | Remove all elements | O(1) |
| `toArray()` | Convert to array | O(n) |
| `clone()` | Create shallow copy | O(n) |
| `toString()` | String representation | O(n) |

## Examples

### BFS (Breadth-First Search)

```typescript
const bfs = (graph: Map<string, string[]>, start: string) => {
  const deque = new Deque<string>();
  const visited = new Set<string>();

  deque.enqueue(start);
  visited.add(start);

  while (!deque.isEmpty()) {
    const node = deque.dequeue()!;
    console.log(node);

    for (const neighbor of graph.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        deque.enqueue(neighbor);
      }
    }
  }
};
```

### 0-1 BFS

```typescript
const bfs01 = (graph: [number, number][][], start: number) => {
  const deque = new Deque<[number, number]>();
  const dist = new Map<number, number>();

  deque.pushBack([start, 0]);
  dist.set(start, 0);

  while (!deque.isEmpty()) {
    const [node, d] = deque.popFront()!;

    if (d > dist.get(node)!) continue;

    for (const [neighbor, weight] of graph[node] || []) {
      const newDist = d + weight;

      if (!dist.has(neighbor) || newDist < dist.get(neighbor)!) {
        dist.set(neighbor, newDist);

        if (weight === 0) {
          deque.pushFront([neighbor, newDist]); // 0-weight edge
        } else {
          deque.pushBack([neighbor, newDist]); // 1-weight edge
        }
      }
    }
  }

  return dist;
};
```

### Sliding Window Maximum

```typescript
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

All main operations are **O(1)** amortized time complexity:
- Push/Pop (both ends): O(1) amortized
- Peek (both ends): O(1)
- Size/isEmpty: O(1)
- Random access via `at()`: O(1)

Space complexity: O(n) where n is the number of elements.

## Why This Implementation?

Unlike JavaScript's built-in array methods:
- `Array.shift()` is O(n) - our `popFront()` is O(1)
- `Array.unshift()` is O(n) - our `pushFront()` is O(1)

This makes our Deque significantly faster for algorithms that require frequent front operations, such as BFS, sliding window problems, and 0-1 BFS.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
