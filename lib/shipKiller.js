(function () {
	if(typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var ShipKiller = Asteroids.ShipKiller = function (options) {
		this.pos = options.pos;
		this.radius = options.radius;
		this.vel = [0,0];
		this.game = options.game;
	}
	
	ShipKiller.prototype.move = function () {
		
	};
	
	ShipKiller.prototype.isCollidedWith = function () {
		
	};
	
	ShipKiller.prototype.draw = function (ctx) {
		ctx.fillStyle = "#FFFFFF";
		ctx.beginPath();
		ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI)
		ctx.fill();
	};
	
	ShipKiller.prototype.isWrappable = false;
	ShipKiller.prototype.isVisible = false;
	
})();