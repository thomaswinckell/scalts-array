import * as assert from 'power-assert';
import * as lodash from 'lodash';

import "../src/Array";


describe('scalts-array', () => {

    function testLodashMethod(methodName : string, array : any[], ...args : any[]) {
        it(methodName, () => assert(lodash.isEqual(array[methodName](...args), lodash[methodName](array, ...args))));
    }

    testLodashMethod('chunk', ['a', 'b', 'c', 'd'], 2);

    testLodashMethod('compact', [0, 1, false, 2, '', 3]);

    testLodashMethod('difference', [2, 1], [2, 3]);

    testLodashMethod('differenceBy', [2.1, 1.2], [2.3, 3.4], Math.floor);
    testLodashMethod('differenceBy', [{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');

    testLodashMethod('differenceWith', [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }], [{ 'x': 1, 'y': 2 }], lodash.isEqual);

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

    it("findOpt", () => {
        assert([1,2,3].findOpt(n => n === 4).isEmpty);
        assert([1,2,3].findOpt(n => n === 2).fold(false, i => i === 2));
    });

    it("findIndexOpt", () => {
        assert([2,3,1].findIndexOpt(n => n === 4).isEmpty);
        assert([2,3,1].findIndexOpt(n => n === 3).fold(false, i => i === 1));
    });

    it("findLastIndexOpt", () => {
        assert([1,1,1].findLastIndexOpt(n => n === 4).isEmpty);
        assert([1,1,1].findLastIndexOpt(n => n === 1).fold(false, i => i === 2));
    });

    it("flatten", () => {
        const array = [1, [2, [3, [4]], 5]];
        assert(lodash.isEqual(array.flatten, lodash.flatten(array)))
    });

    it("flattenDeep", () => {
        const array = [1, [2, [3, [4]], 5]];
        assert(lodash.isEqual(array.flattenDeep, lodash.flattenDeep(array)));
    });

    testLodashMethod('flattenDepth', [1, [2, [3, [4]], 5]], 1);
    testLodashMethod('flattenDepth', [1, [2, [3, [4]], 5]], 2);

    it("head", () => {
        assert([].head.isEmpty);
        assert([1,2,3].head.fold(false, i => i === 1));
    });

    it("indexOfOpt", () => {
        assert([].indexOfOpt(1).isEmpty);
        assert([1,2,3].indexOfOpt(2).fold(false, i => i === 1));
    });


    it("initial", () => {
        const array = [1, 2, 3];
        assert(lodash.isEqual(array.initial, lodash.initial(array)))
    });
});