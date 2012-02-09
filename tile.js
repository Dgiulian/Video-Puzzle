function Tile(w,h,p,highlight,color,rot){
	this.w = w;
	this.h = h;
	this.pos = p;
	this.ori = p;
	this.highlight = highlight;
	this.color = color;
	this.border = 0;
	this.rotateIndex = rot;
	
}
Tile.prototype.draw = function(ctx) {	
	var f;
	var rotateArray = [0,Math.PI / 2,Math.PI,-Math.PI / 2];
	if (this.highlight) {
		 this.drawBorder( "#ffff00");
 		// f = ctx.strokeStyle;	
		// ctx.strokeStyle = "#ffff00";
		// ctx.lineWidth = 2;
		// ctx.strokeRect(this.pos.c * this.w,this.pos.r * this.h,this.w - this.border,this.h - this.border);	
		// ctx.strokeStyle = f; 
	} 
	else {
		f = ctx.fillStyle;
		ctx.fillStyle = this.color;		
		var sx = this.ori.c * this.w;
		var sy = this.ori.r * this.h;
		var sWidth = this.w - this.border;
		var sHeight = this.h - this.border;
		var dx = this.pos.c * this.w;
		var dy = this.pos.r * this.h;
		var dWidth = sWidth;
		var dHeight = sHeight;

		
		bff.save();
		bff.translate(b.width / 2,b.height/2);
		bff.rotate(rotateArray[this.rotateIndex]);		
		bff.drawImage(v, sx, sy, sWidth, sHeight, -b.width / 2,-b.height/2, dWidth, dHeight);
		bff.restore();
		
		ctx.drawImage(b,dx,dy,sWidth,sHeight);
		ctx.fillStyle = f;
		
		this.drawBorder("#000");

	}	
}
Tile.prototype.drawBorder = function(color){
		var f = ctx.strokeStyle;	
		var lw = ctx.lineWidth = 2;
		ctx.strokeStyle = color;		
		ctx.lineWidth = 2;		
		ctx.strokeRect(this.pos.c * this.w,this.pos.r * this.h,this.w - this.border,this.h - this.border);			
		ctx.strokeStyle = f;
		ctx.lineWidth = lw;
}
Tile.prototype.swap = function (B){
/* Intercambia la posición de una ficha con otra */
	if (B == null) return false;
	var p = this.pos;
	this.pos = B.pos;
	B.pos = p;
}
Tile.prototype.correct = function (){
/* Chequea si la ficha esta en la posicion correcta(Original) */
	return this.pos.equal(this.ori);
}

Tile.prototype.equal = function(t) {

	return this.pos.equal(t.pos);
}

function randColor(){
	var colors = ["#ff0000","#00ff00","#0000ff","#bada55","#ffff00"];
	var min = 0; 
	var max = colors.length;
	var i = Math.round((Math.random() * 1000)) % max + min;
	return colors[i];
}
Tile.prototype.rotateLeft = function(){	
	this.rotateIndex = (this.rotateIndex == 3)?0:this.rotateIndex + 1;	
}
Tile.prototype.rotateRight = function(){	
	this.rotateIndex = (this.rotateIndex == 0)?3:this.rotateIndex - 1;	
}

