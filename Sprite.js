class Sprite {
	constructor(config) {
		this.gameObject = config.gameObject;

		this.currentAnimation = config.currentAnimation || "idleDown";
		this.currentAnimationFrame = 0;

		this.image = new Image();
		this.image.src = config.src;
		this.image.onload = () => {
			// flag to see if the images are still loading
			// wait for it to be false to begin drawing
			this.isLoaded = true;
		};

		// SHADOW
		this.shadow = new Image();
		if (this.useShadow) {
			this.shadow.src = "/images/characters/shadow.png";
		}
		this.shadow.onload = () => {
			this.isShadowLoading = true;
		};
		this.useShadow = true; // for now it's default, that all objects use shadow

		this.animations = config.animations || {
			idleDown: [
				// [x,y] coordinates for the character on the map
				[0, 0],
			],
		};
	}

	draw(ctx) {
		const x = this.gameObject.x - 8;
		const y = this.gameObject.y - 18;

		//shadow is drawn first because you have to start from the bottom layer
		// shadow -> character on top of shadow

		this.isLoaded &&
			ctx.drawImage(
				this.image,
				0, //left cut
				0, //top cut,
				32, //width of cut
				32, //height of cut
				x,
				y,
				32, // can change shadow position, seem like character is floating,
				// or the sun direction is changing
				32
			);
	}
}
