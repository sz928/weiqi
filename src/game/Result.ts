class Result extends eui.Component {
    private maskBg: eui.Rect;
    private title: eui.Label;
    private reset: eui.Button;
    constructor() {
        super();
    }

    createChildren(): void {
        super.createChildren();
        this.maskBg = new eui.Rect;
        this.addChild(this.maskBg);
        this.title = new eui.Label;
        this.addChild(this.title);
        this.reset = new eui.Button;
        this.addChild(this.reset);
        this.init();
    }

    private init(): void {
        this.maskBg.width = this.stage.stageWidth;
        this.maskBg.height = this.stage.stageHeight;
        this.maskBg.tint = 0xffffff;
        this.maskBg.alpha = 0.7;
        this.title.horizontalCenter = 0;
        this.title.y = 300;
        this.reset.horizontalCenter = 0;
        this.reset.y = 400;
        this.reset.label = "重新开始";

        this.reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
    }

    onShow(blackWin: boolean): void {
        this.visible = true;
        this.title.text = blackWin ? "黑方胜" : "白方胜";
    }

    private onTap(): void {
        GameController.instance.reset();
        this.visible = false;
    }
}