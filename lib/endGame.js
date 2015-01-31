(function() {
	if(typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var endGame = Asteroids.endGame = function (options) {
		this.game = options.game;
	}
	
	endGame.prototype.draw = function (ctx) {
		ctx.font = "small-caps bold 50px andale mono";
		ctx.fillText("GAME OVER", 230, 200);
		ctx.fillText("Final Score: " + this.game.finalScore.toString(), 200, 260);
	}
})();