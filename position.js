
/****************************/
function Position(r,c){
	this.r = r;
	this.c = c;
}

Position.prototype.equal = function (p) {
	return (this.r == p.r) && (this.c == p.c);
}