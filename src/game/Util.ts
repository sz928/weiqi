class TipsUtil {

    static show(msg: string, target: egret.DisplayObjectContainer = UIManager.instance) {
        let text: eui.Label = new eui.Label();
        text.text = msg;
        target.addChildAt(text, 999);
        text.y = target.height - 80;
        text.alpha = 0.2;
        text.horizontalCenter = 0;
        text.textAlign = egret.HorizontalAlign.CENTER;
        egret.Tween.get(text).to({ y: target.height - 150, alpha: 1 }, 100).wait(800).call(function () {
            target.removeChild(text);
        }, this)
    }
}

class ResultUtil {
    private static num = 0;
    private static pieceArr;

    /**判断自己是否胜利 */
    static result(point: egret.Point, pieceArr: Piece[]): boolean {
        this.pieceArr = pieceArr;
        this.num = 0;
        this.onLeft(point);
        this.onRight(point);
        if (this.num >= 4) {
            return true
        }

        this.num = 0;
        this.onUp(point);
        this.onDown(point);
        if (this.num >= 4) {
            return true
        }

        this.num = 0;
        this.onLeftUp(point);
        this.onRightDown(point);
        if (this.num >= 4) {
            return true
        }

        this.num = 0;
        this.onLeftDown(point);
        this.onRightUp(point);
        if (this.num >= 4) {
            return true
        }

        return false;
    }

    private static onLeft(point: egret.Point, index: number = 1): void {
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
    private static onRight(point: egret.Point, index: number = 1): void {
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
    private static onUp(point: egret.Point, index: number = 1): void {
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
    private static onDown(point: egret.Point, index: number = 1): void {
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
    private static onLeftUp(point: egret.Point, index: number = 1): void {
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
    private static onLeftDown(point: egret.Point, index: number = 1): void {
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
    private static onRightUp(point: egret.Point, index: number = 1): void {
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
    private static onRightDown(point: egret.Point, index: number = 1): void {
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
}