#Doge-Teroids
Doge-teroids is a whimsical adaptation of the classic Atari game Asteroids.  The live version on the project can be viewed [here](http://www.johnochs.io/doge.html).  Controls for moving the ship are `ASDW` and `SPACE` to fire.

##Implementation
Most of Doge-teroids is implemented in JavaScript.  Prototypal inheritance is used to keep code (specifically moving objects) DRY.  The entire Doge-teroids game is namespaced as `Asteroids`.

The GameView is drawn using HTML 5's canvas feature.

##Thoughts for the Future
* Build a Node server to allow for the recording of highscores.
* Simplify and refactor code to control eye movements.
* Integrate Facebook/Twitter allowing users to post their highscore.
