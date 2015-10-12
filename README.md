# Set.js

Set.js adds set operations to the existing JavaScript array. These operations produce a result set which is based on the presence or absence of equivalent elements within the same or seperate arrays.

## Supported set operations
* [contains](#contains)
* [union](#union)
* [intersection](#intersection)
* [difference](#difference)
* [distinct](#distinct)

###contains
Determines if an item exists in an array, you can optionally provide a function that determines equality.

```js
var arr = [2, 4, 6, 8];
var contains = arr.contains(4);
```

```js
var anand = { name: 'Anand Singh', gender: 'Male' };
var peopleCompare = function (a, b) { return a.name == b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }];

var contains = people.contains(anand, peopleCompare);

```

###union
Returns a new set that contains all of the items that exist in both sets.

```js
var arr1 = [2, 4, 6, 8];
var arr2 = [1, 3, 5, 7, 8];
var unionOfBothSets = arr1.union(arr2);
```

###intersection

###difference

###distinct

##Available helper methods
* clone
* pushRange
* remove
* findIndex
