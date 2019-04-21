cc.Class({
    extends: cc.Component,

    properties: {
        gridType:cc.String
    },

    onLoad:function(){
        this.init();
    },
    init:function(){
        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            cc.log("移动");
            var newEvent = new cc.Event.EventCustom(this.gridType, true);
            this.node.dispatchEvent(newEvent);
        },this);
    },
    
})