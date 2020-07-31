class PieceManager {

    private instance: PieceManager;

    getInstance(): PieceManager {
        if (!this.instance) {
            this.instance = new PieceManager;
        }
        return this.instance;
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