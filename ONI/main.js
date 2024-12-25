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
					building.ratio[a2b] = el.consume[mass] / el.produce[mass]
					return this
				},
				IO: function () {
					const Total = {}
					const io = ['consume', 'produce']
					for (const i of io) {
						const io_item = building[i]
						Total[i] = { [mass]: 0 }
						for (const item in io_item) {
							const io_data = io_item[item]
							if (elements.includes(item)) {
								Total[i][mass] += io_data[mass]
								Total[i][item] = io_data[mass]
							}
						}
					}
					this.elements('Algae', 'O2')
					return (Total.io_ratio = building.io_ratio =
						Total.consume[mass] / Total.produce[mass])
				},
			},
		}
	},
}
