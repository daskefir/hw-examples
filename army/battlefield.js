function Battlefield(squads) {
    this._squads = squads;
}

Battlefield.prototype.fight = function (callback) {
    if (this._squads.length > 1) {
        var self = this;
        var copyOfSquads = this.getCopyOfSquads();
        var attackedSquadIndex = Math.ceil(Math.random() * (this._squads.length - 1));
        var attackedSquad = copyOfSquads.splice(attackedSquadIndex, 1)[0];
        var intervalDuration = Math.ceil(Math.random() * (2000 - 1000) + 1000)
        var timeout = setTimeout(function () {
            try {
                copyOfSquads.forEach(function (attackSquad) {
                    var attackedResource = attackedSquad.getRandomUnit();
                    var attackedBy = attackSquad.getRandomUnit();
                    self.attack.call(self, attackedSquad, attackedResource, attackedBy);
                    self.removeIfNoResourcesExists.call(self, attackedSquadIndex);
                })
                callback();
                self.fight.call(self, callback);
            } catch (err) {
                console.error(err);
                clearTimeout(timeout);
            }
        }, intervalDuration)
    } else {
        throw new Error("You can't start fight. You need at least 2 squads");
    }
}

Battlefield.prototype.removeIfNoResourcesExists = function (attackedSquadIndex) {
    if (this._squads[attackedSquadIndex].getResources().length) return;
    this._squads.splice(attackedSquadIndex, 1);
    throw new Error("Squad defeated!");
}

Battlefield.prototype.attack = function (attackedSquad, attackedResource, attackedBy) {
    try {
        this.notifyAboutAttack(attackedResource, attackedBy);
        attackedResource.attackedBy(attackedBy);
    } catch (err) {
        debugger;
        attackedSquad.removeResource(attackedSquad.getResources().indexOf(attackedResource));
        console.error(err.message);
    }
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