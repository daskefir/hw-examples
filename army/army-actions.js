var soldier = new Resource("soldier", 50, 100, 1000);
var tank = new Resource("tank", 500, 1000, 10000);

var newForce = [
    new Resource("plane", 500, 500, 100000),
    new Resource("horse", 200, 200, 5000),
    soldier,
    tank,
    soldier.clone()
];

var squad = new Squad("My first squad", newForce);
var secondSquad = squad.clone();
secondSquad.title = "My second squad";
var thirdSquad = squad.clone();
thirdSquad.title = "My third squad";

wrapper.innerHTML = battlefieldTemplate([squad, secondSquad, thirdSquad]);
var battleField = new Battlefield([squad, secondSquad, thirdSquad])
battleField.fight();
