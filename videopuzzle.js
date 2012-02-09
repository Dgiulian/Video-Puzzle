
document.addEventListener('DOMContentLoaded',function(){
	cWidth = 640;
	cHeight = 360;
	maxRows = 3;
	maxCols = 4;
	moveCount = 0;
	tileWidth = Math.floor(cWidth / maxCols);
	tileHeight = Math.floor(cHeight / maxRows);
	hide = false;
	
	b = document.getElementById("video_buffer");
	bff = b.getContext("2d");
	b.width  = tileWidth ;
	b.height = tileHeight;

	v = document.getElementById("video_src");
	c = document.getElementById("video_dest");
	ctx = c.getContext("2d");

	c.width  = cWidth;
	c.height = cHeight;
	v.muted = true;
	
	v.addEventListener("play",playHandler,false);
	c.addEventListener("mousedown",mouseClickHandler,false);
	document.getElementById("btn_snd").addEventListener('click',muteHandler,false);
	document.getElementById("btn_pause").addEventListener('click',pauseHandler,false);	
	document.getElementById("btn_view").addEventListener('click',viewHandler,false);
	document.getElementById("video_dest").addEventListener('mousewheel',mouseWheelHandler,false);
	
	
	selectedTiles = 0;
	tileArray = makeTiles(640,360);	
	//shuffleTiles();
	//tileArray[0].swap(tileArray[1]);
	drawTiles(tileArray);		
});
function viewHandler(){
	hide = !hide;
	if(hide){
		c.className = "noDisplay";
		document.getElementById("video_div").className = "";
	}
	else { 
		c.className = "";
		document.getElementById("video_div").className = "noDisplay";
	}
}

function playHandler(){
		draw(this,ctx,cWidth,cHeight);		
}

function draw(v,context,w,h) {
	if (v.paused || v.ended) return false;
	drawTiles(tileArray);
	// tileArray[0].draw(ctx);
	setTimeout(draw,20,v,context,w,h);
}

function swapTiles(A,B){
	A.swap(B);
}

function shuffleTiles() {	
	for(var i = 0;i < tileArray.length;i++){
		var j = randInt(i+1,tileArray.length - 2);		
		tileArray[i].swap(tileArray[j]);		
	}
}

function randInt(min,max){		
	return (Math.round(Math.random() * (max - min ) ) + min);;
}

function getTileAt(row,col){
	for (var i = 0; i<tileArray.length;i++) {	
		if ((tileArray[i].pos.r == row) && (tileArray[i].pos.c == col)) return tileArray[i]; 
	}
}

function updateCount() {
	moveCount++;
	document.getElementById("counter").innerHTML = moveCount;
}
function endPuzzle(){
	document.getElementById("msg").className = "";
	v.pause();
}
function completed(){
	for ( var i = 0; i<tileArray.length;i++){		
		 if (!(tileArray[i].correct() && (tileArray[i].rotateIndex == 0))) return false;
	}
	return true;
}
function drawTiles(tiles){
	for ( var i = 0;i<tiles.length;i++){
		tiles[i].draw(ctx);
	}
}
function makeTiles(w,h){
	var tileArray = [];
	for (var ri = 0;ri<maxRows;ri++)
		for (var ci = 0;ci <maxCols;ci++) {
			var p = new Position(ri , ci );
			tileArray.push(new Tile(tileWidth,tileHeight,p ,false,randColor(),randInt(0,3))); 
		}
	return tileArray;
}
function muteHandler(e){	
	v.muted = !v.muted;
	if (v.muted) this.className = "soundOff";
	else this.className = "soundOn";
}

function pauseHandler() {
	if(v.ended) return false;
	if(v.paused	) {
		v.play();
		this.className = "pause";		
	}
	else {
		v.pause();
		this.className = "play";
	}
}
function mouseClickHandler(e){
	var c = Math.floor(e.pageX / tileWidth);
	var r = Math.floor(e.pageY / tileHeight);
	var t = getTileAt(r,c);	
	if (t == undefined) {return false;}
	
	selectedTiles++;
	switch(selectedTiles) {		
		case 1:
			tileAux = t;
			t.highlight = true;
			t.draw(ctx);
			break;
		case 2:
			tileAux.highlight = false;
			t.highlight = false;
			
			if (!t.equal(tileAux)) {
				updateCount();			
				tileAux.swap(t);
				t.draw(ctx);
				tileAux.draw(ctx);				
			}

			selectedTiles = 0;			
			tileAux = null;
			if(completed()) endPuzzle();
			break;
	}
}
function mouseWheelHandler(e){
	var c = Math.floor(e.pageX / tileWidth);
	var r = Math.floor(e.pageY / tileHeight);
	var t = getTileAt(r,c);	
	
	if(e.wheelDeltaY > 0) t.rotateLeft();
	else t.rotateRight();
}