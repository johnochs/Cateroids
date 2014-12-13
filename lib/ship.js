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
		this.dir = 0;
		this.img = new Image();
		this.img.src = './ship.png'

		Asteroids.MovingObject.call(this, options);
	};

	Ship.POSITION = [600, 400];
	Ship.VEL = [0, 0];
	Ship.COLOR = "#FF00FF";
	Ship.RADIUS = 25;
	Ship.MAX_SPEED = 6;


	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = Ship.VEL;
	};

	Ship.prototype.power = function (impulse) {
		this.vel[0] += impulse[0];
		this.vel[1] += impulse[1];
		if (Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)) > Ship.MAX_SPEED) {
			this.vel[0] *= 0.9;
			this.vel[1] *= 0.9;
		}
	};

	Ship.prototype.rotate = function (torque) {
		this.dir += torque;
		if (this.dir < 0) { this.dir += 2 * Math.PI };
		if (this.dir > 2 * Math.PI) { this.dir -= 2 * Math.PI };

	};

	Ship.prototype.fireBullet = function () {
		this.game.bullets.push( new Asteroids.Bullet({ ship: this, game: this.game }) )
	}

	Ship.prototype.draw = function (ctx) {
		// ctx.fillStyle = Ship.COLOR;
		// ctx.beginPath();
		// ctx.moveTo(this.pos[0], this.pos[1]);
		ctx.translate(this.pos[0])
		ctx.drawImage(this.img, this.pos[0], this.pos[1])
			// debugger
			// ctx.lineTo((this.pos[0] - 10 * Math.cos(this.dir)) , (this.pos[1] + 20 * Math.sin(this.dir) + 20) );
			// ctx.lineTo((this.pos[0] + 10 * Math.cos(this.dir)) , (this.pos[1] + 20 * Math.sin(this.dir) + 20) );
			// // ctx.closePath();
			// ctx.fill();
	}

	// Ship.prototype.draw = function (ctx) {
	// 	ctx.fillStyle = Ship.COLOR;
	// 	ctx.beginPath();
	// 	ctx.arc(this.pos[0], this.pos[1] + 20, 20, this.dir - Math.PI / 2, this.dir + Math.PI / 2);
	// 	ctx.fill();
	// 	// ctx.moveTo(this.pos[0] - 20, this.pos[1] + 20);
	// 	ctx.fillRect(this.pos[0] - 20, this.pos[1] + 20, 40, 80);
	// 	// ctx.lineTo(this.pos[0] + 20, this.pos[1] + 80);
	// 	ctx.arc(this.pos[0] + 20, this.pos[1] + 100, 20, -0.5 * Math.PI, Math.PI);
	// 	ctx.fill();
	// 	ctx.arc(this.pos[0] - 20, this.pos[1] + 100, 20, 0, 2 * Math.PI);
	// 	ctx.fill();
	// }

})();
