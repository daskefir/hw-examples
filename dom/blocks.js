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

function render(element, army) {
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