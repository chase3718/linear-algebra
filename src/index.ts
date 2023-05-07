import Matrix from './defs/Matrix';
import Vector from './defs/Vector';
import Vector3 from './defs/Vector3';

let a = new Vector3(1, 2, 3);
let b = new Matrix([
	[1, 2],
	[3, 4],
]);

console.log(b.inverse());
