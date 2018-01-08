function Battlefield(squads) {
    this._squads = squads;
}

Battlefield.prototype.fight = function () {
    var attackSquadIndex = Math.ceil(Math.random() * (this._squads.length - 1));
    var attackSquad = this._squads[attackSquadIndex];
    var squadsToBeAttacked = this._squads.filter(function (v, i) { return i !== attackSquadIndex });
    var attackSquadResources = attackSquad.getResources();
    for (var i = 0; i < attackSquadResources.length; i++) {
        var attackResource = attackSquadResources[i];
        this.attackSquads(squadsToBeAttacked, attackResource);

    }
}
Battlefield.prototype.attackSquads = function (squads, attackResource) {
    for (var si = 0; si < squads.length; si++) {
        var squadToAttack = squads[si];
        try {
            squadToAttack.attack(attackResource);
        } catch (err) {
            if (err instanceof SquadIsDeadError) {
                continue;
            }
        }
    }
}

Battlefield.prototype.removeResourceIfDead = function (squad, attackedResourceIndex) {
    if (squad.getResources(attackedResourceIndex).isDead())
        squad.removeResource(attackedResourceIndex);
}

Battlefield.prototype.removeIfNoResourcesExists = function (attackedSquadIndex) {
    if (this._squads[attackedSquadIndex].getResources().length) return;
    this._squads.splice(attackedSquadIndex, 1);
    throw new Error("Squad defeated!");
}

Battlefield.prototype.attack = function (attackedSquad, attackedResource, attackedBy) {
    this.notifyAboutAttack(attackedResource, attackedBy);
    attackedResource.attackedBy(attackedBy);
}

Battlefield.prototype.notifyAboutAttack = function (attack, attackedBy) {
    console.log("Resource " + attack.type + " attacked by " + attackedBy.type);
}

Battlefield.prototype.randomPickSquad = function () {
    Array.prototype.forEach.call(arguments, function () {

    })
}

Battlefield.prototype.getCopyOfSquads = function () {
    return this._squads.map(function (squad) {
        return squad;
    })
}