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
		this.invincible = true;
		this.i_c = 0;

		Asteroids.MovingObject.call(this, options);
	};

	Ship.POSITION = [400, 300];
	Ship.VEL = [0, 0];
	Ship.COLOR = "rgba(255, 255, 0, 1)";
	Ship.I_COLOR = "rgba(255, 0, 0, 1)";
	Ship.RADIUS = 10;
	Ship.MAX_SPEED = 6;


	Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

	
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
		if (this.game.bullets.length < 1) {
			this.game.bullets.push( new Asteroids.Bullet({ ship: this, game: this.game }) );
		}
	}

	Ship.prototype.draw = function (ctx, alt_pos, sf) {
		//if xpos, ypos, sf are present, then it allows a copy of the 
		//ship to be drawn at (xpos,ypox) scaled by the sf.
		//this is how the ship gets drawn in the cat's eyes.
		var sf = sf || 1;
		var position_holder = this.pos;
		this.pos = alt_pos || this.pos;
		
		//Changes the ships color between yellow/red if the ship
		//is invincible.
		if (this.invincible) {
			this.i_c += 1
			if(this.i_c % 20 > 10){
				this.color = Ship.I_COLOR;
			} else {
				this.color = Ship.COLOR;
			}
			if(this.i_c > 200) {
				this.i_c = 0
				this.invincible = false;
				this.color = Ship.COLOR;
			}
		} else {
			this.color = Ship.COLOR;
		}
		
		//If alt_position is present, the drawing of the ship will
		//be a reflection.  Therefore, the opacity is turned down.
		if (alt_pos) {
			this.color = this.color.slice(0, -2) + "0.6)";
		}
		
		//TODO: Refactor this for readability.
		ctx.fillStyle = this.color;
		ctx.beginPath();
		var point1 = [10 * sf, 0];
		var tpoint1 = Asteroids.Util.translate(point1, this.dir);
		ctx.moveTo(this.pos[0] + tpoint1[0], this.pos[1] + tpoint1[1]);
		var point2 = [-10 * sf, 10 * sf];
		var tpoint2 = Asteroids.Util.translate(point2, this.dir);		
		ctx.lineTo(this.pos[0] + tpoint2[0] , this.pos[1] + tpoint2[1]);
		var point3 = [-5 * sf, 0];
		var tpoint3 = Asteroids.Util.translate(point3, this.dir);
		ctx.lineTo(this.pos[0]+ tpoint3[0], this.pos[1] + tpoint3[1]);
		var point4 = [-10 * sf, -10 * sf];
		var tpoint4 = Asteroids.Util.translate(point4, this.dir);
		ctx.lineTo(this.pos[0] + tpoint4[0], this.pos[1] + tpoint4[1]);
		
		ctx.closePath();
		ctx.fill();
		
		this.pos = position_holder;
	};
	
	Ship.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof Asteroids.ShipKiller) {
			this.vel[0] *= -1;
			this.vel[1] *= -1;
		}
	};

})();
