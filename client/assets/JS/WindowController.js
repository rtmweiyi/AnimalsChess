cc.Class({
    extends: cc.Component,

    properties: {
    },

    start:function (){
        //this.createWindow(windowName="SucessWindow",position=Global.CENTER);
    },

    update:function (dt){
    },
    openWindowByName:function (winName,info,winNode){



        //通过传入一个回调函数,在加载完资源后再打开窗口
        cc.log("prefabs/windowResources/"+winName);

        cc.loader.loadRes("prefabs/windowResources/"+winName,this.callBackFuc(info,winNode))
    },

    callBackFuc: function(info,winNode){

        cc.log('winNode',winNode);
        let self = this;

        return (function(err,prefab){
                if(!winNode){
                    winNode=self.node;
                }
                let newNode = cc.instantiate(prefab);
                let Component = newNode.getComponent("SuperWindow");
                winNode.addChild(newNode);
                Component.init(info);
                });
    },
    open:function(){
        this.openWindowByName('SucessWindow');
    }
});