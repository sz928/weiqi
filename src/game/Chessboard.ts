class Chessboard extends eui.Component {

    private speedLeft = 30;
    private speed: number;
    private tips: egret.TextField;

    constructor() {
        super();
        this.tips = new egret.TextField();
        this.addChild(this.tips);
        this.tips.touchEnabled = true;
    }

    protected childrenCreated() {
        super.createChildren();
        this.init();
    }

    private init() {
        const stageW = this.stage.stageWidth;
        let group = new eui.Group();
        this.width = this.height = stageW - this.speedLeft;
        group.width = this.width;
        group.height = this.height;
        this.speed = GameController.instance.speed = this.width / 18;
        for (let i = 0; i < 19; i++) {
            this.drawLine(i, this.speed, group);
        }

        let arr: { x: number, y: number }[] = [{ x: 3, y: 3 }, { x: 15, y: 3 }, { x: 3, y: 15 }, { x: 15, y: 15 }];
        for (const i in arr) {
            let point = arr[i];
            let dian1 = new egret.Shape();
            dian1.graphics.beginFill(0x000000);
            dian1.graphics.drawCircle(point.x * this.speed, point.y * this.speed, 8);
            dian1.graphics.endFill();
            group.addChild(dian1);
        }
        group.cacheAsBitmap = true;
        this.addChild(group);

        this.tips.textAlign = egret.HorizontalAlign.CENTER;
        this.tips.y = -200;
        group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }

    private drawLine(i: number, speed: number, target: eui.Group): void {
        let line1 = new egret.Shape();
        target.addChild(line1);
        line1.graphics.lineStyle(3, 0xffffff);
        line1.graphics.moveTo(i * speed, 0);
        line1.graphics.lineTo(i * speed, this.height);
        line1.graphics.endFill();

        let line2 = new egret.Shape();
        target.addChild(line2);
        line2.graphics.lineStyle(3, 0xffffff);
        line2.graphics.moveTo(0, i * speed);
        line2.graphics.lineTo(this.width, i * speed);
        line2.graphics.endFill();
    }

    private onTap(e: egret.TouchEvent): void {
        let tapX = Math.ceil(e.stageX / this.speed) - 1;
        let tapY = Math.ceil(e.stageY / this.speed) - 8;
        GameController.instance.selectIndex(new egret.Point(tapX, tapY));
    }

    updateTips(str: string): void {
        this.tips.text = '请' + str + '落子！';
    }

}