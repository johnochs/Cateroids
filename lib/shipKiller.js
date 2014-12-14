(function () {
	if(typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var ShipKiller = Asteroids.ShipKiller = function (options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.vel = [0,0];
		this.color = "#FFFFFF"
		this.game = options.game;
		
		// Asteroids.MovingObject.call(this, options);
	}
	
	
	// Asteroids.Util.inherits(ShipKiller, Asteroids.MovingObject);
})();