// ==UserScript==
// @name        SJMBotInputTester
// @namespace   SJMBotInputTester
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
    //if (old_skin) return old_skin;
    if (cell.isVirus) return image;
    if (!cell.isVirus) return null;
    return null;
}

window.agar.hooks.cellColor = function(cell, old_color) {
    //if (old_color) return old_color;
    if (!cell.isVirus) return "#000000";
    return old_color;
}


var boxRadius = 6;

var transform = {scale:1, x:0, y:0} 
window.agar.hooks.beforeTransform = (ctx, t1x, t1y, s, t2x, t2y) => { transform = {scale:s, x:t2x*s + t1x, y:t2y*s + t1y} } 

function toWorldCoords(pixelCoords) { 
    var x = (pixelCoords.x - transform.x) / transform.scale;
    var y = (pixelCoords.y - transform.y) / transform.scale;
    //console.log('PC x: ' + pixelCoords.x + ' PC y: ' + pixelCoords.y + ' WC x ' + x + ' WC y ' + y)
    return [x, y] 
} 
    
function toPixelCoords(worldCoords) { 
    var x = worldCoords.x*transform.scale + transform.x; 
    var y = worldCoords.y*transform.scale + transform.y;
    //console.log('WC x: ' + worldCoords.x + ' WC y: ' + worldCoords.y + ' PC x ' + x + ' PC y ' + y);
    return [x, y] 
}

// var nnInput = {[],[]};
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var padding = 10
var gridWidth = canvas.width - padding;
var gridHeight = canvas.height - padding;

window.agar.hooks.afterDraw = function() {
    //drawLine(window.agar.dimensions[0],window.agar.dimensions[1],window.agar.dimensions[2],window.agar.dimensions[3]);
    //drawCircle(window.agar.rawViewport.x, window.agar.rawViewport.y);
    //drawCircle(player[k].x, player[k].y, player[k].size + this.splitDistance
    // 
    //top
    // drawLine(window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale, window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale);
    //bottom
    // drawLine(window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale, window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale);
    //left
    //drawLine(window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale, window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale);
    //right
    //drawLine(window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale, window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale);

    var boxSize = boxRadius * 2 + 1;

    var cellWidth = gridWidth / boxSize;
    var cellHeight = gridHeight / boxSize;
    
    if(cellWidth * boxSize != gridWidth){
        console.log(cellWidth + " : " + boxSize + " : " + gridWidth);
    }
    
    var scanInterval = 30;
    
    var scanCount = 0;
    var inputs = [];
    context.fillStyle="#FF0000";
    context.font="20px Georgia";
    var currentX = window.agar.rawViewport.x;
    var currentY = window.agar.rawViewport.y;
    var currentScale = transform.scale;
    var count = 0;
    
    for (var x = currentX - (gridWidth / 2) / currentScale; x <currentX + (gridWidth / 2) / currentScale -1; x += cellWidth / currentScale) {        
        count++;
        for (var y = currentY - (gridHeight / 2) / currentScale; y < currentY + (gridHeight / 2) / currentScale -1; y += cellHeight / currentScale) {
            var cellThreatLevel = 0.0;
            //for each interval within the cell get the color and add it to the total - we need a value between 1 and -1
            //positive values are other players and virus, negative is food
            //todo: color the cells greyscale accoring to theat level
            for (var cellX = x; cellX < x + cellWidth; cellX += scanInterval){
                for (var cellY = y; cellY < y + cellHeight; cellY += scanInterval){
                    var pixelData = context.getImageData(cellX * currentScale + transform.x, cellY * currentScale + transform.y, 1, 1).data;
                    cellThreatLevel += ((pixelData[0] + pixelData[1] + pixelData[2])/765 * -1) + 1;//255; //grey tone
                    scanCount += 1;
               }  
            } 
            cellThreatLevel = cellThreatLevel / scanCount; //mean
            cellThreatLevel = +cellThreatLevel.toFixed(1)
            context.fillText(cellThreatLevel, x + cellWidth/2, y + cellHeight/2)
            inputs.push(cellThreatLevel);
            cellThreatLevel = 0;
            scanCount = 0;
        }
        if (count > boxSize){
            console.log('x = ' + x + 'start x = ' + (currentX - (gridWidth / 2) / currentScale) + 'x < ' + (currentX + (gridWidth / 2) / currentScale) + ' x += ' + (cellWidth / currentScale));
        }
        
    }    
    context.font="40px Georgia";
    context.fillText(inputs.length, window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale);
//     for (var x = window.agar.rawViewport.x - (gridWidth / 2) / transform.scale; x <=window.agar.rawViewport.x + (gridWidth / 2) / transform.scale; x += cellWidth / transform.scale) {
//         context.moveTo(x, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale);
//         context.lineTo(x, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale);
//     }
// 
//     for (var x = window.agar.rawViewport.y - (gridHeight / 2) / transform.scale; x <= window.agar.rawViewport.y + (gridHeight / 2) / transform.scale; x += cellHeight / transform.scale) {
//         context.moveTo(window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, x);
//         context.lineTo(window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, x);
//     }

    context.strokeStyle = "black";
    context.stroke();
    
    
    
    
    
    // 
    // 
    // for (var a = 0; a < boxWidth; a++){
    //     var currentBoxWidth = cellWidth * (a + 1);
    //     for (var b = 0; b < boxWidth; b++){
    //         var currentBoxHeight = cellHeight * (b + 1);
    //         for (var key in window.agar.allCells){
    //             var cell = window.agar.allCells[key];
    //             if ((cell.x < currentBoxWidth && cell.x > previousBoxWidth) && (cell.y < currentBoxHeight && cell.y > previousBoxHeight)){
    //                 
    //             }
    //         }
    //         previousBoxHeight = currentBoxHeight;
    //     }
    //     previousBoxWidth = currentBoxWidth;
    // }
    // return null;
}

// 
// 
// 
// function compareSize(player1, player2) {
//         return 1/(player1 / player2);
// }
// 
// 
// function computeDistance(x1, y1, x2, y2, s1, s2) {
//         s1 = s1 || 0;
//         s2 = s2 || 0;
//         var xdis = x1 - x2; 
//         var ydis = y1 - y2;
//         var distance = Math.sqrt(xdis * xdis + ydis * ydis) - (s1 + s2);
// 
//         return distance;
// }
// 
// function isMe(cell){
//     for (var i = 0; i < window.agar.myCells.length; i++){            
//         if (window.agar.myCells[i] == cell.id){
//             return true;
//         }           
//     }
//     return false;
// }
// 

// 
// function moveCell(x,y){
//    document.getElementById('canvas').onmousemove({clientX:x, clientY:y})
// }
// 

function drawCircle(x, y){
      var radius = 70;

      context.beginPath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.fillStyle = 'green';
      context.fill();
      context.lineWidth = 5;
      context.strokeStyle = '#003300';
      context.stroke();
}
function drawLine(startX, startY, endX, endY){

      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.lineWidth = 3;
      context.stroke();
      
      //console.log('Line drawn');
      return true;
}
// 
//END - Helper methods 

//START - UI Customisation
window.agar.minScale = 0.5;
window.agar.drawGrid = false;
//END - UI Customisation

//START - Bot control
