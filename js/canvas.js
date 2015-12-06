"use strict";
class Canvas {
	constructor(element, squareSize, borderSize, width, height) {
		this.element = element;
		this.resize(squareSize, borderSize, width, height);
		this.bgColor = "rgb(0,0,100)";
		this.fgColor = "rgb(255,255,0)";
		this.borderColor = "rgb(127,127,127)";
		if (this.element.getContext){
			this.ctx = this.element.getContext('2d');
		}
		this.clearBoard();
		this.fillEmpty();
	}
	drawSquare(x, y, state) {
		switch(state) {
			case 0:
				this.ctx.fillStyle = this.bgColor;
				break;
			case 1:
				this.ctx.fillStyle = this.fgColor;
				break;
			default:
				this.ctx.fillStyle = this.bgColor;
				break;
		}
		this.ctx.fillRect(this.borderSize + x * (this.squareSize + this.borderSize),
				this.borderSize + y * (this.squareSize + this.borderSize),
				this.squareSize,
				this.squareSize);
	}
	// Clears the board by drawing border color
	clearBoard() {
		this.ctx.fillStyle = this.borderColor;
		this.ctx.fillRect(0, 0,
				this.borderSize + this.width * (this.squareSize + this.borderSize),
				this.borderSize + this.height * (this.squareSize + this.borderSize));
	}
	fillEmpty() {
		for(var i = 0; i < this.width; i++)
			for(var j = 0; j < this.height; j++)
				this.drawSquare(i, j, 0);
	}
	// Sets size of squares, size of borders around squares
	// width and height of canvas in # of squares
	resize(squareSize, borderSize, width, height) {
		this.squareSize = squareSize;
		this.borderSize = borderSize;
		this.width = width;
		this.height = height;
		this.element.width =  borderSize + width  * (squareSize + borderSize);
		this.element.height = borderSize + height * (squareSize + borderSize);
	}

	getCellSize() {
		return this.squareSize + this.borderSize;
	}
};


