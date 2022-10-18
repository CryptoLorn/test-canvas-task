class Line {
    constructor(data) {
        this.data = data;
        this.radius = 0;
        this.points = [];
    };

    slope() {
        let slope;

        if (this.points[1]?.x !== this.points[0]?.x)
            slope = (this.points[1]?.y - this.points[0]?.y) / (this.points[1]?.x - this.points[0]?.x);
        else
            slope = false;

        return slope;
    };

    yInt() {
        return this.points[0]?.y - this.slope() * this.points[0]?.x;
    };

    onSegment(x) {
        return this.points[0]?.x <= x && x <= this.points[1]?.x;
    };

    collide(other) {
        let intersect = {};
        intersect.x = (other.yInt() - this.yInt()) / (this.slope() - other.slope());
        intersect.y = this.slope() * intersect.x + this.yInt();

        return intersect;
    };

    update() {
        if (this.data.click && this.points.length < 2) {
            if (this.points.length === 0 || this.data.click.x > this.points[0].x)
                this.points.push(this.data.click);
            else
                this.points.splice(0, 0, this.data.click);

            if (this.points.length === 2) {

                const point = new Point();
                let mdl = point.disance(new Point(this.points[0].x, this.points[0].y), new Point(this.points[1].x, this.points[1].y));
                console.log(mdl)

                this.data.setLine(new Line(this.data));
            }

            this.data.click = null;
        }
    };

    draw(ctx) {
        let mouse = this.data.mouse;
        let length = this.points.length;

        switch (length) {
            case 1:
                ctx.beginPath();
                ctx.arc(this.points[0]?.x, this.points[0]?.y, 0, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();

                if (mouse) {
                    ctx.beginPath();
                    ctx.moveTo(this.points[0].x, this.points[0].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.arc(mouse.x, mouse.y, 0, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.closePath();
                }

                let destroyLine = this.data.ctx.canvas;

                destroyLine.oncontextmenu = () => {
                    this.points.splice(0, 0, this.data.click);
                    this.data.setLine(new Line(this.data));

                    return false;
                }

                break;
            case 2:
                ctx.beginPath();
                ctx.moveTo(this.points[0]?.x, this.points[0]?.y);
                ctx.lineTo(this.points[1]?.x, this.points[1]?.y);
                ctx.arc(this.points[1].x, this.points[1].y, 0, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.closePath();

                for (let i = 0; i < this.data.entities.length && this.data.entities[i] !== this; i++) {
                    let ent = this.data.entities[i];

                    if (ent instanceof Line) {
                        let xPoint = this.collide(ent);

                        if (this.onSegment(xPoint.x) && ent.onSegment(xPoint.x)) {
                            this.radius = 5;
                        } else {
                            this.radius = 0;
                        }

                        ctx.beginPath();
                        ctx.arc(xPoint.x, xPoint.y, this.radius, 0, 2 * Math.PI);
                        ctx.stroke();
                        ctx.fillStyle = 'red';
                        ctx.fill();
                        ctx.closePath();
                    }
                }

                break;
        };
    };

};
