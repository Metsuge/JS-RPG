class Sprite {
	constructor(config) {
		this.gameObject = config.gameObject;

		this.image = new Image();
		this.image.src = config.src;
		this.image.onload = () => {
			// flag to see if the images are still loading
			// wait for it to be false to begin drawing
			this.isLoaded = true;
		};

		// SHADOW
		this.useShadow = true; // for now it's default, that all objects use shadow

		this.shadow = new Image();
		if (this.useShadow) {
			this.shadow.src = "/images/characters/shadow.png";
		}
		this.shadow.onload = () => {
			this.isShadowLoaded = true;
		};

		// CONFIGURE ANIMATIONS AND INITIAL MOVING STATE

		this.currentAnimation = "walk-up"; //config.currentAnimation || "idle-down";
		this.currentAnimationFrame = 0;
		this.animations = config.animations || {
			//coordinatets to get diferent frame from hero.png
			"idle-down": [[0, 0]],
			"idle-right": [[0, 1]],
			"idle-up": [[0, 2]],
			"idle-left": [[0, 3]],
			"walk-down": [
				[1, 0],
				[0, 0],
				[3, 0],
				[0, 0],
			],
			"walk-right": [
				[1, 1],
				[0, 1],
				[3, 1],
				[0, 1],
			],
			"walk-up": [
				[1, 2],
				[0, 2],
				[3, 2],
				[0, 2],
			],
			"walk-left": [
				[1, 3],
				[0, 3],
				[3, 3],
				[0, 3],
			],
		};

		this.animationFrameLimit = config.animationFrameLimit || 8; // how many game frames we need to show when object is moving
		// basically how fast the hero is moving
		this.animationFrameProgress = this.animationFrameLimit;
	}

	get frame() {
		return this.animations[this.currentAnimation][this.currentAnimationFrame];
	}

	setAnimation(key) {
		if (this.currentAnimation !== key) {
			this.currentAnimation = key;
			this.currentAnimationFrame = 0;
			this.animationFrameProgress = this.animationFrameLimit;
		}
	}

	updateAnimationProgress() {
		if (this.animationFrameProgress > 0) {
			//reduce progress by 1 on each frame
			this.animationFrameProgress -= 1;
			return;
		} else {
			// reset the counter
			this.animationFrameProgress = this.animationFrameLimit;
			this.currentAnimationFrame += 1;

			if (this.frame === undefined) {
				//if there's no more animation frames left in array
				// loop again from the begining
				this.currentAnimationFrame = 0;
			}
		}
	}

	draw(ctx) {
		const x = this.gameObject.x - 8;
		const y = this.gameObject.y - 18;

		//shadow is drawn first because you have to start from the bottom layer
		// shadow, then character on top of shadow

		this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

		const [frameX, frameY] = this.frame;

		this.isLoaded &&
			ctx.drawImage(
				this.image,
				frameX * 32, //left cut
				frameY * 32, //top cut,
				32, //width of cut
				32, //height of cut
				x,
				y,
				32, // shadow position
				32
			);
		this.updateAnimationProgress();
	}
}
