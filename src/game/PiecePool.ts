class PiecePool {

    private static _instance: PiecePool;

    static get instance(): PiecePool {
        if (!this._instance) {
            this._instance = new PiecePool;
        }
        return this._instance;
    }

    private piecePood: Piece[];

    private constructor() {
        this.piecePood = [];
    }

    /**
     * 获取对象池中的对象
     */
    public getOnePiece(): Piece {
        let piece: Piece;
        if (this.piecePood.length <= 0) {
            piece = new Piece();
        } else {
            piece = this.piecePood.pop();
        }
        return piece;
    }
}