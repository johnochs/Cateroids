(function () {
	if (typeof Asteroids === "undefined") {
		window.Asteroids = {};
	}
	
	var Util = Asteroids.Util = {};
	
	var inherits = Util.inherits = function (ChildClass, BaseClass) {
		function Surrogate () { this.constructor = ChildClass };
		Surrogate.prototype = BaseClass.prototype;
		ChildClass.prototype = new Surrogate();
	};
	
	var randomVec = Util.randomVec = function (length) {
	    var deg = 2 * Math.PI * Math.random();

	    return scale([Math.sin(deg), Math.cos(deg)], length);
	  };

	  var scale = Util.scale = function (vec, m) {
		  return [vec[0] * m, vec[1] * m];
	  };
})();