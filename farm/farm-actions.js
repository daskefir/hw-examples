var appleResource = new Resource("apple", new Product("apple", 20), 10, 5, 100, 20);
var secondAppleResoure = appleResource.clone();
var thirdAppleResource = appleResource.clone();
var farm = new Farm();
    farm.addResource(appleResource)
        .addResource(secondAppleResoure)
        .addResource(thirdAppleResource);

farm.plant();