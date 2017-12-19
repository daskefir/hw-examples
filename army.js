var army = [];

function createResource(type, health, distance) {
    return {
        type: type,
        health: health,
        maxHealth: health,
        distance: distance,
        maxDistance: distance
    }
}

function createAndAddResource(type, health, distance) {
    army.push(createResource(type, health, distance));
}

function isResourcesReadyToMove(distance) {
    army.every(function (res) {
        return res.distance >= distance;
    })
}

function isResourcesReadyToFight(danger) {
    army.every(function (res) {
        return res.health > danger;
    })
}

function restoreResource(index, characteristic) {
    var resource = army[index];
    if (!resource) return;
    resource[characteristic] = resource["max" + characteristic];
}

function attackResource(index, points) {
    var resource = army[index];
    if (!resource) return;
    resource.health -= points;
}

function restoreResources(index, characteristic) {
    var characteristic = characteristic ? characteristic : "health";
    index ? restoreResource(index, characteristic) :
        army.forEach(function (res, resourceIndex) {
            restoreResource(resourceIndex, characteristic);
        })
}

function getReadyToMoveResources(distance) {
    return army.filter(function (res) {
        return res.distance >= distance;
    })
}

function combineResources(newResources) {
    army = army.concat(newResources || [])
}

function cloneResource(element) {
    var resource = typeof element === "object" ? element : army[element];
    if (!resource) return;
    var newResource = {};
    for (var key in resource) {
        newResource[key] = resource[key];
    }

    return newResource;
}

function toPixel(value) {
    return value + "px";
}

function bar(elementClass, value, resourceWidth, barHeight) {
    var barDiv = document.createElement("div"),
        barInnerDiv = document.createElement("div"),
        barInfo = document.createElement("div"),
        valueLeft = resourceWidth * (value / 100),
        percent = valueLeft / resourceWidth * 100;

    barDiv.className = elementClass;
    barDiv.style.width = resourceWidth;

    barInfo.innerHTML = percent + "%";
    barInfo.className = "bar-info";

    barInnerDiv.style.width = toPixel(valueLeft);
    barInnerDiv.style.height = toPixel(barHeight);
    barInnerDiv.className = "bar-color";

    
    barDiv.appendChild(barInnerDiv);
    barDiv.appendChild(barInfo);

    return barDiv;
}

function render(element) {
    var resourceWidth = 100,
        resourceHeight = 100,
        barHeight = 20;

    element.innerHTML = "";
    army.forEach(function (resource) {
        var resDiv = document.createElement("div"),
            healthBar = bar("health", resource.health / resource.maxHealth * 100, resourceWidth, barHeight),
            staminaBar = bar("stamina", resource.distance / resource.maxDistance * 100, resourceWidth, barHeight),
            infoDiv = document.createElement("div");

        resDiv.classList = ["resource"];
        resDiv.style.width = toPixel(resourceWidth);
        resDiv.style.height = toPixel(resourceHeight);


        infoDiv.className = ["resource-name"];
        infoDiv.innerHTML = resource.type;

        resDiv.appendChild(healthBar);
        resDiv.appendChild(staminaBar);
        resDiv.appendChild(infoDiv);
        element.appendChild(resDiv);
    });
}


createAndAddResource("soldier", 100, 1000);
createAndAddResource("tank", 1000, 10000);

var newForce = [
    createResource("plane", 500, 100000),
    createResource("horse", 200, 5000),
    cloneResource(0)
];

combineResources(newForce);


render(document.getElementById("wrapper"));

setTimeout(function () {
    attackResource(0, 50);
    render(document.getElementById("wrapper"));
}, 1000);