var BasicClock = function(context, offsetX, offsetY, size, type) {
    this.ctx = context;
    this.offset = {'x':offsetX, 'y':offsetY};
    this.cPos = {'x':(offsetX + size/2), 'y':(offsetY + size/2)};
    this.radius = (size/2)*.98;
    this.size = size;
    this.type = (type == undefined) ? 0 : type;

    // Auto draw
    this.run = function() {
        var me = this;
        var intervalDraw = function() {
            var date = new Date();
            me.draw(date);
        }
        setInterval(intervalDraw, 30);
    }

    // Manual draw
    this.draw = function(date) {
        with (this) {
            ClockUtil.clearCanvas(ctx, offset.x, offset.y, offset.x+size, offset.y+size);
            drawMovement(date);
        }
    };

    this.drawMovement = function(date) {
        with (this) {
            ClockUtil.drawCircle(ctx, cPos.x, cPos.y, radius);
            // Second (Sweep or Step)
            var sec = {'radian':0, 'x':0, 'y':0, 'radius':radius/8};
            sec.radian = (type == 1) ? ClockUtil.getSecondsRadian(date) : ClockUtil.getSecondsSweepRadian(date);
            sec.x = cPos.x + (radius - sec.radius) * Math.cos(sec.radian);
            sec.y = cPos.y - (radius - sec.radius) * Math.sin(sec.radian);

            // Minute
            var min = {'radian':ClockUtil.getMinutesRadian(date), 'x':0, 'y':0, 'radius':radius/4};
            min.x = cPos.x + (radius - min.radius) * Math.cos(min.radian);
            min.y = cPos.y - (radius - min.radius) * Math.sin(min.radian);

            // Hour
            var hur = {'radian':ClockUtil.getHoursRadian(date), 'x':0, 'y':0, 'radius':radius/2};
            hur.x = cPos.x + (radius - hur.radius) * Math.cos(hur.radian);
            hur.y = cPos.y - (radius - hur.radius) * Math.sin(hur.radian);

            ClockUtil.drawLine(ctx, cPos.x, cPos.y, hur.x, hur.y);
            ClockUtil.drawLine(ctx, cPos.x, cPos.y, min.x, min.y);
            ClockUtil.drawLine(ctx, cPos.x, cPos.y, sec.x, sec.y);
        }
    };
};
