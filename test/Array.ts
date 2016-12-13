import * as assert from 'power-assert';
import * as lodash from 'lodash';

import '../src/Array';


describe('scalts-array', () => {

    function testLodashMethod(methodName : string, array : any[], ...args : any[]) {
        it(methodName, () => assert(lodash.isEqual(array[methodName](...args), lodash[methodName](array, ...args))));
    }

    testLodashMethod('chunk', ['a', 'b', 'c', 'd'], 2);

    testLodashMethod('compact', [0, 1, false, 2, '', 3]);

    it('copy', () => {
        const initial = [1, 2, 3];
        const copy = initial.copy();
        assert(lodash.isEqual(initial, copy));
        assert(initial != copy);
    });

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

    type User = {
        user : String;
        active : boolean;
    }

    const users : User[] = [
        { 'user': 'barney',  'active': false },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': true }
    ];

    testLodashMethod('dropRightWhile', users, (u : User) => !u.active);
    testLodashMethod('dropRightWhile', users, { 'user': 'pebbles', 'active': false });
    testLodashMethod('dropRightWhile', users, ['active', false]);
    testLodashMethod('dropRightWhile', users, 'active');

    testLodashMethod('dropWhile', users, (u : User) => !u.active);
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

    testLodashMethod('flatten', [1, [2, [3, [4]], 5]]);

    it('head', () => {
        assert((<any[]>[]).head.isEmpty);
        assert([1,2,3].head.fold(false, i => i === 1));
    });

    it('indexOfOpt', () => {
        assert((<any[]>[]).indexOfOpt(1).isEmpty);
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
        assert((<any[]>[]).lastIndexOfOpt(1).isEmpty);
        assert([1,2,3,2].lastIndexOfOpt(2).fold(false, i => i === 3));
    });

    it('reverse', () => {
        assert(lodash.isEqual([1, 2, 3].reverse, [3, 2, 1]));
    });

    it('tail', () => {
        assert(lodash.isEqual([].tail, []));
        assert(lodash.isEqual([1,2,3].tail, [2,3]));
    });

    testLodashMethod('take', [1, 2, 3]);
    testLodashMethod('take', [1, 2, 3], 2);
    testLodashMethod('take', [1, 2, 3], 5);
    testLodashMethod('take', [1, 2, 3], 0);

    testLodashMethod('takeRight', [1, 2, 3]);
    testLodashMethod('takeRight', [1, 2, 3], 2);
    testLodashMethod('takeRight', [1, 2, 3], 5);
    testLodashMethod('takeRight', [1, 2, 3], 0);

    testLodashMethod('takeRightWhile', [1, 2, 3], (n : number) =>  n > 2);

    testLodashMethod('takeWhile', [1, 2, 3], (n : number) =>  n < 2);
});