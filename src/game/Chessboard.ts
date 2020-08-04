class Chessboard extends eui.Component {

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
        this.width = this.height = stageW - config.speedLeft;
        group.width = this.width;
        group.height = this.height;
        config.speed = this.width / (config.lineNum - 1);
        for (let i = 0; i < config.lineNum; i++) {
            this.drawLine(i, config.speed, group);
        }

        let arr: { x: number, y: number }[] = [{ x: 3, y: 3 }, { x: config.lineNum - 3, y: 3 }, { x: 3, y: config.lineNum - 3 }, { x: config.lineNum - 3, y: config.lineNum - 3 }];
        for (const i in arr) {
            let point = arr[i];
            let dian1 = new egret.Shape();
            dian1.graphics.beginFill(0x000000);
            dian1.graphics.drawCircle(point.x * config.speed, point.y * config.speed, 8);
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
        let tapX = Math.ceil(e.stageX / config.speed) - 1;
        let tapY = Math.ceil(e.stageY / config.speed) - 7;
        GameController.instance.selectIndex(new egret.Point(tapX, tapY));
    }

    updateTips(str: string): void {
        this.tips.text = '请' + str + '落子！';
    }

}

let config = {
    /**左右间距 */
    speedLeft: 60,
    /**点与点的间距 （计算出来的）不用负值*/
    speed: 0,
    /**线条数 （n*n）*/
    lineNum: 15
}