import * as lodash from 'lodash';
import {Optional, None, Some} from "scalts";


declare global {

    /**
     * @see https://lodash.com/docs/4.16.4 for more documentation
     */
    interface Array<T> {

        /**
         * Creates an array of elements split into groups the length of size.
         * If array can't be split evenly, the final chunk will be the remaining elements.
         */
        chunk(size ?: number) : Array<Array<T>>;

        /**
         * Creates an array with all falsey values removed.
         * The values false, null, 0, "", undefined, and NaN are falsey.
         */
        compact() : Array<T>;

        /**
         * Creates a simple copy of the array.
         */
        copy() : Array<T>;

        /**
         * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
         * The order and references of result values are determined by the first array.
         */
        difference(...values : Array<any>) : Array<T>;

        /**
         * This method is like difference except that it accepts comparator which is invoked to compare elements of array to values.
         * The order and references of result values are determined by the first array.
         * The comparator is invoked with two arguments: (arrVal, othVal).
         */
        differenceBy(values : Array<Array<T>>, iteratee : ((value:T) => any)|string) : Array<T>;

        /**
         * This method is like difference except that it accepts comparator which is invoked to compare elements of array to values.
         * The order and references of result values are determined by the first array.
         * The comparator is invoked with two arguments: (arrVal, othVal).
         */
        differenceWith(values : Array<Array<T>>, comparator : (value1:T, value2:T) => boolean) : Array<T>;

        /**
         * Like lodash uniq.
         * Creates a duplicate-free version of an array, using SameValueZero for equality comparisons, in which only the first occurrence of each element is kept.
         * The order of result values is determined by the order they occur in the array.
         */
        distinct : Array< T >;

        /**
         * Creates a slice of array with n elements dropped from the beginning.
         */
        drop(n : number) : Array<T>;

        /**
         * Creates a slice of array with n elements dropped from the end.
         */
        dropRight(n : number) : Array<T>;

        /**
         * Creates a slice of array excluding elements dropped from the end.
         * Elements are dropped until predicate returns falsey.
         * The predicate is invoked with three arguments: (value, index, array).
         */
        dropRightWhile(predicate : (value : T, index : number, array : Array<T>) => boolean) : Array<T>;

        /**
         * Creates a slice of array excluding elements dropped from the beginning.
         * Elements are dropped until predicate returns falsey.
         * The predicate is invoked with three arguments: (value, index, array).
         */
        dropWhile(predicate : (value : T, index : number, array : Array<T>) => boolean) : Array<T>;

        /**
         * Returns true if at least one value match the given predicate.
         */
        exists(predicate : (value : T, index : number, array : Array<T>) => boolean) : boolean;

        /**
         * ES2015 find with Optional support
         */
        findOpt(predicate : (value : T, index : number, array : Array<T>) => boolean) : Optional<T>;

        /**
         * This method is like find except that it returns the index of the first element
         * predicate returns truthy for instead of the element itself.
         */
        findIndexOpt(predicate : (value : T) => boolean) : Optional<number>;

        /**
         * This method is like findIndexOpt except that it iterates over elements of collection from right to left.
         */
        findLastIndexOpt(predicate : (value : T) => boolean) : Optional<number>;

        /**
         * Returns the flatten array.
         */
        flatten<U>() : Array<U>;

        /**
         * Returns the flatten array.
         */
        flatMap<U, V>(predicate : (value : U) => Array<V>) : Array<V>;
        flatMap<U>(predicate : (value : T) => Array<U>) : Array<U>;
        flatMap<U>(predicate : (value : T) => U) : Array<U>;
        flatMap(predicate : (value : T) => Array<T>) : Array<T>;
        flatMap(predicate : (value : T) => T) : Array<T>;

        /**
         * Returns optionally the first element of the array or None if the array is empty.
         */
        head : Optional<T>;

        /**
         * ES2015 indexOf with Optional support
         */
        indexOfOpt(value: T, fromIndex ?: number) : Optional<number>;

        /**
         * Gets all but the last element of array.
         */
        initial : Array<T>;

        /**
         * Creates an array of unique values that are included in all given arrays using SameValueZero for equality comparisons.
         * The order and references of result values are determined by the first array.
         */
        intersection(...values: Array<Array<T>>) : Array<T>;

        /**
         * This method is like intersection except that it accepts iteratee which is invoked for each element of each arrays to
         * generate the criterion by which they're compared.
         * The order and references of result values are determined by the first array.
         */
        intersectionBy(values: Array<Array<T>>, iteratee : ((value : T) => any)|string) : Array<T>;

        /**
         * This method is like intersection except that it accepts comparator which is invoked to compare elements of arrays.
         * The order and references of result values are determined by the first array. The comparator is invoked with two arguments: (arrVal, othVal).
         */
        intersectionWith(values : Array<Array<T>>, comparator : (value1:T, value2:T) => boolean) : Array<T>;

        /**
         * Returns true if the array is empty.
         */
        isEmpty : boolean;

        /**
         * Returns optionally the last element of the array or None if the array is empty.
         */
        last : Optional<T>;

        /**
         * ES2015 lastIndexOf with Optional support.
         */
        lastIndexOfOpt(value: T, fromIndex ?: number) : Optional<number>;

        /**
         * Returns the array reversed.
         */
        reversed : Array<T>;

        /**
         * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee.
         * This method performs a stable sort, that is, it preserves the original sort order of equal elements.
         * The iteratees are invoked with one argument: (value).
         */
        sortBy(iteratee : ((value : T) => any)|string[]) : Array<T>;

        /**
         * Gets all but the first element of array.
         */
        tail : Array<T>;

        /**
         * Creates a slice of array with n elements taken from the beginning.
         */
        take(n ?: number) : Array<T>;

        /**
         * Creates a slice of array with n elements taken from the end.
         */
        takeRight(n ?: number) : Array<T>;

        /**
         * Creates a slice of array with elements taken from the end.
         * Elements are taken until predicate returns falsey.
         * The predicate is invoked with three arguments: (value, index, array)..
         */
        takeRightWhile(predicate : (value:T) => boolean) : Array<T>;

        /**
         * Creates a slice of array with elements taken from the beginning.
         * Elements are taken until predicate returns falsey.
         * The predicate is invoked with three arguments: (value, index, array).
         */
        takeWhile(predicate : (value:T) => boolean) : Array<T>;
    }
}


