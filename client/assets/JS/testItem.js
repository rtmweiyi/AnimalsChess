let Board = require('Board');

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.boardNode = cc.find("Canvas/Controller/Stage/Board");
        //this.boardNode.addChild(this.node);
        cc.log("testItem onLoad************************************************************");
        this.board = this.boardNode.getComponent("Chess");
    },

    start () {

    },

    // update (dt) {},
});
