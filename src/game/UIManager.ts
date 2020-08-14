class UIManager extends eui.Component {

    private static _instance: UIManager;
    static get instance(): UIManager {
        if (!this._instance) {
            this._instance = new UIManager();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    createChildren() {
        super.childrenCreated();
        this.width = this.stage.stageWidth;
        this.height = this.stage.stageHeight;
    }

    show(panel: eui.Component, closeOther: boolean = true) {
        if (closeOther) {
            this.removeChildren();
        }
        panel.verticalCenter = 0;
        panel.horizontalCenter = 0;
        this.addChild(panel);
    }
}