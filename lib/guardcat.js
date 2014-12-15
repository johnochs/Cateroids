(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var GuardCat = Asteroids.GuardCat = function (options) {
		this.img = new Image();
		this.img.src = 'bengal_cat_2.png';
		this.game = options.game;
		this._counter = 0;
		this.truepos = options.truepos || [-100, 450]
		this.randx = (Math.random() - 0.5) * 100;
		this.randy = (Math.random() - 0.5) * 60;
		this.addPaws();
	};
	
	GuardCat.prototype.draw = function (ctx) {
		if(this._counter > 20) {
			this._counter = 0;
			this.randx = (Math.random() - 0.5) * 100;
			this.randy = (Math.random() - 0.5) * 60;
			this.leftPaw.pos = [this.truepos[0] + this.randx + 210, this.truepos[1] + this.randy + 50];
			this.rightPaw.pos = [this.truepos[0] + this.randx + 260, this.truepos[1] + this.randy + 50];
			
		}
		
		

		ctx.drawImage(this.img, this.truepos[0] + this.randx, this.truepos[1] + this.randy, 300, 300);
		

		this._counter += 1;
	};
	
	GuardCat.prototype.addPaws = function () {
		var leftPosX = this.truepos[0] + this.randx + 150;
		var leftPosY = this.truepos[1] + this.randy + 50;
		this.leftPaw = new Asteroids.ShipKiller({ pos: [leftPosX, leftPosY], radius: 10, game: this.game });
		var rightPosX = this.truepos[0] + this.randx + 200;
		var rightPosY = this.truepos[1] + this.randy + 50;
		this.rightPaw = new Asteroids.ShipKiller({ pos: [rightPosX, rightPosY], radius: 16, game: this.game });
		this.game.shipKillers.push(this.leftPaw);
		this.game.shipKillers.push(this.rightPaw);
	}
})();