Array.prototype.chunk = function(size : number = 1) {
    return lodash.chunk(this, size);
};

Array.prototype.compact = function() {
    return lodash.compact(this);
};

Array.prototype.copy = function() {
    return [...this];
};

Array.prototype.difference = function(...values : Array<any>) {
    return lodash.difference(this, ...values);
};

Array.prototype.differenceBy = function(values : Array<Array<any>>, iteratee : ((value:any) => any)|string) {
    return lodash.differenceBy(this, ...values, iteratee);
};

Array.prototype.differenceWith = function(values : Array<Array<any>>, comparator : (value1:any, value2:any) => boolean) {
    return lodash.differenceWith(this, ...values, comparator);
};

Object.defineProperty(Array.prototype, 'distinct', {
    get: function () { return lodash.uniq(this) },
    enumerable: true,
    configurable: true
});

Array.prototype.drop = function(n : number) {
    return lodash.drop(this, n);
};

Array.prototype.dropRight = function(n : number) {
    return lodash.dropRight(this, n);
};

Array.prototype.dropRightWhile = function(predicate : (value : any, index : number, array : Array<any>) => boolean) {
    return lodash.dropRightWhile(this, predicate);
};

Array.prototype.dropWhile = function(predicate : (value : any, index : number, array : Array<any>) => boolean) {
    return lodash.dropWhile(this, predicate);
};

Array.prototype.exists = function(predicate : (value : any, index : number, array : Array<any>) => boolean) {
    return this.findOpt(predicate).nonEmpty;
};

Array.prototype.findOpt = function(predicate : (value : any, index : number, array : Array<any>) => boolean) {
    return Optional.apply(this.find(predicate));
};

Array.prototype.findIndexOpt = function(predicate : (value : any) => boolean) {
    const res : number = this.findIndex(predicate);
    return res === -1 ? None : Some(res);
};

Array.prototype.findLastIndexOpt = function(predicate : (value : any) => boolean) {
    const res : number = lodash.findLastIndex(this, predicate);
    return res === -1 ? None : Some(res);
};

Array.prototype.flatMap = function(predicate : (value : any) => any) {
    return this.map(predicate).flatten();
};

Array.prototype.flatten = function() {
    return lodash.flatten(this);
};

Object.defineProperty(Array.prototype, 'head', {
    get: function () { return this.isEmpty ? None : Some(this[0]); },
    enumerable: true,
    configurable: true
});

Array.prototype.indexOfOpt = function(value : any, fromIndex : number = 0) {
    const res = this.indexOf(value);
    return res < 0 ? None : Some(res);
};

Object.defineProperty(Array.prototype, 'initial', {
    get: function () {
        return this.filter((value : any, index : number) => (index + 1) !== this.length);
    },
    enumerable: true,
    configurable: true
});

Array.prototype.intersection = function(...values : Array<Array<any>>) {
    return lodash.intersection(this, ...values);
};

Array.prototype.intersectionBy = function(values : Array<Array<any>>, iteratee : ((value : any) => any)|string) {
    return lodash.intersectionBy(this, ...values, iteratee);
};

Array.prototype.intersectionWith = function(values : Array<Array<any>>, comparator : (value1:any, value2:any) => boolean) {
    return lodash.intersectionWith(this, ...values, comparator);
};

Object.defineProperty(Array.prototype, 'isEmpty', {
    get: function () { return this.length === 0; },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, 'last', {
    get: function () { return this.isEmpty ? None : Some(this[this.length - 1]); },
    enumerable: true,
    configurable: true
});

Array.prototype.lastIndexOfOpt = function(value : any, fromIndex ?: number) {
    const res = this.lastIndexOf(value, fromIndex || this.length - 1);
    return res === -1 ? None : Some(res);
};

Object.defineProperty(Array.prototype, 'reversed', {
    get: function () {
        return this.copy().reverse();
    },
    enumerable: true,
    configurable: true
});

Array.prototype.sortBy = function(iteratee : ((value : any) => any)|string[]) {
    return lodash.sortBy(this, iteratee);
};

Object.defineProperty(Array.prototype, 'tail', {
    get: function () {
        const [first, ...arr] = this;
        return arr;
    },
    enumerable: true,
    configurable: true
});

Array.prototype.take = function(n : number = 1) {
    return this.filter((value : any, index : number) => index < n);
};

Array.prototype.takeRight = function(n : number = 1) {
    return this.filter((value : any, index : number) => (this.length - 1 - index) < n);
};

Array.prototype.takeRightWhile = function(predicate : (value : any) => boolean) {
    let acc : any[] = [];
    for(let i = this.length - 1; i >= 0; i--) {
        if(predicate(this[i])) {
            acc.unshift(this[i]);
        } else {
            break;
        }
    }
    return acc;
};

Array.prototype.takeWhile = function(predicate : (value : any) => boolean) {
    let acc : any[] = [];
    for(let i = 0; i < this.length; i++) {
        if(predicate(this[i])) {
            acc.push(this[i]);
        } else {
            break;
        }
    }
    return acc;
};

export default Array;
