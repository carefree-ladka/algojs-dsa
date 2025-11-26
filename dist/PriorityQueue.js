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
export class PriorityQueue {
    /**
     * Creates a new PriorityQueue
     *
     * @param options Configuration options
     * Time Complexity: O(n) if initialValues provided, O(1) otherwise
     */
    constructor(options = {}) {
        this.heap = [];
        const { comparator, type = "min", initialValues } = options;
        if (comparator) {
            this.compare = comparator;
        }
        else {
            // Default comparator based on heap type
            this.compare =
                type === "min"
                    ? (a, b) => a - b
                    : (a, b) => b - a;
        }
        if (initialValues && initialValues.length > 0) {
            this.heap = [...initialValues];
            this.heapify();
        }
    }
    /**
     * Gets the number of elements in the queue
     * Time Complexity: O(1)
     */
    get size() {
        return this.heap.length;
    }
    /**
     * Checks if the queue is empty
     * Time Complexity: O(1)
     */
    isEmpty() {
        return this.heap.length === 0;
    }
    /**
     * Adds an element to the queue
     * Time Complexity: O(log n)
     *
     * @param value The value to add
     * @returns The size of the queue after insertion
     */
    push(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
        return this.heap.length;
    }
    /**
     * Alias for push() - adds element to queue
     * Time Complexity: O(log n)
     */
    enqueue(value) {
        return this.push(value);
    }
    /**
     * Alias for push() - inserts element into heap
     * Time Complexity: O(log n)
     */
    insert(value) {
        return this.push(value);
    }
    /**
     * Removes and returns the top element (min or max based on heap type)
     * Time Complexity: O(log n)
     *
     * @returns The top element, or undefined if empty
     */
    pop() {
        if (this.isEmpty())
            return undefined;
        if (this.heap.length === 1)
            return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return top;
    }
    /**
     * Alias for pop() - removes and returns top element
     * Time Complexity: O(log n)
     */
    dequeue() {
        return this.pop();
    }
    /**
     * Alias for pop() - extracts top element
     * Time Complexity: O(log n)
     */
    extract() {
        return this.pop();
    }
    /**
     * Returns the top element without removing it
     * Time Complexity: O(1)
     *
     * @returns The top element, or undefined if empty
     */
    peek() {
        return this.heap[0];
    }
    /**
     * Alias for peek() - returns top element without removing
     * Time Complexity: O(1)
     */
    top() {
        return this.peek();
    }
    /**
     * Removes all elements from the queue
     * Time Complexity: O(1)
     */
    clear() {
        this.heap = [];
    }
    /**
     * Returns array representation of heap (not sorted)
     * Time Complexity: O(n)
     *
     * @returns Copy of internal heap array
     */
    toArray() {
        return [...this.heap];
    }
    /**
     * Returns sorted array of all elements (ascending for min-heap, descending for max-heap)
     * Time Complexity: O(n log n)
     *
     * @returns Sorted array of elements
     */
    toSortedArray() {
        const sorted = [];
        const tempHeap = [...this.heap];
        while (this.heap.length > 0) {
            sorted.push(this.pop());
        }
        this.heap = tempHeap;
        return sorted;
    }
    /**
     * Checks if a value exists in the queue
     * Time Complexity: O(n)
     *
     * @param value The value to search for
     * @returns True if value exists, false otherwise
     */
    contains(value) {
        return this.heap.includes(value);
    }
    /**
     * Removes a specific value from the queue (first occurrence)
     * Time Complexity: O(n)
     *
     * @param value The value to remove
     * @returns True if value was found and removed, false otherwise
     */
    remove(value) {
        const index = this.heap.indexOf(value);
        if (index === -1)
            return false;
        if (index === this.heap.length - 1) {
            this.heap.pop();
            return true;
        }
        this.heap[index] = this.heap.pop();
        // Try bubble down first, then bubble up if needed
        const parentIdx = this.getParentIndex(index);
        if (parentIdx >= 0 &&
            this.compare(this.heap[index], this.heap[parentIdx]) < 0) {
            this.bubbleUp(index);
        }
        else {
            this.bubbleDown(index);
        }
        return true;
    }
    /**
     * Replaces the top element with a new value
     * More efficient than pop() + push() when replacing the top
     * Time Complexity: O(log n)
     *
     * @param value The new value
     * @returns The old top value, or undefined if empty
     */
    replace(value) {
        if (this.isEmpty()) {
            this.push(value);
            return undefined;
        }
        const top = this.heap[0];
        this.heap[0] = value;
        this.bubbleDown(0);
        return top;
    }
    /**
     * Pushes a value and then pops, optimized
     * Time Complexity: O(log n)
     *
     * @param value The value to push
     * @returns The smallest/largest value between pushed value and current top
     */
    pushPop(value) {
        if (this.isEmpty() || this.compare(value, this.heap[0]) < 0) {
            return value;
        }
        return this.replace(value);
    }
    /**
     * Creates iterator for the queue
     * Iterates in heap order (not sorted order)
     * Time Complexity: O(1) per iteration
     */
    *[Symbol.iterator]() {
        for (const item of this.heap) {
            yield item;
        }
    }
    /**
     * Merges another PriorityQueue into this one
     * Time Complexity: O(n + m) where m is size of other queue
     *
     * @param other The other PriorityQueue to merge
     */
    merge(other) {
        for (const value of other) {
            this.heap.push(value);
        }
        this.heapify();
    }
    /**
     * Builds heap from current array (heapify)
     * Time Complexity: O(n)
     */
    heapify() {
        for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
            this.bubbleDown(i);
        }
    }
    /**
     * Bubbles element up to maintain heap property
     * Time Complexity: O(log n)
     */
    bubbleUp(index) {
        while (index > 0) {
            const parentIdx = this.getParentIndex(index);
            if (this.compare(this.heap[index], this.heap[parentIdx]) < 0) {
                this.swap(index, parentIdx);
                index = parentIdx;
            }
            else {
                break;
            }
        }
    }
    /**
     * Bubbles element down to maintain heap property
     * Time Complexity: O(log n)
     */
    bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            const leftIdx = this.getLeftChildIndex(index);
            const rightIdx = this.getRightChildIndex(index);
            let targetIdx = index;
            if (leftIdx < length &&
                this.compare(this.heap[leftIdx], this.heap[targetIdx]) < 0) {
                targetIdx = leftIdx;
            }
            if (rightIdx < length &&
                this.compare(this.heap[rightIdx], this.heap[targetIdx]) < 0) {
                targetIdx = rightIdx;
            }
            if (targetIdx === index)
                break;
            this.swap(index, targetIdx);
            index = targetIdx;
        }
    }
    /**
     * Swaps two elements in the heap
     * Time Complexity: O(1)
     */
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    /**
     * Gets parent index
     * Time Complexity: O(1)
     */
    getParentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    /**
     * Gets left child index
     * Time Complexity: O(1)
     */
    getLeftChildIndex(index) {
        return 2 * index + 1;
    }
    /**
     * Gets right child index
     * Time Complexity: O(1)
     */
    getRightChildIndex(index) {
        return 2 * index + 2;
    }
}
// Export default for convenience
export default PriorityQueue;
