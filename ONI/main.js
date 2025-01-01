clogt('ONImain')

function compare(a, b) {}

function Calc(t) {
	const target = db[t],
		mass = 'g/s',
		power = 'W/s',
		heat = 'DTU/s'
	target.Ratio ??= {}
	const þ = {
		Get: {
			el_data: function (io, el) {
				const io_data = target[io][el]
				return io_data[mass] ?? target[io][power] ?? target[io][heat] ?? 0
			},
		},
		Ratio: {
			IO: function () {
				const Total = { consume: { [mass]: 0 }, produce: { [mass]: 0 } }
				let io = 'consume'
				for (const elConsume in target[io]) {
					// clog(elConsume, 'consume')
					const io_data = target[io][elConsume]
					if (io_data[mass]) {
						Total[io][mass] += Total[io][elConsume] = io_data[mass]
						for (const elProduce in target.produce) {
							if (elProduce == power) this.Power.out(elConsume)
							if (elProduce == heat) this.Heat.out(elConsume)
							else this.elements(elConsume, elProduce)
						}
					} else if (elConsume == power) {
						Total[io][power] += target[io][power]
						for (const elProduce in target.produce) {
							// clog(elProduce, 'produce')
							if (elProduce == heat) this.Power.toHeat(elConsume)
							else this.Power.in(elProduce)
						}
					} else if (elConsume == heat) {
						Total[io][heat] += target[io][heat]
						for (const elProduce in target.produce) {
							// clog(elProduce, 'produce')
							this.Heat.in(elProduce)
						}
					}
				}
				io = 'produce'
				for (const elProduce in target[io]) {
					const io_data = target[io][elProduce]
					if (io_data[mass]) Total[io][mass] += Total[io][elProduce] = io_data[mass]
				}
				return (target.Ratio.IO ??= Total.produce[mass] / Total.consume[mass])
			},
			elements: function (a, b) {
				const a2b = `${a} → ${b}`,
					el = {
						consume: target.consume[a],
						produce: target.produce[b],
					}

				if (!target.Ratio[a2b]) {
					// && el.consume && el.produce)
					target.Ratio[a2b] = el.produce[mass] / el.consume[mass]
					db[b].source[a][t] = { Ratio: target.Ratio[a2b] }
				}
				// clog(target.Ratio[a2b])

				return target.Ratio[a2b] // this
			},
			Power: {
				in: function (el) {
					const a2b = `${power} → ${el}`

					if (!target.Ratio[a2b]) {
						// && target.consume[power] && target.produce[el])
						target.Ratio[a2b] = target.produce[el][mass] / target.consume[power]
						db[el].source[power][t] = { Ratio: target.Ratio[a2b] }
					}
					// clog(el, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
				out: function (el) {
					const a2b = `${el} → ${power}`

					if (!target.Ratio[a2b]) {
						// && target.consume[el] && target.produce[power])
						target.Ratio[a2b] = target.produce[power] / target.consume[el][mass]
						db[power].source[el][t] = { Ratio: target.Ratio[a2b] }
					}
					// clog(el, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
				toHeat: function () {
					const a2b = `${power} → ${heat}`

					if (!target.Ratio[a2b])
						// && target.consume[power] && target.produce[heat])
						target.Ratio[a2b] = target.produce[heat] / target.consume[power]
					// clog(a2b, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
			},
			Heat: {
				in: function (el) {
					const a2b = `${heat} → ${el}`

					if (!target.Ratio[a2b])
						// && target.consume[heat] && target.produce[el])
						target.Ratio[a2b] = target.produce[el][mass] / target.consume[heat]
					// clog(el, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
				out: function (el) {
					const a2b = `${el} → ${heat}`

					if (!target.Ratio[a2b])
						// && target.consume[el] && target.produce[heat])
						target.Ratio[a2b] = target.produce[heat] / target.consume[el][mass]
					// clog(el, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
			},
		},
	}
	return þ
}

;(function () {
	for (const category in db.Elements)
		for (const el in db.Elements[category])
			db.Elements[el] = initEl(db.Elements[category], el, category)
	for (const category of ['Foods', 'Compostable']) {
		const elmts = [...db[category]]
		db[category] = {}
		for (const el of elmts) db[category][el] = initEl(elmts, el, category)
	}

	function initEl(source, el, category) {
		db[el] ? (source[el] = db[el]) : (db[el] = source[el])
		is(db[el]).obj()
			? db[el].category?.push(category) ?? (db[el].category = [category])
			: (db[el] = { category: [category] })
		return db[el]
	}

	for (const category in db.Buildings) xtractIOP(db.Buildings[category], category)
	for (const category of ['Creatures', 'Plants']) xtractIOP(db[category], category)

	function xtractIOP(data, category) {
		for (const name in data) {
			const i_o_p = data[name]
			db[name] = i_o_p
			db[name].category?.push(category) ?? (db[name].category = [category])
			for (const iop in i_o_p) {
				if (iop == 'category') continue
				//consume,produce,properties
				const Elmts = i_o_p[iop]
				if (is(Elmts).obj())
					for (const el in Elmts) {
						const val = Elmts[el],
							iopr = iop + (iop.match(/e$/) ? 'r' : '')

						if (iop == 'consume')
							for (const el_P in i_o_p.produce) {
								db[el_P] ??= { source: { [el]: { [name]: {} } } }
								db[el_P].source ??= { [el]: { [name]: {} } }
								db[el_P].source[el] ??= { [name]: {} }
							}

						const els = el.match(/,/)
							? el.split(/\s*,\s*/)
							: el.match(/^Compostable$/)
							? Object.keys(db[el])
							: []
						if (els.length) for (const e of els) setIOP(e)
						else setIOP(el)

						function setIOP(el) {
							db[el] ??= { [iopr]: {} }
							db[el][iopr] ??= {}

							if (is(val).bool()) {
								db[el][iopr][val] ??= []
								db[el][iopr][val].push(name)
							} else {
								db[el][iopr][name] = val
								// set mass per sec from mass per Cycle
								if (val['g/C'])
									db[el][iopr][name]['g/s'] = val['g/C'] / ttlSecPerCycle
								else if (val['kcal/C'])
									db[el][iopr][name]['g/s'] =
										val['kcal/C'] / foodPrMass / ttlSecPerCycle
							}
						}
					}
			}
			Calc(name).Ratio.IO()
		}
	}
})()

clog(db)

clogtEnd('ONImain')
