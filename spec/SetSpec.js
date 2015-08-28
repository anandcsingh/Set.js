/// <reference path="jasmine.js" />
/// <reference path="../set.js" />

var originalSimpleArr;
var originalObjectArr;
var newSimpleArr;
var objectCompare = function (c1, c2) { return c1.x == c2.x && c1.y == c2.y; };

function setupData() {
  originalSimpleArr = [2, 4, 6, 8];
  originalObjectArr = [{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 1, y: 3 }];
  newSimpleArr = [1, 3, 5, 7, 9];
}

describe("clone", function () {

    beforeEach(setupData);

    it("can clone an existing primitive array", function () {
        var clone = originalSimpleArr.clone();
        expect(originalSimpleArr.join()).toEqual(clone.join());
    });

    it("can clone an existing object array", function () {
        var clone = originalObjectArr.clone();

        expect(originalObjectArr[0]).toBe(clone[0]);
        expect(originalObjectArr[2]).toBe(clone[2]);
    });

  });

  describe("pushRange", function () {

  beforeEach(setupData);

    it("can push a range to an existing array ", function () {

        originalSimpleArr.pushRange(newSimpleArr);

        expect(originalSimpleArr.join()).toEqual('2,4,6,8,1,3,5,7,9');
    });

  });
  describe("remove", function () {

  beforeEach(setupData);
    it("should remove a primitive type from an existing array", function () {

        originalSimpleArr.remove(4);
        expect(originalSimpleArr).not.toContain(4);
    });

    it("should not remove any item if it does not exist in a primitive array", function () {
        var expectedLength = originalSimpleArr.length;
        originalSimpleArr.remove(22);
        expect(originalSimpleArr.length).toBe(expectedLength);
    });

    it("should remove an object from an existing array", function () {

        var obj = { x: 5, y: 3 };
        originalObjectArr.push(obj);

        originalObjectArr.remove(obj);
        expect(originalObjectArr).not.toContain(obj);
    });

    it("should remove an object from an existing array using a compare function", function () {

        var expected = originalObjectArr[2];
        var obj = { x: 1, y: 3 };

        originalObjectArr.remove(obj, objectCompare);
        expect(originalObjectArr).not.toContain(expected);
    });

    it("should not remove any items if it does not exist in an object array", function () {
        var expectedLength = originalObjectArr.length;
        var obj = { x: 5, y: 3 };

        originalObjectArr.remove(obj);

        expect(originalObjectArr.length).toBe(expectedLength);
    });

    it("should not remove any items if it does not exist in an object array when using compare function", function () {
        var expectedLength = originalObjectArr.length;
        var obj = { x: 11, y: 37 };

        originalObjectArr.remove(obj, objectCompare);

        expect(originalObjectArr.length).toBe(expectedLength);
    });

  });
  describe("findIndex", function () {

    beforeEach(setupData);

    it("can find index of a primitive type", function () {
        var expectedIndexOf4 = 1;

        var actualIndex = originalSimpleArr.findIndex(4);

        expect(actualIndex).toBe(expectedIndexOf4);
    });

    it("can find index of object", function () {
        var obj = { x: 1, y: 2 };
        var expectedIndex = 1;
        var actualIndex = originalObjectArr.findIndex(obj, objectCompare);
        expect(actualIndex).toBe(expectedIndex);
    });
  });
  describe("contains", function () {

    beforeEach(setupData);

    it("can determine if a primitive type occurs in an array", function () {
        var actualFound = originalSimpleArr.contains(4);
        expect(actualFound).toBe(true);
    });

    it("should return false if a primitive type does not occur in an array", function () {
        var actualFound = originalSimpleArr.contains(5);
        expect(actualFound).toBe(false);
    });

    it("can determine if an object occurs in an array", function () {
        var obj = { x: 1, y: 2 };
        var actualFound = originalObjectArr.contains(obj, objectCompare);
        expect(actualFound).toBe(true);
    });

    it("should return false if an object does not occur in an array", function () {
        var obj = { x: 31, y: 32 };
        var actualFound = originalObjectArr.contains(obj, objectCompare);
        expect(actualFound).toBe(false);
    });

  });

  describe("union", function () {

    beforeEach(setupData);

    it("can union 2 simple arrays", function () {

        var union = originalSimpleArr.union(newSimpleArr);
        expect(union.join()).toBe("2,4,6,8,1,3,5,7,9");
    });

    it("should not duplicate primitive types", function () {
        newSimpleArr.push(2);
        newSimpleArr.push(5);

        var union = originalSimpleArr.union(newSimpleArr);

        expect(union.join()).toBe("2,4,6,8,1,3,5,7,9");
    });

    it("can union 2 object arrays", function () {

        var t1 = { x: 31, y: 32 };
        var t2 ={ x: 11, y: 22 };
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var union = originalObjectArr.union(newObjArr);
        expect(union).toContain(t1);
    });

    it("should not duplicate objects", function () {
        var t1 = { x: 1, y: 2 };
        var t2 = { x: 1, y: 3 };
        originalObjectArr.push(t1);
        originalObjectArr.push(t2);

        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var union = originalObjectArr.union(newObjArr);
        expect(union.length).toBe(6);
    });

    it("should not duplicate objects identified by a compare function", function () {
        var t1 = { x: 1, y: 2 };
        var t2 = { x: 1, y: 3 };

        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var union = originalObjectArr.union(newObjArr, objectCompare);
        expect(union.length).toBe(4);
    });
  });

  describe("intersection", function () {

    beforeEach(setupData);

    it("should return common items in simple arrays", function () {

        // add common items
        newSimpleArr.push(4);
        originalSimpleArr.push(1);

        var intersect = originalSimpleArr.intersection(newSimpleArr);

        expect(intersect).toContain(4);
        expect(intersect).toContain(1);
    });

    it("should return empty array when no items are in common", function () {
        var intersect = originalSimpleArr.intersection(newSimpleArr);
        expect(intersect).not.toBeUndefined();
        expect(intersect.length).toBe(0);
    });

    it("should not duplicate values in simple arrays", function () {

        // add common items
        newSimpleArr.push(4);
        originalSimpleArr.push(1);

        var intersect = originalSimpleArr.intersection(newSimpleArr);

        expect(intersect).toContain(4);
        expect(intersect).toContain(1);
        expect(intersect.length).toBe(2);
    });

    it("should return common items in an object array", function () {
        var t1 = { x: 21, y: 24 };
        var t2 = { x: 11, y: 343 };
        originalObjectArr.push(t1);
        originalObjectArr.push(t2);
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var intersect = originalObjectArr.intersection(newObjArr);

        expect(intersect).toContain(t1);
        expect(intersect).toContain(t2);
    });

    it("should return common items in an object array using as defined by a compare function", function () {
        var t1 = { x: 1, y: 2 };
        var t2 = { x: 1, y: 3 };
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var intersect = originalObjectArr.intersection(newObjArr, objectCompare);
        expect(intersect.length).toBe(2);
        expect(intersect[0].x).toBe(1);
        expect(intersect[0].y).toBe(2);
        expect(intersect[1].x).toBe(1);
        expect(intersect[1].y).toBe(3);
    });

    it("should return an empty array when no items are in common", function () {
        var newObjArr = [{ x: 33, y: 44 }, { x: 333, y: 444 }, { x: 3333, y: 4444 }];

        var intersect = originalObjectArr.intersection(newObjArr, objectCompare);
        expect(intersect).not.toBeUndefined();
        expect(intersect.length).toBe(0);
    });

    it("should return same result when it is called on either object", function () {
        var t1 = { x: 21, y: 24 };
        var t2 = { x: 11, y: 343 };
        originalObjectArr.push(t1);
        originalObjectArr.push(t2);
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var intersect = originalObjectArr.intersection(newObjArr);
        var secondIntersect = newObjArr.intersection(originalObjectArr);
        expect(intersect).toContain(t1);
        expect(intersect).toContain(t2);
        expect(secondIntersect).toContain(t1);
        expect(secondIntersect).toContain(t2);
    });
  });

  describe("difference", function () {

    beforeEach(setupData);

    it("should return items in the first primitive set that do not exist in the second primitive set", function () {
        newSimpleArr.push(2);
        newSimpleArr.push(8);

        var diff = originalSimpleArr.difference(newSimpleArr);

        expect(diff).toContain(4);
        expect(diff).toContain(6);

        expect(diff).not.toContain(2);
        expect(diff).not.toContain(8);
    });

    it("should return an empty array if items are the same in 2 primitive arrays", function () {
        var clone = originalSimpleArr.clone();

        var diff = originalSimpleArr.difference(clone);
        expect(diff.length).toBe(0);
    });

    it("should return items in the first object set that do not exist in the second object set", function () {
        var expectedLength = originalObjectArr.length;

        var t1 = { x: 21, y: 24 };
        var t2 = { x: 11, y: 343 };
        originalObjectArr.push(t1);
        originalObjectArr.push(t2);
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var diff = originalObjectArr.difference(newObjArr);

        expect(diff).not.toContain(t1);
        expect(diff).not.toContain(t2)
        expect(diff.length).toBe(expectedLength);
    });

    it("should return items in the first object set that do not exist in the second object set using object compare", function () {

        var t1 = { x: 1, y: 3 };
        var t2 = { x: 1, y: 2 };
        var newObjArr = [t1, t2, { x: 33, y: 44 }];

        var diff = originalObjectArr.difference(newObjArr, objectCompare);

        expect(diff.length).toBe(1);
        expect(diff[0].x).toBe(1);
        expect(diff[0].y).toBe(1);
    });
  });

  describe("distinct", function () {

    beforeEach(setupData);

    it("should return a new array no duplicates when primitive numbers in the array", function () {
        originalSimpleArr.push(2);
        originalSimpleArr.push(8);

        expect(originalSimpleArr.length).toBe(6);
        var distinct = originalSimpleArr.distinct();

        expect(distinct.length).toBe(4);
        expect(distinct[3]).toBe(8);
        expect(distinct[2]).toBe(6);
        expect(distinct[1]).toBe(4);
        expect(distinct[0]).toBe(2);
    });

    it("should return a new array no duplicates when primitive strings in the array", function () {

        var arr = [];
        arr.push("I got a fever, and the only prescription is more cowbell.");
        arr.push("Well, people in hell want ice water, pal.");
        arr.push("I got a fever, and the only prescription is more cowbell.");
        arr.push("Two little mice fell in a bucket of cream.");
        arr.push("Two little mice fell in a bucket of cream.");
        var distinct = arr.distinct();

        expect(distinct.length).toBe(3);
        expect(distinct[0]).toBe("I got a fever, and the only prescription is more cowbell.");
        expect(distinct[1]).toBe("Well, people in hell want ice water, pal.");
        expect(distinct[2]).toBe("Two little mice fell in a bucket of cream.");
    });

    it("should return a new array no duplicates when objects in the array", function () {
      var count = 0;
      var dup = originalObjectArr[1];
      originalObjectArr.push(dup);

      var distinct = originalObjectArr.distinct();

      expect(distinct.length).toBe(3);

      for (var i = 0; i < distinct.length; i++) {
        var item = distinct[i];
        if (item == dup) {
          count++;
        }
      }

      expect(count).toBe(1);
    });

    it("should return a new array no duplicates when objects in the array and given a comparer", function () {
      var count = 0;
      var comparer = function (item1, item2) { return item1.y == item2.y; };
      var dup = { x:3, y:2 };
      originalObjectArr.push(dup);

      var distinct = originalObjectArr.distinct(comparer);

      expect(distinct.length).toBe(3);

      for (var i = 0; i < distinct.length; i++) {
        var item = distinct[i];
        if (comparer(item,dup)) {
          count++;
        }
      }

      expect(count).toBe(1);
    });

  });
