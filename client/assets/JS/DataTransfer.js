//为了避免复杂，传什么消息，就调用什么，消息的传递应该像喊口令那样，不想封装太复杂了
let boardComponent = require("Board");
let WinCtrol = require("WindowController");

cc.Class({
    extends: cc.Component,
    properties: {
        board:boardComponent,
        editText:cc.EditBox,
        WindowController:WinCtrol
    },

    onLoad: function (){
        this.roomId = null;
        cc.wy.datactrl = this;
    },

    init:function (){
        //this.FBInstant = FBInstant;
        
    },

    initWebSocket:function(){
        this.userId = this.randomString(10);
        this.getText();
        cc.log("链接地址","ws://192.168.1.103:8080/gameRoom/"+this.userId+"/"+this.roomId+"/"+this.roomId);
        this.websocket = new WebSocket("ws://localhost:8080/gameRoom/"+this.userId+"/"+this.roomId+"/"+this.roomId);
        this.websocket.open = ()=>{
            cc.log("已经连通");
        }

        this.websocket.onmessage = (receivedMsg)=>{
            this.messageCallback(receivedMsg);
        }
    },

    randomString:function(len) {
        　　len = len || 32;
        　　let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        　　let maxPos = chars.length;
        　　let pwd = '';
        　　for (let i = 0; i < len; i++) {
        　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
    },

    sendMessage:function(info){
        //info.opponentId = this.opponentId;
        let message = JSON.stringify(info);
        this.websocket.send(message);
    },

    //获取输入框text的函数，临时的
    getText:function(info){
        this.roomId = this.editText.string;
        cc.log(this.editText.string);
    },

    messageCallback:function(message){
        cc.log("收到的websocket",message);
        let reciveData = JSON.parse(message.data);
        cc.log(reciveData);
        if(reciveData.messageType==1){

        }
        else if(reciveData.messageType==cc.wy.msgType.chessMove){
            cc.log("收到对手的信息了",reciveData);
            let msg = this.decryptMessageChessMove(reciveData);
            this.board.moveOpponentChess(msg);
        }
        else if(reciveData.messageType==cc.wy.msgType.opponentWin){
            this.WindowController.openWindowByName('SucessWindow',{"msg":"You Loss!"});
        }
    },

    decryptMessageChessMove:function(msg){
        
        let msg_ = {};

        msg_.xGezi = 8-msg.xGezi;
        msg_.yGezi = 10-msg.yGezi;
        msg_.id = msg.id;

        return msg_;
    }

});
