export default class Vector {
	private _arr: number[];
	private _orient: string;
	private _dim: number;

	get arr() {
		if (this._orient === 'row') {
			return this._arr;
		} else {
			return this._arr.map((num) => [num]);
		}
	}
	set vector(arr: (number | number[])[]) {
		if (typeof arr[0] === 'number') {
			this._arr = arr as number[];
			this._orient = 'row';
		} else {
			this._arr = arr.map((num) => {
				if (typeof num === 'number') {
					return num;
				} else {
					return num[0];
				}
			}) as number[];
			this._orient = 'column';
		}
	}
	get orientation() {
		return this._orient;
	}
	get dimension() {
		return this._dim;
	}

	public at(index: number) {
		return this._arr[index];
	}

	constructor(arr: (number | number[])[]) {
		if (typeof arr[0] === 'number') {
			this._arr = arr as number[];
			this._orient = 'row';
		} else {
			this._arr = arr.map((num) => {
				if (typeof num === 'number') {
					return num;
				} else {
					return num[0];
				}
			}) as number[];
			this._orient = 'column';
		}
		this._dim = this._arr.length;
	}

	public plus(v: Vector) {
		if (this._dim !== v.dimension) {
			return false;
		}
		if (this.orientation === v.orientation) {
			if (this.orientation === 'row') {
				let newVec = [];
				for (let i = 0; i < this._dim; i++) {
					newVec[i] = this._arr[i] + v.at(i);
				}
				return new Vector(newVec);
			} else {
				let newVec = [];
				for (let i = 0; i < this._dim; i++) {
					newVec[i] = [this._arr[i] + v.at(i)];
				}
				return new Vector(newVec);
			}
		}

		return false;
	}

	public minus(v: Vector) {
		if (this._dim !== v.dimension) {
			return false;
		}
		if (this.orientation === v.orientation) {
			if (this.orientation === 'row') {
				let newVec = [];
				for (let i = 0; i < this._dim; i++) {
					newVec[i] = this._arr[i] - v.at(i);
				}
				return new Vector(newVec);
			} else {
				let newVec = [];
				for (let i = 0; i < this._dim; i++) {
					newVec[i] = [this._arr[i] - v.at(i)];
				}
				return new Vector(newVec);
			}
		}
	}

	public scale(n: number) {
		let newVec = [];
		for (let i = 0; i < this._dim; i++) {
			newVec[i] = typeof this._arr[i] === 'number' ? ((this._arr[i] * n) as number) : ([this._arr[i] * n] as number[]);
		}
		return new Vector(newVec);
	}

	public times(v: Vector) {
		if (this._dim !== v.dimension) {
			return false;
		}
		let newVec = [];
		for (let i = 0; i < this._dim; i++) {
			newVec[i] =
				typeof this._arr[i] === 'number'
					? ((this._arr[i] * v.at(i)) as number)
					: ([this._arr[i] * v.at(i)] as number[]);
		}
		return new Vector(newVec);
	}

	public divide(v: Vector) {
		if (this._dim !== v.dimension) {
			return false;
		}
		let newVec = [];
		for (let i = 0; i < this._dim; i++) {
			newVec[i] =
				typeof this._arr[i] === 'number'
					? ((this._arr[i] / v.at(i)) as number)
					: ([this._arr[i] / v.at(i)] as number[]);
		}
		return new Vector(newVec);
	}

	public sum() {
		return this._arr.reduce((n, t) => n + t);
	}

	public dot(v: Vector) {
		if (this._dim !== v.dimension || this.orientation !== v.orientation) {
			return false;
		}
		let mult = this.times(v) as Vector;
		return mult.sum();
	}

	public mag() {
		let res = this.times(this) as Vector;
		let sum = res.sum();
		return Math.sqrt(sum);
	}

	public project(v: Vector) {
		let dot = this.dot(v) as number;
		let res = dot / (v.mag() * v.mag());
		return v.scale(res) as Vector;
	}

	public toArray() {
		return this._arr;
	}
}
