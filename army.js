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

function checkResourcesReadyToMove(distance) {
    army.every(function (res) {
        return res.distance >= distance;
    })
}

function checkResourcesReadyToFight(danger) {
    army.every(function (res) {
        return res.health > danger;
    })
}

function resourceRestore(index, characteristic) {
    var resource = army[index];
    if (!resource) return;
    resource[characteristic] = resource["max" + characteristic];
}

function restoreResources(index, characteristic) {
    var characteristic = characteristic ? characteristic : "health";
    index ? resourceRestore(index, characteristic) :
        army.forEach(function (res, resourceIndex) {
            resourceRestore(resourceIndex, characteristic);
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

function render(element) {
    element.innerHTML = "";
    army.forEach(function () {
        var resDiv = document.createElement("div");
        resDiv.classList = ["resource"];
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