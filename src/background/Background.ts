class Background extends eui.Component {

    private speedLeft = 30;
    private speed: number;
    constructor() {
        super();
    }

    protected childrenCreated() {
        super.createChildren();
        this.init();
    }

    private init() {
        const stageW = this.stage.stageWidth;
        this.width = this.height = stageW - this.speedLeft;
        this.speed = this.width / 18;
        for (let i = 0; i < 19; i++) {
            this.drawLine(i, this.speed);
        }

        let arr = [3, 15];
        for (const index of arr) {
            let dian1 = new egret.Shape();
            dian1.graphics.lineStyle(16, 0x000000);
            dian1.graphics.lineTo(index * this.speed, index * this.speed);
            dian1.graphics.endFill();
            this.addChild(dian1);
            let dian2 = new egret.Shape();
            dian2.graphics.lineStyle(16, 0x000000);
            dian2.graphics.lineTo(index * this.speed, (18 - index) * this.speed);
            dian2.graphics.endFill();
            this.addChild(dian2);
        }

        this.cacheAsBitmap = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }

    private drawLine(i: number, speed: number): void {
        let line1 = new egret.Shape();
        this.addChild(line1);
        line1.graphics.lineStyle(3, 0xffffff);
        line1.graphics.moveTo(i * speed, 0);
        line1.graphics.lineTo(i * speed, this.height);
        line1.graphics.endFill();

        let line2 = new egret.Shape();
        this.addChild(line2);
        line2.graphics.lineStyle(3, 0xffffff);
        line2.graphics.moveTo(0, i * speed);
        line2.graphics.lineTo(this.width, i * speed);
        line2.graphics.endFill();
    }

    private onTap(e: egret.TouchEvent): void {
        let tapX = Math.ceil(e.stageX / this.speed);
        let tapY = Math.ceil(e.stageY / this.speed);
        GameController.instance.selectIndex(new egret.Point(tapX, tapY));
    }
}