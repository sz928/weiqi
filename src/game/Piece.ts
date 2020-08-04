class Piece extends egret.Sprite {
    isBlack: boolean;
    point: egret.Point;
    private dianBlack: egret.Shape;
    private dianWhite: egret.Shape;

    constructor() {
        super();
        this.dianBlack = new egret.Shape();
        this.dianBlack.graphics.beginFill(0x000000);
        this.dianBlack.graphics.drawCircle(0, 0, 16);
        this.dianBlack.graphics.endFill();
        this.addChild(this.dianBlack);

        this.dianWhite = new egret.Shape();
        this.dianWhite.graphics.beginFill(0xffffff);
        this.dianWhite.graphics.drawCircle(0, 0, 16);
        this.dianWhite.graphics.endFill();
        this.addChild(this.dianWhite);
    }

    updateData(isBaack: boolean, point: egret.Point): void {
        this.isBlack = isBaack;
        this.point = point;

        let speed = config.speed;
        this.x = speed * point.x;
        this.y = speed * point.y;

        this.dianBlack.visible = isBaack;
        this.dianWhite.visible = !isBaack;
    }
}