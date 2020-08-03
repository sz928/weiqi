class GameController {
    private bg: Background;

    private static _instance: GameController;
    public static get instance(): GameController {
        if (!this._instance) {
            this._instance = new GameController();
        }
        return this._instance;
    }

    constructor() {
    }

    init(bg: Background): void {
        this.bg = bg;
    }

    public selectIndex(point: egret.Point): void {
        console.log('点击的位置' + point.x + "," + point.y);

    }
}