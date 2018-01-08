var resourceID = 1;

function Resource(type, damage, health, distance, id) {
    this.id = id || resourceID;
    this.damage = damage;
    this.type = type;
    this.maxHealth = this.health = health;
    this.maxDistance = this.distance = distance;
    resourceID++;
}

Resource.prototype.isReadyToMove = function (distance) {
    return distance ? (this.distance - distance) >= 0 : this.distance;
}

Resource.prototype.isReadyToFight = function (damage) {
    return damage ? (this.health - damage) > 0 : this.health;
}

Resource.prototype.restore = function () {
    this.health = this.maxHealth;
    this.distance = this.maxDistance;
}

Resource.prototype.clone = function () {
    return new Resource(this.type, this.damage, this.maxHealth, this.maxDistance);
}

Resource.prototype.isDead = function () {
    return !this.health || this.health < 0;
}

Resource.prototype.attack = function (from) {
    Resource.checkForResource(from);

    this.health -= from.damage;
    if (this.isDead())
        throw new DeadError(this);
}

Resource.checkForResource = function (target) {
    if (!target instanceof Resource)
        throw new Error("Attack unit is not instance of Resource");
}