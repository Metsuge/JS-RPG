// keyboard direction object
class DirectionInput {
	constructor(config) {
		this.heldDirections = [];

		this.map = {
			ArrowUp: "up",
			ArrowDown: "down",
			ArrowLeft: "left",
			ArrowRight: "right",
			KeyW: "up",
			KeyS: "down",
			KeyA: "left",
			KeyD: "right",
		};
	}
	// returns direction for external things to know
	get direction() {
		return this.heldDirections[0];
	}

	init() {
		document.addEventListener("keydown", (e) => {
			const dir = this.map[e.code];
			// if dir is one of the defined keys AND that key is not currently pressed
			if (dir && this.heldDirections.indexOf(dir) === -1) {
				// add currently held key to the array of held keys
				this.heldDirections.unshift(dir);
				// console.log(this.heldDirections);
			}
		});

		document.addEventListener("keyup", (e) => {
			const dir = this.map[e.code];
			const index = this.heldDirections.indexOf(dir);
			if (index > -1) {
				this.heldDirections.splice(index, 1);
				// console.log(this.heldDirections);
			}
		});
	}
}
