cc.Class({
    extends: cc.Component,

    properties: {
        radius:0
    },

    onLoad: function (){
    },
    runAction: function (point1){
        var point2 = {};
        point2 = this.node.convertToWorldSpaceAR(this.node.position);

        point2.radius = this.radius;

        cc.log(cc.wy.utils);
        cc.log(point2);

        var collision = cc.wy.utils.calculate(point1,point2);

        if(collision){
            var anim = this.getComponent(cc.Animation);
            anim.play();
        }
    },
});