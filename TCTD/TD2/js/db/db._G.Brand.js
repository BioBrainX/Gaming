(()=> {
const þ=TDdb,
_A=þ._A, // Atrributes
_T=þ._G._T; // Talents

_.assignIn(þ._G.Brand,{
	/* Gears
	brand_name:[
		0.default attibutes:{
			gear slot for custom properties: {
				_Ûnique gear for this slot:{
					Gear's name:{
						Attributes(_A):[ core,minor,minor ],
						Talent(_T):ƒ(),
					},
				},
				mod:slot,
			}
		},
		1st:{ set bonus attribute:val },
		2nd:{ set bonus attribute:val },
		3rd:{ set bonus attribute:val },
	] */
	Brandless:[
		{
			g:{_M:[_ODU]},
			h:{_M:[_ODU]},
			k:{_M:[_ODU]},
		},
		// Nø set bonus
	],
	511: [
		{
			_A: {_D:[_cor|_D]},
			g: {
				_Û: {
					DetGrp:{ _A:[,{ AOK:0.15 }] },
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
				_Û:{
					Gift:{ _T:_T.Vigil }
				},
			},
			v:{
				_Û:{
					Sacrfc:{ _T:_T.GlsCann },
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
				_Û:{
					DvilD:{ _T:_T.Clutch }
				},
			},
		},
		{ CHC:0.08 },
		{ PHZ:0.2 },
		{ HPP:0.9 },
	],
	Grupo:[
		{
			_A:{_D:[ _cor|_O ]},
			v:{
				_Û:{
					DorKik:{ _T:_T.Spark }
				},
			},
		},
		{ DHC:0.13 },
		{ DEX:0.20 },
		{ DHS:0.13 },
	],
	Brazos:[
		{
			_A:[ {_D:_cor|_D} ],
			b:{
				_Û:{
					Hermano:{ _T:_T.OvrClok }
				},
			},
			h:{
				_Û:{
					Picaro:{ _A:[ {_R:_cor|_DU},{ WPD:0.15 } ]},
				},
			},
		},
		{ DHC:0.15 },
		{ DEX:0.15 },
		{ DHS:0.15 },
	],
	Legatus:[
		{
			_A:[ {_D:_cor|_O} ],
			m:{
				_Û:{
					Visionario:{ _A:[,{WOR:.5}] }
				}
			}
		},
		{ WSW:.3 },
		{ WOR:.7 },
		{ DWP:.15 },
	],
	Petrov:[
		{
			_A:[ {_D:_cor|_O} ],
			g:{
				_Û:{
					Contractor:{ _A:[,{DTA:.08}] }
				},
			},
		},
		{ DLM:.1 },
		{ WHL:.15 },
		{ WAM:.5 },
	],

})
})()