(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var Bullet = Asteroids.Bullet = function (options) {
		this.ship = options.ship;
		this.game = options.game;
		options.pos = [this.ship.pos[0], this.ship.pos[1]];
		options.vel = Bullet.VELOCITY(this.ship.vel);
		options.radius = 5;
		options.color = Bullet.COLOR;
		
		Asteroids.MovingObject.call(this, options);
	};
	
	Bullet.COLOR = "#00FFFF"
	Bullet.VELOCITY = function (vel) { 
		return [(vel[0] + 1) * 5, (vel[1] + 1) * 5]; 
	};
	
	Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
	
	Bullet.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof Asteroids.Asteroid) {
			this.game.remove(otherObj);
		}
	};
	
	Bullet.prototype.isWrappable = false;
	
})();