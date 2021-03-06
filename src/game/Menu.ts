class Menu extends eui.Component {

    private start: eui.Button;
    private lab: eui.TextInput;

    constructor() {
        super();
    }

    createChildren() {
        super.createChildren();
        this.start = new eui.Button();
        this.lab = new eui.TextInput();
        this.addChild(this.lab);
        this.addChild(this.start);

        this.start.label = '登录';
        this.start.horizontalCenter = 0;
        this.start.y = 700;

        this.lab.horizontalCenter = 0;
        this.lab.y = 650;
        this.lab.width = 300;
        this.lab.textDisplay.prompt = "输入房间id";
        this.lab.textDisplay.textAlign = egret.HorizontalAlign.CENTER;

        this.start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);

    }

    private onTap(): void {
        if (this.lab.text.trim() == "") {
            return;
        }
        let data: loginReq = {
            roomid: parseInt(this.lab.text)
        }
        Socket.instance.sendMsg(data, MsgId.login, this.onRes, this);
    }

    private onRes(data: loginRes): void {
        if (data.code != 0) {
            TipsUtil.show('当前房间人数已满！')
            return;
        }
        PlayerInfo.instance.roomId = parseInt(this.lab.text);
        PlayerInfo.instance.meColreBlack = data.meColreBlack;
        let { chess, result } = GameController.instance.init(data.pieceArr);
        UIManager.instance.show(chess);
        UIManager.instance.show(result, false);
    }
}