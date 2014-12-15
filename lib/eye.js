(function () {
	if (typeof Asteroids === 'undefined') {
		window.Asteroids = {};
	}
	
	var Eye = Asteroids.Eye = function (options) {
		this.pos = options.pos;
		this.watched = options.watched;
		this.radius = options.radius;
		
		
	};
	
	Eye.prototype.draw = function (ctx) {
		var hyp = Math.sqrt( Math.pow((this.pos[0] - this.watched.pos[0]), 2) + Math.pow((this.pos[1] - this.watched.pos[1]), 2) );
		var cosine = Math.abs((this.pos[0] - this.watched.pos[0]) / hyp);
		var sine = Math.abs((this.pos[1] - this.watched.pos[1]) / hyp);
		//Draws the white of the eye
		ctx.fillStyle = '#FFFFFF';
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2)
		ctx.fill();
		
		//Draws the pupil
		ctx.fillStyle = '#000000';
		ctx.beginPath()
		var pupilFactor = Math.sqrt(Math.pow(this.pos[0] - this.watched.pos[0], 2) + Math.pow(this.pos[1] - this.watched.pos[1], 2)) /
			Math.sqrt(
			Math.pow(Math.max(this.pos[0], Asteroids.Game.DIM_X - this.pos[0]), 2) + 
			Math.pow(Math.max(this.pos[1], Asteroids.Game.DIM_Y - this.pos[1]), 2)
			);
		debugger
		ctx.arc(
		this.pos[0] - this.radius * (2/3) * cosine * ((this.pos[0] - this.watched.pos[0])/ Math.max(this.pos[0], Asteroids.Game.DIM_X - this.pos[0])),
		this.pos[1] - this.radius * (2/3) * sine * ((this.pos[1] - this.watched.pos[1])/Math.max(this.pos[1], Asteroids.Game.DIM_Y - this.pos[1])),
		this.radius * (2/3) - (this.radius / 2) * pupilFactor, 0, Math.PI * 2
		);
		ctx.fill();
	}
})();