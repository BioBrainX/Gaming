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
	CHC: .1, DCH: .2, DWP: .1, DHS: .2,
	// Defensive
	ARM: .1, RXP: .1, PHZ: .1, HLT: .1,
	// Utility
	SKD: .1, SKH: .1, SKR: .1, SKN: .2,
	// Handling
	WRL: .1, WSB: .1, WAC: .1, WAM: .2,
},

_G: { // Gears
	_A: { // Attributes
		[_O | _cor]: { DWP: .15 },
		[_O | _mñr]: { CHC: .06, DCH: .12, DHS: .1, WHL: .08 },
		[_D | _cor]: { ARM: 1.7e5 },
		[_D | _mñr]: { ARG: 4925, RXP: .1, PHZ: .1, HLT: 18935 },
		[_U | _cor]: { SKT: 1 },
		[_U | _mñr]: { SKD: .1, SKH: .12, SKR: .2, SFX: .1 },
	},

	_M: {
		[_O]: { CHC: .06, DCH: .12, DHS: .1 },
		[_D]: { PFE: .13, AOK: 18935, RBL: .1, RDF: .1, RBR: .1, RDO: .1, RDR: .1, RNS: .1, RSC: .1, ICR: .2, },
		[_U]: { SKH: .12, SKR: .2, SKN: .1 },
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
				_Talent: _G | _ODU,
			},
			v: {
				name: 'vest',
				_Talent: _G | _ODU,
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
		} //set bonuses, {attr1:v},{attr2:v},{attr3:v}
	],

	Brand: {},
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
			}
		],
	},
	Xotc: {},
},

_W: { // Weapons
	_A: { // Attributes
		[_O]: {
			[_cor]: { DWP: .15 },
			[_mjr]: { DHL: .21, DOC: .1, DHS: 1.11, DCH: .17, DTA: .12, CHC: .21 },
			[_mñr]: { CHC: .095, DCH: .1, DHS: .1, DOC: .1, WRF: .05 }
		},
		[_U]: {
			[_mñr]: { WSB: .12, WAC: .12, WOR: .24, WSW: .15, WRL: .12, WMS: .125 }
		},
	}
},
};