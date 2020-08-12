class GameController {
    /**棋盘 */
    private chessboard: Chessboard;
    /**结算 */
    private result: Result;

    /**到我下了 */
    private isMe: boolean;

    private pieceArr: Piece[];

    private static _instance: GameController;
    public static get instance(): GameController {
        if (!this._instance) {
            this._instance = new GameController();
        }
        return this._instance;
    }

    constructor() {
        this.pieceArr = [];
    }

    init(pieceArr: piece[]): eui.Component {
        if (!this.chessboard) {
            this.chessboard = new Chessboard();
            this.result = new Result();
        }
        this.result.visible = false;
        this.chessboard.updateTips(PlayerInfo.instance.nowColreBlack ? '执黑棋方落子！' : '执白棋方落子！');

        this.pieceArr.splice(0);
        for (const iterator of pieceArr) {
            let piece: Piece = PiecePool.instance.getOnePiece();
            piece.updateData(iterator.isBlack, new egret.Point(iterator.x, iterator.y));
            this.chessboard.addChild(piece);
            this.pieceArr.push(piece);
        }

        Socket.instance.on(MsgId.roomSync, this.roomSync, this);
        Socket.instance.on(MsgId.resultPush, this.onResultPush, this);
        Socket.instance.on(MsgId.playChessRes, this.onPlayChessRes, this);

        return this.chessboard;
    }

    private onResultPush(data: resultPush): void {
        let winColor = data.isBlackWin;
        this.result.onShow(winColor);
    }

    private roomSync(data: roomSync): void {
        if (data.playerCount < 2) {
            this.chessboard.touchChildren = false;
            this.chessboard.updateTips('等待其他玩家！！！')
        } else {
            this.chessboard.touchChildren = true;
            PlayerInfo.instance.nowColreBlack = data.nowColreBlack;
            this.chessboard.updateTips(PlayerInfo.instance.nowColreBlack ? '执黑棋方落子！' : '执白棋方落子！');
        }
    }

    public selectIndex(point: egret.Point): void {
        // console.log('点击的位置' + point.x + "," + point.y);
        if (!this.isMe) {
            TipsUtil.show('别着急，还没到你！')
            return
        }
        if (this.isHas(point)) {
            // alert('你还想摞着放？')
            TipsUtil.show('你还想摞着放？');
            return
        }

        let req: playChessReq = {
            piece: {
                x: point.x,
                y: point.y,
                isBlack: PlayerInfo.instance.meColreBlack
            }
        }
        Socket.instance.sendMsg(req, MsgId.playChessReq, this.onPlayChessRes, this);
    }

    private onPlayChessRes(data: playChessRes) {
        let point = new egret.Point(data.piece.x, data.piece.y);
        let piece: Piece = PiecePool.instance.getOnePiece();
        piece.updateData(data.piece.isBlack, point);
        this.chessboard.addChild(piece);
        this.pieceArr.push(piece);

        let nowColorIsBlack = !data.piece.isBlack;
        PlayerInfo.instance.nowColreBlack = nowColorIsBlack;
        // let selfWin: boolean = ResultUtil.result(point, this.pieceArr);
        // this.result.onShow(selfWin);
        this.chessboard.updateTips(nowColorIsBlack ? '执黑棋方落子！' : '执白棋方落子！');
    }
    private isHas(point: egret.Point): boolean {
        for (const iterator of this.pieceArr) {
            if (iterator.point.equals(point)) {
                return true;
            }
        }
        return false;
    }
    //重新开局
    reset(): void {
        for (let i = 0; i < this.chessboard.numChildren; i++) {
            const element = this.chessboard.getChildAt(i);
            if (element instanceof Piece) {
                this.chessboard.removeChild(element);
                i--;
            }
        }
        this.pieceArr.splice(0);
        Socket.instance.sendMsg('', MsgId.newGameRes, () => { }, this);
    }
}