var soldier = new Resource("soldier", 50, 100, 1000);
var tank = new Resource("tank", 500, 1000, 10000);

var newForce = [
    new Resource("plane", 500, 500, 100000),
    new Resource("horse", 200, 200, 5000),
    soldier,
    tank,
    soldier.clone()
];

var squad = new Squad(newForce);
var secondSquad = squad.clone();

var battleField = new Battlefield([squad, secondSquad])
function draw() {
    render(document.getElementsByClassName("first-squad")[0], squad.getResources());
    render(document.getElementsByClassName("second-squad")[0], secondSquad.getResources());
}
draw();
// battleField.fight(draw);