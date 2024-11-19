clogtEnd('TDdb')
clogt('TD2')


function Player(pId=0) {
	const þ=TDdb,
		_ITM=þ._ITM,
		_P=þ.Players[pId],
		methods= {
			calcOutput:_=>{
				
			},
			eqp:(itms={})=> {
				for(const slot in itms) {
					const _GId=itms[slot];
					_P._G[slot]= _GId;
				}
				this.Set_A()
			},
			Set_A:_=> {
				const _G_A=þ._ITM;
				for(const _A in _G_A) {
					plyr._A[_A]= _G_A[_A]
				}
			},
			IncTtlDmg:v=> {
				_P[pId]._B[1]+=v //
			},
			DecTtlDmg:v=> {
				_P[pId]._B[1]-=v //
			},
		}
	return methods
}


clogtEnd('TD2')