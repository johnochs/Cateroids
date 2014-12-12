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
			ship.power([-1, 0])
    }
    if (key.isPressed('d')) {
			ship.power([1, 0]);
    }
    if (key.isPressed('w')) {
			ship.power([0, -1]);
    }
    if (key.isPressed('s')) {
			ship.power([0, 1]);
    }
    if (key.isPressed(37)) {
			if (ship.dir > 0 && ship.dir < Math.PI) {

				ship.rotate(Math.PI / 16);
			} else {
				ship.rotate(-Math.PI / 16);
			}
    }
		if (key.isPressed(38)) {
			if (ship.dir > Math.PI / 2 && ship.dir < 3 * Math.PI / 2) {
				ship.rotate(Math.PI / 16);
			} else {
				ship.rotate(-Math.PI / 16);
			}
		}
		if (key.isPressed(39)) {
			if (ship.dir > 0 && ship.dir < Math.PI) {
				ship.rotate(-Math.PI / 16);
			} else {
				ship.rotate(Math.PI / 16);
			}
		}
		if (key.isPressed(40)) {
			if (ship.dir > Math.PI / 2 && ship.dir < 3 * Math.PI / 2) {
				ship.rotate(-Math.PI / 16);
			} else {
				ship.rotate(Math.PI / 16);
			}
		}
	};

})();
