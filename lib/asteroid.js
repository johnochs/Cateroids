(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var Asteroid = Asteroids.Asteroid = function (options) {
		options.pos = options.pos || options.game.randomPosition();
		options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED());
		options.radius = Asteroid.RADIUS();
		options.color = Asteroid.COLOR;
		options.game = options.game
		
		Asteroids.MovingObject.call(this, options);
	};
	
	Asteroid.COLOR = "#00FF00"
	Asteroid.RADIUS = function () { return (5 + 50 * Math.random()); };
	Asteroid.SPEED = function() { return (1 + 5 * Math.random()); };
	
	Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
	
	Asteroid.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof Asteroids.Ship) {
			otherObj.relocate();
		}
		if (otherObj instanceof Asteroids.Bullet) {
			this.game.remove(this);
		}
	};
})();