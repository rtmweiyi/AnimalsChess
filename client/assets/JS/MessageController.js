var Item = require("Item");


cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad:function(){
        this.node.on('need_to_listen', function (event) {
            console.log('oh ooooo from messageCOntroller');
            var itemNode = cc.find("/Stage/Item",this.node);
            cc.log(itemNode);
            var item = itemNode.getComponent(Item);
            item.runAction(event.getUserData());
          },this);
    },

})