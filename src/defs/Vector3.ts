import Vector from './Vector';

export default class Vector3 extends Vector {
	private _x: number;
	private _y: number;
	private _z: number;

	get x() {
		return this._x;
	}
	get y() {
		return this._y;
	}
	get z() {
		return this._z;
	}
	set x(n: number) {
		this._x = n;
		this.vector = [this._x, this._y, this._z];
	}

	set y(n: number) {
		this._y = n;
		this.vector = [this._x, this._y, this._z];
	}

	set z(n: number) {
		this._z = n;
		this.vector = [this._x, this._y, this._z];
	}

	constructor(x: number, y: number, z: number) {
		let vector = [x, y, z];
		super(vector);
		this._x = x;
		this._y = y;
		this._z = z;
	}
}
