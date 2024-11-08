const
{
	clog, dlog,
	testCheck
} = require('./B10dbug'),

	ø=null,
	_ø=undefined,
	ƒø=_=>{},
	_inf=Infinity,
	Obj=Object,
	OwnPropDesc=Obj.getOwnPropertyDescriptor,
	// T= true,
	// F= false,
	// wnd=window,
	// Ð=document,
____0=0; //dummy

/**
 * @param {[number]|[boolean]}[l] loop count (inclusive) / [ begin, end, step ]
 * @param {function} ƒ ( i , rtV ) =>
 * @param {boolean}[cont=false] continue=true(default) / break=false
 * @param {*}[rtV=-99] initial return value
 * @returns {*} rtV = ƒ( )
 * @example
 * * do ƒ 6 times from 0 to 5 and return ƒ values
 *  Ƒor(5,ƒ)
 * * do ƒ 21 times from -5 to 15 and return ƒ values
 *  Ƒor([-5,15],ƒ)
 * * do ƒ 9 times from -1 to -18 at 2 steps and return ƒ values
 *  Ƒor([-1,-18,2],ƒ)
 *
 * * do ƒ 5 times from -8 to 10 at 2 step, break at v == 0
 *  Ƒor([-8,10,2],v=>v!=0,false)
 * * do ƒ 6 times from 0 to 5, return 10 (0+1+2+3+4+5)
 *  Ƒor(5,(i,x)=>x+=i,true,0)
 * * do ƒ 5 times from 1 to 5, return 5! = 120
 *  Ƒor([1,5],(i,x)=>x*=i,true,1)
 *
 * * loop until ƒ returns false
 *  Ƒor(true,ƒ)
 * * 5 times from 0 to 5, break at i == 5
 *  Ƒor(true,i=>i!=5)
 * * 9 times from -3 to 5, break at i == 5
 *  Ƒor([-3,true],i=>i!=5)
 * * 5 times from -8 to 0 at 2 step, break at i == 0
 *  Ƒor([-8,true,2],i=>i!=0)
 */
function Ƒor(l,ƒ,cont=false,rtV=-99) {
	let [start,end,step] = [ 1<l.length && +l[0] || 0 ,+l[1]||+l[0]||+l ,+l[2]||1 ]
	if (is(l,l[0],l[1]).any.bool()) end=_inf
	const
		æ= end<start,
		loopCond = is(l,l[0],l[1]).any.bool()? (_=>true)
			:!isNaN(end)? !æ? (i=> i<=end) :(i=> end<=i)
			:(_=>false)
	if (æ) step*=-1
	// clog(start,end,step)
	for (let i = start;
		loopCond(i) &&
		((rtV = ƒ(i,rtV)) || cont);
		i+=step
	);
	return rtV
}

/**
 * @param {*} x
 * @returns
 */
function is(...x) {
	const v=x[0],
	methods= {
	any: {
		eq: (...y)=> x.some(v=> y.includes(v)),
		between: (lo,hi)=> x.some(v=> is(v).between(lo,hi)),
		inRange: (lo,hi)=> x.some(v=> is(v).inRange(lo,hi)),
		_ø: _=> x.some(v=> is(v)._ø()),
		nøl: _=> x.some(v=> is(v).nøl()),
		hasVal: _=> x.some(v=> is(v).hasVal()),
		bool: _=> x.some(v=> is(v).bool()),
		num: _=> x.some(v=> is(v).num()),
		realNum: _=> x.some(v=> is(v).realNum()),
		float: _=> x.some(v=> is(v).float()),
		int: _=> x.some(v=> is(v).int()),
		NaN: _=> x.some(v=> isNaN(v)),
		string: _=> x.some(v=> is(v).string()),
		symbol: _=> x.some(v=> is(v).symbol()),
		primitive: _=> x.some(v=> is(v).primitive()),
		Obj: _=> x.some(v=> is(v).Obj()),
		Arr: _=> x.some(v=> is(v).Arr()),
		ƒn: _=> x.some(v=> is(v).ƒn()),
		date: _=> x.some(v=> is(v).date()),
		regEx: _=> x.some(v=> is(v).regEx()),
	},
	all: {
		eq: (...y)=> x.every(v=> y.includes(v)),
		between: (lo,hi)=> x.every(v=> is(v).between(lo,hi)),
		inRange: (lo,hi)=> x.every(v=> is(v).inRange(lo,hi)),
		_ø: _=> x.every(v=> is(v)._ø()),
		nøl: _=> x.every(v=> is(v).nøl()),
		hasVal: _=> x.every(v=> is(v).hasVal()),
		bool: _=> x.every(v=> is(v).bool()),
		num: _=> x.every(v=> is(v).num()),
		realNum: _=> x.every(v=> is(v).realNum()),
		float: _=> x.every(v=> is(v).float()),
		int: _=> x.every(v=> is(v).int()),
		NaN: _=> x.every(v=> isNaN(v)),
		string: _=> x.every(v=> is(v).string()),
		symbol: _=> x.every(v=> is(v).symbol()),
		primitive: _=> x.every(v=> is(v).primitive()),
		Obj: _=> x.every(v=> is(v).Obj()),
		Arr: _=> x.every(v=> is(v).Arr()),
		ƒn: _=> x.every(v=> is(v).ƒn()),
		date: _=> x.every(v=> is(v).date()),
		regEx: _=> x.every(v=> is(v).regEx()),
	},
	between: (lo,hi)=> lo<v && v<hi,
	inRange: (lo,hi)=> lo<=v && v<=hi,
	_ø: _=> typeof v === 'undefined',
	nøl: _=> typeof v !== 'undefined' && !v
			|| !Object.keys(v).length
			|| Array.isArray(v) && !v[0],
	hasVal: _=> !is(v).nøl(),
	bool: _=> typeof v === 'boolean',
	num: _=> typeof v === 'number',
	// complex: _=> typeof v === 'number'  && !isNaN(v) && !Number.isInteger(v),
	// imaginary: _=> typeof v === 'number'  && !isNaN(v) && !Number.isInteger(v) && v.imaginary,
	realNum: _=> is(v).num()
				&& !isNaN(v),
	float: _=> is(v).num()
			&& !isNaN(v)
			&& !Number.isInteger(v),
	int: _=> is(v).num()
			&& !isNaN(v)
			&& Number.isInteger(v),
	odd: _=> !!(v&1), //v%2,
	even: _=> !is(v).odd(),
	// NaN: _=> isNaN(v), //too simple
	string: _=> typeof v === 'string',
	symbol: _=> typeof v === 'symbol',
	primitive: _=> typeof v !== 'object',
	Obj: _=> typeof v === 'object',
	ObjHasVal: _=>!!(
			!v?			  false
			:is(v).Obj()? v.keys(v).length
			:is(v).arr()? v.length
			:is(v).ƒn()?  true
			:v ),
	Getter: key=> !!(OwnPropDesc(v,key).get),
	Setter: key=> !!(OwnPropDesc(v,key).set),
	Accessor: key=> isGetter(v,key)||isSetter(v,key),
	Arr: _=> Array.isArray(v),
	ArrMpty: _=> is(v).arr() && v.len === 0,
	ƒn: _=> typeof v === 'function',
	date: _=> typeof v === 'object'
			&& v instanceof Date,
	regEx: _=> typeof v === 'object'
			&& v instanceof RegExp,
	}
	Object.freeze(methods)
	return methods
}

module.exports = {
	Ƒor,
	is,
	ø,
	_ø,
	_inf,
	ƒø,
	Obj,
};
