function DeadError(resource) {
    var message = resource.type + " is dead!";
    var instance = new Error(message);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, DeadError);
    }
    return instance;
}

function SquadIsDeadError(squad) {
    var message = "Squad is dead!";
    var instance = new Error(message);
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    if (Error.captureStackTrace) {
        Error.captureStackTrace(instance, DeadError);
    }
    return instance;
}