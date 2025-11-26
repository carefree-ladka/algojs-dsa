import { beforeEach, describe, expect, it } from "@jest/globals";
import { PriorityQueue } from "../src";

describe("PriorityQueue", () => {
  describe("Constructor", () => {
    it("should create empty min-heap by default", () => {
      const pq = new PriorityQueue<number>();
      expect(pq.size).toBe(0);
      expect(pq.isEmpty()).toBe(true);
    });

    it("should create empty max-heap when type is max", () => {
      const pq = new PriorityQueue<number>({ type: "max" });
      pq.push(1);
      pq.push(5);
      pq.push(3);
      expect(pq.pop()).toBe(5);
    });

    it("should create heap with initial values", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [5, 3, 7, 1, 9, 2],
      });
      expect(pq.size).toBe(6);
      expect(pq.peek()).toBe(1);
    });

    it("should heapify initial values correctly", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      });
      const sorted: number[] = [];
      while (!pq.isEmpty()) {
        sorted.push(pq.pop()!);
      }
      expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should accept custom comparator", () => {
      const pq = new PriorityQueue<{ priority: number; value: string }>({
        comparator: (a, b) => a.priority - b.priority,
      });
      pq.push({ priority: 5, value: "low" });
      pq.push({ priority: 1, value: "high" });
      pq.push({ priority: 3, value: "medium" });
      expect(pq.pop()?.value).toBe("high");
    });

    it("should handle empty initial values array", () => {
      const pq = new PriorityQueue<number>({ initialValues: [] });
      expect(pq.size).toBe(0);
      expect(pq.isEmpty()).toBe(true);
    });
  });

  describe("push/enqueue/insert", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>();
    });

    it("should add elements and maintain min-heap property", () => {
      pq.push(5);
      pq.push(3);
      pq.push(7);
      pq.push(1);
      expect(pq.peek()).toBe(1);
      expect(pq.size).toBe(4);
    });

    it("should return new size after push", () => {
      expect(pq.push(1)).toBe(1);
      expect(pq.push(2)).toBe(2);
      expect(pq.push(3)).toBe(3);
    });

    it("should handle duplicate values", () => {
      pq.push(5);
      pq.push(5);
      pq.push(5);
      expect(pq.size).toBe(3);
      expect(pq.pop()).toBe(5);
      expect(pq.pop()).toBe(5);
    });

    it("enqueue should work as alias for push", () => {
      pq.enqueue(10);
      expect(pq.peek()).toBe(10);
    });

    it("insert should work as alias for push", () => {
      pq.insert(20);
      expect(pq.peek()).toBe(20);
    });

    it("should handle negative numbers", () => {
      pq.push(5);
      pq.push(-3);
      pq.push(10);
      pq.push(-10);
      expect(pq.pop()).toBe(-10);
    });

    it("should handle floating point numbers", () => {
      pq.push(5.5);
      pq.push(3.2);
      pq.push(7.8);
      expect(pq.pop()).toBe(3.2);
    });
  });

  describe("pop/dequeue/extract", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>({
        initialValues: [5, 3, 7, 1, 9, 2, 8, 4, 6],
      });
    });

    it("should remove and return minimum element", () => {
      expect(pq.pop()).toBe(1);
      expect(pq.size).toBe(8);
    });

    it("should maintain heap property after multiple pops", () => {
      const sorted: (number | undefined)[] = [];
      while (!pq.isEmpty()) {
        sorted.push(pq.pop());
      }
      expect(sorted).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should return undefined when popping empty heap", () => {
      const emptyPq = new PriorityQueue<number>();
      expect(emptyPq.pop()).toBeUndefined();
    });

    it("should handle single element correctly", () => {
      const singlePq = new PriorityQueue<number>();
      singlePq.push(42);
      expect(singlePq.pop()).toBe(42);
      expect(singlePq.isEmpty()).toBe(true);
    });

    it("dequeue should work as alias for pop", () => {
      expect(pq.dequeue()).toBe(1);
    });

    it("extract should work as alias for pop", () => {
      expect(pq.extract()).toBe(1);
    });
  });

  describe("peek/top", () => {
    it("should return minimum without removing", () => {
      const pq = new PriorityQueue<number>({ initialValues: [5, 3, 7] });
      expect(pq.peek()).toBe(3);
      expect(pq.size).toBe(3);
      expect(pq.peek()).toBe(3);
    });

    it("should return undefined for empty heap", () => {
      const pq = new PriorityQueue<number>();
      expect(pq.peek()).toBeUndefined();
    });

    it("top should work as alias for peek", () => {
      const pq = new PriorityQueue<number>({ initialValues: [10, 5] });
      expect(pq.top()).toBe(5);
    });
  });

  describe("Max Heap", () => {
    let maxHeap: PriorityQueue<number>;

    beforeEach(() => {
      maxHeap = new PriorityQueue<number>({ type: "max" });
    });

    it("should return maximum element on peek", () => {
      maxHeap.push(5);
      maxHeap.push(10);
      maxHeap.push(3);
      expect(maxHeap.peek()).toBe(10);
    });

    it("should pop elements in descending order", () => {
      maxHeap.push(5);
      maxHeap.push(10);
      maxHeap.push(3);
      maxHeap.push(7);
      expect(maxHeap.pop()).toBe(10);
      expect(maxHeap.pop()).toBe(7);
      expect(maxHeap.pop()).toBe(5);
      expect(maxHeap.pop()).toBe(3);
    });

    it("should handle initial values correctly", () => {
      const maxPq = new PriorityQueue<number>({
        type: "max",
        initialValues: [1, 2, 3, 4, 5],
      });
      expect(maxPq.pop()).toBe(5);
      expect(maxPq.pop()).toBe(4);
    });
  });

  describe("size and isEmpty", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>();
    });

    it("should track size correctly", () => {
      expect(pq.size).toBe(0);
      pq.push(1);
      expect(pq.size).toBe(1);
      pq.push(2);
      expect(pq.size).toBe(2);
      pq.pop();
      expect(pq.size).toBe(1);
    });

    it("should update isEmpty correctly", () => {
      expect(pq.isEmpty()).toBe(true);
      pq.push(1);
      expect(pq.isEmpty()).toBe(false);
      pq.pop();
      expect(pq.isEmpty()).toBe(true);
    });
  });

  describe("clear", () => {
    it("should remove all elements", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [1, 2, 3, 4, 5],
      });
      pq.clear();
      expect(pq.size).toBe(0);
      expect(pq.isEmpty()).toBe(true);
      expect(pq.peek()).toBeUndefined();
    });
  });

  describe("toArray", () => {
    it("should return array copy of heap", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [5, 3, 7, 1],
      });
      const arr = pq.toArray();
      expect(arr.length).toBe(4);
      expect(arr).toContain(1);
      expect(arr).toContain(3);
      expect(arr).toContain(5);
      expect(arr).toContain(7);
    });

    it("should not affect original heap", () => {
      const pq = new PriorityQueue<number>({ initialValues: [1, 2, 3] });
      const arr = pq.toArray();
      arr.push(999);
      expect(pq.size).toBe(3);
    });
  });

  describe("toSortedArray", () => {
    it("should return sorted array for min-heap", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [5, 3, 7, 1, 9, 2],
      });
      const sorted = pq.toSortedArray();
      expect(sorted).toEqual([1, 2, 3, 5, 7, 9]);
      expect(pq.size).toBe(6); // Should not modify original
    });

    it("should return sorted array for max-heap", () => {
      const pq = new PriorityQueue<number>({
        type: "max",
        initialValues: [5, 3, 7, 1, 9, 2],
      });
      const sorted = pq.toSortedArray();
      expect(sorted).toEqual([9, 7, 5, 3, 2, 1]);
    });

    it("should not modify original heap", () => {
      const pq = new PriorityQueue<number>({ initialValues: [3, 1, 2] });
      pq.toSortedArray();
      expect(pq.peek()).toBe(1);
      expect(pq.size).toBe(3);
    });
  });

  describe("contains", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>({ initialValues: [5, 3, 7, 1, 9] });
    });

    it("should return true for existing elements", () => {
      expect(pq.contains(3)).toBe(true);
      expect(pq.contains(9)).toBe(true);
    });

    it("should return false for non-existing elements", () => {
      expect(pq.contains(100)).toBe(false);
      expect(pq.contains(0)).toBe(false);
    });

    it("should work with empty heap", () => {
      const emptyPq = new PriorityQueue<number>();
      expect(emptyPq.contains(1)).toBe(false);
    });
  });

  describe("remove", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>({ initialValues: [5, 3, 7, 1, 9, 2] });
    });

    it("should remove existing element", () => {
      expect(pq.remove(7)).toBe(true);
      expect(pq.size).toBe(5);
      expect(pq.contains(7)).toBe(false);
    });

    it("should maintain heap property after removal", () => {
      pq.remove(3);
      const sorted: (number | undefined)[] = [];
      while (!pq.isEmpty()) {
        sorted.push(pq.pop());
      }
      expect(sorted).toEqual([1, 2, 5, 7, 9]);
    });

    it("should return false for non-existing element", () => {
      expect(pq.remove(100)).toBe(false);
      expect(pq.size).toBe(6);
    });

    it("should handle removing minimum element", () => {
      expect(pq.remove(1)).toBe(true);
      expect(pq.peek()).toBe(2);
    });

    it("should handle removing last element", () => {
      const lastElement = pq.toArray()[pq.size - 1];
      expect(pq.remove(lastElement)).toBe(true);
      expect(pq.contains(lastElement)).toBe(false);
    });

    it("should work with single element", () => {
      const singlePq = new PriorityQueue<number>({ initialValues: [42] });
      expect(singlePq.remove(42)).toBe(true);
      expect(singlePq.isEmpty()).toBe(true);
    });
  });

  describe("replace", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>({ initialValues: [5, 3, 7, 1, 9] });
    });

    it("should replace top element", () => {
      const oldTop = pq.replace(4);
      expect(oldTop).toBe(1);
      expect(pq.peek()).toBe(3);
    });

    it("should maintain heap property", () => {
      pq.replace(10);
      const sorted: (number | undefined)[] = [];
      while (!pq.isEmpty()) {
        sorted.push(pq.pop());
      }
      expect(sorted).toEqual([3, 5, 7, 9, 10]);
    });

    it("should handle empty heap", () => {
      const emptyPq = new PriorityQueue<number>();
      expect(emptyPq.replace(5)).toBeUndefined();
      expect(emptyPq.peek()).toBe(5);
    });
  });

  describe("pushPop", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
      pq = new PriorityQueue<number>({ initialValues: [5, 3, 7, 1, 9] });
    });

    it("should return pushed value if smaller than top", () => {
      const result = pq.pushPop(0);
      expect(result).toBe(0);
      expect(pq.peek()).toBe(1);
      expect(pq.size).toBe(5);
    });

    it("should return top if pushed value is larger", () => {
      const result = pq.pushPop(10);
      expect(result).toBe(1);
      expect(pq.peek()).toBe(3);
      expect(pq.size).toBe(5);
    });

    it("should work with empty heap", () => {
      const emptyPq = new PriorityQueue<number>();
      expect(emptyPq.pushPop(5)).toBe(5);
      expect(emptyPq.isEmpty()).toBe(true);
    });
  });

  describe("merge", () => {
    it("should merge two heaps correctly", () => {
      const pq1 = new PriorityQueue<number>({ initialValues: [5, 3, 7] });
      const pq2 = new PriorityQueue<number>({ initialValues: [2, 8, 1] });

      pq1.merge(pq2);
      expect(pq1.size).toBe(6);
      expect(pq1.peek()).toBe(1);
    });

    it("should maintain heap property after merge", () => {
      const pq1 = new PriorityQueue<number>({ initialValues: [5, 3, 7] });
      const pq2 = new PriorityQueue<number>({ initialValues: [2, 8, 1] });

      pq1.merge(pq2);
      const sorted: (number | undefined)[] = [];
      while (!pq1.isEmpty()) {
        sorted.push(pq1.pop());
      }
      expect(sorted).toEqual([1, 2, 3, 5, 7, 8]);
    });

    it("should not modify source heap", () => {
      const pq1 = new PriorityQueue<number>({ initialValues: [5, 3] });
      const pq2 = new PriorityQueue<number>({ initialValues: [2, 1] });

      pq1.merge(pq2);
      expect(pq2.size).toBe(2);
      expect(pq2.peek()).toBe(1);
    });

    it("should handle merging with empty heap", () => {
      const pq1 = new PriorityQueue<number>({ initialValues: [5, 3] });
      const pq2 = new PriorityQueue<number>();

      pq1.merge(pq2);
      expect(pq1.size).toBe(2);
    });
  });

  describe("Iterator", () => {
    it("should support for...of loop", () => {
      const pq = new PriorityQueue<number>({ initialValues: [5, 3, 7, 1] });
      const elements: number[] = [];

      for (const element of pq) {
        elements.push(element);
      }

      expect(elements.length).toBe(4);
      expect(elements).toContain(1);
      expect(elements).toContain(3);
      expect(elements).toContain(5);
      expect(elements).toContain(7);
    });

    it("should support spread operator", () => {
      const pq = new PriorityQueue<number>({ initialValues: [5, 3, 7] });
      const arr = [...pq];
      expect(arr.length).toBe(3);
    });
  });

  describe("Custom Comparator", () => {
    interface Task {
      priority: number;
      name: string;
    }

    it("should work with complex objects", () => {
      const pq = new PriorityQueue<Task>({
        comparator: (a, b) => a.priority - b.priority,
      });

      pq.push({ priority: 5, name: "low" });
      pq.push({ priority: 1, name: "high" });
      pq.push({ priority: 3, name: "medium" });

      expect(pq.pop()?.name).toBe("high");
      expect(pq.pop()?.name).toBe("medium");
      expect(pq.pop()?.name).toBe("low");
    });

    it("should support reverse priority", () => {
      const pq = new PriorityQueue<Task>({
        comparator: (a, b) => b.priority - a.priority,
      });

      pq.push({ priority: 5, name: "high" });
      pq.push({ priority: 1, name: "low" });

      expect(pq.pop()?.name).toBe("high");
    });

    it("should handle string comparisons", () => {
      const pq = new PriorityQueue<string>({
        comparator: (a, b) => a.localeCompare(b),
      });

      pq.push("zebra");
      pq.push("apple");
      pq.push("mango");

      expect(pq.pop()).toBe("apple");
      expect(pq.pop()).toBe("mango");
      expect(pq.pop()).toBe("zebra");
    });
  });

  describe("Edge Cases", () => {
    it("should handle large number of elements", () => {
      const pq = new PriorityQueue<number>();
      const n = 10000;

      for (let i = n; i > 0; i--) {
        pq.push(i);
      }

      expect(pq.size).toBe(n);
      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(2);
    });

    it("should handle all same values", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [5, 5, 5, 5, 5],
      });

      expect(pq.pop()).toBe(5);
      expect(pq.size).toBe(4);
    });

    it("should handle already sorted input", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [1, 2, 3, 4, 5],
      });

      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(2);
    });

    it("should handle reverse sorted input", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [5, 4, 3, 2, 1],
      });

      expect(pq.pop()).toBe(1);
      expect(pq.pop()).toBe(2);
    });

    it("should handle mix of operations", () => {
      const pq = new PriorityQueue<number>();

      pq.push(5);
      pq.push(3);
      expect(pq.pop()).toBe(3);
      pq.push(1);
      pq.push(7);
      expect(pq.peek()).toBe(1);
      pq.remove(5);
      expect(pq.size).toBe(2);
    });

    it("should handle zero and negative numbers", () => {
      const pq = new PriorityQueue<number>({
        initialValues: [0, -5, 10, -10, 5],
      });

      expect(pq.pop()).toBe(-10);
      expect(pq.pop()).toBe(-5);
      expect(pq.pop()).toBe(0);
    });
  });

  describe("Performance Characteristics", () => {
    it("should maintain O(log n) performance for push", () => {
      const pq = new PriorityQueue<number>();
      const start = Date.now();

      for (let i = 0; i < 100000; i++) {
        pq.push(Math.random() * 1000);
      }

      const elapsed = Date.now() - start;
      expect(elapsed).toBeLessThan(1000); // Should be fast
    });

    it("should maintain O(log n) performance for pop", () => {
      const pq = new PriorityQueue<number>();

      for (let i = 0; i < 100000; i++) {
        pq.push(Math.random() * 1000);
      }

      const start = Date.now();
      for (let i = 0; i < 10000; i++) {
        pq.pop();
      }
      const elapsed = Date.now() - start;

      expect(elapsed).toBeLessThan(500);
    });
  });
});
