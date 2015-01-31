(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var Game = Asteroids.Game = function () {
		this.asteroids = [];
		this.lives = 4;
		this.points = 0;
		// this.addAsteroids();
		this.shipKillers = [];
		this.eyes = [];
		this.guardCat = new Asteroids.GuardCat({ game: this, truepos: [-100, 450] });
		this.ship = new Asteroids.Ship({ game: this });
		this.addEyes();
		this.bullets = [];
		this.console = new Asteroids.ConsoleView({ game: this });
		this.endGame = new Asteroids.endGame({ game: this });
	};

	Game.DIM_X = 800;
	Game.DIM_Y = 600;
	Game.NUM_ASTEROIDS = 10;

	Game.prototype.addAsteroids = function () {
		for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
			this.asteroids.push(new Asteroids.Asteroid( { game: this }));
		}
	};
	
	Game.prototype.addEyes = function () {
		this.eyes.push(new Asteroids.Eye( { pos: [630, 330], radius: 30, watched: this.ship }));
		this.eyes.push(new Asteroids.Eye( { pos: [500, 310], radius: 30, watched: this.ship }));
	}

	Game.prototype.allObjects = function () {
		return this.asteroids.concat([this.ship]).concat(this.bullets).concat(this.shipKillers);

	};

	Game.prototype.draw = function (ctx) {
		ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.console.draw(ctx);
		this.eyes.forEach( function (eye) {
			eye.draw(ctx);
		});
		if (this.ship.pos[0] < 300 && this.ship.pos[1] > 450) {
			this.guardCat.draw(ctx);
		}
		this.allObjects().forEach(function (object) {
			if (object.isVisible) {
				object.draw(ctx);				
			}
		});
		if (this.lives <= 0) {
			if (!this.finalScore) {
				this.finalScore = this.points;
			}
			this.endGame.draw(ctx)
		}
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
		if (this.asteroids.length < 1) {
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
