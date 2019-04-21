let Chess = require("Chess");
let WinCtrol = require("WindowController");
let GlobalComponent = require("GlobalComponent");

cc.Class({
    extends: cc.Component,

    properties: {
        WindowController:WinCtrol
    },

    onLoad:function (){
        this.init();
        this.putAnimalToBoard();
        this.chessList = [];
        GlobalComponent.board = this;
    },
    
    //返回坐标
    getPos:function(v1,v2){
        let pos = {};

        if(v1<this.xMiddle && v1>0){
            pos.x = v1*this.boxWidth-this.board.x/2-this.boxWidth/2;
        }else if(this.xMiddle<=v1 && v1<=this.xGezi){
            pos.x = (v1-this.xMiddle)*this.boxWidth;
        }else{
            pos = null;
        }
        
        if(v2<this.yMiddle && v2>0){
            pos.y = this.board.y/2-v2*this.boxHeight+this.boxHeight/2;
        }else if(this.yMiddle<=v2 && v2<=this.yGezi){
            pos.y = -(v2-this.yMiddle)*this.boxHeight;
        }else{
            pos = null;
            return pos;
        }

        return pos;
    },
    init:function(){
        this.board = {x:this.node.width,y:this.node.height};
        //7列
        this.xGezi = 7;
        //9行
         this.yGezi = 9;

        this.xMiddle= 4;
        this.yMiddle= 5;

        this.boxWidth = this.board.x/this.xGezi;
        this.boxHeight = this.board.y/this.yGezi;

        this.boardData = new Array(this.xGezi);
        for(let i=0;i<this.xGezi;i++){
            this.boardData[i] = new Array(this.col);
            for(let j=0;j<this.yGezi;j++){
                this.boardData[i][j] = cc.wy.terrainType.Ground;
            }
        }

        cc.log("格子数据结构",this.boardData);

        //初始化地形(水)
        this.boardData[1][3]=cc.wy.terrainType.Water;
        this.boardData[2][3]=cc.wy.terrainType.Water;
        this.boardData[1][4]=cc.wy.terrainType.Water;
        this.boardData[2][4]=cc.wy.terrainType.Water;
        this.boardData[1][5]=cc.wy.terrainType.Water;
        this.boardData[2][5]=cc.wy.terrainType.Water;
        this.boardData[4][3]=cc.wy.terrainType.Water;
        this.boardData[5][3]=cc.wy.terrainType.Water;
        this.boardData[4][4]=cc.wy.terrainType.Water;
        this.boardData[5][4]=cc.wy.terrainType.Water;
        this.boardData[4][5]=cc.wy.terrainType.Water;
        this.boardData[5][5]=cc.wy.terrainType.Water;

        //初始化地形(陷阱)
        this.boardData[2][0]=cc.wy.terrainType.OpponentTrap;
        this.boardData[4][0]=cc.wy.terrainType.MyTrap;
        this.boardData[3][1]=cc.wy.terrainType.OpponentTrap;
        this.boardData[2][8]=cc.wy.terrainType.MyTrap;
        this.boardData[4][8]=cc.wy.terrainType.OpponentTrap;
        this.boardData[3][7]=cc.wy.terrainType.MyTrap;

        //初始化地形(洞)
        this.boardData[3][0]=cc.wy.terrainType.OpponentHole;
        this.boardData[3][8]=cc.wy.terrainType.MyHole;
    },

    putAnimalToBoard:function(){
        //添加敌方(上侧)的动物
        this.addAnimal(cc.wy.imageName.Tiger,cc.wy.animalType.Tiger,7,1,cc.wy.chessSide.Opponent,0);
        this.addAnimal(cc.wy.imageName.Elephant,cc.wy.animalType.Elephant,7,3,cc.wy.chessSide.Opponent,1);
        this.addAnimal(cc.wy.imageName.Cat,cc.wy.animalType.Cat,6,2,cc.wy.chessSide.Opponent,2);
        this.addAnimal(cc.wy.imageName.Wolf,cc.wy.animalType.Wolf,5,3,cc.wy.chessSide.Opponent,3);
        this.addAnimal(cc.wy.imageName.Leopard,cc.wy.animalType.Leopard,3,3,cc.wy.chessSide.Opponent,4);
        this.addAnimal(cc.wy.imageName.Dog,cc.wy.animalType.Dog,2,2,cc.wy.chessSide.Opponent,5);
        this.addAnimal(cc.wy.imageName.Iion,cc.wy.animalType.Iion,1,1,cc.wy.chessSide.Opponent,6);
        this.addAnimal(cc.wy.imageName.Mouse,cc.wy.animalType.Mouse,1,3,cc.wy.chessSide.Opponent,7);

        //添加我方(下侧)的动物
        this.addAnimal(cc.wy.imageName.Mouse,cc.wy.animalType.Mouse,7,7,cc.wy.chessSide.My,7);
        this.addAnimal(cc.wy.imageName.Iion,cc.wy.animalType.Iion,7,9,cc.wy.chessSide.My,6);
        this.addAnimal(cc.wy.imageName.Dog,cc.wy.animalType.Dog,6,8,cc.wy.chessSide.My,5);
        this.addAnimal(cc.wy.imageName.Leopard,cc.wy.animalType.Leopard,5,7,cc.wy.chessSide.My,4);
        this.addAnimal(cc.wy.imageName.Wolf,cc.wy.animalType.Wolf,3,7,cc.wy.chessSide.My,3);
        this.addAnimal(cc.wy.imageName.Cat,cc.wy.animalType.Cat,2,8,cc.wy.chessSide.My,2);
        this.addAnimal(cc.wy.imageName.Elephant,cc.wy.animalType.Elephant,1,7,cc.wy.chessSide.My,1);
        this.addAnimal(cc.wy.imageName.Tiger,cc.wy.animalType.Tiger,1,9,cc.wy.chessSide.My,0);
    },

    addAnimal:function(SpriteName,species,xGezi,yGezi,side,id){

        let p = new Promise((resolve,reject)=>{
            cc.loader.loadRes("atlas/"+SpriteName,cc.SpriteFrame,(err,sprite)=>{
                resolve(sprite);
            });
        });

        p.then(img=>{
            cc.loader.loadRes("prefabs/item/animal",(err,prefab)=>{
                let newNode = cc.instantiate(prefab);
                let newNodeComponent = newNode.getComponent(Chess);
                newNodeComponent.addSprite(img);
                //this.node.addChild(newNode);
                newNodeComponent.init(species,xGezi,yGezi,side,id);
                this.chessList.push(newNodeComponent);
            });
        });
        // p.then(this.addAnimalNode)
        // .then(this.initAnimal(species,row,col,side));
    },

    reMoveAnimal:function(){

    },

    addAnimalNode:function(img){
        cc.log("img",img);
        cc.log("this in addAnimalNode",this)
        return new Promise((resolve,reject)=>{
            cc.log("Fx self",this);
            cc.loader.loadRes("prefabs/item/animal",(err,prefab)=>{
                let boardNode=this.node;
                let newNode = cc.instantiate(prefab);
                newNode.addSprite(img);
                boardNode.addChild(newNode);});
                cc.log("加载完node",newNode);
                resolve(newNode);
        });
    },

    initAnimal:function(species,xGezi,yGezi,side){
        return (function(node){
            cc.log("结束，初始化node",node);
            node.init(species,xGezi,yGezi,side);
        })
    },

    checkActiveNode: function(info,xGezi,yGezi){
        if(xGezi>this.xGezi||yGezi>this.yGezi||xGezi<=0||yGezi<=0){
            return false;
        }else{
            if(info.species==cc.wy.animalType.Mouse){
                let mouseInWater=this.boardData[info.xGezi-1][info.yGezi-1]==cc.wy.terrainType.Water;
                if(mouseInWater){
                    if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.Water){
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else{
                            return true;
                        }
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyHole){
                        return false;
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.OpponentHole){
                        return true;               
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyTrap){
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else{
                            return true;
                        }
                    }else{
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        if(chessInfo){
                            if(chessInfo.chessType==cc.wy.chessSide.My){
                                return false;
                            }else if(chessInfo.species==cc.wy.animalType.Mouse){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }
                }else{
                    if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.Water){
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else{
                            return true;
                        }
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyHole){
                        return false;
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.OpponentHole){
                        return true;               
                    }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyTrap){
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else{
                            return true;
                        }
                    }else{
                        let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                        cc.log("是否有chessInfo",chessInfo);
                        if(chessInfo){
                            if(chessInfo.chessType==cc.wy.chessSide.My){
                                return false;
                            }else if(chessInfo.species==cc.wy.animalType.Elephant||chessInfo.species==cc.wy.animalType.Mouse){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }
                }
            }else if(info.species==cc.wy.animalType.Elephant){
                if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.Water){
                    return false;
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyHole){
                    return false;
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.OpponentHole){
                    return true;
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyTrap){
                    let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                    if(chessInfo.chessType==cc.wy.chessSide.My){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                    if(chessInfo){
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else{
                            if(chessInfo.species<=info.species&&chessInfo.species!=cc.wy.animalType.Mouse){
                                return true;
                            }else{
                                return false;
                            }  
                        }
                    }else{
                        return true;
                    }
                }
            }else{
                if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.Water){
                    return false;
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyHole){
                    return false;
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.OpponentHole){
                    return true;               
                }else if(this.boardData[xGezi-1][yGezi-1]==cc.wy.terrainType.MyTrap){
                    let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                    if(chessInfo.chessType==cc.wy.chessSide.My){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    let chessInfo = this.getChessInfoFromList(xGezi,yGezi);
                    if(chessInfo){
                        if(chessInfo.chessType==cc.wy.chessSide.My){
                            return false;
                        }else if(chessInfo.species<=info.species){
                            return true;
                        }else{
                            return false;
                        }
                    }else{
                        return true;
                    }
                }
            }
        }

    },

    checkJumpWater:function(info,direction){
        if(direction=="up"){
            cc.log("up");
            if(info.xGezi>this.xGezi||info.yGezi-1>this.yGezi||info.xGezi<=0||info.yGezi-1<=0){
                return false;
            }else{
                if(this.boardData[info.xGezi-1]&&this.boardData[info.xGezi-1][info.yGezi-2]==cc.wy.terrainType.Water){
                    cc.log("left*******",this.boardData[info.xGezi-1][info.yGezi-2]==cc.wy.terrainType.Water);
                    //检查是否有老鼠
                    let mouseInfo1 = this.getChessInfoFromList(info.xGezi,info.yGezi-1);
                    let mouseInfo2 = this.getChessInfoFromList(info.xGezi,info.yGezi-2);
                    let mouseInfo3 = this.getChessInfoFromList(info.xGezi,info.yGezi-3);

                    cc.log("检查是否有比它大的动物",!mouseInfo1&&!mouseInfo2&&!mouseInfo3);

                    if(!mouseInfo1&&!mouseInfo2&&!mouseInfo3){
                        //检查是否有比它大的动物
                        let ortherAnimal = this.getChessInfoFromList(info.xGezi,info.yGezi-4);
                        if(ortherAnimal){
                            if(info.species>=ortherAnimal.species&&ortherAnimal.chessType==cc.wy.chessSide.Opponent){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return false;
                    }

                }else{
                    //没有水跳个屁啊
                    return false;
                }
            }
            
        }else if(direction=="down"){
            cc.log("down");
            if(info.xGezi>this.xGezi||info.yGezi+1>this.yGezi||info.xGezi<=0||info.yGezi+1<=0){
                return false;
            }else{
                if(this.boardData[info.xGezi-1][info.yGezi]==cc.wy.terrainType.Water){
                    //检查是否有老鼠
                    let mouseInfo1 = this.getChessInfoFromList(info.xGezi,info.yGezi+1);
                    let mouseInfo2 = this.getChessInfoFromList(info.xGezi,info.yGezi+2);
                    let mouseInfo3 = this.getChessInfoFromList(info.xGezi,info.yGezi+3);

                    if(!mouseInfo1&&!mouseInfo2&&!mouseInfo3){
                        //检查是否有比它大的动物
                        let ortherAnimal = this.getChessInfoFromList(info.xGezi,info.yGezi+4);
                        if(ortherAnimal){
                            //如果有动物，只有对面的动物是敌人的，而且小于或等于我方动物的时候才能吃掉
                            if(info.species>=ortherAnimal.species&&ortherAnimal.chessType==cc.wy.chessSide.Opponent){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return false;
                    }

                }else{
                    //没有水跳个屁啊
                    return false;
                }
            }
        }else if(direction=="left"){
            cc.log("left",info,info.xGezi);
            if(info.xGezi-1>this.xGezi||info.yGezi>this.yGezi||info.xGezi-1<=0||info.yGezi<=0){
                cc.log("因该到这里");
                return false;
            }else{
                if(this.boardData[info.xGezi-2][info.yGezi-1]==cc.wy.terrainType.Water){
                    //检查是否有老鼠
                    let mouseInfo1 = this.getChessInfoFromList(info.xGezi-1,info.yGezi);
                    let mouseInfo2 = this.getChessInfoFromList(info.xGezi-2,info.yGezi);

                    if(!mouseInfo1&&!mouseInfo2){
                        //检查是否有比它大的动物
                        let ortherAnimal = this.getChessInfoFromList(info.xGezi-3,info.yGezi);
                        if(ortherAnimal){
                            //如果有动物，只有对面的动物是敌人的，而且小于或等于我方动物的时候才能吃掉
                            if(info.species>=ortherAnimal.species&&ortherAnimal.chessType==cc.wy.chessSide.Opponent){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return false;
                    }

                }else{
                    //没有水跳个屁啊
                    return false;
                }
            }
        }else{
            cc.log("right");
            if(info.xGezi+1>this.xGezi||info.yGezi>this.yGezi||info.xGezi+1<=0||info.yGezi<=0){
                return false;
            }else{
                if(this.boardData[info.xGezi][info.yGezi-1]==cc.wy.terrainType.Water){
                    //检查是否有老鼠
                    let mouseInfo1 = this.getChessInfoFromList(info.xGezi+1,info.yGezi);
                    let mouseInfo2 = this.getChessInfoFromList(info.xGezi+2,info.yGezi);

                    if(!mouseInfo1&&!mouseInfo2){
                        //检查是否有比它大的动物
                        let ortherAnimal = this.getChessInfoFromList(info.xGezi+3,info.yGezi);
                        if(ortherAnimal){
                            //如果有动物，只有对面的动物是敌人的，而且小于或等于我方动物的时候才能吃掉
                            if(info.species>=ortherAnimal.species&&ortherAnimal.chessType==cc.wy.chessSide.Opponent){
                                return true;
                            }else{
                                return false;
                            }
                        }else{
                            return true;
                        }
                    }else{
                        return false;
                    }

                }else{
                    //没有水跳个屁啊
                    return false;
                }
            }
        }
    },

    closeOtherChess:function(){
        for(let i=0;i<this.chessList.length;i++){
            if(this.chessList[i].chessType==cc.wy.chessSide.My){
                this.chessList[i].hideAllGrid();
                this.chessList[i].zIndex = 0;
            }
        }
    },

    moveOpponentChess:function(msg){
        cc.log("要移动棋子了",msg.id,msg);
        this.deleteChessByPos(msg.xGezi,msg.yGezi);
        for(let i=0;i<this.chessList.length;i++){
            if(this.chessList[i].chessType==cc.wy.chessSide.Opponent&&this.chessList[i].id==msg.id){
                cc.log("有",this.chessList[i].id,msg.xGezi,msg.yGezi);
                this.chessList[i].checkAround();
                this.chessList[i].setPosition(msg.xGezi,msg.yGezi);
                this.chessList[i].hideAllGrid();
            }
        }
    },
    //根据坐标拿到棋子信息
    getChessInfoFromList:function(xGezi,yGezi){
        for(let i=0;i<this.chessList.length;i++){
            //cc.log("this.chessList",this.chessList[i].row,rowx,this.chessList[i].col,colx);
            if(this.chessList[i].xGezi==xGezi&&this.chessList[i].yGezi==yGezi){
                return this.chessList[i].getChessInfo();
            }
        }
        return false;
    },

    deleteChessByPos:function(xGezi,yGezi){
        for(let i=0;i<this.chessList.length;i++){
            if(this.chessList[i].xGezi==xGezi&&this.chessList[i].yGezi==yGezi){
                this.chessList[i].reMove();
                this.chessList.splice(i,1);
            }
        }
    },

    checkWinner:function(){
        cc.log("检查是否有人赢");
        for(let i=0;i<this.chessList.length;i++){
            if(this.chessList[i].xGezi==4&&this.chessList[i].yGezi==1){
                cc.log("Yes,you win");
                this.WindowController.openWindowByName('SucessWindow',{"msg":"You Win!"});
                this.sendUserWin();
                return;
            }
        }

        let IsOpponentStillHaveChess = false;

        for(let i=0;i<this.chessList.length;i++){
            if(this.chessList[i].chessType==cc.wy.chessSide.Opponent){
                IsOpponentStillHaveChess = true;
                break;
            }
        }
        if(!IsOpponentStillHaveChess){
            cc.log("这里1");
            this.WindowController.openWindowByName('SucessWindow',{"msg":"You Win!"});
            this.sendUserWin();
        }
        
    },

    sendUserWin:function(){
        let userData = {
            "messageType":cc.wy.msgType.opponentWin,
            "userName":""
        };
        cc.wy.datactrl.sendMessage(userData);
    }
});