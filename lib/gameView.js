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
		this.bindKeyHandlers();
		setInterval( function() {
			view.game.step();
			view.game.draw(view.ctx);
		}, 20);
	};
	
	GameView.prototype.bindKeyHandlers= function () {
		var ship = this.game.ship;
		
		key('a', function () { ship.power([-1, 0]); });
		key('w', function () { ship.power([0, -1]);  });
		key('d', function () { ship.power([1, 0]); });
		key('s', function () { ship.power([0, 1]); });
		
		key('left', function () { ship.power([-1, 0]); });
		key('up', function () { ship.power([0, -1]); });
		key('right', function () { ship.power([1, 0]); });
		key('down', function () { ship.power([0, 1]); });
		
		key('space', function () { ship.fireBullet() });
		
	}
})();