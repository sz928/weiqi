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
        this.ws.addEventListener(egret.IOErrorEvent.IO_ERROR, () => { TipsUtil.show('请先连接网络！') }, null)
        this.connect();
        this.funcHandler = new Map();
    }

    private connect(): void {
        let url = '121.199.51.226';//localhost
        if (!this.isConnect) this.ws.connect(url, 8080);
    }

    private onSocketOpen(): void {
        console.log('连接成功');
        this.isConnect = true;
    }

    sendMsg(_data: any, _msgId: MsgId, _func: Function, _thisObj: Object) {
        this.connect();
        let msg = MsgId[_msgId];
        if (!this.funcHandler.has(msg)) {
            this.funcHandler.set(msg, { func: _func, obj: _thisObj })
        }

        let data = JSON.stringify(_data);
        this.ws.writeUTF(msg + '+' + data);
    }

    on(_msgId: MsgId, _func: Function, _thisObj: object) {
        let msg = MsgId[_msgId];
        this.funcHandler.set(msg, { func: _func, obj: _thisObj });
    }

    private recMsg(_data: string): void {
        let index = _data.indexOf('+');
        let name = _data.substring(0, index);
        let data = JSON.parse(_data.substr(index + 1));
        let value = this.funcHandler.get(name);
        value.func.call(value.obj, data);
    }
}