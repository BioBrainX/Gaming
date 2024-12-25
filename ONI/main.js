function compare(a, b) {}

const get = {
	Building: function (b) {
		const building = db[b]
		return {
			io_ratio: function() {
				const Total = {}
				const io = ['consume', 'produce']
				for (const i of io) {
					const io_item = building[i]
					Total[i] = { [`g/s`]: 0 }
					for (const item in io_item) {
						const io_data = io_item[item]
						if (elements.includes(item)) {
							Total[i][`g/s`] += io_data[`g/s`]
							Total[i][item] = io_data[`g/s`]
						}
					}
				}
				get.Ratio(b).AlgaeToO2() //.tst()
				return (Total.io_ratio = building.io_ratio =
					Total.consume[`g/s`] / Total.produce[`g/s`])
			},
		}
	},

	Ratio: function (b) {
		const building = db[b]
		return {
			AlgaeToO2: function () {
				if (building.ratio?.[`Algae → O2`]) return building.ratio[`Algae → O2`]
				if (!building.consume.Algae || !building.produce.O2) return
				const Algae = building.consume.Algae[`g/s`]
				const O2 = building.produce.O2[`g/s`]
				if (!building.ratio) building.ratio = {}
				building.ratio[`Algae → O2`] = Algae / O2
				return this
			},
			tst: function () {
				clog('tst')
				return this
			},
		}
	},
}
