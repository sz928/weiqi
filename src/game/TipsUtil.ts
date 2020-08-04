class TipsUtil {

    static show(msg: string, target: egret.DisplayObjectContainer) {
        let text: egret.TextField = new egret.TextField();
        text.text = msg;
        target.addChild(text);
        text.y = target.height - 80;
        text.alpha = 0.2;
        text.x = target.width / 2;
        text.textAlign = egret.HorizontalAlign.CENTER;
        egret.Tween.get(text).to({ y: target.height - 150, alpha: 1 }, 100).wait(800).call(function () {
            target.removeChild(text);
        }, this)
    }
}