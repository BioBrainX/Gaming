clogtEnd('TDdb')
clogt('TD2')


function Player(pId=0) {
	const þ=TDdb,
		_ITM=þ._ITM,
		Plyr=þ.Players[pId],
		methods= {
		eqp:(itms={})=> {
			const p=þ.Players[player];
			for(const [slot,_GId] of itms) {
				p._G[slot]= _GId;
			}
			this.Set_A()
		},
		Set_A:_=> {
			const _G_A=þ._ITM;
			for(const _A in _G_A) {
				plyr._A[_A]= _G_A[_A]
			}
		},
	}
	return methods
}


clogtEnd('TD2')