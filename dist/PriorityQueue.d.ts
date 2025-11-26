/**
 * Type for comparator function
 * Should return negative if a < b, positive if a > b, zero if equal
 */
export type Comparator<T> = (a: T, b: T) => number;
/**
 * Heap type configuration
 */
export type HeapType = "min" | "max";
/**
 * Options for PriorityQueue initialization
 */
export interface PriorityQueueOptions<T> {
    comparator?: Comparator<T>;
    type?: HeapType;
    initialValues?: T[];
}
/**
 * PriorityQueue implementation using binary heap
 * Supports both min-heap and max-heap configurations
 *
 * @template T The type of elements in the queue
 *
 * @example
 * // Min heap (default)
 * const minHeap = new PriorityQueue<number>();
 *
 * @example
 * // Max heap
 * const maxHeap = new PriorityQueue<number>({ type: 'max' });
 *
 * @example
 * // Custom comparator
 * const customHeap = new PriorityQueue<{priority: number, value: string}>({
 *   comparator: (a, b) => a.priority - b.priority
 * });
 */
export declare class PriorityQueue<T> {
    private heap;
    private compare;
    /**
     * Creates a new PriorityQueue
     *
     * @param options Configuration options
     * Time Complexity: O(n) if initialValues provided, O(1) otherwise
     */
    constructor(options?: PriorityQueueOptions<T>);
    /**
     * Gets the number of elements in the queue
     * Time Complexity: O(1)
     */
    get size(): number;
    /**
     * Checks if the queue is empty
     * Time Complexity: O(1)
     */
    isEmpty(): boolean;
    /**
     * Adds an element to the queue
     * Time Complexity: O(log n)
     *
     * @param value The value to add
     * @returns The size of the queue after insertion
     */
    push(value: T): number;
    /**
     * Alias for push() - adds element to queue
     * Time Complexity: O(log n)
     */
    enqueue(value: T): number;
    /**
     * Alias for push() - inserts element into heap
     * Time Complexity: O(log n)
     */
    insert(value: T): number;
    /**
     * Removes and returns the top element (min or max based on heap type)
     * Time Complexity: O(log n)
     *
     * @returns The top element, or undefined if empty
     */
    pop(): T | undefined;
    /**
     * Alias for pop() - removes and returns top element
     * Time Complexity: O(log n)
     */
    dequeue(): T | undefined;
    /**
     * Alias for pop() - extracts top element
     * Time Complexity: O(log n)
     */
    extract(): T | undefined;
    /**
     * Returns the top element without removing it
     * Time Complexity: O(1)
     *
     * @returns The top element, or undefined if empty
     */
    peek(): T | undefined;
    /**
     * Alias for peek() - returns top element without removing
     * Time Complexity: O(1)
     */
    top(): T | undefined;
    /**
     * Removes all elements from the queue
     * Time Complexity: O(1)
     */
    clear(): void;
    /**
     * Returns array representation of heap (not sorted)
     * Time Complexity: O(n)
     *
     * @returns Copy of internal heap array
     */
    toArray(): T[];
    /**
     * Returns sorted array of all elements (ascending for min-heap, descending for max-heap)
     * Time Complexity: O(n log n)
     *
     * @returns Sorted array of elements
     */
    toSortedArray(): T[];
    /**
     * Checks if a value exists in the queue
     * Time Complexity: O(n)
     *
     * @param value The value to search for
     * @returns True if value exists, false otherwise
     */
    contains(value: T): boolean;
    /**
     * Removes a specific value from the queue (first occurrence)
     * Time Complexity: O(n)
     *
     * @param value The value to remove
     * @returns True if value was found and removed, false otherwise
     */
    remove(value: T): boolean;
    /**
     * Replaces the top element with a new value
     * More efficient than pop() + push() when replacing the top
     * Time Complexity: O(log n)
     *
     * @param value The new value
     * @returns The old top value, or undefined if empty
     */
    replace(value: T): T | undefined;
    /**
     * Pushes a value and then pops, optimized
     * Time Complexity: O(log n)
     *
     * @param value The value to push
     * @returns The smallest/largest value between pushed value and current top
     */
    pushPop(value: T): T;
    /**
     * Creates iterator for the queue
     * Iterates in heap order (not sorted order)
     * Time Complexity: O(1) per iteration
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Merges another PriorityQueue into this one
     * Time Complexity: O(n + m) where m is size of other queue
     *
     * @param other The other PriorityQueue to merge
     */
    merge(other: PriorityQueue<T>): void;
    /**
     * Builds heap from current array (heapify)
     * Time Complexity: O(n)
     */
    private heapify;
    /**
     * Bubbles element up to maintain heap property
     * Time Complexity: O(log n)
     */
    private bubbleUp;
    /**
     * Bubbles element down to maintain heap property
     * Time Complexity: O(log n)
     */
    private bubbleDown;
    /**
     * Swaps two elements in the heap
     * Time Complexity: O(1)
     */
    private swap;
    /**
     * Gets parent index
     * Time Complexity: O(1)
     */
    private getParentIndex;
    /**
     * Gets left child index
     * Time Complexity: O(1)
     */
    private getLeftChildIndex;
    /**
     * Gets right child index
     * Time Complexity: O(1)
     */
    private getRightChildIndex;
}
export default PriorityQueue;
