class Background extends eui.Component {

    private speed = 30;
    constructor() {
        super();
    }

    protected childrenCreated() {
        super.createChildren();
        this.init();
    }

    private init() {
        const stageW = this.stage.stageWidth;
        const stageH = this.stage.stageHeight;
        this.width = this.height = stageH - this.speed;
        for (let i = 0; i < 19; i++) {
            this.drawLine(i);
        }

    }

    private drawLine(i: number): void {
        const speed = this.width / 18;

        let line1 = new egret.Shape();
        this.addChild(line1);
        line1.graphics.lineStyle(2);
        line1.graphics.lineTo(i * speed, 0);
        line1.graphics.moveTo(i * speed, this.height);
        line1.graphics.endFill();

        let line2 = new egret.Shape();
        this.addChild(line2);
        line2.graphics.lineStyle(2);
        line2.graphics.lineTo(0, i * speed);
        line2.graphics.moveTo(this.width, i * speed);
        line2.graphics.endFill();

        if (i == 3) {
            let dian = new egret.Shape();
            dian.graphics.lineStyle(5);
        }
    }
}