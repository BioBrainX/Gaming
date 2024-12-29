clogt('ONImain')

function compare(a, b) {}

function Calc(t) {
	const target = db[t],
		mass = 'g/s',
		power = 'W/s'
	target.Ratio ??= {}
	return {
		Ratio: {
			IO: function () {
				const Total = {}
				for (const io of ['consume', 'produce']) {
					const io_elmts = target[io]
					Total[io] = { [mass]: 0 }
					for (const el in io_elmts) {
						const io_data = io_elmts[el]
						if (db.Elements[el]) {
							Total[io][mass] += io_data[mass]
							Total[io][el] = io_data[mass]
						}
					}
				}
				// this.elements('Algae', 'O2')
				clog(Total)
				return (
					target.Ratio.IO ||
					(Total.io_ratio = target.Ratio.IO = Total.produce[mass] / Total.consume[mass])
				)
			},
			elements: function (a, b) {
				const a2b = `${a} → ${b}`,
					el = {
						consume: target.consume[a],
						produce: target.produce[b],
					}

				if (!target.Ratio[a2b] && el.consume && el.produce)
					target.Ratio[a2b] = el.produce[mass] / el.consume[mass]
				clog(target.Ratio[a2b])

				return this
			},
			Power: function (el) {
				const a2b = `${el} → ${power}`

				if (!target.Ratio[a2b] && target.consume[el] && target.produce[power])
					target.Ratio[a2b] = target.produce[power] / target.consume[el][mass]
				clog(target.Ratio[a2b])

				return this
			},
		},
	}
}

clogtEnd('ONImain')
