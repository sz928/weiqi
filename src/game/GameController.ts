class GameController {
    /**棋盘 */
    private chessboard: Chessboard;
    /**结算 */
    private result: Result;

    private num: number;

    /**到我下了 */
    private isMe = true;

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
        this.chessboard.updateTips(PlayerInfo.instance.meColreBlack ? '执黑棋方落子！' : '执白棋方落子！');

        if (PlayerInfo.instance.playerCount < 2) {
            this.chessboard.touchChildren = false;
            this.chessboard.updateTips('等待其他玩家！！！')
        } else {
            this.chessboard.touchChildren = true;
        }

        this.pieceArr.splice(0);
        for (const iterator of pieceArr) {
            let piece: Piece = PiecePool.instance.getOnePiece();
            piece.updateData(PlayerInfo.instance.meColreBlack, new egret.Point(iterator.x, iterator.y));
            this.chessboard.addChild(piece);
            this.pieceArr.push(piece);
        }

        return this.chessboard;
    }

    public selectIndex(point: egret.Point): void {
        // console.log('点击的位置' + point.x + "," + point.y);
        if (!this.isMe) {
            alert('别着急，还没到你！')
            return
        }
        if (this.isHas(point)) {
            // alert('你还想摞着放？')
            TipsUtil.show('你还想摞着放？', this.chessboard);
            return
        }

        let piece: Piece = PiecePool.instance.getOnePiece();
        piece.updateData(PlayerInfo.instance.meColreBlack, point);
        this.chessboard.addChild(piece);
        this.pieceArr.push(piece);

        this.num = 0;
        this.onLeft(point);
        this.onRight(point);
        if (this.num >= 4) {
            this.result.onShow(PlayerInfo.instance.meColreBlack);
            return
        }

        this.num = 0;
        this.onUp(point);
        this.onDown(point);
        if (this.num >= 4) {
            this.result.onShow(PlayerInfo.instance.meColreBlack);
            return
        }

        this.num = 0;
        this.onLeftUp(point);
        this.onRightDown(point);
        if (this.num >= 4) {
            this.result.onShow(PlayerInfo.instance.meColreBlack);
            return
        }

        this.num = 0;
        this.onLeftDown(point);
        this.onRightUp(point);
        if (this.num >= 4) {
            this.result.onShow(PlayerInfo.instance.meColreBlack);
            return
        }
        this.chessboard.updateTips(PlayerInfo.instance.meColreBlack ? '执黑棋方' : '执白棋方');
    }

    private onLeft(point: egret.Point, index: number = 1): void {
        for (const iterator of this.pieceArr) {
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
            if (iterator.isBlack != PlayerInfo.instance.meColreBlack) continue;
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
        for (let i = 0; i < this.chessboard.numChildren; i++) {
            const element = this.chessboard.getChildAt(i);
            if (element instanceof Piece) {
                this.chessboard.removeChild(element);
                i--;
            }
        }
        this.pieceArr.splice(0);
        this.chessboard.updateTips(PlayerInfo.instance.meColreBlack ? '执黑棋方' : '执白棋方');
    }
}