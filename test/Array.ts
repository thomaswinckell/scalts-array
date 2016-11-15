import * as assert from 'power-assert';
import * as lodash from 'lodash';

import '../src/Array';


describe('scalts-array', () => {

    function testLodashMethod(methodName : string, array : any[], ...args : any[]) {
        it(methodName, () => assert(lodash.isEqual(array[methodName](...args), lodash[methodName](array, ...args))));
    }

    testLodashMethod('chunk', ['a', 'b', 'c', 'd'], 2);

    testLodashMethod('compact', [0, 1, false, 2, '', 3]);

    testLodashMethod('difference', [2, 1], [2, 3]);

    it('differenceBy', () => {
        const array = [2.1, 1.2];
        const values = [[2.3, 3.4]];
        const iteratee = Math.floor;
        assert(lodash.isEqual(array.differenceBy(values, iteratee), lodash.differenceBy(array, ...values, iteratee)))
    });

    it('differenceBy', () => {
        const array = [{ 'x': 1 }];
        const values = [[{ 'x': 2 }, { 'x': 1 }]];
        const iteratee = 'x';
        assert(lodash.isEqual(array.differenceBy(values, iteratee), lodash.differenceBy(array, ...values, iteratee)))
    });

    it('differenceWith', () => {
        const array = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        const values = [[{ 'x': 1, 'y': 2 }]];
        const iteratee = lodash.isEqual;
        assert(lodash.isEqual(array.differenceWith(values, iteratee), lodash.differenceWith(array, ...values, iteratee)))
    });

    testLodashMethod('drop', [1, 2, 3]);
    testLodashMethod('drop', [1, 2, 3], 2);
    testLodashMethod('drop', [1, 2, 3], 5);
    testLodashMethod('drop', [1, 2, 3], 0);

    testLodashMethod('dropRight', [1, 2, 3]);
    testLodashMethod('dropRight', [1, 2, 3], 2);
    testLodashMethod('dropRight', [1, 2, 3], 5);
    testLodashMethod('dropRight', [1, 2, 3], 0);

    const users = [
        { 'user': 'barney',  'active': false },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': true }
    ];

    testLodashMethod('dropRightWhile', users, o => !o.active);
    testLodashMethod('dropRightWhile', users, { 'user': 'pebbles', 'active': false });
    testLodashMethod('dropRightWhile', users, ['active', false]);
    testLodashMethod('dropRightWhile', users, 'active');

    testLodashMethod('dropWhile', users, o => !o.active);
    testLodashMethod('dropWhile', users, { 'user': 'pebbles', 'active': false });
    testLodashMethod('dropWhile', users, ['active', false]);
    testLodashMethod('dropWhile', users, 'active');

    it('findOpt', () => {
        assert([1,2,3].findOpt(n => n === 4).isEmpty);
        assert([1,2,3].findOpt(n => n === 2).fold(false, i => i === 2));
    });

    it('findIndexOpt', () => {
        assert([2,3,1].findIndexOpt(n => n === 4).isEmpty);
        assert([2,3,1].findIndexOpt(n => n === 3).fold(false, i => i === 1));
    });

    it('findLastIndexOpt', () => {
        assert([1,1,1].findLastIndexOpt(n => n === 4).isEmpty);
        assert([1,1,1].findLastIndexOpt(n => n === 1).fold(false, i => i === 2));
    });

    it('flatten', () => {
        const array = [1, [2, [3, [4]], 5]];
        assert(lodash.isEqual(array.flatten, lodash.flatten(array)))
    });

    it('flattenDeep', () => {
        const array = [1, [2, [3, [4]], 5]];
        assert(lodash.isEqual(array.flattenDeep, lodash.flattenDeep(array)));
    });

    testLodashMethod('flattenDepth', [1, [2, [3, [4]], 5]], 1);
    testLodashMethod('flattenDepth', [1, [2, [3, [4]], 5]], 2);

    it('head', () => {
        assert([].head.isEmpty);
        assert([1,2,3].head.fold(false, i => i === 1));
    });

    it('indexOfOpt', () => {
        assert([].indexOfOpt(1).isEmpty);
        assert([1,2,3].indexOfOpt(2).fold(false, i => i === 1));
    });

    it('initial', () => {
        const array = [1, 2, 3];
        assert(lodash.isEqual(array.initial, lodash.initial(array)))
    });

    testLodashMethod('intersection', [2, 1], [2, 3]);

    it('intersectionBy', () => {
        const array = [2.1, 1.2];
        const values = [[2.3, 3.4]];
        const iteratee = Math.floor;
        assert(lodash.isEqual(array.intersectionBy(values, iteratee), lodash.intersectionBy(array, ...values, iteratee)))
    });

    it('intersectionBy', () => {
        const array = [{ 'x': 1 }];
        const values = [[{ 'x': 2 }, { 'x': 1 }]];
        const iteratee = 'x';
        assert(lodash.isEqual(array.intersectionBy(values, iteratee), lodash.intersectionBy(array, ...values, iteratee)))
    });

    it('intersectionWith', () => {
        const array = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
        const values = [[{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }]];
        const iteratee = lodash.isEqual;
        assert(lodash.isEqual(array.intersectionWith(values, iteratee), lodash.intersectionWith(array, ...values, iteratee)))
    });

    it('isEmpty', () => {
        assert([].isEmpty);
        assert(![2,3,1].isEmpty);
    });

    it('last', () => {
        assert([].last.isEmpty);
        assert([1,2,3].last.fold(false, i => i === 3));
    });

    it('lastIndexOfOpt', () => {
        assert([].lastIndexOfOpt(1).isEmpty);
        assert([1,2,3,2].lastIndexOfOpt(2).fold(false, i => i === 3));
    });
});