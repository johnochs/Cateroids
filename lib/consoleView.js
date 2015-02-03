(function() {
	if(typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var ConsoleView = Asteroids.ConsoleView = function (options) {
		this.game = options.game;
	}
	
	ConsoleView.prototype.draw = function (ctx) {
		ctx.font = "small-caps bold 20px andale mono"
		ctx.fillStyle = "#FF0000"
		ctx.fillText("Score: " + (this.game.finalScore || this.game.points).toString(), 20, 20)
		
		for (i = 1; i < this.game.lives; i++) {
			
			var point = [Asteroids.Game.DIM_X - i * 30, 10];
			ctx.fillStyle = "#FFFFFF";
			ctx.beginPath();
			ctx.moveTo(point[0], point[1]);
			ctx.lineTo(point[0] - 10 , point[1] + 20);
			ctx.lineTo(point[0], point[1] + 15);
			ctx.lineTo(point[0] + 10, point[1] + 20);
			ctx.fill();
			ctx.closePath();
		}
	}
})();

(function() {
	if(typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var endGame = Asteroids.endGame = function (options) {
		this.game = options.game;
	}
	
	endGame.prototype.draw = function (ctx) {
		ctx.font = "small-caps bold 75px andale mono";
		ctx.fillStyle = "#FF0000"
		ctx.fillText("GAME OVER", 230, 200);
		ctx.font = "small-caps bold 45px andale mono";
		ctx.fillText("Final Score: " + this.game.finalScore.toString(), 230, 500);
	}
})();