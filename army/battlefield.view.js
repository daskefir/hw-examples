var battlefieldTemplate = function (squads) {
    return '<div class="land battlefield-block"> \
                <div class="battlefield-army battlefield-block">' + squadTemplate(squads) + '</div > \
                <div class="battlefield "> \
                    <div class="battlefield-cells battlefield-block"></div> \
                    <!-- <div class="battlefield-score battlefield-block"></div> --> \
                </div> \
            </div > ';
}

var resourceTemplate = function (squad, resource) {
    return '<div class="resource resource-' + resource.id + '"> \
        <div class="resource-bars"> \
            <div class="resource-bar health-bar"><div class="bar"></div><span class="health-info">' + resource.health + '<span></div> \
            <div class="resource-bar stamina-bar"><div class="bar"></div><span class="health-info">' + resource.distance + '</span></div> \
        </div> \
        <div class="resource-title resource-squad">' + squad.title + '</div> \
        <div class="resource-title resource-type">' + resource.type + '</div> \
        <div class="resource-body"> \
            <div class="resource-info"> \
                Damage: '+ resource.damage + '\
            </div>\
        </div> \
    </div>';
}


function squadTemplate(squads) {
    var concatTemplates = [];
    var squads = Array.isArray(squads) ? squads : [squads];
    squads.forEach(function (squad) {
        squad.getResources().forEach(function (resource) {
            concatTemplates.push(resourceTemplate(squad, resource));
        });
    });
    return concatTemplates.join('');
}

var updateResource = function (resource) {
    var armyPlace = pickFirstByClass(document, ".battlefield-army"),
        selectedResource = pickFirstByClass(armyPlace, ".resource-" + resource.id);

    var healthBar = pickFirstByClass(selectedResource, "health-bar"),
        staminaBar = pickFirstByClass(selectedResource, "stamina-bar");

    healthBar.children[1].innerHTML = resource.health;
    healthBar.children[1].style.width = resource.helath / resource.maxHealth * 100 + "%";

    staminaBar.children[1].innerHTML = resource.distance;
    staminaBar.children[1].style.width = resource.distance / resource.maxDistance * 100 + "%";

    return selectedResource;
}