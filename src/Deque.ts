/**
 * A high-performance Deque (Double-Ended Queue) implementation.
 * Supports Stack, Queue, and Deque operations with O(1) time complexity.
 *
 * @template T The type of elements in the deque
 *
 * @example
 * ```typescript
 * const deque = new Deque<number>();
 *
 * // Use as Stack
 * deque.push(1);
 * deque.push(2);
 * deque.pop(); // 2
 *
 * // Use as Queue
 * deque.enqueue(1);
 * deque.enqueue(2);
 * deque.dequeue(); // 1
 *
 * // Use as Deque
 * deque.pushFront(1);
 * deque.pushBack(2);
 * deque.popFront(); // 1
 * deque.popBack(); // 2
 * ```
 */
class Deque<T> {
  private buffer: (T | undefined)[];
  private head: number;
  private tail: number;
  private capacity: number;
  private count: number;

  /**
   * Creates a new Deque instance.
   *
   * @param initialCapacityOrElements - Initial capacity or array of elements
   * @throws {Error} If initialCapacity is less than 1
   *
   * @timeComplexity O(n) if elements provided, O(1) otherwise
   * @spaceComplexity O(capacity)
   */
  constructor(initialCapacityOrElements?: number | T[]) {
    if (Array.isArray(initialCapacityOrElements)) {
      // Initialize with elements
      const elements = initialCapacityOrElements;
      this.capacity = Math.max(16, elements.length * 2);
      this.buffer = new Array(this.capacity);
      this.head = 0;
      this.tail = elements.length;
      this.count = elements.length;
      
      for (let i = 0; i < elements.length; i++) {
        this.buffer[i] = elements[i];
      }
    } else {
      // Initialize with capacity
      const initialCapacity = initialCapacityOrElements ?? 16;
      if (initialCapacity < 1) {
        throw new Error("Initial capacity must be at least 1");
      }

      this.capacity = Math.max(initialCapacity, 16);
      this.buffer = new Array(this.capacity);
      this.head = 0;
      this.tail = 0;
      this.count = 0;
    }
  }

  /**
   * Returns the number of elements in the deque.
   *
   * @returns The number of elements
   * @timeComplexity O(1)
   */
  get size(): number {
    return this.count;
  }

  /**
   * Checks if the deque is empty.
   *
   * @returns True if empty, false otherwise
   * @timeComplexity O(1)
   */
  isEmpty(): boolean {
    return this.count === 0;
  }

  /**
   * Removes all elements from the deque.
   *
   * @timeComplexity O(1)
   */
  clear(): void {
    this.buffer = new Array(16);
    this.head = 0;
    this.tail = 0;
    this.count = 0;
    this.capacity = 16;
  }

  /**
   * Doubles the internal buffer capacity when full.
   *
   * @private
   * @timeComplexity O(n) - amortized O(1) per operation
   */
  private grow(): void {
    const newCapacity = this.capacity * 2;
    const newBuffer = new Array(newCapacity);

    // Copy elements to new buffer starting at index 0
    for (let i = 0; i < this.count; i++) {
      newBuffer[i] = this.buffer[(this.head + i) % this.capacity];
    }

    this.buffer = newBuffer;
    this.head = 0;
    this.tail = this.count;
    this.capacity = newCapacity;
  }

  /**
   * Adds an element to the front of the deque.
   * Alias: pushFront, unshift
   *
   * @param value - The value to add
   * @timeComplexity O(1) amortized
   * @spaceComplexity O(1) amortized
   *
   * @example
   * ```typescript
   * deque.pushFront(1); // [1]
   * deque.pushFront(2); // [2, 1]
   * ```
   */
  pushFront(value: T): void {
    if (this.count === this.capacity) {
      this.grow();
    }

    this.head = (this.head - 1 + this.capacity) % this.capacity;
    this.buffer[this.head] = value;
    this.count++;
  }

  /**
   * Adds an element to the back of the deque.
   * Alias: pushBack, push, enqueue
   *
   * @param value - The value to add
   * @timeComplexity O(1) amortized
   * @spaceComplexity O(1) amortized
   *
   * @example
   * ```typescript
   * deque.pushBack(1); // [1]
   * deque.pushBack(2); // [1, 2]
   * ```
   */
  pushBack(value: T): void {
    if (this.count === this.capacity) {
      this.grow();
    }

    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.count++;
  }

  /**
   * Removes and returns the element at the front of the deque.
   * Alias: popFront, shift, dequeue
   *
   * @returns The front element, or undefined if empty
   * @timeComplexity O(1)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.pushBack(2);
   * deque.popFront(); // 1
   * ```
   */
  popFront(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }

    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined; // Help GC
    this.head = (this.head + 1) % this.capacity;
    this.count--;

