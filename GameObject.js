//the whole object that takes in arguments about a character
// and draws it on the map

class GameObject {
	constructor(config) {
		this.x = config.x || 0;
		this.y = config.y || 0;

		//direction default is down
		this.direction = config.direction || "down";
		this.sprite = new Sprite({
			gameObject: this,

			// created object default image
			src: config.src || "/images/characters/people/hero.png",
		});
	}

	update() {}
}
