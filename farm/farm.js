function Farm() {
    this._cash = 0;
    this._resources = [];
    this._products = [];
}

Farm.prototype.addResource = function (resource) {
    if (resource instanceof Resource) {
        this._resources.push(resource);
        return this;
    } else {
        throw new Error("Argument is not instance of Resource");
    }
}

Farm.prototype.plant = function (index) {
    var self = this;
    if (this.isResourceExists(index)) {
        var resource = this.getResource(index);
        try {
            resource.plant();
        } catch (err) {
            console.log("Resource: " + resource.type + ". " + err.message);
        }
        return;
    } else
        this._resources.forEach(function (resource, index) {
            self.plant(index);
        })
    this.run();
}

Farm.prototype.harvest = function (index) {
    var self = this;
    if (this.isReadyForHarvesting(index)) {
        this._resources.forEach(function (res) {
            self._products = self._products.concat(res.harvest());
        })
    } else {
        throw new Error("Resource(s) is not ready for harvesting");
    }
}

Farm.prototype.isReadyForHarvesting = function (index) {
    if (this.isResourceExists(index))
        return this.getResource(index).isReadyForHarvesting();
    else
        return this._resources.every(function (resource) {
            return resource.isReadyForHarvesting();
        });
}

Farm.prototype.sellProducts = function () {
    this._cash += this._products.reduce(function (prev, next) {
        return prev + next.price;
    }, 0);
}

Farm.prototype.getResource = function (index) {
    return index === undefined ? this._resources : this._resources[index];
}

Farm.prototype.isReadyForTick = function (index) {
    if (this.isResourceExists(index))
        return this.getResource(index).isReadyForTick();
    else
        return this._resources.every(function (resource) {
            return resource.isReadyForTick();
        })
}

Farm.prototype.run = function () {
    var self = this;
    var interval = setInterval(function () {
        console.log("Tick");
        self._resources.forEach(function (resource) {
            console.log("Tick for " + resource.type);
            resource.tick();
        })

        if (!self.isReadyForTick()) {
            self.harvest();
            self.sellProducts();
            clearInterval(interval);
            console.log("Stop interval", farm);
        }
    }, 1000);
}

Farm.prototype.isResourceExists = function (index) {
    return index !== undefined && this._resources[index];
}