import Vector from './Vector';

export default class Matrix {
	private _mat: number[][];

	get matrix() {
		return this._mat;
	}

	constructor(matrix: number[][]) {
		let longest = 0;
		for (let i = 0; i < matrix.length; i++) {
			longest = Math.max(longest, matrix[i].length);
		}
		for (let i = 0; i < matrix.length; i++) {
			if (matrix[i].length < longest) {
				matrix[i].push(...new Array(longest - matrix[i].length).fill(0));
			}
		}
		this._mat = matrix;
	}

	public setMatrixIndex(m: number, n: number, value: number) {
		this._mat[m][n] = value;
		return this;
	}

	// Operations
	public plus(m: Matrix) {
		if (this._mat.length !== m.matrix.length || this._mat[0].length !== m.matrix[0].length) {
			return false;
		}
		let mat = Matrix.zero(this._mat.length) as Matrix;
		for (let i = 0; i < this._mat.length; i++) {
			for (let j = 0; j < this._mat[0].length; j++) {
				mat.setMatrixIndex(i, j, this._mat[i][j] + m.matrix[i][j]);
			}
		}
		return mat;
	}

	public minus(m: Matrix) {
		if (this._mat.length !== m.matrix.length || this._mat[0].length !== m.matrix[0].length) {
			return false;
		}
		let mat = Matrix.zero(this._mat.length) as Matrix;
		for (let i = 0; i < this._mat.length; i++) {
			for (let j = 0; j < this._mat[0].length; j++) {
				mat.setMatrixIndex(i, j, this._mat[i][j] - m.matrix[i][j]);
			}
		}
		return mat;
	}

	public times(m: Matrix) {
		if (this._mat[0].length !== m.matrix.length) {
			return false;
		}
		let mat = Matrix.zero(this._mat.length) as Matrix;
		for (let i = 0; i < this._mat.length; i++) {
			for (let j = 0; j < m.matrix[0].length; j++) {
				for (let k = 0; k < this._mat[0].length; k++) {
					mat.setMatrixIndex(i, j, mat.matrix[i][j] + this._mat[i][k] * m.matrix[k][j]);
				}
			}
		}
		return mat;
	}

	public timesScalar(n: number) {
		let mat = Matrix.zero(this._mat.length) as Matrix;
		for (let i = 0; i < this._mat.length; i++) {
			for (let j = 0; j < this._mat[0].length; j++) {
				mat.setMatrixIndex(i, j, this._mat[i][j] * n);
			}
		}
		return mat;
	}

	public determinant(): number | null {
		if (this._mat.length !== this._mat[0].length) {
			return null;
		}
		if (this._mat.length === 1) {
			return this._mat[0][0];
		}
		if (this._mat.length === 2) {
			return this._mat[0][0] * this._mat[1][1] - this._mat[0][1] * this._mat[1][0];
		}
		let det = 0;
		for (let i = 0; i < this._mat.length; i++) {
			det += (-1) ** i * this._mat[0][i] * this.subMatrix(0, i).determinant()!;
		}
		return det;
	}

	public inverse(): Matrix | null {
		if (this._mat.length !== this._mat[0].length) {
			return null;
		}
		const det = this.determinant() as number;
		if (det === 0) {
			return null;
		}
		if (this._mat.length === 1) {
			return new Matrix([[1 / this._mat[0][0]]]);
		}
		const cofactorMat = new Matrix(
			this._mat.map((row, i) => row.map((_, j) => (-1) ** (i + j) * this.subMatrix(i, j).determinant()!))
		);
		const adjugateMat = cofactorMat.transpose();
		return adjugateMat.timesScalar(1 / det);
	}

	private subMatrix(i: number, j: number): Matrix {
		return new Matrix(this._mat.filter((_, m) => m !== i).map((row) => row.filter((_, n) => n !== j)));
	}

	public transpose() {
		let mat = Matrix.zero(this._mat[0].length) as Matrix;
		for (let i = 0; i < this._mat.length; i++) {
			for (let j = 0; j < this._mat[0].length; j++) {
				mat.setMatrixIndex(j, i, this._mat[i][j]);
			}
		}
		return mat;
	}

	// Types
	public static zero(n: number) {
		let mat = new Array(n).fill(0).map(() => new Array(n).fill(0));
		return new Matrix(mat);
	}

	public static identity(n: number) {
		let mat = new Array(n).fill(0).map(() => new Array(n).fill(0));
		for (let i = 0; i < n; i++) {
			mat[i][i] = 1;
		}
		return new Matrix(mat);
	}
}
