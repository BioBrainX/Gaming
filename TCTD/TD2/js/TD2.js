clogtEnd('TDdb')
clogt('TD2')


function _P(pId=0) {
	const
	þ=TDdb,
	_ITM=þ._ITM,
	_P=þ.Players[pId],

	methods= {
		calcOutput:_=>{
			
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
		IncTtlDmg:v=> {
			_P._B[1] +=v //
		},
		DecTtlDmg:v=> {
			_P._B[1] -=v //
		},
	}
	return methods
}


clogtEnd('TD2')