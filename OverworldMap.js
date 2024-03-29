class OverworldMap {
	constructor(config) {
		this.gameObjects = config.gameObjects;

		this.lowerImage = new Image();
		this.lowerImage.src = config.lowerSrc;

		this.upperImage = new Image();
		this.upperImage.src = config.upperSrc;
	}

	drawLowerImage(ctx) {
		ctx.drawImage(this.lowerImage, 0, 0);
		// console.log(this);
	}

	drawUpperImage(ctx) {
		ctx.drawImage(this.upperImage, 0, 0);
	}
}

window.OverworldMaps = {
	DemoRoom: {
		lowerSrc: "/images/maps/DemoLower.png",
		upperSrc: "/images/maps/DemoUpper.png",
		gameObjects: {
			hero: new Person({
				isPlayerControlled: true,
				x: utils.withGrid(5),
				y: utils.withGrid(6),
			}),
			// npc1: new Person({
			// 	x: utils.withGrid(7),
			// 	y: utils.withGrid(9),
			// 	src: "/images/characters/people/npc1.png",
			// }),
		},
	},
	KitchenRoom: {
		lowerSrc: "/images/maps/KitchenLower.png",
		upperSrc: "/images/maps/KitchenUpper.png",
		gameObjects: {
			hero: new Person({
				x: utils.withGrid(4),
				y: utils.withGrid(1),
			}),
			npc2: new Person({
				x: utils.withGrid(6),
				y: utils.withGrid(3),
				src: "/images/characters/people/npc2.png",
			}),
		},
	},
};
