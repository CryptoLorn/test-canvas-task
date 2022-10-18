window.onload = function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const canvasMethods = new CanvasMethods(ctx);
    canvasMethods.startInput();

    const line = new Line(canvasMethods);
    canvasMethods.setLine(line);

    function start() {
        (function cycle() {
            canvasMethods.update();
            canvasMethods.draw();
            canvasMethods.click = null;

            window.requestAnimationFrame(cycle, ctx.canvas);
        })();
    };

    start();
};
