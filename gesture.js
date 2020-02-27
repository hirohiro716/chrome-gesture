var isUp;
var isDown;
var isLeft;
var isRight;
var previousPoints = [];
$(window).on('mousemove', function(event) {
    if (isStartedGesture) {
        var xDifference = Math.abs(event.pageX - rightClickPoint.x);
        var yDifference = Math.abs(event.pageY - rightClickPoint.y);
        var tolerance = 50;
        if (event.pageY < rightClickPoint.y && yDifference > tolerance && xDifference < tolerance) {
            rightClickPoint = {x: event.pageX, y: event.pageY};
            isUp = true;
        }
        if (event.pageY > rightClickPoint.y && yDifference > tolerance && xDifference < tolerance) {
            rightClickPoint = {x: event.pageX, y: event.pageY};
            isDown = true;
        }
        if (event.pageX < rightClickPoint.x && xDifference > tolerance && yDifference < tolerance) {
            rightClickPoint = {x: event.pageX, y: event.pageY};
            isLeft = true;
        }
        if (event.pageX > rightClickPoint.x && xDifference > tolerance && yDifference < tolerance) {
            rightClickPoint = {x: event.pageX, y: event.pageY};
            isRight = true;
        }
    } else {
        var point = {x: event.pageX, y: event.pageY};
        var timestamp = new Date().getTime();
        previousPoints.push({point: point, timestamp: timestamp});
        for (var index = previousPoints.length; index > 10; index--) {
            previousPoints.shift();
        }
    }
});
var isStartedGesture;
var rightClickPoint;
var rightClickTimestamp;
$(window).on('mousedown', function(event) {
    isStartedGesture = false;
    isUp = false;
    isDown = false;
    isLeft = false;
    isRight = false;
    if (event.button != 2) {
        return;
    }
    rightClickPoint = {x: event.pageX, y: event.pageY};
    rightClickTimestamp = new Date().getTime();
});
$(window).on('contextmenu', function(event) {
    for (var index = 0; index < previousPoints.length; index++) {
        var timestamp = previousPoints[index].timestamp;
        var point = previousPoints[index].point;
        if (timestamp + 100 >= rightClickTimestamp) {
            if (point.x != rightClickPoint.x || point.y != rightClickPoint.y) {
                isStartedGesture = true;
                event.preventDefault();
                break;
            }
        }
    }
});
$(window).on('mouseup', function(event) {
    if (event.button != 2) {
        return;
    }
	if (isStartedGesture == false) {
		return;
	}
	isStartedGesture = false;
    if (isUp == false && isDown && isLeft == false && isRight) {
        chrome.runtime.sendMessage('closetab');
        return;
    }
    if (isUp == false && isDown && isLeft == false && isRight == false) {
        chrome.runtime.sendMessage('newtab');
        return;
    }
    if (isUp == false && isDown == false && isLeft && isRight == false) {
        history.back();
        return;
    }
    if (isUp == false && isDown == false && isLeft == false && isRight) {
        history.forward();
        return;
    }
});


