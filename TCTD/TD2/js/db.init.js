const // Categories IDs
	_O = 0b001, // Offensive
	_D = 0b010, // Defensive
	_U = 0b100, // Utility
	_ODU = _O | _D | _U, // All Categories
	_cor = 0b11000,
	_mjr = 0b10000,
	_mñr = 0b01000,
	_G = 0b1000000,
	//Gear slot ID
	m = _G | 0b000001,
	b = _G | 0b000010,
	v = _G | 0b000100,
	g = _G | 0b001000,
	h = _G | 0b010000,
	k = _G | 0b100000,
	_G_all = _G | m | b | v | g | h | k,
	_W = 0b1000,
	//Weapon slot ID
	_1st = 0b001,
	_2nd = 0b010,
	_3rd = 0b100,
	_Ult = 0b111,
	TDdb = {
		// main dBase
		SHD: {
			// Offensive
			CHC: 0.1,
			DCH: 0.2,
			DHS: 0.2,
			DWP: 0.1,
			// Defensive
			ARM: 0.1,
			HLT: 0.1,
			PHZ: 0.1,
			RXP: 0.1,
			// Utility
			SKD: 0.1,
			SKH: 0.1,
			SKN: 0.2,
			SKR: 0.1,
			// Handling
			WAC: 0.1,
			WAM: 0.2,
			WRL: 0.1,
			WSB: 0.1,
		},

		_G: {
			// Gears
			_A: {
				// Attributes
				[_O | _cor]: { DWP: 0.15 },
				[_O | _mñr]: { CHC: 0.06, DCH: 0.12, DHS: 0.1, WHL: 0.08 },
				[_D | _cor]: { ARM: 1.7e5 },
				[_D | _mñr]: { ARG: 4925, RXP: 0.1, PHZ: 0.1, HLT: 18935 },
				[_U | _cor]: { SKT: 1 },
				[_U | _mñr]: { SKD: 0.1, SKH: 0.12, SKR: 0.2, SFX: 0.1 },
			},

			_M: {
				[_O]: { CHC: 0.06, DCH: 0.12, DHS: 0.1 },
				[_D]: {
					AOK: 18935,
					ICR: 0.2,
					PFE: 0.13,
					RBL: 0.1,
					RBR: 0.1,
					RDF: 0.1,
					RDO: 0.1,
					RDR: 0.1,
					RNS: 0.1,
					RSC: 0.1,
				},
				[_U]: { SKH: 0.12, SKR: 0.2, SKN: 0.1 },
			},

			_dfult: [
				// default set
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
				}, //set bonuses, {attr1:v},{attr2:v},{attr3:v}
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
					},
				],
			},
			Xotc: {},
		},

		_W: {
			// Weapons
			_A: {
				// Attributes
				[_O]: {
					[_cor]: { DWP: 0.15 },
					[_mjr]: {
						CHC: 0.21,
						DCH: 0.17,
						DHL: 0.21,
						DHS: 1.11,
						DOC: 0.1,
						DTA: 0.12,
					},
					[_mñr]: {
						CHC: 0.095,
						DCH: 0.1,
						DHS: 0.1,
						DOC: 0.1,
						WRF: 0.05,
					},
				},
				[_U]: {
					[_mñr]: {
						WAC: 0.12,
						WMS: 0.125,
						WOR: 0.24,
						WRL: 0.12,
						WSB: 0.12,
						WSW: 0.15,
					},
				},
			},
		},
	};
