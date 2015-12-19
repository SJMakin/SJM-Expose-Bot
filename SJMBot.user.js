// ==UserScript==
// @name        SJMBot
// @namespace   SJMBot
// @include     http://agar.io/*
// @include     https://agar.io/*
// @version     0.01
// @grant       none
// @author      SJMakin@Github
// ==/UserScript==


//Sample code
image = new Image();
image.crossOrigin = 'anonymous';
image.src = 'http://i.imgur.com/V8EOXwT.png';
window.agar.hooks.cellSkin = function(cell, old_skin) {
    if (old_skin) return old_skin;
    if (cell.isVirus) return image;
    return null;
}

var boxRadius = 6;

var nnInput = {[],[]};

window.agar.hooks.afterDraw = function() {
    var boxSize = boxRadius * 2 + 1;
    var width = document.getElementById('canvas').width
    var height = document.getElementById('canvas').height
    var cellWidth = weight / boxSize;
    var cellHeight = height / boxSize;
    for (var a = 0; a < boxWidth; a++){
        var 
        for (var b = 0; b < boxWidth; b++){
            
        }
    }
    return null;
}


console.log('Loaded Virus Image Switch');

//START - Helper methods
// function compareSize(player1, player2, ratio) {
//         if (player1.size * player1.size * ratio < player2.size * player2.size) {
//             return true;
//         }
//         return false;
//     }
// 
// function clusterFood(foodList, blobSize) {
//         var clusters = [];
//         var addedCluster = false;
// 
//         //1: x
//         //2: y
//         //3: size or value
//         //4: Angle, not set here.
// 
//         for (var i = 0; i < foodList.length; i++) {
//             for (var j = 0; j < clusters.length; j++) {
//                 if (this.computeInexpensiveDistance(foodList[i][0], foodList[i][1], clusters[j][0], clusters[j][1]) < blobSize * 2) {
//                     clusters[j][0] = (foodList[i][0] + clusters[j][0]) / 2;
//                     clusters[j][1] = (foodList[i][1] + clusters[j][1]) / 2;
//                     clusters[j][2] += foodList[i][2];
//                     addedCluster = true;
//                     break;
//                 }
//             }
//             if (!addedCluster) {
//                 clusters.push([foodList[i][0], foodList[i][1], foodList[i][2], 0]);
//             }
//             addedCluster = false;
//         }
//         return clusters;
//     };
//     
function computeDistance(x1, y1, x2, y2, s1, s2) {
        s1 = s1 || 0;
        s2 = s2 || 0;
        var xdis = x1 - x2; 
        var ydis = y1 - y2;
        var distance = Math.sqrt(xdis * xdis + ydis * ydis) - (s1 + s2);

        return distance;
}

function isMe(cell){
    for (var i = 0; i < window.agar.myCells.length; i++){            
        if (window.agar.myCells[i] == cell.id){
            return true;
        }           
    }
    return false;
}

var transform = {scale:1, x:0, y:0} 
window.agar.hooks.beforeTransform = (ctx, t1x, t1y, s, t2x, t2y) => { transform = {scale:s, x:t2x*s + t1x, y:t2y*s + t1y} } 

function toWorldCoords(pixelCoords) { 
    var x = (pixelCoords.x - transform.x) / transform.scale;
    var y = (pixelCoords.y - transform.y) / transform.scale;
    console.log('PC x: ' + pixelCoords.x + ' PC y: ' + pixelCoords.y + ' WC x ' + x + ' WC y ' + y)
    return [x, y] 
} 
    
function toPixelCoords(worldCoords) { 
    var x = worldCoords.x*transform.scale + transform.x; 
    var y = worldCoords.y*transform.scale + transform.y;
    console.log('WC x: ' + worldCoords.x + ' WC y: ' + worldCoords.y + ' PC x ' + x + ' PC y ' + y);
    return [x, y] 
}

function moveCell(x,y){
   document.getElementById('canvas').onmousemove({clientX:x, clientY:y})
}

function drawLine(startX, startY, endX, endY){
      var canvas = document.getElementById("canvas");
      var context = canvas.getContext('2d');

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.lineWidth = 4;
      context.stroke();
      
      //console.log('Line drawn');
      return true;
}

//END - Helper methods 

//START - UI Customisation
window.agar.minScale = 0.5;
window.agar.drawGrid = false;
//END - UI Customisation

//START - Bot control

function processGameState(){
    //console.debug("SJMBot processGameState");
    var food = [];
    var virus = [];
    var me = [];
    var other = [];
    //console.dir(window.agar.allCells);
    for (var key in window.agar.allCells){
        var cell = window.agar.allCells[key];   
        //console.log(cell.id);
        if (isMe(cell)){
            me.push(cell);
        } else if (cell.size < 15) {
            food.push(cell);
        } else if (cell.isVirus){
            virus.push(cell);           
        } else {
            other.push(cell);  
        }
    }
    //console.log(me.length);
    
    if (me.length > 0 && food.length > 0){
        var closest = 99999999;
        var target = {};
        for (var z = 0; z < food.length; z++){
            var dist = computeDistance(me[0].x, me[0].y, food[z].x, food[z].y);
            if (dist < closest){
                closest = dist;
                target = food[z];
            }
        }
        //console.dir(me);
        //console.dir(food);
        var position = toPixelCoords(target);
        moveCell(position[0], position[1]);
        
        //var myPosition = toPixelCoords(me[0]);
        //drawLine (myPosition[0], myPosition[1], position[0], position[1]);
    }

}


setInterval(processGameState, 30);
//END - Bot control
console.log("SJMBot loaded");
