var utils = cc.Class({
    
    //计算距离
    calculate:function (point1,point2){
        var distanceX = Math.abs(point1.x-point2.x);
        var distanceY = Math.abs(point1.y-point2.y);
        var distance = Math.sqrt(Math.pow(distanceX,2)+Math.pow(distanceY,2));

        var distanceSmall = point1.radius+point2.radius;

        cc.log(distanceX,distanceY,distance,distanceSmall);
        if(distance < distanceSmall){
            return true;
        }else{
            return false;
        }
    },

});

let util = new utils(); 

let imageName = {
    Mouse:"mouse",
    Cat:"cat",
    Dog:"dog",
    Wolf:"wolf",
    Leopard:"leopard",
    Tiger:"tiger",
    Iion:"lion",
    Elephant:"elephant"
}

let animalType = {
    NoAnimal:0,
    Mouse:1,
    Cat:2,
    Dog:3,
    Wolf:4,
    Leopard:5,
    Tiger:6,
    Iion:7,
    Elephant:8
}

let terrainType = {
    Ground:-1,
    MyTrap:-2,
    OpponentTrap:-3,
    Water:-4,
    OpponentHole:-5,
    MyHole:-6,
    
}

let chessSide = {
    Opponent:0,
    My:1
}

let msgType = {
    chessMove:4,
    opponentWin:5
}

//let userId =  FBInstant.player.getID();

cc.wy =  {
    CENTER:cc.v2(0,0),
    utils:util,
    imageName:imageName,
    animalType:animalType,
    terrainType:terrainType,
    chessSide:chessSide,
    datactrl:null,//在加载玩DataTransfer后会加入
    myTurnSymbol:true,
    msgType:msgType,
    //userId:userId
};