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
         * Creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons.
         * The order and references of result values are determined by the first array.
         */
        difference(...values : Array<any>) : Array<T>;

        /**
         * This method is like difference except that it accepts comparator which is invoked to compare elements of array to values.
         * The order and references of result values are determined by the first array.
         * The comparator is invoked with two arguments: (arrVal, othVal).
         */
        differenceBy(...values : Array<T>) : Array<T>;
        differenceBy(value : Array<T>, iteratee : (value:T) => any|string) : Array<T>;
        differenceBy(value1 : Array<T>, value2 : Array<T>, iteratee : (value:T) => any|string) : Array<T>;
        differenceBy(value1 : Array<T>, value2 : Array<T>, value3 : Array<T>, iteratee : (value:T) => any|string) : Array<T>;
        differenceBy(value1 : Array<T>, value2 : Array<T>, value3 : Array<T>, value4 : Array<T>, iteratee : (value:T) => any|string) : Array<T>;

        /**
         * This method is like difference except that it accepts comparator which is invoked to compare elements of array to values.
         * The order and references of result values are determined by the first array.
         * The comparator is invoked with two arguments: (arrVal, othVal).
         */
        differenceWith(...values : Array<T>) : Array<T>;
        differenceWith(value : Array<T>, comparator : (value1:T, value2:T) => boolean) : Array<T>;
        differenceWith(value1 : Array<T>, value2 : Array<T>, comparator : (value1:T, value2:T) => boolean) : Array<T>;
        differenceWith(value1 : Array<T>, value2 : Array<T>, value3 : Array<T>, comparator : (value1:T, value2:T) => boolean) : Array<T>;
        differenceWith(value1 : Array<T>, value2 : Array<T>, value3 : Array<T>, value4 : Array<T>, comparator : (value1:T, value2:T) => boolean) : Array<T>;

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
        // TODO : We should be able to deduce the new type or at least pass the type we want
        flatten : Array<any>;

        /**
         * Same as flatten, but recursively.
         */
        // TODO : We should be able to pass the type we want
        flattenDeep : Array<any>;

        /**
         * Same as flatten, but recursively up to depth times.
         */
        flattenDepth<U>(depth ?: number) : Array<U>;

        /**
         * Returns optionally the first element of the array or None if there is no element in the array.
         */
        head : Optional<T>;
    }
}


Array.prototype.chunk = function(size : number = 1) {
    return lodash.chunk(this, size);
};

Array.prototype.compact = function() {
    return lodash.compact(this);
};

Array.prototype.difference = function(...values : Array<any>) {
    return lodash.difference(this, ...values);
};

Array.prototype.differenceBy = function(...values : Array<any>) {
    return lodash.differenceBy(this, ...values);
};

Array.prototype.differenceWith = function(...values : Array<any>) {
    return lodash.differenceWith(this, ...values);
};

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

Object.defineProperty(Array.prototype, 'flatten', {
    get: function () { return lodash.flatten(this); },
    enumerable: true,
    configurable: true
});

Object.defineProperty(Array.prototype, 'flattenDeep', {
    get: function () { return lodash.flattenDeep(this); },
    enumerable: true,
    configurable: true
});

Array.prototype.flattenDepth = function(depth : number = 1) {
    return lodash.flattenDepth(this, depth);
};

Object.defineProperty(Array.prototype, 'head', {
    get: function () { return this.length === 0 ? None : Some(this[0]); },
    enumerable: true,
    configurable: true
});



export default {};
