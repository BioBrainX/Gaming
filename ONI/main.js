function compare(a, b) {}

const get = {
	Building: function (b) {
		const building = db[b],
			mass = 'g/s',
			power = 'W/s'
		building.Ratio ??= {}
		return {
			Ratio: {
				IO: function () {
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
					clog(Total)
					return (
						building.Ratio.IO ||
						(Total.io_ratio = building.Ratio.IO =
							Total.produce[mass] / Total.consume[mass])
					)
				},
				elements: function (a, b) {
					const a2b = `${a} → ${b}`,
						el = {
							consume: building.consume[a],
							produce: building.produce[b],
						}

					if (!building.Ratio[a2b] && el.consume && el.produce)
						building.Ratio[a2b] = el.produce[mass] / el.consume[mass]
					clog(building.Ratio[a2b])
					return this
				},
				Power: function (el) {
					const a2b = `${el} → ${power}`

					if (!building.Ratio[a2b] && building.consume[el] && building.produce[power])
						building.Ratio[a2b] = building.produce[power] / building.consume[el][mass]
					clog(building.Ratio[a2b])
					return this
				},
			},
		}
	},
}
