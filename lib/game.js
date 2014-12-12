(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var Game = Asteroids.Game = function () {
		this.asteroids = [];
		this.addAsteroids();
		this.ship = new Asteroids.Ship({ game: this });
		this.bullets = [];
	};

	Game.DIM_X = 800;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 10;

	Game.prototype.addAsteroids = function () {
		for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
			this.asteroids.push(new Asteroids.Asteroid( { game: this }));
		}
	};

	Game.prototype.allObjects = function () {
		return this.asteroids.concat([this.ship]).concat(this.bullets);

	};

	Game.prototype.draw = function (ctx) {
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.allObjects().forEach(function (object) {
			object.draw(ctx);
		});
	};

	Game.prototype.moveObjects = function () {
		this.allObjects().forEach(function (object) {
			object.move();
		});
	};

	Game.prototype.randomPosition = function () {
		return [Game.DIM_X * Math.random(), Game.DIM_Y * Math.random()]
	};

	Game.prototype.wrap = function (pos) {
		if (pos[0] < 0) {
			pos[0] += Game.DIM_X;
		}
		if (pos[0] > Game.DIM_X) {
			pos[0] -= Game.DIM_X;
		}
		if (pos[1] < 0) {
			pos[1] += Game.DIM_Y;
		}
		if (pos[1] > Game.DIM_Y) {
			pos[1] -= Game.DIM_Y;
		}
	};

	Game.prototype.step = function () {
		this.moveObjects();
		this.checkCollisions();
		this.checkAsteroids();
	};

	Game.prototype.checkAsteroids = function () {
		if (this.asteroids.length < 2) {
			this.addAsteroids();
		}
	}

	Game.prototype.checkCollisions = function () {
		for (var i = 0; i < this.allObjects().length; i++) {
			for (var j = i + 1; j < this.allObjects().length; j++) {
				if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
					this.allObjects()[i].collideWith(this.allObjects()[j]);
				}
			}
		}
	};

	Game.prototype.remove = function (obj) {
		if (obj instanceof Asteroids.Asteroid) {
			var index;
			for (var i = 0; i < this.asteroids.length; i++) {
				if (this.asteroids[i] === obj) { index = i };
			}
			this.asteroids.splice(index, 1);
		}
		if (obj instanceof Asteroids.Bullet) {
			var index;
			for (var i = 0; i < this.bullets.length; i++) {
				if (this.bullets[i] === obj) { index = i };
			}
			this.bullets.splice(index, 1);
		}
	};

	Game.prototype.isOutOfBounds = function (pos) {
		if (pos[0] < 0 || pos[0] > Game.DIM_X) {
			return true;
		}
		if (pos[1] < 0 || pos[1] > Game.DIM_Y) {
			return true;
		}
		return false;
	}
})();
