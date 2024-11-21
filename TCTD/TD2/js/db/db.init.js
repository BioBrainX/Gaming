clogt('TDdb')

const // Categories IDs
_O= 0b001, // Offense
_D= 0b010, // Defense
_U= 0b100, // Utility
_OD= _O|_D, // Offense & Defense
_OU= _O|_U, // Offense & Utility
_DU= _D|_U, // Defense & Utility
_ODU= _O|_D|_U, // All Categories

_cor= 0b11000, // Core
_mjr= 0b10000, // Major
_mñr= 0b01000, // Minor

_G= 0b1000000,
//Gear slot ID
m= _G|0b000001,
b= _G|0b000010,
v= _G|0b000100,
g= _G|0b001000,
h= _G|0b010000,
k= _G|0b100000,
_G_all= _G|m|b|v|g|h|k,

_W= 0b1000,
//Weapon slot ID
_1st= 0b001,
_2nd= 0b010,
_3rd= 0b100,
_Ult= 0b111,
_W_all= _W|_1st|_2nd|_3rd|_Ult,

_S= 0b10000,
//Skills slot ID
_S_all= _S|_1st|_2nd,

slots={
	_G:`m,b,v,g,h,k`,
	_W:'_W1,_W2,_W3,_WU',
	_S:'_S1,_S2,_S3',
},

TDdb={ // main dBase
_A:{
	list:
		// Offensives
		`CHC,DAR,DCH,DHL,DHS,DLM,DMR,DOC,DPT,DRF,DSG,DSM,DTA,DWP,WRF,` +
		// Defensives
		`ARG,ARM,HIC,HPP,OKA,OKH,PEL,PHZ,RBL,RBR,RDF,RDO,RDR,RNS,RSC,RXP,` +
		// Utility
		`SFX,SKD,SKH,SKN,SKR,SKT,WAC,WAM,WHL,WMS,WOR,WRL,WSB,WSW`,
},
SHD:{
	// Offensive
	CHC:0.1,
	DCH:0.2,
	DHS:0.2,
	DWP:0.1,
	// Defensive
	ARM:0.1,
	HPP:0.1,
	PHZ:0.1,
	RXP:0.1,
	// Utility
	SKD:0.1,
	SKH:0.1,
	SKN:0.2,
	SKR:0.1,
	// Handling
	WAC:0.1,
	WAM:0.2,
	WRL:0.1,
	WSB:0.1,
},

_G:{ // Gears
	_A:{ // Attributes
		[_O|_cor]:{ DWP:0.15 },
		[_O|_mñr]:{ CHC:0.06,DCH:0.12,DHS:0.1,WHL:0.08 },
		[_D|_cor]:{ ARM:1.7e5 },
		[_D|_mñr]:{ ARG:4925,RXP:0.1,PHZ:0.1,HPP:18935 },
		[_U|_cor]:{ SKT:1 },
		[_U|_mñr]:{ SKD:0.1,SKH:0.12,SKR:0.2,SFX:0.1 },
	},

	_M:{ // Mods
		[_O]:{ CHC:0.06,DCH:0.12,DHS:0.1 },
		[_D]:{
			AOK:18935,
			ICR:0.2,
			PFE:0.13,
			RBL:0.1,
			RBR:0.1,
			RDF:0.1,
			RDO:0.1,
			RDR:0.1,
			RNS:0.1,
			RSC:0.1,
		},
		[_U]:{ SKH:0.12,SKR:0.2,SKN:0.1 },
		slots:[_G|m|b|v],
	},

	_T:{ // Talents
		_dfult:{
			onEqp:ƒø,
			onActv:ƒø,
			onUnEqp:ƒø,
		}
	},

	_dfult:[ // default set
		{
			avail:_G_all,
			_A:{
				// _D:[ _cor|_ODU ], // Designated Roll in slot[0]=core, [1,2]=minor
				_R:[ _cor|_ODU,_mñr|_ODU,_mñr|_ODU ], // Possible roll
				// _fxd:[], // fixed roll
			},
			_M:[ _ODU ], // Accepted mod type in slot
			_T:ø,
			m:{
				name:'mask',
				_M:ø,
			},
			b:{
				name:'backpack',
				_T:[ _G|_ODU ], // Possible roll type
			},
			v:{
				name:'vest',
				_T:[ _G|_ODU ],
			},
			g:{
				name:'gloves',
				_M:ø,
			},
			h:{
				name:'holster',
				_M:ø,
			},
			k:{
				name:'kneepad',
				_M:ø,
			},
		}, //set bonuses, {attr1:v},{attr2:v},{attr3:v}
	],

	Brand:{},
	Green:{
		_dfult: [
			{
				b:{
					name:'backpack',
					_A:ø,
					_T:ƒø,
				},
				v:{
					name:'vest',
					_A:ø,
					_T:ƒø,
				},
			},
		],
	},
	Xotc:{},
},

_W:{
	// Weapons
	_A:{
		// Attributes
		[_O]:{
			[_cor]:{ DWP:0.15 },
			[_mjr]:{
				CHC:0.21,
				DCH:0.17,
				DHL:0.21,
				DHS:1.11,
				DOC:0.1,
				DTA:0.12,
			},
			[_mñr]:{
				CHC:0.095,
				DCH:0.1,
				DHS:0.1,
				DOC:0.1,
				WRF:0.05,
			},
		},
		[_U]:{
			[_mñr]:{
				WAC:0.12,
				WMS:0.125,
				WOR:0.24,
				WRL:0.12,
				WSB:0.12,
				WSW:0.15,
			},
		},
	},
},

Players:[,,,], // 4 Players
_ITM:{}, // will contained all items
};

(()=> { //init slots
	for (let i in slots)
		slots[i]= slots[i].split(",");
})();

(()=> { //initialize Players Attributes & functions
	const þ=TDdb, _P=þ.Players,
		_A=þ._A.list.split(','),
		_ƒP={
			inc:{ // increase attributes functions
				TtlDmg:(thisRef,v)=>thisRef._A.x+=v,
			},
			dec:{ // decrease attributes functions
				TtlDmg:(thisRef,v)=>thisRef._A.x-=v,
			},
		};
	ƒor([0,4],p=>{
		const _Pp=_P[p];
		_Pp= {_A:{}};
		for(let i in _A)
			_Pp._A[_A[i]]= 0;

		for(let i in _ƒP)
		for(let j in _ƒP[i])
			_Pp[i][j]=_ƒP[i][j].bind(_Pp);
	})
})();

/* 
(()=>{
	
})()
 */
