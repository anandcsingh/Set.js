Array.prototype.clone = function () {
    // only clones the structure of the array and not the actual objects
    // the same objects will be referenced in the new array.
    return this.map(function (obj) { return obj; });
};

Array.prototype.pushRange = function(range) {
    for (var i = 0; i < range.length; i++) {
        this.push(range[i]);
    }
};
Array.prototype.remove = function (item, comparer) {
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
    return this.findIndex(item, comparer) > -1;
};

Array.prototype.union = function (other, comparer) {
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
    var diff = this.clone();
    var i = 0;

    for (; i < other.length; i++) {
        diff.remove(other[i], comparer);
    }
    return diff;
}