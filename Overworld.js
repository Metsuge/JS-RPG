class Overworld {
	constructor(config) {
		this.element = config.element;
		this.canvas = this.element.querySelector(".game-canvas");
		this.ctx = this.canvas.getContext("2d");
		this.map = null;
	}

	// this.
	startAnimationLoop() {
		const step = () => {
			// clearing last animation frames
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			//draw the lower layer of the map
			this.map.drawLowerImage(this.ctx);
			//draw game objects
			Object.values(this.map.gameObjects).forEach((object) => {
				object.x += 1;
				object.sprite.draw(this.ctx);
			});

			requestAnimationFrame(() => {
				step();
			});
		};
		step();
	}

	init() {
		this.map = new OverworldMap(window.OverworldMaps.KitchenRoom);
		// start frame looping
		this.startAnimationLoop();
	}
}
