class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    disance(p1, p2) {
        return Math.sqrt(((p2.x - p1.x) ** 2) + ((p2.y - p1.y) ** 2));
    }
}
// const point = new Point();
// console.log(point.disance(new Point(5, 7), new Point(11, 24)));