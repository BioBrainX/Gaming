clogt('_G_Talents');
(()=> {
const þ=TDdb,
	_Pƒ=þ.Players.ƒø;

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
				_Pƒ(pId).inc
					.DMB(1,.25)
					.IncDmg(.5)
			},
			onUnEqp:pId=>{
				_Pƒ(pId).dec
					.DMB(1,.25)
					.IncDmg(.5)
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