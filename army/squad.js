function Squad(defaultResources) {
    this._squad = [];
    if (defaultResources)
        this.combineResources(defaultResources);
}

Squad.prototype.getResources = function (index) {
    return this.isResourceExists(index) ? this._squad[index] : this._squad;
}

Squad.prototype.combineResources = function (defaultResources) {
    if (Array.isArray(defaultResources))
        this._squad = this._squad.concat(defaultResources);
}

Squad.prototype.getRandomUnit = function () {
    if (this._squad.length)
        return this._squad[Math.ceil(Math.random() * (this._squad.length - 1))];
    else throw new Error("No units exist!");
}

Squad.prototype.isResourcesReadyToMove = function (distance, index) {
    return this.isResourceExists(index) ? this._squad[index].isReadyToMove(distance) :
        this._squad.every(function (resource) {
            return resource.isReadyToMove(distance);
        })
}

Squad.prototype.isResourcesReadyToFight = function (damage, index) {
    return this.isResourceExists(index) ? this._squad[index].isReadyToFight(damage) :
        this._squad.every(function (resource) {
            return resource.isReadyToFight(damage);
        });
}

Squad.prototype.restoreResources = function () {
    this._squad.forEach(function (resource) {
        resource.restore();
    });
}

Squad.prototype.getReadyToMoveResources = function (distance) {
    return this._squad.filter(function (resource) {
        return resource.isReadyToMove(distance);
    })
}

Squad.prototype.getReadyToFightResources = function (damage) {
    return this._squad.filter(function (resource) {
        return resource.isReadyToFight(damage);
    })
}

Squad.prototype.removeResource = function (index) {
    if (this.isResourceExists(index))
        this._squad.splice(index, 1);
}

Squad.prototype.cloneResources = function (index) {
    return this.isResourceExists(index) ? this._squad[index].clone() :
        new Squad(this._squad);
}

Squad.prototype.isResourceExists = function (index) {
    return index && this._squad[index];
}

Squad.prototype.clone = function () {
    return new Squad(this._squad);
}