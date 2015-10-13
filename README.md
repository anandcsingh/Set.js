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

true
```

```js
var anand = { name: 'Anand Singh', gender: 'Male' };
var peopleCompare = function (a, b) { return a.name === b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }];

var contains = people.contains(anand, peopleCompare);

true
```

###union
Returns a new set that contains all of the items that exist in both sets. You can optionally provide a function that determines equality.

```js
var arr1 = [2, 4, 6, 8];
var arr2 = [1, 3, 5, 7, 8];

var unionOfBothSets = arr1.union(arr2);

[2, 4, 6, 8, 1, 3, 5, 7]
```

```js
var peopleCompare = function (a, b) { return a.name === b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }];
var morePeople = [{ name: 'Aneela Singh', gender: 'Female' }, { name: 'Anand Singh', gender: 'Male' }];

var union = people.union(morePeople, peopleCompare);

[{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }, { name: 'Aneela Singh', gender: 'Female' }]
```
###intersection
Returns a new set that contains all of the items that are common to both sets. You can optionally provide a function that determines equality.

```js
var arr1 = [1, 2, 4, 6, 8];
var arr2 = [1, 3, 5, 7, 8];

var intersection = arr1.intersection(arr2);

[1, 8]
```

```js
var peopleCompare = function (a, b) { return a.name === b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }];
var morePeople = [{ name: 'Aneela Singh', gender: 'Female' }, { name: 'Anand Singh', gender: 'Male' }];

var intersection = people.intersection(morePeople, peopleCompare);

[{ name: 'Anand Singh', gender: 'Male' }]
```
###difference
Returns a new set that contains all of the items that exist in the first set and not in the second. You can optionally provide a function that determines equality.

```js
var arr1 = [1, 2, 4, 6, 8];
var arr2 = [1, 3, 5, 7, 8];

var difference = arr1.difference(arr2);

[2, 4, 6]
```

```js
var peopleCompare = function (a, b) { return a.name === b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }];
var morePeople = [{ name: 'Aneela Singh', gender: 'Female' }, { name: 'Anand Singh', gender: 'Male' }];

var difference = people.difference(morePeople, peopleCompare);

[{ name: 'Anil Singh', gender: 'Male' }]
```

###distinct
Returns a new set that contains ony unique items. You can optionally provide a function that determines equality.

```js
var arr = [1, 3 , 5 , 3, 4, 1];
var distinct = arr.distinct();

[1, 3, 5, 4]
```

```js
var peopleCompare = function (a, b) { return a.name === b.name; };
var people = [{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }, { name: 'Aneela Singh', gender: 'Female' }, { name: 'Anand Singh', gender: 'Male' }];

var distinct = people.distinct(peopleCompare);

[{ name: 'Anand Singh', gender: 'Male' }, { name: 'Anil Singh', gender: 'Male' }, { name: 'Aneela Singh', gender: 'Female' }]
```

##Available helper methods
* clone
* pushRange
* remove
* findIndex
