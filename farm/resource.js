function Resource(type, product, income, incomePerTick, durability, durabilityPerPlant) {
    this.checkProduct(product);
    this.product = product;
    this.type = type;
    this.income = income || 1;
    this.incomePerTick = incomePerTick || 1;
    this.durability = this.maxDurability = durability || 100;
    this.durabilityPerPlant = durabilityPerPlant || 20;
    this.currentProductsCount = 0;
}

Resource.prototype.checkProduct = function (product) {
    if (product instanceof Product) return;
    throw new Error("Argumens product is not instance of Product");
}

Resource.prototype.isReadyForTick = function () {
    return this.currentProductsCount < this.income;
}

Resource.prototype.tick = function () {
    if (this.isReadyForTick())
        this.currentProductsCount += this.incomePerTick;
}

Resource.prototype.harvest = function () {
    const products = [];
    for (let i = 0; i < this.currentProductsCount; i++)
        products.push(this.product);
    this.resetStats();
    return products;
}

Resource.prototype.restore = function () {
    this.durability = this.maxDurability;
}

Resource.prototype.isReadyForPlanting = function () {
    return this.durability >= this.durabilityPerPlant;
}

Resource.prototype.isReadyForHarvesting = function () {
    return this.income === this.currentProductsCount;
}

Resource.prototype.resetStats = function () {
    this.currentProductsCount = 0;
}

Resource.prototype.plant = function () {
    if (this.isReadyForPlanting()) {
        this.durability -= this.durabilityPerPlant;
    } else
        throw new Error("Your resource is almost dead!");
}

Resource.prototype.clone = function () {
    return new Resource(this.type, this.product, this.income, this.incomePerTick, this.maxDurability, this.durabilityPerPlant);
}