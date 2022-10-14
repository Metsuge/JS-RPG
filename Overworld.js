class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	// executes various functions on (usually) 60x per sec, but will match display refresh rate of the monitor
	startAnimationLoop() {
		const step = () => {
			// clearing last animation frames
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			//draw the lower layer of the map
			this.map.drawLowerImage(this.ctx);
			//draw game objects
			Object.values(this.map.gameObjects).forEach((object) => {
				//each object has update function that controlls the movement direction
				// it takes in direction as an argument
				object.update({
					arrow: this.directionInput.direction,
				});
				//draw each object
				object.sprite.draw(this.ctx);
			});

			requestAnimationFrame(() => {
				step();
			});
		};
		step();
	}

	init() {
		//populate the game with map and game objects
		this.map = new OverworldMap(window.OverworldMaps.DemoRoom);

		//init direction input function and get directions from keyboard actions
		this.directionInput = new DirectionInput();
		this.directionInput.init();
		// return the last pressed key, or undefined if no key is pressed now
		this.directionInput.direction;
		// start frame looping
		this.startAnimationLoop();
	}
}