    return value;
  }

  /**
   * Removes and returns the element at the back of the deque.
   * Alias: popBack, pop
   *
   * @returns The back element, or undefined if empty
   * @timeComplexity O(1)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.pushBack(2);
   * deque.popBack(); // 2
   * ```
   */
  popBack(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }

    this.tail = (this.tail - 1 + this.capacity) % this.capacity;
    const value = this.buffer[this.tail];
    this.buffer[this.tail] = undefined; // Help GC
    this.count--;

    return value;
  }

  /**
   * Returns the front element without removing it.
   * Alias: peekFront, front
   *
   * @returns The front element, or undefined if empty
   * @timeComplexity O(1)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.peekFront(); // 1
   * deque.size; // 1 (not removed)
   * ```
   */
  peekFront(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }
    return this.buffer[this.head];
  }

  /**
   * Returns the back element without removing it.
   * Alias: peekBack, back
   *
   * @returns The back element, or undefined if empty
   * @timeComplexity O(1)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.pushBack(2);
   * deque.peekBack(); // 2
   * ```
   */
  peekBack(): T | undefined {
    if (this.count === 0) {
      return undefined;
    }
    const backIndex = (this.tail - 1 + this.capacity) % this.capacity;
    return this.buffer[backIndex];
  }

  /**
   * Returns the element at the specified index.
   * Index 0 is the front, index size-1 is the back.
   *
   * @param index - The index to access
   * @returns The element at the index, or undefined if out of bounds
   * @timeComplexity O(1)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.pushBack(2);
   * deque.pushBack(3);
   * deque.at(1); // 2
   * ```
   */
  at(index: number): T | undefined {
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    const actualIndex = (this.head + index) % this.capacity;
    return this.buffer[actualIndex];
  }

  /**
   * Converts the deque to an array (front to back order).
   *
   * @returns Array representation of the deque
   * @timeComplexity O(n)
   * @spaceComplexity O(n)
   *
   * @example
   * ```typescript
   * deque.pushBack(1);
   * deque.pushBack(2);
   * deque.toArray(); // [1, 2]
   * ```
   */
  toArray(): T[] {
    const result: T[] = [];
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      result.push(this.buffer[index]!);
    }
    return result;
  }

  /**
   * Creates an iterator for the deque (front to back).
   *
   * @returns Iterator for the deque
   * @timeComplexity O(1) per iteration, O(n) total
   *
   * @example
   * ```typescript
   * for (const value of deque) {
   *   console.log(value);
   * }
   * ```
   */
  *[Symbol.iterator](): Iterator<T> {
    for (let i = 0; i < this.count; i++) {
      const index = (this.head + i) % this.capacity;
      yield this.buffer[index]!;
    }
  }

  // ============ Stack Aliases ============

  /**
   * Stack operation: Push element to the back.
   * @see pushBack
   */
  push(value: T): void {
    this.pushBack(value);
  }

  /**
   * Stack operation: Pop element from the back.
   * @see popBack
   */
  pop(): T | undefined {
    return this.popBack();
  }

  /**
   * Stack operation: Peek at the back element.
   * @see peekBack
   */
  peek(): T | undefined {
    return this.peekBack();
  }

  /**
   * Stack operation: Alias for peek.
   * @see peekBack
   */
  top(): T | undefined {
    return this.peekBack();
  }

  // ============ Queue Aliases ============

  /**
   * Queue operation: Add element to the back.
   * @see pushBack
   */
  enqueue(value: T): void {
    this.pushBack(value);
  }

  /**
   * Queue operation: Remove element from the front.
   * @see popFront
   */
  dequeue(): T | undefined {
    return this.popFront();
  }

  /**
   * Queue operation: Peek at the front element.
   * @see peekFront
   */
  front(): T | undefined {
    return this.peekFront();
  }

  /**
   * Queue operation: Peek at the back element.
   * @see peekBack
   */
  back(): T | undefined {
    return this.peekBack();
  }

  // ============ Array-like Aliases ============

  /**
   * Array operation: Add element to the front.
   * @see pushFront
   */
  unshift(value: T): void {
    this.pushFront(value);
  }

  /**
   * Array operation: Remove element from the front.
   * @see popFront
   */
  shift(): T | undefined {
    return this.popFront();
  }

  /**
   * Returns a string representation of the deque.
   *
   * @returns String representation
   * @timeComplexity O(n)
   */
  toString(): string {
    return `Deque[${this.toArray().join(", ")}]`;
  }

  /**
   * Creates a shallow copy of the deque.
   *
   * @returns A new deque with the same elements
   * @timeComplexity O(n)
   * @spaceComplexity O(n)
   *
   * @example
   * ```typescript
   * const deque1 = new Deque<number>();
   * deque1.push(1);
   * const deque2 = deque1.clone();
   * ```
   */
  clone(): Deque<T> {
    const newDeque = new Deque<T>(this.capacity);
    newDeque.buffer = [...this.buffer];
    newDeque.head = this.head;
    newDeque.tail = this.tail;
    newDeque.count = this.count;
    newDeque.capacity = this.capacity;
    return newDeque;
  }
}

export { Deque };
export default Deque;
