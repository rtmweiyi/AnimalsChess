cc.Class({
    extends: cc.Component,

    properties: {
        sprite:cc.Sprite,
        radius:0
    },

    onTouch: function () {
        this.node.on(cc.Node.EventType.TOUCH_MOVE,function(event){
            var location = event.getLocation();
            //console.log(location);
            var lo = this.node.parent.convertToNodeSpaceAR(location); 
            this.node.setPosition(lo);
            // var delta = event.getDelta();
            // cc.log(delta);
            // this.node.x += delta.x;
            // this.node.y += delta.y;
        },this);

        this.node.on(cc.Node.EventType.TOUCH_END,function(event){
            //

            var userData = {};

            cc.log("yes, already send");

            var newEvent = new cc.Event.EventCustom('need_to_listen', true);

            userData = this.node.convertToWorldSpaceAR(this.node.position);
            userData.radius = this.radius;
            newEvent.setUserData(userData);

            this.node.dispatchEvent(newEvent);

        },this);

    },
    onLoad :function () {
        this.onTouch();
    },
});
