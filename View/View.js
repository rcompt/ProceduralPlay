function View(document, viewType){
	this.document = document;
	this.canvas = document.getElementById("myCanvas");
	this.ctx = this.canvas.getContext("2d");
	this.viewType = viewType;
}

View.prototype.draw = function(resetMap, map){
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	var height = this.document.getElementById("height").value;
	var width = this.document.getElementById("width").value;
	var wallP = this.document.getElementById("wallP").value;
	if (resetMap){
		map = new MapHandler(width, height, wallP, true);
	}

	if(viewType == 1){
		ctx.font = "10px Arial";
		for (row = 0; row < height; row++){
			for (col = 0; col < width; col++){
				var val = map.getElemAt(row,col)
				if (val != undefined){
					if (val){
						ctx.fillText(val.toString(),(col + 1)*10,(row + 1)*10);
					}else{
						ctx.fillText(" ",(col + 1)*10,(row + 1)*10);
					}
				}
				
			}
		}
	}else if (viewType == 2 || viewType == 3){
		var grassImg = document.getElementById("grassImg");
		var wallImg = document.getElementById("wallImg");
		var playerImg = document.getElementById("playerImg");
		var outImg = document.getElementById("outImg");
		for (row = 0; row < height; row++){
			for (col = 0; col < width; col++){
				if(row == 0 || col == 0){
					if(col != 0){
						if(col == width-1){
							ctx.drawImage(outImg,(col + 1)*10,(row)*10);
							ctx.drawImage(outImg,(col + 2)*10,(row)*10);
							ctx.drawImage(outImg,(col + 2)*10,(row+1)*10);									
						}
						ctx.drawImage(outImg,(col)*10,(row)*10);
					}else if(row != 0){
						if(row == height-1){
							ctx.drawImage(outImg,(col+1)*10,(row+2)*10);
							ctx.drawImage(outImg,(col)*10,(row+2)*10);
							ctx.drawImage(outImg,(col)*10,(row+1)*10);										
						}
						ctx.drawImage(outImg,(col)*10,(row)*10);
					}else{
						ctx.drawImage(outImg,(col)*10,(row)*10);
					}
				}else if(row == height-1 || col == width-1){
					if(col != width-1){
						ctx.drawImage(outImg,(col + 1)*10,(row + 2)*10);
					}else if(row != height-1){
						ctx.drawImage(outImg,(col + 2)*10,(row + 1)*10);
						
					}else{
						ctx.drawImage(outImg,(col + 2)*10,(row + 2)*10);
						ctx.drawImage(outImg,(col + 2)*10,(row + 1)*10);
						ctx.drawImage(outImg,(col + 1)*10,(row + 2)*10);
					}								
				}
				if (map.isPlayerPresentAtLoc(row,col)){
					ctx.drawImage(playerImg,(col + 1)*10,(row + 1)*10);
				}else{
					var val = map.getElemAt(row,col)
					if (val == undefined){
						ctx.drawImage(outImg,(col + 1)*40,(row + 1)*40);
					}else if (val == 1){
						ctx.drawImage(wallImg,(col + 1)*10,(row + 1)*10);
					}else{
						ctx.drawImage(grassImg,(col + 1)*10,(row + 1)*10);
					}
				}
				
				
			}
		}					
	}
	map.printMap();

}

View.prototype.changeViewType = function(map){
	if (this.viewType == 1){
		this.viewType = 2;
	}else{
		this.viewType = 1;
	}
	this.draw(false, map);
}
