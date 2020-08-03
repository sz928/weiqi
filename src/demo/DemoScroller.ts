class DemoScroller extends eui.Component {
    public list: eui.List;
    public scr: eui.Scroller;

    constructor() {
        super();
        this.skinName = "Demo_scrollerSkin";
    }

    createChildren() {
        super.createChildren();

        this.list.dataProvider = new eui.ArrayCollection([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        this.list.addEventListener(eui.UIEvent.CHANGE, this.onChanged, this);
        this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
    }

    private onChanged(e: eui.UIEvent): void {

    }

    private onItemTap(e: eui.UIEvent): void {
        (e.target as eui.List).scaleY = 1.3;
        
    }
}