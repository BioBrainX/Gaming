const
	clog=console.log
;

/**
 *
 *
 * @param {*} x
 * @returns
 */
function dlog(exprVal, ...y) {
	const output = [exprVal, ...y.slice(1)];
	if (y.length && typeof y[0] === 'function')
		y[0](...output) && clog(...output);
	else {
		y[0] && output.unshift(y[0]);
		clog(...output);
	}

	return exprVal;
}

function testCheck(f, ...p) {
	try {
		return f(...p);
	} catch (err) {
		clog(err.message);
		return false;
	}
}

module.exports = {
	clog, dlog,
    testCheck,
}
