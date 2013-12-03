Array.prototype.clone = function () {
    /// <summary>Clones the structure of the array and not the actual objects
    /// the same objects will be referenced in the new array.</summary>
    /// <returns type="Array">The cloned Array.</returns>
    return this.map(function (obj) { return obj; });
};

Array.prototype.pushRange = function (range) {
    /// <summary>Appends an existing collection to this array</summary>
    /// <param name="range" type="Array, Object">The collection to append.</param>
    for (var i = 0; i < range.length; i++) {
        this.push(range[i]);
    }
};
Array.prototype.remove = function (item, comparer) {
    /// <summary>Removes an item from this array, if it not found nothing is done.</summary>
    /// <param name="item" type="Any">The item to be removed</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    var i = 0;
    var thisItem;
    var foundIndex = -1;

    if (!comparer) {
        foundIndex = this.indexOf(item); 
        
    }
    else {
        for (; i < this.length; i++) {
            if (comparer(item, this[i])) {
                foundIndex = i;
                break;
            }
        }
    }
    if (foundIndex != -1) {
        this.splice(foundIndex, 1);
    }
}

Array.prototype.findIndex = function (item, comparer) {
    /// <summary>Finds the index of an item in this array, if none is found -1 is returned.</summary>
    /// <param name="item" type="Any">The item to be found</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    /// <returns type="Number">The index</returns>

    var i = 0;

    if (!comparer) {
        return this.indexOf(item);
    }
    for (; i < this.length; i++) {
        if (comparer(item, this[i])) {
            return i;
        }
    }
    return -1;
}
Array.prototype.contains = function (item, comparer) {
    /// <summary>Determines if an item exists in an array, if it not found nothing is done.</summary>
    /// <param name="item" type="Any">The item to be found</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    /// <returns type="Boolean">true if item exists</returns>

    return this.findIndex(item, comparer) > -1;
};

Array.prototype.union = function (other, comparer) {
    /// <summary>Returns a new set that contains all of the items that exist in both sets.</summary>
    /// <param name="other" type="Array, Object">The collection to be unioned</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    /// <returns type="Array">A new Array</returns>
    var unionArr = this.clone();
    var i = 0;
    var item;
    for (; i < other.length; i++) {
        item = other[i];
        if(!unionArr.contains(item, comparer)) {
            unionArr.push(item);
        }
    }
    return unionArr;
};

Array.prototype.intersection = function (other, comparer) {
    /// <summary>Returns a new set that contains all of the items that are common to both sets.</summary>
    /// <param name="other" type="Array, Object">The collection to find the intersection</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    /// <returns type="Array">A new Array</returns> 
    var intersect = [];
    var i = 0;
    var item;

    for (var i = 0; i < this.length; i++) {
        item = this[i];

        if (other.contains(item, comparer)) {
            intersect.push(item);
        }
    }

    return intersect;
};

Array.prototype.difference = function (other, comparer) {
    /// <summary>Returns a new set that contains all of the items that exist in the first set and not in the second</summary>
    /// <param name="other" type="Array, Object">The collection to find the difference</param>
    /// <param name="comparer" type="Function">Optional function used to determine equality e.g. function(x, y) { return x.id === y.id; }</param>
    /// <returns type="Array">A new Array</returns> 
    var diff = this.clone();
    var i = 0;

    for (; i < other.length; i++) {
        diff.remove(other[i], comparer);
    }
    return diff;
}