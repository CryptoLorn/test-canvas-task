class CanvasMethods {
    constructor(ctx) {
        this.entities = [];
        this.ctx = ctx;
    };

    startInput() {
        let that = this;

        let getCoordinates = function (e) {
            let x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            let y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return {x, y};
        }

        this.ctx.canvas.addEventListener("click", function (e) {
            that.click = getCoordinates(e);
        });

        this.ctx.canvas.addEventListener("mousemove", function (e) {
            that.mouse = getCoordinates(e);
        });
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        for (let i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    };

    setLine(entity) {
        this.entities.push(entity);
    };

    update() {
        let entitiesCount = this.entities.length;

        for (let i = 0; i < entitiesCount; i++) {
            let entity = this.entities[i];
            entity.update();
        }
    };
};