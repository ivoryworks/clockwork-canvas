var CircleClock = function(context, offsetX, offsetY, size, type) {
    this.ctx = context;
    this.offset = {'x':offsetX, 'y':offsetY};
    this.cPos = {'x':(offsetX + size/2), 'y':(offsetY + size/2)};
    this.radius = (size/2)*.98;
    this.size = size;
    this.type = (type == undefined) ? 0 : type;

    this.run = function() {
        var me = this;
        var intervalDraw = function() {
            var date = new Date();
            me.draw(date);
        }
        setInterval(intervalDraw, 30);
    }

    this.draw = function(date) {
        with (this) {
            ClockUtil.clearCanvas(ctx, offset.x, offset.y, offset.x+size, offset.y+size);
            drawMovement(date);
        }
    };

    this.drawMovement = function(date) {
        with (this) {
            ClockUtil.drawCircle(ctx, cPos.x, cPos.y, radius);

            // Second
            var sec = {'radian':ClockUtil.getSecondsSweepRadian(date), 'x':0, 'y':0, 'radius':0};
            // Minute
            var min = {'radian':ClockUtil.getMinutesRadian(date), 'x':0, 'y':0, 'radius':0};
            // Hour
            var hur = {'radian':ClockUtil.getHoursRadian(date), 'x':0, 'y':0, 'radius':0};

            switch (type) {
            case 1:
                // Second
                sec.radius = radius / 2;
                sec.x = cPos.x + (radius - sec.radius) * Math.cos(sec.radian);
                sec.y = cPos.y - (radius - sec.radius) * Math.sin(sec.radian);

                // Minute
                min.radius = sec.radius / 8;
                min.x = sec.x + (sec.radius - min.radius) * Math.cos(min.radian);
                min.y = sec.y - (sec.radius - min.radius) * Math.sin(min.radian);

                // Hour
                hur.radius = sec.radius / 4;
                hur.x = sec.x + (sec.radius - hur.radius) * Math.cos(hur.radian);
                hur.y = sec.y - (sec.radius - hur.radius) * Math.sin(hur.radian);
                break;
            case 0:
            default:
                // Second
                sec.radius = radius / 8;
                sec.x = cPos.x + (radius - sec.radius) * Math.cos(sec.radian);
                sec.y = cPos.y - (radius - sec.radius) * Math.sin(sec.radian);

                // Minute
                min.radius = radius / 4;
                min.x = cPos.x + (radius - min.radius) * Math.cos(min.radian);
                min.y = cPos.y - (radius - min.radius) * Math.sin(min.radian);

                // Hour
                hur.radius = radius/2;
                hur.x = cPos.x + (radius - hur.radius) * Math.cos(hur.radian);
                hur.y = cPos.y - (radius - hur.radius) * Math.sin(hur.radian);
                break;
            }

            ClockUtil.drawCircle(ctx, hur.x, hur.y, hur.radius);
            ClockUtil.drawCircle(ctx, min.x, min.y, min.radius);
            ClockUtil.drawCircle(ctx, sec.x, sec.y, sec.radius);
        }
    };
};
