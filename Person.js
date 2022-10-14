class Person extends GameObject {
	constructor(config) {
		super(config);
		//initial moving progress, 0 if no one is moving at the start
		this.movingProgressRemaining = 0;
		//is this person a player, or npc, default false (it's npc)
		this.isPlayerControlled = config.isPlayerControlled || false;

		this.directionUpdate = {
			up: ["y", -1],
			down: ["y", 1],
			left: ["x", -1],
			right: ["x", 1],
		};
	}

	update(state) {
		this.updatePosition();
		//if it's player controlled game object
		//if direction key is held AND the previous movement is done
		if (this.isPlayerControlled && state.arrow && this.movingProgressRemaining === 0) {
			this.updatePosition();
			this.direction = state.arrow;
			this.movingProgressRemaining = 16;
		}
	}

	updatePosition() {
		if (this.movingProgressRemaining > 0) {
			// fx it'll selec one of the keys from the directionUpdate object
			//  and return the value which is an array: ["y", -1]
			// where property is the first var. "y", change is the second var. -1
			const [property, change] = this.directionUpdate[this.direction];
			// variables x or y depending on the direction
			this[property] += change;
			this.movingProgressRemaining -= 1;
		}
	}
}
