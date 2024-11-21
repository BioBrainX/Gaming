(()=> {
const þ=TDdb,
_A=þ._A, // Atrributes
_T=þ._G._T; // Talents

_.assignIn(þ._G.Brand,{
	/* Gears
	brand_name:[
		0: * default attibutes {
			gear slot for custom properties: {
				únique gear for this slot:{
					Attributes(_A):[ core,minor,minor ],
					Talent(_T):ƒ(),
				}
			}
		},
		1st:{ set bonus attribute:val },
		2nd:{ set bonus attribute:val },
		3rd:{ set bonus attribute:val },
	] */
	511: [
		{
			_A: {_D:[_cor|_D]},
			g: {
				úniq: {
					name: 'Deathgrips',
					_A: {_fxd:[,{ AOK:0.15 }]},
				},
			},
		},
		{ HPP:0.1 },
		{ HIC:0.2 },
		{ PHZ:0.3 },
	],
	ProvD:[
		{
			_A:{_D:[ _cor|_O ]},
			b:{
				úniq:{
					name:'The Gift',
					_T:_T.Vigil,
				},
			},
			v:{
				úniq:{
					name:'The Sacrifice',
					_T:_T.GlsCann,
				},
			}
		},
		{ DHS:0.15 },
		{ CHC:0.1 },
		{ DCH:0.15 },
	],
	Česká:[
		{
			_A:{_D:[ _cor|_O ]},
			b:{
				úniq:{
					name:`Devil's Due`,
					_T:_T.Clutch,
				},
			},
		},
		{ CHC:0.1 },
		{ PHZ:0.2 },
		{ HPP:0.1 },
	],
	Grupo:[
		{
			_A:{_D:[ _cor|_O ]},
			v:{
				úniq:{
					name:`Door-Kicker's Knock`,
					_T:_T.Spark,
				},
			},
		},
		{ DHC:0.15 },
		{ DEX:0.15 },
		{ DHS:0.15 },
	],
	Brazos:[
		{
			_A:{_D:[ _cor|_D ]},
			b:{
				úniq:{
					name:`Hermano `,
					_T:_T.OvrClok,
				},
			},
			h:{
				úniq:{
					name:`Picaro's Holster`,
					_A:{
						_R:[ _cor|_DU ],
						_fxd:[,{ WPD:0.15 }],
					},
				},
			},
		},
		{ DHC:0.15 },
		{ DEX:0.15 },
		{ DHS:0.15 },
	],
})
})()