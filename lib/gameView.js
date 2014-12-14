(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}

	var GameView = Asteroids.GameView = function (game, ctx) {
		this.game = game;
		this.ctx = ctx;
	};

	GameView.prototype.start = function () {
		var view = this;
		setInterval( function() {
			view.shoot();
		}, 75);
		setInterval( function() {
			view.checkKeys();
			view.game.step();
			view.game.draw(view.ctx);
		}, 20);
	};

	GameView.prototype.shoot = function () {
		var ship = this.game.ship;

		if (key.isPressed(32)) {
			ship.fireBullet();
		}
	}

	GameView.prototype.checkKeys= function () {
		var ship = this.game.ship;

    if (key.isPressed('a')) {
		ship.rotate(-Math.PI / 16);
    }
    if (key.isPressed('d')) {
			ship.rotate(Math.PI / 16);
    }
    if (key.isPressed('w')) {
		var xpow = Math.cos(ship.dir);
		var ypow = Math.sin(ship.dir);
			ship.power([xpow, ypow]);
    }
    if (key.isPressed('s')) {
		var xpow = -Math.cos(ship.dir);
		var ypow = -Math.sin(ship.dir);
			ship.power([xpow, ypow]);
    }
	//     if (key.isPressed(37)) {
	// 			ship.rotate(Math.PI / 16);
	//     }
	// if (key.isPressed(39)) {
	// 	ship.rotate(-Math.PI / 16);
	// }

	};

})();
