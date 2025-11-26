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
declare class Deque<T> {
    private buffer;
    private head;
    private tail;
    private capacity;
    private count;
    /**
     * Creates a new Deque instance.
     *
     * @param initialCapacityOrElements - Initial capacity or array of elements
     * @throws {Error} If initialCapacity is less than 1
     *
     * @timeComplexity O(n) if elements provided, O(1) otherwise
     * @spaceComplexity O(capacity)
     */
    constructor(initialCapacityOrElements?: number | T[]);
    /**
     * Returns the number of elements in the deque.
     *
     * @returns The number of elements
     * @timeComplexity O(1)
     */
    get size(): number;
    /**
     * Checks if the deque is empty.
     *
     * @returns True if empty, false otherwise
     * @timeComplexity O(1)
     */
    isEmpty(): boolean;
    /**
     * Removes all elements from the deque.
     *
     * @timeComplexity O(1)
     */
    clear(): void;
    /**
     * Doubles the internal buffer capacity when full.
     *
     * @private
     * @timeComplexity O(n) - amortized O(1) per operation
     */
    private grow;
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
    pushFront(value: T): void;
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
    pushBack(value: T): void;
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
    popFront(): T | undefined;
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
    popBack(): T | undefined;
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
    peekFront(): T | undefined;
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
    peekBack(): T | undefined;
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
    at(index: number): T | undefined;
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
    toArray(): T[];
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
    [Symbol.iterator](): Iterator<T>;
    /**
     * Stack operation: Push element to the back.
     * @see pushBack
     */
    push(value: T): void;
    /**
     * Stack operation: Pop element from the back.
     * @see popBack
     */
    pop(): T | undefined;
    /**
     * Stack operation: Peek at the back element.
     * @see peekBack
     */
    peek(): T | undefined;
    /**
     * Stack operation: Alias for peek.
     * @see peekBack
     */
    top(): T | undefined;
    /**
     * Queue operation: Add element to the back.
     * @see pushBack
     */
    enqueue(value: T): void;
    /**
     * Queue operation: Remove element from the front.
     * @see popFront
     */
    dequeue(): T | undefined;
    /**
     * Queue operation: Peek at the front element.
     * @see peekFront
     */
    front(): T | undefined;
    /**
     * Queue operation: Peek at the back element.
     * @see peekBack
     */
    back(): T | undefined;
    /**
     * Array operation: Add element to the front.
     * @see pushFront
     */
    unshift(value: T): void;
    /**
     * Array operation: Remove element from the front.
     * @see popFront
     */
    shift(): T | undefined;
    /**
     * Returns a string representation of the deque.
     *
     * @returns String representation
     * @timeComplexity O(n)
     */
    toString(): string;
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
    clone(): Deque<T>;
}
export { Deque };
export default Deque;
