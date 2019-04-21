let SuperWindow = require("SuperWindow");
let GlobalComponent = require("GlobalComponent");

cc.Class({
    extends: SuperWindow,

    properties: {
        Text:cc.Label
    },

    init:function(info){
        cc.log("infoIn sucessWindow",info);
        this._super(info);
        this.Text.string = info.msg;
    },


    restart: function(){
        GlobalComponent.board.restart();
    }
});