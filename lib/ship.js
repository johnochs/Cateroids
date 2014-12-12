(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var Ship = Asteroids.Ship = function (options) {
		options.pos = options.pos || Ship.POSITION;
		options.vel = Ship.VEL;
		options.radius = Ship.RADIUS;
		options.color = Ship.COLOR;
		this.game = options.game;
		
		Asteroids.MovingObject.call(this, options);
	};
	
	Ship.POSITION = [600, 400];
	Ship.VEL = [0, 0];
	Ship.COLOR = "#FF00FF";
	Ship.RADIUS = 25;
	Ship.MAX_SPEED = 20;
	
	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);
	
	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = Ship.VEL;
	};
	
	Ship.prototype.power = function (impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
	};
	
	Ship.prototype.fireBullet = function () {
		this.game.bullets.push( new Asteroids.Bullet({ ship: this, game: this.game }) )
	}
	
	Ship.prototype.draw = function (ctx) {
		ctx.fillStyle = Ship.COLOR;
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1] + 20, 20, -1 * Math.PI, 0);
		ctx.fill();
		// ctx.moveTo(this.pos[0] - 20, this.pos[1] + 20);
		ctx.fillRect(this.pos[0] - 20, this.pos[1] + 20, 40, 80);
		// ctx.lineTo(this.pos[0] + 20, this.pos[1] + 80);
		ctx.arc(this.pos[0] + 20, this.pos[1] + 100, 20, -0.5 * Math.PI, Math.PI);
		ctx.fill();
		ctx.arc(this.pos[0] - 20, this.pos[1] + 100, 20, 0, 2 * Math.PI);
		ctx.fill();
		
	}

})();