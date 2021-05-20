function sum(a, b) {
	let args = Array.prototype.slice.call(arguments, 0);
	let sum = 0;
	let i = args.length;
	while (i--) {
		let arg = args[i];
		if (typeof arg !== 'number') {
			throw new TypeError('The value "' + arg + '" is not a number!');
		}
		sum += arg;
	}
	return sum;
}

module.exports = sum;
