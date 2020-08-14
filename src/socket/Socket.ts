class Socket {
    private static _instance: Socket;
    public static get instance(): Socket {
        if (!this._instance) {
            this._instance = new Socket();
        }
        return this._instance;
    }

    private ws: egret.WebSocket;
    private funcHandler: Map<string, { func: Function, obj: Object }>;
    private isConnect: boolean = false;
    private heartbeatInterval: number = 3 * 1000;
    private heartbeatId: number;

    constructor() {
    }

    private onReceiveMessage(): void {
        var msg = this.ws.readUTF();
        console.log("收到数据：" + msg);
        this.recMsg(msg);
    }

    init(): void {
        this.ws = new egret.WebSocket();
        this.ws.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.ws.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.ws.addEventListener(egret.IOErrorEvent.IO_ERROR, function () {
            TipsUtil.show('请先连接网络！');
            this.isConnect = false;
        }, this)
        this.connect();
        this.funcHandler = new Map();
    }

    private connect(): void {
        let url = RELEASE ? '121.199.51.226' : 'localhost';
        if (!this.isConnect) this.ws.connect('121.199.51.226', 8080);
    }

    private onSocketOpen(): void {
        console.log('连接成功');
        this.isConnect = true;
        this.sendHeart();
        this.onHraet();
    }

    private sendHeart(): void {
        let req: heartbeat = {
            name: 'ping'
        }
        this.sendMsg(req, MsgId.heartbeat, () => { }, this);
        let time = new Date();
        console.log('心跳：' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());
    }

    private onHraet(): void {
        if (this.heartbeatId != null) {
            egret.clearInterval(this.heartbeatId);
            this.heartbeatId = null;
        }
        this.heartbeatId = egret.setInterval(() => {
            this.sendHeart()
        }, this, this.heartbeatInterval);
    }

    sendMsg(_data: any, _msgId: MsgId, _func: Function, _thisObj: Object) {
        this.connect();
        let msg = MsgId[_msgId];
        if (!this.funcHandler.has(msg)) {
            this.funcHandler.set(msg, { func: _func, obj: _thisObj })
        }

        let data = { cmd: msg, data: _data }
        let sendData: string = JSON.stringify(data);
        this.ws.writeUTF(sendData);
    }

    on(_msgId: MsgId, _func: Function, _thisObj: object) {
        let msg = MsgId[_msgId];
        this.funcHandler.set(msg, { func: _func, obj: _thisObj });
    }

    private recMsg(_data: string): void {
        let { cmd, data } = JSON.parse(_data);
        let value = this.funcHandler.get(cmd);
        value.func.call(value.obj, data);
    }
}