class PlayerInfo {

    private static _instance: PlayerInfo;
    static get instance(): PlayerInfo {
        if (!this._instance) {
            this._instance = new PlayerInfo();
        }
        return this._instance;
    }

    constructor() {
    }
    // 当前玩家执棋颜色
    public meColreBlack: boolean;

}