class GameController {
    /**棋盘 */
    private chessboard: Chessboard;
    /**结算 */
    private result: Result;

    private num: number;

    /**到我下了 */
    private isMe = true;
    /**我是黑子 */
    private isBlack = true;

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

    init(bg: Chessboard, result: Result): void {
        this.chessboard = bg;
        this.result = result;
        this.result.visible = false;
        this.chessboard.updateTips(this.isBlack ? '执黑棋方' : '执白棋方');
    }

    public selectIndex(point: egret.Point): void {
        // console.log('点击的位置' + point.x + "," + point.y);
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
        this.chessboard.addChild(piece);
        this.pieceArr.push(piece);

        this.num = 0;
        this.onLeft(point);
        this.onRight(point);
        this.onUp(point);
        this.onDown(point);
        this.onLeftUp(point);
        this.onLeftDown(point);
        this.onRightUp(point);
        this.onRightDown(point);

        if (this.num >= 4) {
            this.result.onShow(this.isBlack);
            return
        }
        this.isBlack = !this.isBlack;
        this.chessboard.updateTips(this.isBlack ? '执黑棋方' : '执白棋方');
    }

    private onLeft(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x - index && iterator.point.y == point.y) {
                this.num++;
                index++;
                this.onLeft(point, index);
                break;
            }
        }
    }
    private onRight(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x + index && iterator.point.y == point.y) {
                this.num++;
                index++;
                this.onRight(point, index);
                break;
            }
        }
    }
    private onUp(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x && iterator.point.y == point.y - index) {
                this.num++;
                index++;
                this.onUp(point, index);
                break;
            }
        }
    }
    private onDown(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x && iterator.point.y == point.y + index) {
                this.num++;
                index++;
                this.onDown(point, index);
                break;
            }
        }
    }
    private onLeftUp(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x - index && iterator.point.y == point.y - index) {
                this.num++;
                index++;
                this.onLeftUp(point, index);
                break;
            }
        }
    }
    private onLeftDown(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x - index && iterator.point.y == point.y + index) {
                this.num++;
                index++;
                this.onLeftDown(point, index);
                break;
            }
        }
    }
    private onRightUp(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x + index && iterator.point.y == point.y - index) {
                this.num++;
                index++;
                this.onRightUp(point, index);
                break;
            }
        }
    }
    private onRightDown(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != this.isBlack) continue;
            if (iterator.point.x == point.x + index && iterator.point.y == point.y + index) {
                this.num++;
                index++;
                this.onRightDown(point, index);
                break;
            }
        }
    }


    private isHas(point: egret.Point): boolean {
        for (const iterator of this.pieceArr) {
            if (iterator.point.equals(point)) {
                return true;
            }
        }
        return false;
    }

    reset(): void {
        this.isBlack = true;
        for (let i = 0; i < this.chessboard.numChildren; i++) {
            const element = this.chessboard.getChildAt(i);
            if (element instanceof Piece) {
                this.chessboard.removeChild(element);
                i--;
            }
        }
        this.pieceArr.splice(0);
        this.chessboard.updateTips(this.isBlack ? '执黑棋方' : '执白棋方');
    }
}