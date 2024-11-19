clogt('_G_Talents');
(()=> {
const þ=TDdb,
	_P=þ.Players;

_.assignIn(TDdb._G._T,{
	b:{
		Vigil:{
			onEqp:ƒø,
			onActv:ƒø,
			onUnEqp:ƒø,
		},
	},
	v:{
		GlcCann:{
			onEqp:pId=>{ // Glass Canon
				Player(pId).IncTtlDmg(.3)
			},
			onUnEqp:pId=>{
				Player(pId).DecTtlDmg(.3)
			},
		},
	},
});

(()=> { // init talents
	const _G_T=þ._G._T;
	for (let slot of [`b`,`v`])
		for (const _T in _G_T[slot])
			_G_T[_T]=_G_T[slot][_T];
})();

})();
clogtEnd('_G_Talents')