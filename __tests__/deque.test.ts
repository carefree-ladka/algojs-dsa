import { Deque } from "../src";
describe("Deque", () => {
  describe("Constructor", () => {
    it("should create an empty deque with default capacity", () => {
      const deque = new Deque<number>();
      expect(deque.size).toBe(0);
      expect(deque.isEmpty()).toBe(true);
    });

    it("should create an empty deque with custom capacity", () => {
      const deque = new Deque<number>(32);
      expect(deque.size).toBe(0);
      expect(deque.isEmpty()).toBe(true);
    });

    it("should throw error for invalid capacity", () => {
      expect(() => new Deque<number>(0)).toThrow(
        "Initial capacity must be at least 1"
      );
      expect(() => new Deque<number>(-5)).toThrow(
        "Initial capacity must be at least 1"
      );
    });

    it("should use minimum capacity of 16", () => {
      const deque = new Deque<number>(5);
      // Should work fine with at least 16 capacity
      for (let i = 0; i < 20; i++) {
        deque.push(i);
      }
      expect(deque.size).toBe(20);
    });

    it("should create deque with initial elements", () => {
      const deque = new Deque<number>([1, 2, 3]);
      expect(deque.size).toBe(3);
      expect(deque.toArray()).toEqual([1, 2, 3]);
    });

    it("should create empty deque with empty array", () => {
      const deque = new Deque<number>([]);
      expect(deque.size).toBe(0);
      expect(deque.isEmpty()).toBe(true);
    });

    it("should work with different types in constructor", () => {
      const stringDeque = new Deque<string>(["hello", "world"]);
      expect(stringDeque.toArray()).toEqual(["hello", "world"]);

      const objectDeque = new Deque<{id: number}>([{id: 1}, {id: 2}]);
      expect(objectDeque.size).toBe(2);
    });
  });

  describe("Basic Operations", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should check if deque is empty", () => {
      expect(deque.isEmpty()).toBe(true);
      deque.push(1);
      expect(deque.isEmpty()).toBe(false);
    });

    it("should return correct size", () => {
      expect(deque.size).toBe(0);
      deque.push(1);
      expect(deque.size).toBe(1);
      deque.push(2);
      expect(deque.size).toBe(2);
      deque.pop();
      expect(deque.size).toBe(1);
    });

    it("should clear the deque", () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);
      deque.clear();
      expect(deque.size).toBe(0);
      expect(deque.isEmpty()).toBe(true);
      expect(deque.pop()).toBeUndefined();
    });
  });

  describe("Front Operations (pushFront/popFront)", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should push elements to front", () => {
      deque.pushFront(1);
      deque.pushFront(2);
      deque.pushFront(3);
      expect(deque.toArray()).toEqual([3, 2, 1]);
    });

    it("should pop elements from front", () => {
      deque.pushFront(1);
      deque.pushFront(2);
      deque.pushFront(3);
      expect(deque.popFront()).toBe(3);
      expect(deque.popFront()).toBe(2);
      expect(deque.popFront()).toBe(1);
      expect(deque.popFront()).toBeUndefined();
    });

    it("should return undefined when popping from empty deque", () => {
      expect(deque.popFront()).toBeUndefined();
    });

    it("should peek front element", () => {
      deque.pushFront(1);
      deque.pushFront(2);
      expect(deque.peekFront()).toBe(2);
      expect(deque.size).toBe(2); // Size should not change
    });

    it("should return undefined when peeking empty deque", () => {
      expect(deque.peekFront()).toBeUndefined();
    });
  });

  describe("Back Operations (pushBack/popBack)", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should push elements to back", () => {
      deque.pushBack(1);
      deque.pushBack(2);
      deque.pushBack(3);
      expect(deque.toArray()).toEqual([1, 2, 3]);
    });

    it("should pop elements from back", () => {
      deque.pushBack(1);
      deque.pushBack(2);
      deque.pushBack(3);
      expect(deque.popBack()).toBe(3);
      expect(deque.popBack()).toBe(2);
      expect(deque.popBack()).toBe(1);
      expect(deque.popBack()).toBeUndefined();
    });

    it("should peek back element", () => {
      deque.pushBack(1);
      deque.pushBack(2);
      expect(deque.peekBack()).toBe(2);
      expect(deque.size).toBe(2); // Size should not change
    });

    it("should return undefined when peeking empty deque", () => {
      expect(deque.peekBack()).toBeUndefined();
    });
  });

  describe("Mixed Operations", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should handle mixed push operations", () => {
      deque.pushFront(1); // [1]
      deque.pushBack(2); // [1, 2]
      deque.pushFront(0); // [0, 1, 2]
      deque.pushBack(3); // [0, 1, 2, 3]
      expect(deque.toArray()).toEqual([0, 1, 2, 3]);
    });

    it("should handle mixed pop operations", () => {
      deque.pushBack(1);
      deque.pushBack(2);
      deque.pushBack(3);
      deque.pushBack(4);

      expect(deque.popFront()).toBe(1);
      expect(deque.popBack()).toBe(4);
      expect(deque.popFront()).toBe(2);
      expect(deque.popBack()).toBe(3);
      expect(deque.isEmpty()).toBe(true);
    });

    it("should handle alternating operations", () => {
      for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          deque.pushFront(i);
        } else {
          deque.pushBack(i);
        }
      }
      expect(deque.size).toBe(100);
    });
  });

  describe("Stack Operations", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should work as a stack (LIFO)", () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);

      expect(deque.pop()).toBe(3);
      expect(deque.pop()).toBe(2);
      expect(deque.pop()).toBe(1);
      expect(deque.pop()).toBeUndefined();
    });

    it("should support stack peek/top operations", () => {
      deque.push(1);
      deque.push(2);

      expect(deque.peek()).toBe(2);
      expect(deque.top()).toBe(2);
      expect(deque.size).toBe(2);
    });
  });

  describe("Queue Operations", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should work as a queue (FIFO)", () => {
      deque.enqueue(1);
      deque.enqueue(2);
      deque.enqueue(3);

      expect(deque.dequeue()).toBe(1);
      expect(deque.dequeue()).toBe(2);
      expect(deque.dequeue()).toBe(3);
      expect(deque.dequeue()).toBeUndefined();
    });

    it("should support queue front/back operations", () => {
      deque.enqueue(1);
      deque.enqueue(2);

      expect(deque.front()).toBe(1);
      expect(deque.back()).toBe(2);
      expect(deque.size).toBe(2);
    });
  });

  describe("Array-like Operations", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should support unshift operation", () => {
      deque.unshift(1);
      deque.unshift(2);
      deque.unshift(3);
      expect(deque.toArray()).toEqual([3, 2, 1]);
    });

    it("should support shift operation", () => {
      deque.pushBack(1);
      deque.pushBack(2);
      deque.pushBack(3);

      expect(deque.shift()).toBe(1);
      expect(deque.shift()).toBe(2);
      expect(deque.shift()).toBe(3);
    });

    it("should support at() for index access", () => {
      deque.push(10);
      deque.push(20);
      deque.push(30);

      expect(deque.at(0)).toBe(10);
      expect(deque.at(1)).toBe(20);
      expect(deque.at(2)).toBe(30);
      expect(deque.at(3)).toBeUndefined();
      expect(deque.at(-1)).toBeUndefined();
    });
  });

  describe("Dynamic Growth", () => {
    it("should grow capacity when full", () => {
      const deque = new Deque<number>(4);

      // Fill initial capacity
      for (let i = 0; i < 10; i++) {
        deque.push(i);
      }

      expect(deque.size).toBe(10);
      expect(deque.toArray()).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it("should handle growth with mixed operations", () => {
      const deque = new Deque<number>(4);

      for (let i = 0; i < 5; i++) {
        deque.pushFront(i);
      }
      for (let i = 0; i < 5; i++) {
        deque.pushBack(i);
      }

      expect(deque.size).toBe(10);
    });

    it("should maintain order after multiple growths", () => {
      const deque = new Deque<number>(2);

      for (let i = 0; i < 100; i++) {
        deque.push(i);
      }

      const arr = deque.toArray();
      for (let i = 0; i < 100; i++) {
        expect(arr[i]).toBe(i);
      }
    });
  });

  describe("Edge Cases", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should handle single element", () => {
      deque.push(42);
      expect(deque.peekFront()).toBe(42);
      expect(deque.peekBack()).toBe(42);
      expect(deque.pop()).toBe(42);
      expect(deque.isEmpty()).toBe(true);
    });

    it("should handle push and immediate pop", () => {
      deque.push(1);
      expect(deque.pop()).toBe(1);
      deque.pushFront(2);
      expect(deque.popFront()).toBe(2);
    });

    it("should handle circular buffer wrapping", () => {
      const deque = new Deque<number>(4);

      // Fill and empty multiple times to test wrapping
      for (let i = 0; i < 3; i++) {
        deque.push(1);
        deque.push(2);
        deque.pop();
        deque.pop();
      }

      deque.push(1);
      deque.push(2);
      expect(deque.toArray()).toEqual([1, 2]);
    });

    it("should handle operations after clear", () => {
      deque.push(1);
      deque.push(2);
      deque.clear();
      deque.push(3);
      expect(deque.pop()).toBe(3);
    });
  });

  describe("Iterator", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should iterate over elements", () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);

      const result: number[] = [];
      for (const value of deque) {
        result.push(value);
      }

      expect(result).toEqual([1, 2, 3]);
    });

    it("should work with spread operator", () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);

      expect([...deque]).toEqual([1, 2, 3]);
    });

    it("should iterate over empty deque", () => {
      const result: number[] = [];
      for (const value of deque) {
        result.push(value);
      }
      expect(result).toEqual([]);
    });
  });

  describe("Utility Methods", () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it("should convert to array", () => {
      deque.push(1);
      deque.push(2);
      deque.push(3);
      expect(deque.toArray()).toEqual([1, 2, 3]);
    });

    it("should convert empty deque to array", () => {
      expect(deque.toArray()).toEqual([]);
    });

    it("should create string representation", () => {
      deque.push(1);
      deque.push(2);
      expect(deque.toString()).toBe("Deque[1, 2]");
    });

    it("should clone deque", () => {
      deque.push(1);
      deque.push(2);

      const clone = deque.clone();

      expect(clone.toArray()).toEqual([1, 2]);
      expect(clone.size).toBe(2);

      // Modify original
      deque.push(3);

      // Clone should be unaffected
      expect(clone.toArray()).toEqual([1, 2]);
      expect(deque.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe("Type Safety", () => {
    it("should work with different types", () => {
      const stringDeque = new Deque<string>();
      stringDeque.push("hello");
      stringDeque.push("world");
      expect(stringDeque.pop()).toBe("world");

      const objectDeque = new Deque<{ id: number }>();
      objectDeque.push({ id: 1 });
      objectDeque.push({ id: 2 });
      expect(objectDeque.pop()).toEqual({ id: 2 });
    });
  });

  describe("Performance Stress Test", () => {
    it("should handle large number of operations", () => {
      const deque = new Deque<number>();
      const n = 10000;

      // Push operations
      for (let i = 0; i < n; i++) {
        if (i % 2 === 0) {
          deque.pushFront(i);
        } else {
          deque.pushBack(i);
        }
      }

      expect(deque.size).toBe(n);

      // Pop operations
      while (!deque.isEmpty()) {
        if (deque.size % 2 === 0) {
          deque.popFront();
        } else {
          deque.popBack();
        }
      }

      expect(deque.size).toBe(0);
      expect(deque.isEmpty()).toBe(true);
    });
  });
});
