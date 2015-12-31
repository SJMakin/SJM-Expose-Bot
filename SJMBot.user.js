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
var image = new Image();
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
    if (isMe(cell)) return "#FFFFFF";
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
var padding = 10;
var gridWidth = canvas.width - padding;
var gridHeight = canvas.height - padding;

var currentFrame = 0

window.agar.hooks.afterDraw = function() {
//     currentFrame += 1;
//     if (currentFrame < 3) {return;} 
//     else{
//         
//     
    
    
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
// 
//     var boxSize = boxRadius * 2 + 1;
// 
//     var cellWidth = gridWidth / boxSize;
//     var cellHeight = gridHeight / boxSize;
//     
//     var scanInterval = 30;
//     
//     var scanCount = 0;
//     //var inputs = [];
//     context.fillStyle="#FF0000";
//     context.font="20px Georgia";
//     for (var x = window.agar.rawViewport.x - (gridWidth / 2) / transform.scale; x <=window.agar.rawViewport.x + (gridWidth / 2) / transform.scale; x += cellWidth / transform.scale) {        
//         for (var y = window.agar.rawViewport.y - (gridHeight / 2) / transform.scale; y <= window.agar.rawViewport.y + (gridHeight / 2) / transform.scale; y += cellHeight / transform.scale) {
//             var cellThreatLevel = 0.0;
//             //for each interval within the cell get the color and add it to the total - we need a value between 1 and -1
//             //positive values are other players and virus, negative is food
//             //todo: color the cells greyscale accoring to theat level
//             for (var cellX = x; cellX < x + cellWidth; cellX += scanInterval){
//                 for (var cellY = y; cellY < y + cellHeight; cellY += scanInterval){
//                     var pixelData = context.getImageData(cellX * transform.scale + transform.x, cellY * transform.scale + transform.y, 1, 1).data;
//                     cellThreatLevel += ((pixelData[0] + pixelData[1] + pixelData[2])/765 * -1) + 1;//255; //grey tone
//                     scanCount += 1;
//                }  
//             } 
//             cellThreatLevel = cellThreatLevel / scanCount; //mean
//             cellThreatLevel = +cellThreatLevel.toFixed(1)
//             context.fillText(cellThreatLevel, x, y)
//             //inputs.push(cellThreatLevel);
//             cellThreatLevel = 0;
//             scanCount = 0;
//         }
//     }    
    
    
//     for (var x = window.agar.rawViewport.x - (gridWidth / 2) / transform.scale; x <=window.agar.rawViewport.x + (gridWidth / 2) / transform.scale; x += cellWidth / transform.scale) {
//         context.moveTo(x, window.agar.rawViewport.y - (gridHeight / 2) / transform.scale);
//         context.lineTo(x, window.agar.rawViewport.y + (gridHeight / 2) / transform.scale);
//     }
// 
//     for (var x = window.agar.rawViewport.y - (gridHeight / 2) / transform.scale; x <= window.agar.rawViewport.y + (gridHeight / 2) / transform.scale; x += cellHeight / transform.scale) {
//         context.moveTo(window.agar.rawViewport.x - (gridWidth / 2) / transform.scale, x);
//         context.lineTo(window.agar.rawViewport.x + (gridWidth / 2) / transform.scale, x);
// //     }
// 
//     context.strokeStyle = "black";
//     context.stroke();
//     
//     }
//     currentFrame = 0;
//     
    
    
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
function getPlayerCells(){
        var playerCells = [];
        for (var key in window.agar.allCells){
                var cell = window.agar.allCells[key];
                if (isMe(cell)){
                        playerCells.push(cell);
                }                
        }
        return playerCells;
}

function isMe(cell){
    for (var i = 0; i < window.agar.myCells.length; i++){            
        if (window.agar.myCells[i] == cell.id){
            return true;
        }           
    }
    return false;
}


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

//MARIO X - Toolbox

var pool;
var $form; // jQuery's
var $aigui;
//var rightmost;
var timeout;

// from getPositions
//var marioX;
//var marioY;



//MARIOX - Configuration
// this should probably go on the toolbox, but while we got no sections there...
//console.log('Loaded pre mario crap');
//-- For SMW, make sure you have a save state named "DP1.state" at the beginning of a level,
//-- and put a copy in both the Lua folder and the root directory of BizHawk.
var Filename = "mariox.state"

// based mostly on self.nes.keyboard.state1_keys
var ButtonNames = [
  'UP',
  'DOWN',
  'LEFT',
  'RIGHT',
  'SPLIT',
  'SHOOT', // last command is being ignored, right now! :(
];

var BoxRadius = 6;
var InputSize = (BoxRadius*2+1)*(BoxRadius*2+1);

var Inputs = InputSize+1;
var Outputs = ButtonNames.length;

var Population = 300; // species
var DeltaDisjoint = 2.0;
var DeltaWeights = 0.4;
var DeltaThreshold = 1.0;

var StaleSpecies = 15;

var MutateConnectionsChance = 0.25;
var PerturbChance = 0.90;
var CrossoverChance = 0.75;
var LinkMutationChance = 2.0;
var NodeMutationChance = 0.50;
var BiasMutationChance = 0.40;
var StepSize = 0.1;
var DisableMutationChance = 0.4;
var EnableMutationChance = 0.2;

var TimeoutConstant = 20;

var MaxNodes = 1000000;



//MARIOX - Functions

function isEmpty (foo) {
  return (foo == null); // should work for undefined as well
}

// this shall be split into a few more files yet

function sigmoid (x) {
        return 2/(1+Math.exp(-4.9*x))-1;
}

function newPool () {
        var pool = {};
        pool.species = [];
        pool.generation = 0;
        pool.innovation = Outputs - 1; // array bonds
        pool.currentSpecies = 0; // array bonds
        pool.currentGenome = 0; // array bonds
        pool.currentFrame = 0;
        pool.maxFitness = 0;
        pool.duration = 0;
        pool.gameState = null;
        pool.state = null;

        return pool;
}

function newSpecies () {
        var species = {};
        species.topFitness = 0;
        species.staleness = 0;
        species.genomes = [];
        species.averageFitness = 0;

        return species;
}

function newGenome () {
        var genome = {};
        genome.genes = [];
        genome.fitness = 0;
        genome.adjustedFitness = 0;
        genome.network = [];
        genome.maxneuron = 0;
        genome.globalRank = 0;
        genome.mutationRates = {};
        genome.mutationRates["connections"] = MutateConnectionsChance;
        genome.mutationRates["link"] = LinkMutationChance;
        genome.mutationRates["bias"] = BiasMutationChance;
        genome.mutationRates["node"] = NodeMutationChance;
        genome.mutationRates["enable"] = EnableMutationChance;
        genome.mutationRates["disable"] = DisableMutationChance;
        genome.mutationRates["step"] = StepSize;

        return genome;
}

function copyGenome (genome) {
        var genome2 = newGenome();
        for (var g=0; g<genome.genes.length; g++) {
                genome2.genes.push( copyGene(genome.genes[g]) ); // table.insert
        }
        genome2.maxneuron = genome.maxneuron;
        genome2.mutationRates["connections"] = genome.mutationRates["connections"];
        genome2.mutationRates["link"] = genome.mutationRates["link"];
        genome2.mutationRates["bias"] = genome.mutationRates["bias"];
        genome2.mutationRates["node"] = genome.mutationRates["node"];
        genome2.mutationRates["enable"] = genome.mutationRates["enable"];
        genome2.mutationRates["disable"] = genome.mutationRates["disable"];

        return genome2;
}

function basicGenome () {
        var genome = newGenome();
        //var innovation = 0; // array bonds - probably useless

        genome.maxneuron = Inputs - 1; // array bonds
        mutate(genome);

        return genome;
}

function newGene () {
        var gene = {};
        gene.into = 0;
        gene.out = 0;
        gene.weight = 0.0;
        gene.enabled = true;
        gene.innovation = 0;

        return gene;
}

function copyGene (gene) {
        var gene2 = newGene();
        gene2.into = gene.into;
        gene2.out = gene.out;
        gene2.weight = gene.weight;
        gene2.enabled = gene.enabled;
        gene2.innovation = gene.innovation;

        return gene2;
}

function newNeuron () {
        var neuron = {};
        neuron.incoming = [];
        neuron.value = 0.0;

        return neuron;
}

function generateNetwork (genome) {
        var network = {};
        network.neurons = [];

        for (var i=0; i<Inputs; i++) {
                network.neurons[i] = newNeuron();
        }

        for (var o=0; o<Outputs; o++) {
                network.neurons[MaxNodes+o] = newNeuron();
        }

        genome.genes.sort(function (a, b) {
                return (a.out - b.out);
        })
        for (var i=0; i<genome.genes.length; i++) {
                var gene = genome.genes[i];
                if (gene.enabled) {
                        if ( isEmpty(network.neurons[gene.out]) ) {
                                network.neurons[gene.out] = newNeuron();
                        }
                        var neuron = network.neurons[gene.out];
                        neuron.incoming.push(gene); // table.insert
                        if ( isEmpty(network.neurons[gene.into]) ) {
                                network.neurons[gene.into] = newNeuron();
                        }
                }
        }

        genome.network = network;
}

function evaluateNetwork (network, inputs) {
        var outputs = {};

        inputs.push(1); // table.insert
        if (inputs.length != Inputs) {
                console.error("Incorrect number of neural network inputs: "+ inputs.length +" (expected "+ Inputs +")");
                return outputs;
        }

        for (var i=0; i<Inputs; i++) {
                network.neurons[i].value = inputs[i];
        }

        for (var _ in network.neurons) { // in pairs
                var neuron = network.neurons[_];
                var sum = 0;
                for (var j = 0; j<neuron.incoming.length; j++) {
                        var incoming = neuron.incoming[j];
                        var other = network.neurons[incoming.into];
                        sum = sum + incoming.weight * other.value;
                }

                if (neuron.incoming.length > 0) {
                        neuron.value = sigmoid(sum);
                }
        }

        for (var o=0; o<Outputs; o++) {
                var button = "KEY_" + ButtonNames[o];
                if (network.neurons[MaxNodes+o].value > 0) {
                        outputs[button] = true;
                } else {
                        outputs[button] = false;
                }
        }

        return outputs;
}

function crossover (g1, g2) {
        // Make sure g1 is the higher fitness genome
        if (g2.fitness > g1.fitness) {
                tempg = g1;
                g1 = g2;
                g2 = tempg;
        }

        var child = newGenome();

        var innovations2 = {};
        for (var i=0; i<g2.genes.length; i++) {
                var gene = g2.genes[i];
                innovations2[gene.innovation] = gene;
        }

        for (var i=0; i<g1.genes.length; i++) {
                var gene1 = g1.genes[i];
                var gene2 = innovations2[gene1.innovation];
                if ( !isEmpty(gene2) && mathRandom(2) == 1 && gene2.enabled) {
                        child.genes.push( copyGene(gene2) ); // table.insert
                } else {
                        child.genes.push( copyGene(gene1) ); // table.insert
                }
        }

        child.maxneuron = Math.max(g1.maxneuron,g2.maxneuron);

        for (var mutation in g1.mutationRates) { // in pairs
                var rate = g1.mutationRates[mutation];
                child.mutationRates[mutation] = rate;
        }

        return child;
}

function randomNeuron (genes, nonInput) {
        var neurons = [];
        if ( !nonInput ) {
                for (var i=0; i<Inputs; i++) {
                        neurons[i] = true;
                }
        }
        for (var o=0; o<Outputs; o++) {
                neurons[MaxNodes+o] = true;
        }
        for (var i=0; i<genes.length; i++) {
                if ( !nonInput || genes[i].into >= Inputs) {
                        neurons[genes[i].into] = true;
                }
                if ( !nonInput || genes[i].out >= Inputs) {
                        neurons[genes[i].out] = true;
                }
        }

        var count = 0;
        for (var _ in neurons) { // in pairs
                count = count + 1;
        }
        var n = mathRandom(1, count);

        for (var k in neurons) { // in pairs
                var v = neurons[k];
                n = n-1;
                if (n == 0) {
                        return k;
                }
        }

        return 0;
}

function containsLink (genes, link) {
        for (var i=0; i<genes.length; i++) {
                var gene = genes[i];
                if (gene.into == link.into && gene.out == link.out) {
                        return true;
                }
        }
}

function pointMutate (genome) {
        var step = genome.mutationRates["step"];

        for (var i=0; i<genome.genes.length; i++) {
                var gene = genome.genes[i];
                if (mathRandom() < PerturbChance) {
                        gene.weight = gene.weight + mathRandom() * step*2 - step;
                } else {
                        gene.weight = mathRandom()*4-2;
                }
        }
}

function linkMutate (genome, forceBias) {
        var neuron1 = randomNeuron(genome.genes, false);
        var neuron2 = randomNeuron(genome.genes, true);

        var newLink = newGene();
        if (neuron1 < Inputs && neuron2 < Inputs) { // array bonds
                // Both input nodes
                return;
        }
        if (neuron2 < Inputs) { // array bonds
                // Swap output and input
                var temp = neuron1;
                neuron1 = neuron2;
                neuron2 = temp;
        }

        newLink.into = neuron1;
        newLink.out = neuron2;
        if (forceBias) {
                newLink.into = Inputs - 1; // array bonds
        }

        if ( containsLink(genome.genes, newLink) ) {
                return;
        }
        newLink.innovation = ++pool.innovation;
        newLink.weight = mathRandom()*4-2;

        genome.genes.push(newLink); // table.insert
}

function nodeMutate (genome) {
        if (genome.genes.length == 0) {
                return;
        }

        genome.maxneuron++;

        var gene = genome.genes[mathRandom(1,genome.genes.length)-1];
        if ( !gene || !gene.enabled ) {
                return;
        }
        gene.enabled = false;

        var gene1 = copyGene(gene);
        gene1.out = genome.maxneuron;
        gene1.weight = 1.0;
        gene1.innovation = ++pool.innovation;
        gene1.enabled = true;
        genome.genes.push(gene1); // table.insert

        var gene2 = copyGene(gene);
        gene2.into = genome.maxneuron;
        gene2.innovation = ++pool.innovation;
        gene2.enabled = true;
        genome.genes.push(gene2); // table.insert
}

function enableDisableMutate (genome, enable) {
        var candidates = [];
        for (var _ in genome.genes) { // in pairs
                var gene = genome.genes[_];
                if (gene.enabled == !enable) {
                        candidates.push(gene); // table.insert
                }
        }

        if (candidates.length == 0) {
                return;
        }

        var gene = candidates[mathRandom(1,candidates.length)-1];
        gene.enabled = !gene.enabled;
}

function mutate (genome) {
        for (var mutation in genome.mutationRates) { // in pairs
                var rate = genome.mutationRates[mutation];
                if (mathRandom(1,2) == 1) {
                        genome.mutationRates[mutation] = 0.95*rate;
                } else {
                        genome.mutationRates[mutation] = 1.05263*rate;
                }
        }

        if (mathRandom() < genome.mutationRates["connections"]) {
                pointMutate(genome);
        }

        var p = genome.mutationRates["link"];
        while (p > 0) {
                if (mathRandom() < p) {
                        linkMutate(genome, false);
                }
                p--;
        }

        p = genome.mutationRates["bias"];
        while (p > 0) {
                if (mathRandom() < p) {
                        linkMutate(genome, true);
                }
                p--;
        }

        p = genome.mutationRates["node"];
        while (p > 0) {
                if (mathRandom() < p) {
                        nodeMutate(genome);
                }
                p--;
        }

        p = genome.mutationRates["enable"]
        while (p > 0) {
                if (mathRandom() < p) {
                        enableDisableMutate(genome, true);
                }
                p--;
        }

        p = genome.mutationRates["disable"]
        while (p > 0) {
                if (mathRandom() < p) {
                        enableDisableMutate(genome, false);
                }
                p--;
        }
}

function disjoint (genes1, genes2) {
        var i1 = [];
        for (var i = 0; i <genes1.length; i ++) {
                var gene = genes1[i];
                i1[gene.innovation] = true;
        }

        var i2 = [];
        for (var i = 0; i <genes2.length; i ++) {
                var gene = genes2[i];
                i2[gene.innovation] = true;
        }

        var disjointGenes = 0;
        for (var i = 0; i <genes1.length; i ++) {
                var gene = genes1[i];
                if (!i2[gene.innovation]) {
                        disjointGenes = disjointGenes+1;
                }
        }

        for (var i = 0; i <genes2.length; i ++) {
                var gene = genes2[i];
                if (!i1[gene.innovation]) {
                        disjointGenes = disjointGenes+1;
                }
        }

        var n = Math.max(genes1.length-1, genes2.length-1);

        return disjointGenes / n;
}

function weights (genes1, genes2) {
        var i2 = [];
        for (var i = 0; i <genes2.length; i ++) {
                var gene = genes2[i];
                i2[gene.innovation] = gene;
        }

        var sum = 0;
        var coincident = 0;
        for (var i = 0; i <genes1.length; i ++) {
                var gene = genes1[i];
                if ( !isEmpty(i2[gene.innovation]) ) {
                        var gene2 = i2[gene.innovation];
                        sum = sum + Math.abs(gene.weight - gene2.weight);
                        coincident++;
                }
        }

        return sum / coincident;
}

function sameSpecies (genome1, genome2) {
        var dd = DeltaDisjoint*disjoint(genome1.genes, genome2.genes);
        var dw = DeltaWeights*weights(genome1.genes, genome2.genes);
        return dd + dw < DeltaThreshold;
}

function rankGlobally () {
        var global = [];
        for (var s = 0; s <pool.species.length; s ++) {
                var species = pool.species[s];
                for (var g = 0; g <species.genomes.length; g ++) {
                        global.push(species.genomes[g]); // table.insert
                }
        }
        global.sort(function (a, b) {
                return (a.fitness - b.fitness); // from less to more fit
        })

        for (var g=0; g<global.length; g++) {
                global[g].globalRank = g;
        }
}

function calculateAverageFitness (species) {
        var total = 0;

        for (var g=0; g<species.genomes.length; g++) {
                var genome = species.genomes[g];
                total = total + genome.globalRank;
        }

        species.averageFitness = total / species.genomes.length;
}

function totalAverageFitness () {
        var total = 0;
        for (var s = 0; s <pool.species.length; s ++) {
                var species = pool.species[s];
                total = total + species.averageFitness;
        }

        return total;
}

function cullSpecies (cutToOne) {
        for (var s = 0; s <pool.species.length; s ++) {
                var species = pool.species[s];

                species.genomes.sort(function (a, b) {
                        return (b.fitness - a.fitness);
                })

                var remaining = Math.ceil(species.genomes.length/2);
                if (cutToOne) {
                        remaining = 1; // array bonds
                }
                while (species.genomes.length > remaining) {
                        species.genomes.pop();
                }
        }
}

function breedChild (species) {
        var child = {};
        if (mathRandom() < CrossoverChance) {
                g1 = species.genomes[mathRandom(1, species.genomes.length)-1];
                g2 = species.genomes[mathRandom(1, species.genomes.length)-1];
                child = crossover(g1, g2);
        } else {
                g = species.genomes[mathRandom(1, species.genomes.length)-1];
                child = copyGenome(g);
        }

        mutate(child);

        return child;
}

function removeStaleSpecies () {
        var survived = [];

        for (var s = 0; s <pool.species.length; s ++) {
                var species = pool.species[s];

                species.genomes.sort(function (a, b) {
                        return (b.fitness - a.fitness);
                })

                if (species.genomes[0].fitness > species.topFitness) { // array bonds
                        species.topFitness = species.genomes[0].fitness; // array bonds
                        species.staleness = 0;
                } else {
                        species.staleness++;
                }
                if (species.staleness < StaleSpecies || species.topFitness >= pool.maxFitness) {
                        survived.push(species); // table.insert
                }
        }

        pool.species = survived;
}

function removeWeakSpecies () {
        var survived = [];

        var sum = totalAverageFitness();
        for (var s = 0; s <pool.species.length; s ++) {
                var species = pool.species[s];
                var breed = Math.floor(species.averageFitness / sum * Population);
                if (breed >= 1) {
                        survived.push(species); // table.insert
                }
        }

        pool.species = survived;
}

function addToSpecies (child) {
        var foundSpecies = false;
        for (var s=0; s<pool.species.length; s++) {
                var species = pool.species[s];
                if ( !foundSpecies && sameSpecies(child, species.genomes[0]) ) { // array bonds
                        species.genomes.push(child); // table.insert
                        foundSpecies = true;
                        break; //for
                }
        }

        if (!foundSpecies) {
                var childSpecies = newSpecies();
                childSpecies.genomes.push(child); // table.insert
                pool.species.push(childSpecies); // table.insert
        }
}

function newGeneration () {
        cullSpecies(false); // Cull the bottom half of each species
        rankGlobally();
        removeStaleSpecies();
        rankGlobally();
        for (var s = 0; s<pool.species.length; s++) {
                var species = pool.species[s];
                calculateAverageFitness(species);
        }
        removeWeakSpecies();
        var sum = totalAverageFitness();
        var children = [];
        for (var s = 0; s<pool.species.length; s++) {
                var species = pool.species[s];
                var breed = Math.floor(species.averageFitness / sum * Population) - 1;
                for (var i=0; i<breed; i++) {
                        children.push( breedChild(species) ); // table.insert
                }
        }
        cullSpecies(true); // Cull all but the top member of each species
        while (children.length + pool.species.length <= Population) {
                var species = pool.species[mathRandom(1, pool.species.length)-1];
                children.push( breedChild(species) ); // table.insert
        }
        for (var c=0; c<children.length; c++) {
                var child = children[c];
                addToSpecies(child);
        }

        pool.generation++;

        writeFile("autobackup.gen." + pool.generation + "." + $form.find('input#saveLoadFile').val());
        writeFile("autobackup.pool");
}

function initializePool () {
        
        pool = newPool();

        for (var i=0; i<Population; i++) {
                var basic = basicGenome();
                addToSpecies(basic);
        }
        
        initializeRun();
        //console.log("Loaded!!!");
}

function clearJoypad () {
        controller = {};
        for (var b = 0; b<ButtonNames.length; b++) {
                controller["KEY_" + ButtonNames[b]] = false;
        }
        //joypadSet(controller);
}

function initializeRun () {
        // review - something like savestate will be much needed
        //loadState(Filename);
        bestSize = 0;
        //rightmost = 0;
        pool.currentFrame = 0;
        timeout = TimeoutConstant;
        clearJoypad();

        var species = pool.species[pool.currentSpecies];
        var genome = species.genomes[pool.currentGenome];
        generateNetwork(genome);
        evaluateCurrent();
}

function evaluateCurrent() {
        var species = pool.species[pool.currentSpecies];
        var genome = species.genomes[pool.currentGenome];

        inputs = getInputs();
        controller = evaluateNetwork(genome.network, inputs);

        if (controller["KEY_LEFT"] && controller["KEY_RIGHT"]) {
                controller["KEY_LEFT"] = false;
                controller["KEY_RIGHT"] = false;
        }
        if (controller["KEY_UP"] && controller["KEY_DOWN"]) {
                controller["KEY_UP"] = false;
                controller["KEY_DOWN"] = false;
        }
}


function nextGenome () {
        pool.currentGenome++;
        if (pool.currentGenome >= pool.species[pool.currentSpecies].genomes.length) {
                pool.currentGenome = 0; // array bonds
                pool.currentSpecies++;
                if (pool.currentSpecies >= pool.species.length) {
                        newGeneration();
                        pool.currentSpecies = 0; // array bonds
                }
        }
}

function fitnessAlreadyMeasured () {
        var species = pool.species[pool.currentSpecies];
        var genome = species.genomes[pool.currentGenome];

        return genome.fitness != 0;
}

function playTop () {
        var maxFitness = 0;
        var maxSpecies = 0;
        var maxGenome = 0;
        for (var s in pool.species) { // in pairs
                var species = pool.species[s];
                for (var g in species.genomes) { // in pairs
                        var genome = species.genomes[g];
                        if (genome.fitness > maxFitness) {
                                maxFitness = genome.fitness;
                                maxSpecies = s;
                                maxGenome = g;
                        }
                }
        }

        pool.currentSpecies = maxSpecies;
        pool.currentGenome = maxGenome;
        pool.maxFitness = maxFitness;
        $form.find('input#maxFitness').val(Math.floor(pool.maxFitness));
        initializeRun();
        pool.currentFrame++;
        return;
}


//MARIO X - Files

// indexedDB code all based on https://gist.github.com/BigstickCarpet/a0d6389a5d0e3a24814b

function openIndexedDB () {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

  var openDB = indexedDB.open("marioxDB", 1);

  openDB.onupgradeneeded = function() {
    var db = {}
    db.result = openDB.result;
    db.store = db.result.createObjectStore("marioxOBJ", {keyPath: "id"});
    //db.index = db.store.createIndex("NameIndex", ["name.last", "name.first"]);
  };

  return openDB;
}

function getStoreIndexedDB (openDB) {
  var db = {};
  db.result = openDB.result;
  db.tx = db.result.transaction("marioxOBJ", "readwrite");
  db.store = db.tx.objectStore("marioxOBJ");
  //db.index = db.store.index("NameIndex");

  return db;
}

function saveIndexedDB (filename, filedata) {
  var openDB = openIndexedDB();

  openDB.onsuccess = function() {
    var db = getStoreIndexedDB(openDB);

    db.store.put({id: filename, data: filedata});
  }
}

function loadIndexedDB (filename, callback) {
  var openDB = openIndexedDB();

  openDB.onsuccess = function() {
    var db = getStoreIndexedDB(openDB);

    var getData = db.store.get(filename);
    getData.onsuccess = function() {
      callback(getData.result.data);
    };

    db.tx.oncomplete = function() {
      db.result.close();
    };
  }
}

function writeFile (filename) { // using indexedDB for the win! :)
        // `poolContent` rather than `pool` for strict lua adaptation
        var poolContent = {};
        poolContent.duration = pool.duration;
        poolContent.generation = pool.generation;
        poolContent.maxFitness = pool.maxFitness;
        poolContent.species = pool.species;
        //poolContent.gameState = pool.gameState;
        saveIndexedDB(filename, poolContent);
        pool.state = poolContent;
        //var fileSize = JSON.stringify(poolContent).length; // couldn't figure out a fast way, just for log
        //console.log('writing file '+ filename);// +' - pool size: '+ fileSize);
}

function savePool () {
        var filename = $form.find('input#saveLoadFile').val();
        writeFile(filename);
}

function grabPoolContent (name) { // leaving commented code to justify function, for now
  //while (pool.state[name].length > 0) {
    pool[name] = pool.state[name];//.pop()
  //}
}
function loadFile (filename) {
        loadIndexedDB(filename, loadFileCallback);
        //var fileSize = JSON.stringify(poolContent).length; // couldn't figure out a fast way, just for log
        //console.log('loading '+ filename);// +' - pool size: '+ fileSize);
}
function loadFileCallback (poolContent) {
        if ( poolContent.length == 4 || ( poolContent.length == 5 && isEmpty(poolContent[4]) ) ) {
          if (poolContent.length == 5) poolContent.pop();
          pool.species = poolContent.pop();
          pool.maxFitness = poolContent.pop();
          pool.generation = poolContent.pop();
          pool.duration = poolContent.pop();
        } else {
          pool.state = poolContent;
          //grabPoolContent('gameState');
          grabPoolContent('species');
          grabPoolContent('maxFitness');
          grabPoolContent('generation');
          grabPoolContent('duration');
          pool.state = [].push(poolContent);
        }
        pool.currentSpecies = 0;

        $form.find('input#maxFitness').val(Math.floor(pool.maxFitness));

        while ( fitnessAlreadyMeasured() ) {
                nextGenome();
        }
        initializeRun();
        //loadGameState();
        pool.currentFrame++;
}

function loadPool () {
        var filename = $form.find('input#saveLoadFile').val();
        loadFile(filename);
}

function restartPool () {
  savePool();
  initializePool();
}

// MARIO X - Lua

// adapted functions to work like lua script

function mathRandom (min, max) {
  if ( isEmpty(min) ) {
    return Math.random();
  }
  if ( isEmpty(max) ) {
    max = min;
    min = 1;
  }
  return Math.floor(Math.random() * (max - min)) + min;
}
// 
// function joypadSet (controller) {
//   // simulate.keyPress(self.nes.keyboard.state1_keys.KEY_START);
//   for (var button in controller) {
//     if (controller[button]) {
//       //console.log(button +' down');
//       simulate.keyDown(self.nes.keyboard.state1_keys[button]);
//     } else {
//       //console.log(button +' up');
//       simulate.keyUp(self.nes.keyboard.state1_keys[button]);
//     }
//   }
//   //console.log('joypad.set: '+ JSON.stringify(controller));
// }

function loadState (stateName) { // review
  // there is no state saving for now. we will need to build something
  // at least to get out from menu screen, by pressing start at it.
  // for now, it can be called just once, or else there's a risk of pause
  // AND...
  // it ended up being easier to just let Mario press START after all! :D :)
  // this is not even being used anymore (for now anyway).
//   setTimeout(function () {
// //    simulate.keyPress(self.nes.keyboard.state1_keys.KEY_START);
//   }, 2100)
}

//MARIO X - LZ String

// var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);


// MARIO X - Main

if ( isEmpty(pool) ) {
        initializePool();
}
console.log("Loaded!!!");
//loadIndexedDB('gameState', loadGameStateCallback);

createAiGUI();

loadFile("autobackup.pool");

// self.nes.stop();
// self.nes.isRunning = true;
// self.nes.fpsInterval = setInterval(function() {
//     self.nes.printFps();
// }, self.nes.opts.fpsInterval);

// those are currently in the "global" scope, but only being used here
var fpsinterval = 0;
var mainLoopInterval = null;
var markDurationInterval = null;

// // review bug
// // without this, start button wasn't being activated for some reason
// var badFixStartBug = setInterval(function(){ // review bad fix
//   //$('#emulator .nes-pause').click();
//   //if (self.nes.isRunning) clearInterval(badFixStartBug);
// }, 100); // wait a bit to start main loop

function startMainLoop () {
  mainLoopInterval = setInterval(asyncMainLoop, fpsinterval);
  markDurationInterval = setInterval(markDuration, 1000);
}

function markDuration () {
  pool.duration += 1/3600; // in hours
  $aigui.find('#banner #duration').text( Math.round(pool.duration * 10000) / 10000 +' hours' );
}

// $('#emulator .nes-pause').click(function(){
//   if (self.nes.isRunning) {
//     startMainLoop();
//   } else { // pause
//     clearInterval(mainLoopInterval);
//     clearInterval(markDurationInterval);
//   }
// });
var reviving = false;
var firststart = true;
var revivetime = getTime();
function manageGameStates () {
  //var gameClock = getTime();
  
  // is it in the ...
  // ... demo screen?
  //reviving = false;
  //     simulate.keyUp(self.nes.keyboard.state1_keys.KEY_START); // make sure it's released
//     setTimeout(function () {
//       simulate.keyPress(self.nes.keyboard.state1_keys.KEY_START);
//     }, 200);
  
  if (!isPlayerPlaying() && !reviving) {


                //dead or starting
                if (firststart){
                       firststart = false;
                } 
                //closeStats();                  
                
                console.log("Reviving!");
                reviving = true;
                revivetime = getTime();
                setTimeout(function(){ closeStats(); }, 1000);       
                setTimeout(function(){ setNick("Hi"); }, 2000);       
  } else if (isPlayerPlaying() && reviving) {
            reviving = false;
            console.log("Done Reviving!");
        }

 //reviving = false;
//   // ... beginning of a new game?
//   if (isPlayerPlaying() && gameClock < 401 && pool.gameState === null) {
//     saveGameState();
//   }
// 
//   // ... dead?
//   if (isPlayerPlaying() && isPlayerObjPause()) {
//     if (gameClock < 1) {
//       loadGameState();
//     }
//   }
}

var bestSize = 0;
var aliveCells = [];
var evaluated = false;
function asyncMainLoop () { // infinite, async equivalent
        //console.log("Started mainloop");
     

        
        var species = pool.species[pool.currentSpecies];
        var genome = species.genomes[pool.currentGenome];

         if ($form.find('input#showNetwork')[0].checked) {
                 displayGenome(genome);
        }

        if (pool.currentFrame%5 == 0) {
                evaluateCurrent();
        }

        //joypadSet(controller);
        moveCell(controller);
        
        //getPositions();
        aliveCells = getPlayerCells();
        var playerSize = 0;
        
        for (var i = 0;i<aliveCells.length;i++){
                playerSize += aliveCells[i].size;
        }
        //console.log('Player size: ' + playerSize);
        bestSize = Math.max(playerSize, bestSize);
        
        // if (marioX > rightmost) {
        //         rightmost = marioX;
        //         timeout = TimeoutConstant;
        // }
//         if (30 > bestSize) {
//                 //rightmost = marioX;
//                 timeout = TimeoutConstant;
//         }
// 
//         timeout = timeout - 1;


        //var timeoutBonus = pool.currentFrame / 4;
        if (!isPlayerPlaying() && !reviving && !firststart) {
                var fitness = bestSize //- (pool.currentFrame / 3);
                if (bestSize > 3186) {
                        fitness = fitness + 1000;
                }
                if (fitness == 0) {
                        fitness = -1;
                }
                genome.fitness = fitness;

                if (fitness > pool.maxFitness) {
                        pool.maxFitness = fitness;
                        $form.find('input#maxFitness').val(Math.floor(pool.maxFitness));

                        writeFile( "autobackup.fitness." + fitness + "." + $form.find('input#saveLoadFile').val() );
                        writeFile("autobackup.pool");
                }

                console.log("Gen " + pool.generation + " species " + pool.currentSpecies + " genome " + pool.currentGenome + " fitness: " + fitness);
                pool.currentSpecies = 0; // array bonds
                pool.currentGenome = 0; // array bonds
                while ( fitnessAlreadyMeasured() ) {
                        nextGenome();
                }
                initializeRun();
        }

        var measured = 0;
        var total = 0;
        for (var s in pool.species) { // in pairs
                var species = pool.species[s];
                for (var g in species.genomes) { // in pairs
                        var genome = species.genomes[g];
                        total++;
                        if (genome.fitness != 0) {
                                measured++;
                        }
                }
        }

        $aigui.find('#banner #gen').text( pool.generation + ' species ' + pool.currentSpecies + ' genome ' + pool.currentGenome + ' (' + Math.floor(measured/total*100) + '%)' );
        $aigui.find('#banner #fitness').text(bestSize);
        $aigui.find('#banner #maxFitness').text( Math.floor(pool.maxFitness) );

        pool.currentFrame++;

        //self.nes.frame();
        manageGameStates();
        
}



// AGAR Overrides

function isPlayerPlaying() {
  return getPlayerCells().length > 0;
}

function getTime () {
  var t = new Date().getTime;
  return t;
}


function getInputs(){
    var inputs = [];
    var boxSize = boxRadius * 2 + 1;

    var cellWidth = gridWidth / boxSize;
    var cellHeight = gridHeight / boxSize;
    
    var scanInterval = 30;
    
    var scanCount = 0;
    //var inputs = [];
    context.fillStyle="#FF0000";
    context.font="20px Georgia";
    for (var x = window.agar.rawViewport.x - (gridWidth / 2) / transform.scale; x <=window.agar.rawViewport.x + (gridWidth / 2) / transform.scale - 1; x += cellWidth / transform.scale) {        
        for (var y = window.agar.rawViewport.y - (gridHeight / 2) / transform.scale; y <= window.agar.rawViewport.y + (gridHeight / 2) / transform.scale - 1; y += cellHeight / transform.scale) {
            var cellThreatLevel = 0.0;
            //for each interval within the cell get the color and add it to the total - we need a value between 1 and -1
            //positive values are other players and virus, negative is food
            //todo: color the cells greyscale accoring to theat level
            for (var cellX = x; cellX < x + cellWidth; cellX += scanInterval){
                for (var cellY = y; cellY < y + cellHeight; cellY += scanInterval){
                    var pixelData = context.getImageData(cellX * transform.scale + transform.x, cellY * transform.scale + transform.y, 1, 1).data;
                    cellThreatLevel += ((pixelData[0] + pixelData[1] + pixelData[2])/765 * -1) + 1;//255; //grey tone
                    scanCount += 1;
               }  
            } 
            cellThreatLevel = cellThreatLevel / scanCount; //mean
            cellThreatLevel = +cellThreatLevel.toFixed(1);
            //context.fillText(cellThreatLevel, x, y)
            inputs.push(cellThreatLevel);
            cellThreatLevel = 0;
            scanCount = 0;
        }
    }
    return inputs;    
}

function moveCell(controler){
    var x = window.agar.rawViewport.x;
    var y = window.agar.rawViewport.y;
    
    var doNothing = false;
        //temp
    drawCircle(x, y);
    
    if (controler['KEY_UP'] && controler['KEY_LEFT']){
        x = window.agar.rawViewport.x - (gridWidth / 2);
        y = window.agar.rawViewport.y - (gridHeight / 2);
    } else if (controler['KEY_UP'] && controler['KEY_RIGHT']){
        x = window.agar.rawViewport.x + (gridWidth / 2);
        y = window.agar.rawViewport.y - (gridHeight / 2);
    } else if (controler['KEY_DOWN'] && controler['KEY_LEFT']){
        x = window.agar.rawViewport.x - (gridWidth / 2);
        y = window.agar.rawViewport.y + (gridHeight / 2);
    } else if (controler['KEY_DOWN'] && controler['KEY_RIGHT']){
        x = window.agar.rawViewport.x + (gridWidth / 2);
        y = window.agar.rawViewport.y + (gridHeight / 2);
    } else if (controler['KEY_UP']){
        x = window.agar.rawViewport.x;
        y = window.agar.rawViewport.y - (gridHeight / 2);
    } else if (controler['KEY_DOWN']){
        x = window.agar.rawViewport.x;
        y = window.agar.rawViewport.y + (gridHeight / 2);
    } else if (controler['KEY_LEFT']){
        x = window.agar.rawViewport.x - (gridWidth / 2);
        y = window.agar.rawViewport.y;
    } else if (controler['KEY_RIGHT']){
        x = window.agar.rawViewport.x + (gridWidth / 2);
        y = window.agar.rawViewport.y;
    } else {
        doNothing = true;
    }
    
  //  if (!doNothing){                
        //mouse move scaling
        x = x*transform.scale + transform.x;
        y = y*transform.scale + transform.y;
        
        canvas.onmousemove({clientX:x, clientY:y});
  //  }
 

}



//AI GUI


function displayGenome (genome) { // review - at least the `gui.`
        var network = genome.network;
        var cells = [];
        var i = 0; // array bonds
        var cell = {};
        for (var dy=-boxRadius; dy<=boxRadius; dy++) {
                for (var dx=-boxRadius; dx<=boxRadius; dx++) {
                        cell = {};
                        cell.x = 50+5*dx;
                        cell.y = 70+5*dy;
                        cell.value = network.neurons[i].value;
                        cells[i] = cell;
                        i++;
                }
        }
        var biasCell = {};
        biasCell.x = 80;
        biasCell.y = 110;
        biasCell.value = network.neurons[Inputs-1].value; // array bonds
        cells[Inputs-1] = biasCell; // array bonds
        
        $aigui.find('#show #buttonNames').html('');
        for (var o = 0; o<Outputs; o++) {
                cell = {};
                cell.x = 220;
                cell.y = 30 + 8 * o;
                cell.value = network.neurons[MaxNodes + o].value;
                cells[MaxNodes+o] = cell;
                var color;
                if (cell.value > 0) {
                        color = 0xFF0000FF;
                } else {
                        color = 0xFF000000;
                }
                $aigui.find('#show #buttonNames').append( ButtonNames[o] +' ' + cell.value.toFixed(2) + ' <br>' );
                //gui.drawText(223, 24+8*o, ButtonNames[o], color, 9);
        }

        for (var n in network.neurons) { // in pairs
                var neuron = network.neurons[n];
                cell = {};
                if (n >= Inputs && n < MaxNodes) { // array bonds
                        cell.x = 140;
                        cell.y = 40;
                        cell.value = neuron.value;
                        cells[n] = cell;
                }
        }

        for (var n=0; n<4; n++) {
                for (var _ in genome.genes) { // in pairs
                        var gene = genome.genes[_];
                        if (gene.enabled) {
                                var c1 = cells[gene.into];
                                var c2 = cells[gene.out];
                                if (gene.into >= Inputs && gene.into < MaxNodes) { // array bonds
                                        c1.x = 0.75*c1.x + 0.25*c2.x;
                                        if (c1.x >= c2.x) {
                                                c1.x = c1.x - 40;
                                        }
                                        if (c1.x < 90) {
                                                c1.x = 90;
                                        }

                                        if (c1.x > 220) {
                                                c1.x = 220;
                                        }
                                        c1.y = 0.75*c1.y + 0.25*c2.y;

                                }
                                if (gene.out >= Inputs && gene.out < MaxNodes) { // array bonds
                                        c2.x = 0.25*c1.x + 0.75*c2.x;
                                        if (c1.x >= c2.x) {
                                                c2.x = c2.x + 40;
                                        }
                                        if (c2.x < 90) {
                                                c2.x = 90;
                                        }
                                        if (c2.x > 220) {
                                                c2.x = 220;
                                        }
                                        c2.y = 0.25*c1.y + 0.75*c2.y;
                                }
                        }
                }
        }

        // gui.drawBox(50-BoxRadius*5-3,70-BoxRadius*5-3,50+BoxRadius*5+2,70+BoxRadius*5+2,0xFF000000, 0x80808080);
        for (var n in cells) { // in pairs
                var cell = cells[n];
                if (n >= Inputs || cell.value != 0) { // array bonds
                        var color = Math.floor((cell.value+1)/2*256);
                        if (color > 255) { color = 255 };
                        if (color < 0) { color = 0 };
                        var opacity = 0xFF000000;
                        if (cell.value == 0) {
                                opacity = 0x50000000;
                        }
                        color = opacity + color*0x10000 + color*0x100 + color;
                        // gui.drawBox(cell.x-2,cell.y-2,cell.x+2,cell.y+2,opacity,color);
                }
        }
        for (var _ in genome.genes) { // in pairs
                var gene = genome.genes[_];
                if (gene.enabled) {
                        var c1 = cells[gene.into];
                        var c2 = cells[gene.out];
                        var opacity = 0xA0000000;
                        if (c1.value == 0) {
                                opacity = 0x20000000;
                        }

                        var color = 0x80-Math.floor(Math.abs(sigmoid(gene.weight))*0x80);
                        if (gene.weight > 0) {
                                color = opacity + 0x8000 + 0x10000*color;
                        } else {
                                color = opacity + 0x800000 + 0x100*color;
                        }
                        // gui.drawLine(c1.x+1, c1.y, c2.x-3, c2.y, color);
                }
        }

        // gui.drawBox(49,71,51,78,0x00000000,0x80FF0000);

        if ($form.find('input#showMutationRates')[0].checked) {
                var pos = 100;
                for (var mutation in genome.mutationRates) { // in pairs
                        var rate = genome.mutationRates[mutation];
                        $aigui.find('#show #mutation').html( mutation +': '+ rate +'<br>' );
                        //gui.drawText(100, pos, mutation + ": " + rate, 0xFF000000, 10);
                        pos = pos + 8;
                }
        }
}

function displayBanner () {
  $aigui.find('div#banner').toggle(!$form.find('input#hideBanner')[0].checked);
}

function limitFPS () {
  if ($form.find('input#limitFPS')[0].checked) {
    fpsinterval = 10; //TODO: Add a call to main loop in afterdraw
  } else {
    fpsinterval = 0;
  }
  clearInterval(mainLoopInterval);
  mainLoopInterval = setInterval(asyncMainLoop, fpsinterval);
}

function createAiGUI () {
  $aigui = $('<div id="aigui"></div>').appendTo('body');

  var $banner = $('<div id="banner" style="background: 0xD0FFFFFF; position: absolute"></div>').appendTo($aigui);
  $banner.append('<label for="gen">Gen <span id="gen" class="data"></span></label>');
  $banner.append('<label for="fitness">Fitness: <span id="fitness" class="data"></span></label>');
  $banner.append('<label for="maxFitness">Max Fitness: <span id="maxFitness" class="data"></span></label>');
  $banner.append('<label for="duration">Duration: <span id="duration" class="data"></span></label>');

  var $show = $('<div id="show" align="center" style="position: relative;">></div>').appendTo($aigui);
  $show.append('<span id="buttonNames" class="data"></span>');
  $show.append('<span id="mutations" class="data"></span>');

  $form = $('<form id="fitnessSettings" style="position: relative; width: 10%"><h1>Fitness Settings</h1></form>').appendTo('body');

  $form.append('<label for="maxFitness">Max Fitness: <input id="maxFitness" type="text" value="'+ Math.floor(pool.maxFitness) +'"></label>');
  $form.append('<label for="showNetwork"><input checked id="showNetwork" type="checkbox"> Show Map</label>');
  $form.append('<label for="showMutationRates"><input checked id="showMutationRates" type="checkbox"> Show M-Rates</label>');
  $form.append( $('<input id="restartButton" type="button" value="Restart">').click(restartPool) );
  $form.append( $('<input id="saveButton" type="button" value="Save">').click(savePool) );
  $form.append( $('<input id="loadButton" type="button" value="Load">').click(loadPool) );
  $form.append('<label for="saveLoadFile">Save/Load: <input id="saveLoadFile" type="text" value="'+ Filename +'.pool"></label>');
  $form.append( $('<input id="playTopButton" type="button" value="Play Top">').click(playTop) );
  $('<label for="hideBanner"><input id="hideBanner" type="checkbox"> Hide Banner</label>').appendTo($form).find('input').click(displayBanner);
  $('<label for="limitFPS"><input disabled id="limitFPS" type="checkbox"> Limit FPS</label>').appendTo($form).find('input').click(limitFPS); // review bug // was disabled - changed in agar
  
  // 
// #aigui .data {
//   color: gray;
//   padding-right: 1em;
// }
 
 $('#aigui .data').css('color', 'gray');
 $('#aigui .data').css('padding-right', '1em');
}


console.log("Loaded all code!!");
//HOOOOOOOOOOOOOOOOOOO
startMainLoop();
