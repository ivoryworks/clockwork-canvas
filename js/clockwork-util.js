var ClockUtil = function() {};
ClockUtil.clearCanvas = function(ctx, x1, y1, x2, y2) {
    with (ctx) {
        beginPath();
        clearRect(x1, y1, x2, y2);
        stroke();
    }
};

ClockUtil.drawLine = function(ctx, srcX, srcY, dstX, dstY) {
    with (ctx) {
        beginPath();
        moveTo(srcX, srcY);
        lineTo(dstX, dstY);
        stroke();
    }
};

ClockUtil.drawCircle = function(ctx, posX, posY, radius) {
    with (ctx) {
        beginPath();
        arc(posX, posY, radius, 0, Math.PI*2, false);
        stroke();
    }
};

ClockUtil.drawQuadraticCurve = function(ctx, x1, y1, x2, y2, x3, y3) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(x2, y2, x3, y3);
    ctx.stroke();
};

ClockUtil.getSecondsSweepRadian = function(date) {
    return Math.PI * 2 * (15 - (date.getSeconds() + date.getMilliseconds() / 1000)) / 60;
};

ClockUtil.getSecondsRadian = function(date) {
    return Math.PI * 2 * (15 - date.getSeconds()) / 60;
};

ClockUtil.getMinutesRadian = function(date) {
    return Math.PI * 2 * (15 - (date.getMinutes() + date.getSeconds() / 60)) / 60;
};

ClockUtil.getHoursRadian = function(date) {
    return Math.PI * 2 * (3 - (date.getHours() + date.getMinutes() / 60)) / 12;
}
