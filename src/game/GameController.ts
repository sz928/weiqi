class GameController {
    private bg: Chessboard;

    /**到我下了 */
    private isMe = true;
    /**我是黑子 */
    private isBlack = true;

    public speed: number;

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

    init(bg: Chessboard): void {
        this.bg = bg;
    }

    public selectIndex(point: egret.Point): void {
        console.log('点击的位置' + point.x + "," + point.y);
        if (!this.isMe) {
            alert('别着急，还没到你！')
            return
        }
        if (this.isHas(point)) {
            alert('你还想摞着放？')
            return
        }
        let piece: Piece = PiecePool.instance.getOnePiece();
        piece.updateData(this.isBlack, point);
        this.bg.addChild(piece);
        this.pieceArr.push(piece);
        this.isBlack = !this.isBlack;
    }

    private isHas(point: egret.Point): boolean {
        for (const iterator of this.pieceArr) {
            if (iterator.point.equals(point)) {
                return true;
            }
        }
        return false;
    }
}