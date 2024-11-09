const

// Categories IDs
_O = 0b001, // Offensive
_D = 0b010, // Defensive
_U = 0b100, // Utility
_ODU = _O | _D | _U, // All Categories
_cor = 0b11000,
_mjr = 0b10000,
_mñr = 0b01000,

_G = 0b1000000,
//Gear slot ID
m = 0b000001, b = 0b000010,
v = 0b000100, g = 0b001000,
h = 0b010000, k = 0b100000,
_G_all = _G | m | b | v | g | h | k,

_W = 0b1000,
//Weapon slot ID
_1st = 0b001, _2nd = 0b010, _3rd = 0b100, _Ult = 0b111,

TDdb = { // main dBase
SHD: {
	// Offensive
	CHC: .1, CHD: .2, WPD: .1, HSD: .2,
	// Defensive
	ARM: .1, XRS: .1, HZP: .1, HLT: .1,
	// Utility
	SKD: .1, SKH: .1, SKR: .1, SKN: .2,
	// Handling
	RLD: .1, STB: .1, ACC: .1, AMC: .2,
},
_G: { // Gears
	_A: { // Attributes
		[_O]: {
			[_cor]: { WPD: .15 },
			[_mñr]: { CHC: .06, CHD: .12, HSD: .1, WHL: .08 }
		},
		[_D]: {
			[_cor]: { ARM: 1.7e5 },
			[_mñr]: { ARG: 4925, XRS: .1, HZP: .1, HLT: 18935 }
		},
		[_U]: {
			[_cor]: { SKT: 1 },
			[_mñr]: { SKD: .1, SKH: .12, SKR: .2, SFX: .1 }
		},
	},

	_dfult: [ // default set
		{
			avail: _G_all,
			_A: [_cor, _mñr, _mñr],
			mod: 1,
			m: {
				name: 'mask',
				_A: [_cor, _mñr, _mñr],
				mod: 1,
				_Talent: ø,
				úniq: {
					name1: {
						_A: [_cor, _mñr, _mñr],
						mod: 1,
						_Talent: ø,
					},
				},
			},
			b: {
				name: 'backpack',
				_Talent: ƒø,
			},
			v: {
				name: 'vest',
				_Talent: ƒø,
			},
			g: {
				name: 'gloves',
				mod: 0,
			},
			h: {
				name: 'holster',
				mod: 0,
			},
			k: {
				name: 'kneepad',
				mod: 0,
			},
		},
		// set bonuses
		{ ø }, { ø }, { ø },
		{ Talents: _G | _ODU }
	],

	Brand: {
		511: [
			{
				[_G.g]: {
					úniq: {
						name: 'Deathgrips',
						_A: [, { AOK: 0.15 }],
					}
				},
			},
			{ HLT: 0.1 }, { XIH: 0.2 }, { HZP: 0.1 },
		],
	},
	Green: {
		_dfult: [
			{
				b: {
					name: 'backpack',
					_Talent: ƒø,
				},
				v: {
					name: 'vest',
					_Talent: ƒø,
				},
				g: { mod: 0 },
				h: { mod: 0 },
				k: { mod: 0 },
			}, ,
			{ attr1: val }, { attr2: val },
			ƒø //talent
		],
		Strykr: [
			{
				b: {
					name: 'backpack',
					_Talent: ƒø,
				},
				v: {
					name: 'vest',
					_Talent: ƒø,
				},
				g: { mod: 0 },
				h: { mod: 0 },
				k: { mod: 0 },
			}, ,
			{ WHL: 0.15 },
			{ ROF: 0.15 },
			_ => { }
		],
		HF: [
			{
				b: {
					name: 'backpack',
					_Talent: ƒø,
				},
				v: {
					name: 'vest',
					_Talent: ƒø,
				},
				g: { mod: 0 },
				h: { mod: 0 },
				k: { mod: 0 },
			}, ,
			{ SMD: .15, SGD: .15 },
			{ AOK: .2, HOK: 1 },
			_ => { } //talent
		],
	},
},

_W: { // Weapons
	_A: { // Attributes
		[_O]: {
			[_cor]: { WPD: .15 },
			[_mjr]: { HLD: .21, DOC: .1, HSD: 1.11, CHD: .17, DTA: .12, CHC: .21 },
			[_mñr]: { CHC: .095, CHD: .1, HSD: .1, DOC: .1, ROF: .05 }
		},
		[_U]: {
			[_mñr]: { STB: .12, ACC: .12, OPR: .24, SWP: .15, RLD: .12, MAG: .125 }
		},
	}
},

Talent: {},
};
