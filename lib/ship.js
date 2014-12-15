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
		this.color = Ship.COLOR;
		this.img = new Image();
		this.img.src = './ship.png'
		this.invincible = true;
		this.i_c = 0;

		Asteroids.MovingObject.call(this, options);
	};

	Ship.POSITION = [600, 400];
	Ship.VEL = [0, 0];
	Ship.COLOR = "#FFFF00";
	Ship.RADIUS = 10;
	Ship.MAX_SPEED = 6;


	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	Ship.prototype.relocate = function () {
		this.pos = this.game.randomPosition();
		this.vel = Ship.VEL;
	};
	
	Ship.prototype.respawn = function () {
		this.pos = [400, 300];
		this.vel = [0,0];
		this.invincible = true;
	}

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
		if (this.invincible) {
			this.i_c += 1
			if(this.i_c % 20 > 10){
				this.color = "#FF0000"
			} else {
				this.color = Ship.COLOR;
			}
			if(this.i_c > 200) {
				this.i_c = 0
				this.invincible = false;
				this.color = Ship.COLOR;
			}
		}
		ctx.fillStyle = this.color;
		ctx.beginPath();
		var point1 = [10, 0];
		var tpoint1 = Asteroids.Util.translate(point1, this.dir);
		ctx.moveTo(this.pos[0] + tpoint1[0], this.pos[1] + tpoint1[1]);
		var point2 = [-10, 10];
		var tpoint2 = Asteroids.Util.translate(point2, this.dir);		
		ctx.lineTo(this.pos[0] + tpoint2[0] , this.pos[1] + tpoint2[1]);
		var point3 = [-5, 0];
		var tpoint3 = Asteroids.Util.translate(point3, this.dir);
		ctx.lineTo(this.pos[0]+ tpoint3[0], this.pos[1] + tpoint3[1]);
		var point4 = [-10, -10];
		var tpoint4 = Asteroids.Util.translate(point4, this.dir);
		ctx.lineTo(this.pos[0] + tpoint4[0], this.pos[1] + tpoint4[1]);
		
		ctx.closePath();
		ctx.fill();
	};
	
	Ship.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof Asteroids.ShipKiller) {
			this.vel[0] *= -1;
			this.vel[1] *= -1;
		}
	};

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
