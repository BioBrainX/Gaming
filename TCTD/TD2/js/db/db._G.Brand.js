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
			g: {
				úniq: {
					name: 'Deathgrips',
					_A: [,{ AOK:0.15 }],
				},
			},
		},
		{ HLT:0.1 },
		{ HIC:0.2 },
		{ PHZ:0.3 },
	],
	ProvD:[
		{
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
})
})()