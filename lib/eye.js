(function () {
	if (typeof Asteroids === 'undefined') {
		window.Asteroids = {};
	}
	
	var Eye = Asteroids.Eye = function (options) {
		this.pos = options.pos;
		this.ship = options.ship;
		
		
	};
	
	Eye.prototype.draw = function (ctx) {
		var hyp = Math.sqrt( Math.pow((this.pos[0] - this.ship.pos[0]), 2) + Math.pow((this.pos[1] - this.ship.pos[1]), 2) );
		var cosine = Math.abs((this.pos[0] - this.ship.pos[0]) / hyp);
		var sine = Math.abs((this.pos[1] - this.ship.pos[1]) / hyp);
		
		ctx.fillStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], 30, 0, Math.PI * 2)
		ctx.fill();
		
		ctx.fillStyle = '#000000';
		ctx.beginPath()
		var pupilFactor = Math.sqrt(Math.pow(this.pos[0] - this.ship.pos[0], 2) + Math.pow(this.pos[1] - this.ship.pos[1], 2)) /
			Math.sqrt(Math.pow(this.pos[0], 2) + Math.pow(this.pos[1], 2));
		ctx.arc(
		this.pos[0] - 20 * cosine * ((this.pos[0] - this.ship.pos[0])/this.pos[0]),
		this.pos[1] - 20 * sine * ((this.pos[1] - this.ship.pos[1])/this.pos[1]),
			20 - 15 * pupilFactor, 0, Math.PI * 2
		);
		ctx.fill();
	}
})();