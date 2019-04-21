cc.Class({
    extends: cc.Component,

    properties: {
        windowRoot:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:
    

    setPosition:function () {

    },

    show:function (position) {
        this.setPostion(position);
    },

    close:function () {
        this.node.destroy();
    },

    init:function (info){
        cc.log("info in super window",info);
        this.info = info;
    }
});
