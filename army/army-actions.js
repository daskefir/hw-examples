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
console.log(squad.getResources(2));

render(document.getElementById("wrapper"), squad.getResources());

setTimeout(function () {
    squad.getResources(3).attackedBy(squad.getResources(2));
    render(document.getElementById("wrapper"), squad.getResources());
}, 1000);