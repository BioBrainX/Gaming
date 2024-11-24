clogtEnd('TDdb')
clogt('TD2')

// setup Player's functions
þ.Players.ƒ= pId=> {
	const
	þ=TDdb,
	_ITM=þ._ITM,
	_P=þ.Players, _cap=_P.cap,
	_Pp=_P.p, _Pi=_Pp[pId] ,_PA=_Pi._A,

	ƒ= {
		CalcTtlOutDmg:()=>{
			const
			
			TtlBaseDmg=_PA.DBW;
			return {HSD}
		},
		Eqp:(itms={},eqp=_T)=> {
			for(const slot in itms) {
				const _GId=itms[slot]
				_P._G[slot]= _GId
				þ._G[_GId]._T['on'+(!eqp?'Un':'')+'Eqp']()
				this.Set_A(_GId)
			}
		},
		UnEqp:(itms={})=>this.Eqp(itms,_F),
		Set_A:_GId=> {
			const _G_A=þ._ITM;
			for(const _A in _G_A) {
				plyr._A[_A] +=_G_A[_A]
			}
		},
		inc:{ // increase attributes functions
			CHC:v=> {
				_PA.CHC+=v
				return ƒ.inc
			},
			DBM:(i,v)=>{
				_PA.DBM[i]+=v
				return ƒ.inc
			},
			// tst:(_)=>clog(_Pp),
		},
		dec:{ // decrease attributes functions
			CHC:v=> {
				_PA.CHC-=v
				return ƒ.dec
			},
			DBM:(i,v)=>{
				_PA.DBM[i]-=v
				return ƒ.dec
			},
			// tst:(_)=>clog(_Pp),
		},
	}

	function ƒ_M(_A,l=1) {
		if (1<l)
			return {ƒname:(i,v)=>{
				_PA[_A][i]+=v
				return ƒ
			}}
		else
			return {ƒname:v=>{
				_PA[_A]+=v
				return ƒ
			}}
	}

	Object.freeze(ƒ)
	return ƒ
};
clog(þ.Players)


clogtEnd('TD2')