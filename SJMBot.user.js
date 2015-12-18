// ==UserScript==
// @name        SJMBot
// @namespace   SJMBot
// @include     http://agar.io/*
// @include     https://agar.io/*
// @version     0.01
// @grant       none
// @author      SJMakin@Github
// ==/UserScript==


//START - Helper methods
function compareSize(player1, player2, ratio) {
        if (player1.size * player1.size * ratio < player2.size * player2.size) {
            return true;
        }
        return false;
    }

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


function isThreat(blob, cell) {
        if (!cell.isVirus() && this.compareSize(blob, cell, 1.30)) {
            return true;
        }
        return false;
    };
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
window.agar.showStartupBg = false;
//disableRendering

//Sample code
image = new Image();
image.crossOrigin = 'anonymous';
image.src = 'http://i.imgur.com/V8EOXwT.png';
window.agar.hooks.cellSkin = function(cell, old_skin) {
    if (old_skin) return old_skin;
    if (cell.isVirus) return image;
    return null;
}
console.log('Loaded UI');
//END - UI Customisation

//START - Bot control

function processGameState(){
    //console.debug("SJMBot processGameState");
    var food = [];
    var virus = [];
    var me = [];
    var danger = [];
    var other = [];
    console.log(window.agar.allCells.length);
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

-- MarI/O by SethBling
-- Feel free to use this code, but please do not redistribute it.
-- Intended for use with the BizHawk emulator and Super Mario World or Super Mario Bros. ROM.
-- For SMW, make sure you have a save state named "DP1.state" at the beginning of a level,
-- and put a copy in both the Lua folder and the root directory of BizHawk.


var	ButtonNames = {
		"Split",
		"Shoot",
		"Up",
		"Down",
		"Left",
		"Right",
	}


var boxRadius = 6
var inputSize = (boxRadius*2+1)*(boxRadius*2+1)

var Inputs = InputSize+1
var Outputs = #ButtonNames

var Population = 300
var DeltaDisjoint = 2.0
var DeltaWeights = 0.4
var DeltaThreshold = 1.0

var StaleSpecies = 15

var MutateConnectionsChance = 0.25
var PerturbChance = 0.90
var CrossoverChance = 0.75
var LinkMutationChance = 2.0
var NodeMutationChance = 0.50
var BiasMutationChance = 0.40
var StepSize = 0.1
var DisableMutationChance = 0.4
var EnableMutationChance = 0.2

var TimeoutConstant = 20

var MaxNodes = 1000000

function getPositions() {
   	// if gameinfo.getromname() == "Super Mario World (USA)" then
	// 	marioX = memory.read_s16_le(0x94)
	// 	marioY = memory.read_s16_le(0x96)
	// 	
	// 	var layer1x = memory.read_s16_le(0x1A);
	// 	var layer1y = memory.read_s16_le(0x1C);
	// 	
	// 	screenX = marioX-layer1x
	// 	screenY = marioY-layer1y
	// elseif gameinfo.getromname() == "Super Mario Bros." then
	// 	marioX = memory.readbyte(0x6D) * 0x100 + memory.readbyte(0x86)
	// 	marioY = memory.readbyte(0x03B8)+16
	// 
	// 	screenX = memory.readbyte(0x03AD)
	// 	screenY = memory.readbyte(0x03B8)
	// end 
}

// 
// function getTile(dx, dy)
// 	if gameinfo.getromname() == "Super Mario World (USA)" then
// 		x = math.floor((marioX+dx+8)/16)
// 		y = math.floor((marioY+dy)/16)
// 		
// 		return memory.readbyte(0x1C800 + math.floor(x/0x10)*0x1B0 + y*0x10 + x%0x10)
// 	elseif gameinfo.getromname() == "Super Mario Bros." then
// 		var x = marioX + dx + 8
// 		var y = marioY + dy - 16
// 		var page = math.floor(x/256)%2
// 
// 		var subx = math.floor((x%256)/16)
// 		var suby = math.floor((y - 32)/16)
// 		var addr = 0x500 + page*13*16+suby*16+subx
// 		
// 		if suby >= 13 or suby < 0 then
// 			return 0
// 		end
// 		
// 		if memory.readbyte(addr) != 0 then
// 			return 1
// 		else
// 			return 0
// 		end
// 	end
// end

// function getSprites()
// 	if gameinfo.getromname() == "Super Mario World (USA)" then
// 		var sprites = {}
// 		for slot=0,11 do
// 			var status = memory.readbyte(0x14C8+slot)
// 			if status != 0 then
// 				spritex = memory.readbyte(0xE4+slot) + memory.readbyte(0x14E0+slot)*256
// 				spritey = memory.readbyte(0xD8+slot) + memory.readbyte(0x14D4+slot)*256
// 				sprites[#sprites+1] = {["x"]=spritex, ["y"]=spritey}
// 			end
// 		end		
// 		
// 		return sprites
// 	elseif gameinfo.getromname() == "Super Mario Bros." then
// 		var sprites = {}
// 		for slot=0,4 do
// 			var enemy = memory.readbyte(0xF+slot)
// 			if enemy != 0 then
// 				var ex = memory.readbyte(0x6E + slot)*0x100 + memory.readbyte(0x87+slot)
// 				var ey = memory.readbyte(0xCF + slot)+24
// 				sprites[#sprites+1] = {["x"]=ex,["y"]=ey}
// 			end
// 		end
// 		
// 		return sprites
// 	end
// end

// function getExtendedSprites()
// 	if gameinfo.getromname() == "Super Mario World (USA)" then
// 		var extended = {}
// 		for slot=0,11 do
// 			var number = memory.readbyte(0x170B+slot)
// 			if number != 0 then
// 				spritex = memory.readbyte(0x171F+slot) + memory.readbyte(0x1733+slot)*256
// 				spritey = memory.readbyte(0x1715+slot) + memory.readbyte(0x1729+slot)*256
// 				extended[#extended+1] = {["x"]=spritex, ["y"]=spritey}
// 			end
// 		end		
// 		
// 		return extended
// 	elseif gameinfo.getromname() == "Super Mario Bros." then
// 		return {}
// 	end
// end

function getInputs(){
// 	getPositions()
// 	
// 	sprites = getSprites()
// 	extended = getExtendedSprites()
// 	
// 	var inputs = []
// 	
// 	for dy=-BoxRadius*16,BoxRadius*16,16 do
// 		for dx=-BoxRadius*16,BoxRadius*16,16 do
// 			inputs[#inputs+1] = 0
// 			
// 			tile = getTile(dx, dy)
// 			if tile == 1 and marioY+dy < 0x1B0 then
// 				inputs[#inputs] = 1
// 			end
// 			
// 			for i = 1,#sprites do
// 				distx = math.abs(sprites[i]["x"] - (marioX+dx))
// 				disty = math.abs(sprites[i]["y"] - (marioY+dy))
// 				if distx <= 8 and disty <= 8 then
// 					inputs[#inputs] = -1
// 				end
// 			end
// 
// 			for i = 1,#extended do
// 				distx = math.abs(extended[i]["x"] - (marioX+dx))
// 				disty = math.abs(extended[i]["y"] - (marioY+dy))
// 				if distx < 8 and disty < 8 then
// 					inputs[#inputs] = -1
// 				end
// 			end
// 		end
// 	end
// 	
	//mariovx = memory.read_s8(0x7B)
	//mariovy = memory.read_s8(0x7D)
	
    for (var w = 0; w < inputSize; w++){
        for (key in window.agar.allCells){
            
        }
    }
    
    
	return inputs    
}



function sigmoid(x){
        return 2/(1+Math.exp(-4.9*x))-1
}

function newInnovation(){
    pool.innovation = pool.innovation + 1
	return pool.innovation
}

function newPool() {
    var pool = {}
	pool.species = []
	pool.generation = 0
	pool.innovation = Outputs
	pool.currentSpecies = 1
	pool.currentGenome = 1
	pool.currentFrame = 0
	pool.maxFitness = 0
	
	return pool
}

function newSpecies() {
	var species = {}
	species.topFitness = 0
	species.staleness = 0
	species.genomes = []
	species.averageFitness = 0
	
	return species    
}

function newGenome() {
    var genome = {}
	genome.genes = []
	genome.fitness = 0
	genome.adjustedFitness = 0
	genome.network = []
	genome.maxneuron = 0
	genome.globalRank = 0
	genome.mutationRates = []
	genome.mutationRates["connections"] = MutateConnectionsChance
	genome.mutationRates["link"] = LinkMutationChance
	genome.mutationRates["bias"] = BiasMutationChance
	genome.mutationRates["node"] = NodeMutationChance
	genome.mutationRates["enable"] = EnableMutationChance
	genome.mutationRates["disable"] = DisableMutationChance
	genome.mutationRates["step"] = StepSize
	
	return genome  
}

function copyGenome(genome){
    var genome2 = newGenome()
	for (var g = 1; i < genome.gene.length; i++){
        genome2.genes.push(copyGene(genome.genes[g]))
    } 
	genome2.maxneuron = genome.maxneuron
	genome2.mutationRates["connections"] = genome.mutationRates["connections"]
	genome2.mutationRates["link"] = genome.mutationRates["link"]
	genome2.mutationRates["bias"] = genome.mutationRates["bias"]
	genome2.mutationRates["node"] = genome.mutationRates["node"]
	genome2.mutationRates["enable"] = genome.mutationRates["enable"]
	genome2.mutationRates["disable"] = genome.mutationRates["disable"]
	
	return genome2
}

function basicGenome(){
   	var genome = newGenome()
	var innovation = 1

	genome.maxneuron = Inputs
	mutate(genome)
	
	return genome 
}

function newGene(){
    var gene = {}
	gene.into = 0
	gene.out = 0
	gene.weight = 0.0
	gene.enabled = true
	gene.innovation = 0
	
	return gene
}

function copyGene(gene){
   	var gene2 = newGene()
	gene2.into = gene.into
	gene2.out = gene.out
	gene2.weight = gene.weight
	gene2.enabled = gene.enabled
	gene2.innovation = gene.innovation
	
	return gene2 
}

function newNeuron(){
    var neuron = {}
	neuron.incoming = []
	neuron.value = 0.0
	
	return neuron
}

function generateNetwork(genome){
   	var network = {}
	network.neurons = []
	
	for (var i = 0; i < Inputs; i++) {
        network.neurons[i] = newNeuron()
    } 
	
	for (var o=0; o < Outputs; o++){
        network.neurons[MaxNodes+o] = newNeuron()
    }
		
	genome.genes.sort(function (a,b) {return a.out < b.out})	
    
	for (var i=1;i < genome.genes.length; i++){
		var gene = genome.genes[i]
		if (gene.enabled){
			if (network.neurons[gene.out] == null){
				network.neurons[gene.out] = newNeuron()
            }
			var neuron = network.neurons[gene.out]
			table.insert(neuron.incoming, gene)
			if (network.neurons[gene.into] == null){ 
				network.neurons[gene.into] = newNeuron()
            }
        }		
    }
	
	genome.network = network 
}


function evaluateNetwork(network, inputs){
    inputs.push(1)
	if (inputs.length != Inputs){
		console.writeline("Incorrect number of neural network inputs.")
		return {}
	}
		
	for (var i = 1; i < Inputs; i++){
		network.neurons[i].value = inputs[i]
	}
		
	for _,neuron in pairs(network.neurons) do
		var sum = 0
		for j = 1,#neuron.incoming do
			var incoming = neuron.incoming[j]
			var other = network.neurons[incoming.into]
			sum = sum + incoming.weight * other.value
		end
		
		if #neuron.incoming > 0 then
			neuron.value = sigmoid(sum)
		end
	end
	
	var outputs = {}
	for o=1,Outputs do
		var button = "P1 " .. ButtonNames[o]
		if network.neurons[MaxNodes+o].value > 0 then
			outputs[button] = true
		else
			outputs[button] = false
		end
	end
	
	return outputs
}

function crossover(g1, g2){
	// Make sure g1 is the higher fitness genome
	if (g2.fitness > g1.fitness) {
		tempg = g1
		g1 = g2
		g2 = tempg        
    } 
    
	var child = newGenome()
	
	var innovations2 = []
    
	for (var i = 0; g2.genes.length; i++){
		var gene = g2.genes[i]
		innovations2[gene.innovation] = gene
	}
	
	for (var i = 0; i < g1.genes.length; i++){
		var gene1 = g1.genes[i]
		var gene2 = innovations2[gene1.innovation]
		if (gene2 != null && Math.random(2) == 1 && gene2.enabled){
			child.genes.push(copyGene(gene2))
		} else {
			child.genes.push(copyGene(gene1))
		}
	}
		
	child.maxneuron = Math.max(g1.maxneuron,g2.maxneuron)
	
	//Probably wrong - SJM
	for (rate of g1.mutationRates) {
		child.mutationRates[mutation] = rate	
	}
	
	return child    
}


function randomNeuron(genes, nonInput)
	var neurons = []
	if (!nonInput) {
		for (var i = 0;i < Inputs; i++){
			neurons[i] = true
		}
	}
	
	for (var o = 1;o < Outputs; o++) {
		neurons[MaxNodes+o] = true
	}
	
	for (var i = 1; i < genes.length; i++){ 
		if ((!nonInput) || genes[i].into > Inputs){
			neurons[genes[i].into] = true
		}
		if ((!nonInput) || genes[i].out > Inputs){
			neurons[genes[i].out] = true
		}
	}

	var count = 0
	for _,_ in pairs(neurons) do
		count = count + 1
	end
	var n = math.random(1, count)
	
	for k,v in pairs(neurons) do
		n = n-1
		if n == 0 then
			return k
		end
	end
	
	return 0
end

function containsLink(genes, link){
	for (var i=1; i < genes.length; i++){
		var gene = genes[i]
		if (gene.into == link.into && gene.out == link.out){
			return true;
		}
	}
}

function pointMutate(genome){
	var step = genome.mutationRates["step"]
	
	for (var i = 0;i < genome.genes.length; i++){
		var gene = genome.genes[i]
		if (Math.random() < PerturbChance){
			gene.weight = gene.weight + math.random() * step*2 - step
		} else{
			gene.weight = math.random()*4-2
		}
	}		
}

function linkMutate(genome, forceBias){
	var neuron1 = randomNeuron(genome.genes, false)
	var neuron2 = randomNeuron(genome.genes, true)
	 
	var newLink = newGene()
	if (neuron1 <= Inputs && neuron2 <= Inputs){
		//Both input nodes
		return
	}
	if (neuron2 <= Inputs){
		// Swap output and input
		var temp = neuron1
		neuron1 = neuron2
		neuron2 = temp
	}

	newLink.into = neuron1
	newLink.out = neuron2
	if (forceBias){
		newLink.into = Inputs
	}
	
	if (containsLink(genome.genes, newLink)){
		return
	}
	
	newLink.innovation = newInnovation()
	newLink.weight = math.random()*4-2
	
	table.insert(genome.genes, newLink)
}

function nodeMutate(genome){
	if (genome.genes.length == 0){
		return
	}

	genome.maxneuron = genome.maxneuron + 1

	var gene = genome.genes[math.random(1,genome.genes.length)]
	
	if (!gene.enabled ){
		return
	}
	
	gene.enabled = false
	
	var gene1 = copyGene(gene)
	gene1.out = genome.maxneuron
	gene1.weight = 1.0
	gene1.innovation = newInnovation()
	gene1.enabled = true
	genome.genes.push(gene1)
	
	var gene2 = copyGene(gene)
	gene2.into = genome.maxneuron
	gene2.innovation = newInnovation()
	gene2.enabled = true
	genome.genes.push(gene2)
}

function enableDisableMutate(genome, enable)
	var candidates = {}
	for _,gene in pairs(genome.genes) do
		if gene.enabled == !enable then
			table.insert(candidates, gene)
		end
	end
	
	if #candidates == 0 then
		return
	end
	
	var gene = candidates[math.random(1,#candidates)]
	gene.enabled = !gene.enabled
end

function mutate(genome)
	for mutation,rate in pairs(genome.mutationRates) do
		if math.random(1,2) == 1 then
			genome.mutationRates[mutation] = 0.95*rate
		else
			genome.mutationRates[mutation] = 1.05263*rate
		end
	end

	if math.random() < genome.mutationRates["connections"] then
		pointMutate(genome)
	end
	
	var p = genome.mutationRates["link"]
	while p > 0 do
		if math.random() < p then
			linkMutate(genome, false)
		end
		p = p - 1
	end

	p = genome.mutationRates["bias"]
	while p > 0 do
		if math.random() < p then
			linkMutate(genome, true)
		end
		p = p - 1
	end
	
	p = genome.mutationRates["node"]
	while p > 0 do
		if math.random() < p then
			nodeMutate(genome)
		end
		p = p - 1
	end
	
	p = genome.mutationRates["enable"]
	while p > 0 do
		if math.random() < p then
			enableDisableMutate(genome, true)
		end
		p = p - 1
	end

	p = genome.mutationRates["disable"]
	while p > 0 do
		if math.random() < p then
			enableDisableMutate(genome, false)
		end
		p = p - 1
	end
end

function disjoint(genes1, genes2)
	var i1 = {}
	for i = 1,#genes1 do
		var gene = genes1[i]
		i1[gene.innovation] = true
	end

	var i2 = {}
	for i = 1,#genes2 do
		var gene = genes2[i]
		i2[gene.innovation] = true
	end
	
	var disjointGenes = 0
	for i = 1,#genes1 do
		var gene = genes1[i]
		if !i2[gene.innovation] then
			disjointGenes = disjointGenes+1
		end
	end
	
	for i = 1,#genes2 do
		var gene = genes2[i]
		if !i1[gene.innovation] then
			disjointGenes = disjointGenes+1
		end
	end
	
	var n = math.max(#genes1, #genes2)
	
	return disjointGenes / n
end

function weights(genes1, genes2)
	var i2 = {}
	for i = 1,#genes2 do
		var gene = genes2[i]
		i2[gene.innovation] = gene
	end

	var sum = 0
	var coincident = 0
	for i = 1,#genes1 do
		var gene = genes1[i]
		if i2[gene.innovation] != null then
			var gene2 = i2[gene.innovation]
			sum = sum + math.abs(gene.weight - gene2.weight)
			coincident = coincident + 1
		end
	end
	
	return sum / coincident
end
	
function sameSpecies(genome1, genome2){
	var dd = DeltaDisjoint*disjoint(genome1.genes, genome2.genes)
	var dw = DeltaWeights*weights(genome1.genes, genome2.genes) 
	return dd + dw < DeltaThreshold
}

function rankGlobally()
	var global = {}
	for s = 1,#pool.species do
		var species = pool.species[s]
		for g = 1,#species.genomes do
			table.insert(global, species.genomes[g])
		end
	end
	table.sort(global, function (a,b)
		return (a.fitness < b.fitness)
	end)
	
	for g=1,#global do
		global[g].globalRank = g
	end
end

function calculateAverageFitness(species)
	var total = 0
	
	for g=1,#species.genomes do
		var genome = species.genomes[g]
		total = total + genome.globalRank
	end
	
	species.averageFitness = total / #species.genomes
end

function totalAverageFitness()
	var total = 0
	for s = 1,#pool.species do
		var species = pool.species[s]
		total = total + species.averageFitness
	end

	return total
end

function cullSpecies(cutToOne)
	for s = 1,#pool.species do
		var species = pool.species[s]
		
		table.sort(species.genomes, function (a,b)
			return (a.fitness > b.fitness)
		end)
		
		var remaining = math.ceil(#species.genomes/2)
		if cutToOne then
			remaining = 1
		end
		while #species.genomes > remaining do
			table.remove(species.genomes)
		end
	end
end

function breedChild(species)
	var child = {}
	if math.random() < CrossoverChance then
		g1 = species.genomes[math.random(1, #species.genomes)]
		g2 = species.genomes[math.random(1, #species.genomes)]
		child = crossover(g1, g2)
	else
		g = species.genomes[math.random(1, #species.genomes)]
		child = copyGenome(g)
	end
	
	mutate(child)
	
	return child
end

function removeStaleSpecies()
	var survived = {}

	for s = 1,#pool.species do
		var species = pool.species[s]
		
		table.sort(species.genomes, function (a,b)
			return (a.fitness > b.fitness)
		end)
		
		if species.genomes[1].fitness > species.topFitness then
			species.topFitness = species.genomes[1].fitness
			species.staleness = 0
		else
			species.staleness = species.staleness + 1
		end
		if species.staleness < StaleSpecies or species.topFitness >= pool.maxFitness then
			table.insert(survived, species)
		end
	end

	pool.species = survived
end

function removeWeakSpecies()
	var survived = {}

	var sum = totalAverageFitness()
	for s = 1,#pool.species do
		var species = pool.species[s]
		breed = math.floor(species.averageFitness / sum * Population)
		if breed >= 1 then
			table.insert(survived, species)
		end
	end

	pool.species = survived
end


function addToSpecies(child)
	var foundSpecies = false
	for s=1,#pool.species do
		var species = pool.species[s]
		if !foundSpecies && sameSpecies(child, species.genomes[1]) then
			table.insert(species.genomes, child)
			foundSpecies = true
		end
	end
	
	if !foundSpecies then
		var childSpecies = newSpecies()
		table.insert(childSpecies.genomes, child)
		table.insert(pool.species, childSpecies)
	end
end

function newGeneration()
	cullSpecies(false) //Cull the bottom half of each species
	rankGlobally()
	removeStaleSpecies()
	rankGlobally()
	for s = 1,#pool.species do
		var species = pool.species[s]
		calculateAverageFitness(species)
	end
	removeWeakSpecies()
	var sum = totalAverageFitness()
	var children = {}
	for s = 1,#pool.species do
		var species = pool.species[s]
		breed = math.floor(species.averageFitness / sum * Population) - 1
		for i=1,breed do
			table.insert(children, breedChild(species))
		end
	end
	cullSpecies(true) //Cull all but the top member of each species
	while #children + #pool.species < Population do
		var species = pool.species[math.random(1, #pool.species)]
		table.insert(children, breedChild(species))
	end
	for c=1,#children do
		var child = children[c]
		addToSpecies(child)
	end
	
	pool.generation = pool.generation + 1
	
	writeFile("backup." .. pool.generation .. "." .. forms.gettext(saveLoadFile))
end
	
function initializePool()
	pool = newPool()

	for i=1,Population do
		basic = basicGenome()
		addToSpecies(basic)
	end

	initializeRun()
end

function clearJoypad()
	controller = {}
	for b = 1,#ButtonNames do
		controller["P1 " .. ButtonNames[b]] = false
	end
	joypad.set(controller)
end

function initializeRun()
	savestate.load(Filename);
	rightmost = 0
	pool.currentFrame = 0
	timeout = TimeoutConstant
	clearJoypad()
	
	var species = pool.species[pool.currentSpecies]
	var genome = species.genomes[pool.currentGenome]
	generateNetwork(genome)
	evaluateCurrent()
end

function evaluateCurrent()
	var species = pool.species[pool.currentSpecies]
	var genome = species.genomes[pool.currentGenome]

	inputs = getInputs()
	controller = evaluateNetwork(genome.network, inputs)
	
	if controller["P1 Left"] && controller["P1 Right"] then
		controller["P1 Left"] = false
		controller["P1 Right"] = false
	end
	if controller["P1 Up"] && controller["P1 Down"] then
		controller["P1 Up"] = false
		controller["P1 Down"] = false
	end

	joypad.set(controller)
end

if pool == null then
	initializePool()
end


function nextGenome()
	pool.currentGenome = pool.currentGenome + 1
	if pool.currentGenome > #pool.species[pool.currentSpecies].genomes then
		pool.currentGenome = 1
		pool.currentSpecies = pool.currentSpecies+1
		if pool.currentSpecies > #pool.species then
			newGeneration()
			pool.currentSpecies = 1
		end
	end
end

function fitnessAlreadyMeasured()
	var species = pool.species[pool.currentSpecies]
	var genome = species.genomes[pool.currentGenome]
	
	return genome.fitness != 0
end
// 
// function displayGenome(genome)
// 	var network = genome.network
// 	var cells = {}
// 	var i = 1
// 	var cell = {}
// 	for dy=-BoxRadius,BoxRadius do
// 		for dx=-BoxRadius,BoxRadius do
// 			cell = {}
// 			cell.x = 50+5*dx
// 			cell.y = 70+5*dy
// 			cell.value = network.neurons[i].value
// 			cells[i] = cell
// 			i = i + 1
// 		end
// 	end
// 	var biasCell = {}
// 	biasCell.x = 80
// 	biasCell.y = 110
// 	biasCell.value = network.neurons[Inputs].value
// 	cells[Inputs] = biasCell
// 	
// 	for o = 1,Outputs do
// 		cell = {}
// 		cell.x = 220
// 		cell.y = 30 + 8 * o
// 		cell.value = network.neurons[MaxNodes + o].value
// 		cells[MaxNodes+o] = cell
// 		var color
// 		if cell.value > 0 then
// 			color = 0xFF0000FF
// 		else
// 			color = 0xFF000000
// 		end
// 		gui.drawText(223, 24+8*o, ButtonNames[o], color, 9)
// 	end
// 	
// 	for n,neuron in pairs(network.neurons) do
// 		cell = {}
// 		if n > Inputs && n <= MaxNodes then
// 			cell.x = 140
// 			cell.y = 40
// 			cell.value = neuron.value
// 			cells[n] = cell
// 		end
// 	end
// 	
// 	for n=1,4 do
// 		for _,gene in pairs(genome.genes) do
// 			if gene.enabled then
// 				var c1 = cells[gene.into]
// 				var c2 = cells[gene.out]
// 				if gene.into > Inputs && gene.into <= MaxNodes then
// 					c1.x = 0.75*c1.x + 0.25*c2.x
// 					if c1.x >= c2.x then
// 						c1.x = c1.x - 40
// 					end
// 					if c1.x < 90 then
// 						c1.x = 90
// 					end
// 					
// 					if c1.x > 220 then
// 						c1.x = 220
// 					end
// 					c1.y = 0.75*c1.y + 0.25*c2.y
// 					
// 				end
// 				if gene.out > Inputs && gene.out <= MaxNodes then
// 					c2.x = 0.25*c1.x + 0.75*c2.x
// 					if c1.x >= c2.x then
// 						c2.x = c2.x + 40
// 					end
// 					if c2.x < 90 then
// 						c2.x = 90
// 					end
// 					if c2.x > 220 then
// 						c2.x = 220
// 					end
// 					c2.y = 0.25*c1.y + 0.75*c2.y
// 				end
// 			end
// 		end
// 	end
// 	
// 	gui.drawBox(50-BoxRadius*5-3,70-BoxRadius*5-3,50+BoxRadius*5+2,70+BoxRadius*5+2,0xFF000000, 0x80808080)
// 	for n,cell in pairs(cells) do
// 		if n > Inputs or cell.value != 0 then
// 			var color = math.floor((cell.value+1)/2*256)
// 			if color > 255 then color = 255 end
// 			if color < 0 then color = 0 end
// 			var opacity = 0xFF000000
// 			if cell.value == 0 then
// 				opacity = 0x50000000
// 			end
// 			color = opacity + color*0x10000 + color*0x100 + color
// 			gui.drawBox(cell.x-2,cell.y-2,cell.x+2,cell.y+2,opacity,color)
// 		end
// 	end
// 	for _,gene in pairs(genome.genes) do
// 		if gene.enabled then
// 			var c1 = cells[gene.into]
// 			var c2 = cells[gene.out]
// 			var opacity = 0xA0000000
// 			if c1.value == 0 then
// 				opacity = 0x20000000
// 			end
// 			
// 			var color = 0x80-math.floor(math.abs(sigmoid(gene.weight))*0x80)
// 			if gene.weight > 0 then 
// 				color = opacity + 0x8000 + 0x10000*color
// 			else
// 				color = opacity + 0x800000 + 0x100*color
// 			end
// 			gui.drawLine(c1.x+1, c1.y, c2.x-3, c2.y, color)
// 		end
// 	end
// 	
// 	gui.drawBox(49,71,51,78,0x00000000,0x80FF0000)
// 	
// 	if forms.ischecked(showMutationRates) then
// 		var pos = 100
// 		for mutation,rate in pairs(genome.mutationRates) do
// 			gui.drawText(100, pos, mutation .. ": " .. rate, 0xFF000000, 10)
// 			pos = pos + 8
// 		end
// 	end
// end
// 
// function writeFile(filename)
//         var file = io.open(filename, "w")
// 	file:write(pool.generation .. "\n")
// 	file:write(pool.maxFitness .. "\n")
// 	file:write(#pool.species .. "\n")
//         for n,species in pairs(pool.species) do
// 		file:write(species.topFitness .. "\n")
// 		file:write(species.staleness .. "\n")
// 		file:write(#species.genomes .. "\n")
// 		for m,genome in pairs(species.genomes) do
// 			file:write(genome.fitness .. "\n")
// 			file:write(genome.maxneuron .. "\n")
// 			for mutation,rate in pairs(genome.mutationRates) do
// 				file:write(mutation .. "\n")
// 				file:write(rate .. "\n")
// 			end
// 			file:write("done\n")
// 			
// 			file:write(#genome.genes .. "\n")
// 			for l,gene in pairs(genome.genes) do
// 				file:write(gene.into .. " ")
// 				file:write(gene.out .. " ")
// 				file:write(gene.weight .. " ")
// 				file:write(gene.innovation .. " ")
// 				if(gene.enabled) then
// 					file:write("1\n")
// 				else
// 					file:write("0\n")
// 				end
// 			end
// 		end
//         end
//         file:close()
// end
// 
// function savePool()
// 	var filename = forms.gettext(saveLoadFile)
// 	writeFile(filename)
// end
// 
// function loadFile(filename)
//         var file = io.open(filename, "r")
// 	pool = newPool()
// 	pool.generation = file:read("*number")
// 	pool.maxFitness = file:read("*number")
// 	forms.settext(maxFitnessLabel, "Max Fitness: " .. math.floor(pool.maxFitness))
//         var numSpecies = file:read("*number")
//         for s=1,numSpecies do
// 		var species = newSpecies()
// 		table.insert(pool.species, species)
// 		species.topFitness = file:read("*number")
// 		species.staleness = file:read("*number")
// 		var numGenomes = file:read("*number")
// 		for g=1,numGenomes do
// 			var genome = newGenome()
// 			table.insert(species.genomes, genome)
// 			genome.fitness = file:read("*number")
// 			genome.maxneuron = file:read("*number")
// 			var line = file:read("*line")
// 			while line != "done" do
// 				genome.mutationRates[line] = file:read("*number")
// 				line = file:read("*line")
// 			end
// 			var numGenes = file:read("*number")
// 			for n=1,numGenes do
// 				var gene = newGene()
// 				table.insert(genome.genes, gene)
// 				var enabled
// 				gene.into, gene.out, gene.weight, gene.innovation, enabled = file:read("*number", "*number", "*number", "*number", "*number")
// 				if enabled == 0 then
// 					gene.enabled = false
// 				else
// 					gene.enabled = true
// 				end
// 				
// 			end
// 		end
// 	end
//         file:close()
// 	
// 	while fitnessAlreadyMeasured() do
// 		nextGenome()
// 	end
// 	initializeRun()
// 	pool.currentFrame = pool.currentFrame + 1
// end
//  
// function loadPool()
// 	var filename = forms.gettext(saveLoadFile)
// 	loadFile(filename)
// end
// 
// function playTop()
// 	var maxfitness = 0
// 	var maxs, maxg
// 	for s,species in pairs(pool.species) do
// 		for g,genome in pairs(species.genomes) do
// 			if genome.fitness > maxfitness then
// 				maxfitness = genome.fitness
// 				maxs = s
// 				maxg = g
// 			end
// 		end
// 	end
// 	
// 	pool.currentSpecies = maxs
// 	pool.currentGenome = maxg
// 	pool.maxFitness = maxfitness
// 	forms.settext(maxFitnessLabel, "Max Fitness: " .. math.floor(pool.maxFitness))
// 	initializeRun()
// 	pool.currentFrame = pool.currentFrame + 1
// 	return
// end
// 
// function onExit()
// 	forms.destroy(form)
// end
// 
// writeFile("temp.pool")
// 
// event.onexit(onExit)
// 
// form = forms.newform(200, 260, "Fitness")
// maxFitnessLabel = forms.label(form, "Max Fitness: " .. math.floor(pool.maxFitness), 5, 8)
// showNetwork = forms.checkbox(form, "Show Map", 5, 30)
// showMutationRates = forms.checkbox(form, "Show M-Rates", 5, 52)
// restartButton = forms.button(form, "Restart", initializePool, 5, 77)
// saveButton = forms.button(form, "Save", savePool, 5, 102)
// loadButton = forms.button(form, "Load", loadPool, 80, 102)
// saveLoadFile = forms.textbox(form, Filename .. ".pool", 170, 25, null, 5, 148)
// saveLoadLabel = forms.label(form, "Save/Load:", 5, 129)
// playTopButton = forms.button(form, "Play Top", playTop, 5, 170)
// hideBanner = forms.checkbox(form, "Hide Banner", 5, 190)
// 
// 
// while true do
// 	var backgroundColor = 0xD0FFFFFF
// 	if !forms.ischecked(hideBanner) then
// 		gui.drawBox(0, 0, 300, 26, backgroundColor, backgroundColor)
// 	end
// 
// 	var species = pool.species[pool.currentSpecies]
// 	var genome = species.genomes[pool.currentGenome]
// 	
// 	if forms.ischecked(showNetwork) then
// 		displayGenome(genome)
// 	end
// 	
// 	if pool.currentFrame%5 == 0 then
// 		evaluateCurrent()
// 	end
// 
// 	joypad.set(controller)
// 
// 	getPositions()
// 	if marioX > rightmost then
// 		rightmost = marioX
// 		timeout = TimeoutConstant
// 	end
// 	
// 	timeout = timeout - 1
// 	
// 	
// 	var timeoutBonus = pool.currentFrame / 4
// 	if timeout + timeoutBonus <= 0 then
// 		var fitness = rightmost - pool.currentFrame / 2
// 		if gameinfo.getromname() == "Super Mario World (USA)" && rightmost > 4816 then
// 			fitness = fitness + 1000
// 		end
// 		if gameinfo.getromname() == "Super Mario Bros." && rightmost > 3186 then
// 			fitness = fitness + 1000
// 		end
// 		if fitness == 0 then
// 			fitness = -1
// 		end
// 		genome.fitness = fitness
// 		
// 		if fitness > pool.maxFitness then
// 			pool.maxFitness = fitness
// 			forms.settext(maxFitnessLabel, "Max Fitness: " .. math.floor(pool.maxFitness))
// 			writeFile("backup." .. pool.generation .. "." .. forms.gettext(saveLoadFile))
// 		end
// 		
// 		console.writeline("Gen " .. pool.generation .. " species " .. pool.currentSpecies .. " genome " .. pool.currentGenome .. " fitness: " .. fitness)
// 		pool.currentSpecies = 1
// 		pool.currentGenome = 1
// 		while fitnessAlreadyMeasured() do
// 			nextGenome()
// 		end
// 		initializeRun()
// 	end
// 
// 	var measured = 0
// 	var total = 0
// 	for _,species in pairs(pool.species) do
// 		for _,genome in pairs(species.genomes) do
// 			total = total + 1
// 			if genome.fitness != 0 then
// 				measured = measured + 1
// 			end
// 		end
// 	end
// 	if !forms.ischecked(hideBanner) then
// 		gui.drawText(0, 0, "Gen " .. pool.generation .. " species " .. pool.currentSpecies .. " genome " .. pool.currentGenome .. " (" .. math.floor(measured/total*100) .. "%)", 0xFF000000, 11)
// 		gui.drawText(0, 12, "Fitness: " .. math.floor(rightmost - (pool.currentFrame) / 2 - (timeout + timeoutBonus)*2/3), 0xFF000000, 11)
// 		gui.drawText(100, 12, "Max Fitness: " .. math.floor(pool.maxFitness), 0xFF000000, 11)
// 	end
// 		
// 	pool.currentFrame = pool.currentFrame + 1
// 
// 	emu.frameadvance();
// end
