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
		this.img = new Image();
		this.img.src = "./dtassets/Doge.png"
		this.leftEye = new Asteroids.Eye({ pos: options.pos, watched: { pos: [565, 320] }, radius: options.radius / 5 });
		this.rightEye = new Asteroids.Eye({ pos: options.pos, watched: { pos: [565, 320] }, radius: options.radius / 5 });
		
		Asteroids.MovingObject.call(this, options);
	};
	
	Asteroid.COLOR = "#00FF00"
	Asteroid.RADIUS = function () { return (15 + Math.floor(35 * Math.random())); };
	Asteroid.SPEED = function() { return (1 + 5 * Math.random()); };
	
	Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);
	
	Asteroid.prototype.collideWith = function (otherObj) {
		if (otherObj instanceof Asteroids.Ship && !otherObj.invincible) {
			this.game.lives -= 1;
			otherObj.respawn();
		}
		if (otherObj instanceof Asteroids.Bullet) {
			this.game.points += Math.pow((100 - this.radius), 2);
			this.game.remove(this);
			this.game.remove(otherObj);
		}
	};
	
	Asteroid.prototype.draw = function (ctx) {
		ctx.drawImage(
			this.img, 
			this.pos[0] - this.radius * 1.25, 
			this.pos[1] - this.radius * 1.25, 
			this.radius * 2.5,
			this.radius * 2.5
		);
		
		this.leftEye.pos = [this.pos[0] - 0.55 * this.radius, this.pos[1] - 0.28 * this.radius];
		this.rightEye.pos = [this.pos[0] + 0.13 * this.radius, this.pos[1] - 0.15 * this.radius];
		this.leftEye.draw(ctx);
		this.rightEye.draw(ctx);
	};

	
})();