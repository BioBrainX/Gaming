function compare(a, b) {}

const get = {
	Building: function (b) {
		const building = db[b],
			mass = 'g/s'
		return {
			Ratio: {
				elements: function (a, b) {
					const a2b = `${a} → ${b}`,
						el = { consume: building.consume[a], produce: building.produce[b] }

					if (building.ratio?.[a2b]) return building.ratio[a2b]
					if (!building.consume[a] || !building.produce[b]) return
					if (!building.ratio) building.ratio = {}
					building.ratio[a2b] = el.produce[mass] / el.consume[mass]
					return this
				},
				IO: function () {
					// clog(this,'IO')
					const Total = {}
					for (const io of ['consume', 'produce']) {
						const io_elmts = building[io]
						Total[io] = { [mass]: 0 }
						for (const el in io_elmts) {
							const io_data = io_elmts[el]
							if (db.Elements[el]) {
								Total[io][mass] += io_data[mass]
								Total[io][el] = io_data[mass]
							}
						}
					}
					this.elements('Algae', 'O2')
					return (Total.io_ratio = building.io_ratio =
						Total.produce[mass] / Total.consume[mass])
				},
			},
		}
	},
}
