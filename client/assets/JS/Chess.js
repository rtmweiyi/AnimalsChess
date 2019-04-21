cc.Class({
    extends: cc.Component,

    properties: {
        centerNode:cc.Node,
        rightNode:cc.Node,
        upNode:cc.Node,
        leftNode:cc.Node,
        downNode:cc.Node,
        jumpLeftNode:cc.Node,
        jumpRightNode:cc.Node,
        jumpDownNode:cc.Node,
        jumpUpNode:cc.Node
    },
    init:function (species,xGezi,yGezi,chessType,id){

        this.species = species;
        this.xGezi = xGezi;
        this.yGezi = yGezi;
        this.chessType = chessType;
        this.id = id;
        this.boardNode = cc.find("Canvas/Controller/Board");
        this.boardNode.addChild(this.node);

        this.board = this.boardNode.getComponent("Board");
        this.onTouch();
        this.setPosition(this.xGezi,this.yGezi);
        this.listenFuc();
        this.hideAllGrid();
    },

    onTouch: function () {
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            cc.log('点击动物');
            if(this.chessType==cc.wy.chessSide.My){
                if(cc.wy.myTurnSymbol==true){
                    this.node.zIndex = 99;
                    this.board.closeOtherChess();
                    this.checkAround();
                }
            }
        },this);

    },

    listenFuc:function(){


        this.node.on('up', function (event) {
            let xGezi = this.xGezi;
            let yGezi = this.yGezi-1;
            
            this.board.deleteChessByPos(xGezi,yGezi);
            
            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };

            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('down', function (event) {
            let xGezi = this.xGezi;
            let yGezi = this.yGezi + 1;

            this.board.deleteChessByPos(xGezi,yGezi);
            
            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };

            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('left', function (event) {
            let xGezi = this.xGezi - 1;
            let yGezi = this.yGezi;
            
            this.board.deleteChessByPos(xGezi,yGezi);
            
            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };
            
            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('right', function (event) {
            let xGezi = this.xGezi + 1;
            let yGezi = this.yGezi;

            this.board.deleteChessByPos(xGezi,yGezi);

            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };
            
            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);


        this.node.on('jumpUp', function (event) {
            let xGezi = this.xGezi;
            let yGezi = this.yGezi - 4;

            this.board.deleteChessByPos(xGezi,yGezi);

            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };

            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('jumpDown', function (event) {
            let xGezi = this.xGezi;
            let yGezi = this.xGezi + 4;

            this.board.deleteChessByPos(xGezi,yGezi);

            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };

            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('jumpLeft', function (event) {
            let xGezi = this.xGezi - 3;
            let yGezi = this.yGezi;
            this.board.deleteChessByPos(xGezi,yGezi);

            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };
            
            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

        this.node.on('jumpRight', function (event) {
            let xGezi = this.xGezi + 3;
            let yGezi = this.yGezi;

            this.board.deleteChessByPos(xGezi,yGezi);
            
            let userData = {
                "xGezi":xGezi,
                "yGezi":yGezi,
                "species":this.species,
                "id":this.id,
                "messageType":cc.wy.msgType.chessMove
            };
            
            this.setPosition(xGezi,yGezi);
            this.hideAllGrid();
            cc.wy.datactrl.sendMessage(userData);
            this.board.checkWinner();
        },this);

    },

    hideAllGrid:function(){
        this.rightNode.active = false;
        this.upNode.active    = false;
        this.leftNode.active  = false;
        this.downNode.active  = false;
        this.centerNode.active= false;

        this.jumpRightNode.active = false;
        this.jumpUpNode.active    = false;
        this.jumpLeftNode.active  = false;
        this.jumpDownNode.active  = false;
    },

    onLoad:function () {

        //this.board = this.boardNode.getComponent(Board);
        //this.onTouch();
        //this.setPosition(this.xGezi,this.yGezi);
        //this.listenFuc();
    },

    

    start:function(){
        
    },

    showRoute:function (direction){
        var pos = cc.wy.board.getPosByDrt('')
    },

    setdirection:function(xGezi,yGezi){

    },

    setPosition:function(xGezi,yGezi){
        cc.log("zIndex",this.node.zIndex);
        this.xGezi = xGezi;
        this.yGezi = yGezi;
        
        let pos = this.board.getPos(xGezi,yGezi);
        this.node.x = pos.x;
        this.node.y = pos.y;
    },

    //检查棋子周围
    checkAround:function(){
        let data={};
        data.yGezi = this.yGezi;
        data.xGezi = this.xGezi;
        data.species = this.species;
        data.id = this.id;

        let a_left  = this.board.checkActiveNode(data,this.xGezi-1,this.yGezi);
        let a_right = this.board.checkActiveNode(data,this.xGezi+1,this.yGezi);
        let a_up    = this.board.checkActiveNode(data,this.xGezi,this.yGezi-1);
        let a_down   = this.board.checkActiveNode(data,this.xGezi,this.yGezi+1);

        this.rightNode.active = a_right;
        this.upNode.active    = a_up;
        this.leftNode.active  = a_left;
        this.downNode.active  = a_down;
        this.centerNode.active= true;

        //特殊，检查老虎和狮子是否能跳河
        if(this.species==cc.wy.animalType.Tiger||this.species==cc.wy.animalType.Iion){
            let jump_left  = this.board.checkJumpWater(data,"left");
            let jump_right = this.board.checkJumpWater(data,"right");
            let jump_up    = this.board.checkJumpWater(data,"up");
            let jump_down  = this.board.checkJumpWater(data,"down");

            this.jumpRightNode.active = jump_right;
            this.jumpUpNode.active    = jump_up;
            this.jumpLeftNode.active  = jump_left;
            this.jumpDownNode.active  = jump_down;
        }
    },

    //添加SpriteFrame
    addSprite:function(img){
        let spriteX = this.getComponent(cc.Sprite);
        spriteX.spriteFrame = img;
    },
    
    getChessInfo:function(){
        let data={};
        data.yGezi = this.yGezi;
        data.xGezi = this.xGezi;
        data.species = this.species;
        data.id = this.id;
        data.chessType = this.chessType;
        return data;
    },

    reMove:function(){
        this.node.destroy();
    }

});
