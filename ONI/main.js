clogt('ONImain')

function Trace(a, b) {
	const a2b = `${a} → ${b}`,
		traceAccul = { path: [] },
		pathTraced = []

	if (db[a].trace?.[a2b]) return db[a].trace[a2b]
	if (PathingProduction(a, b)) return Ûpð(db[a], { trace: { [a2b]: traceAccul } })

	function PathingProduction(a, b) {
		if (!db[a].category) return false
		clog(a, db[a].category)
		if (are(...db[a].category).any.eq('Buildings', 'Plants', 'Creatures')) {
			for (const elProd in db[a].produce) {
				clog(`produce: ${elProd}`)
				if (elProd == b)
					Ûpð(traceAccul, {
						path: [a],
						consume: db[a].consume,
					})
				else {
					traceAccul.path.push(elProd)
					if (!PathingProduction(elProd, b)) traceAccul.path.pop()
				}
			}
		} else if (are(...db[a].category).any.eq('Elements', 'Foods')) {
			for (const consumer in db[a].consumer) {
				clog(`consumer: ${consumer}`)
				if (!traceAccul.path.includes(consumer)) {
					traceAccul.path.push(consumer)
					if (!PathingProduction(consumer, b)) traceAccul.path.pop()
				}
			}
		}

		return is(traceAccul).nøl() ? traceAccul : false
	}
}

;(function () {
	for (const mainCat of ['Elements', 'Buildings'])
		for (const category in db[mainCat])
			for (const el in db[mainCat][category])
				initEl(db[mainCat][category], el, [mainCat, category]) // db[mainCat][el] =
	for (const category of ['Creatures', 'Foods', 'Plants'])
		for (const el in db[category]) initEl(db[category], el, [category])
	for (const category of ['Compostable']) {
		const elmts = [...db[category]]
		db[category] = {}
		for (const el of elmts)
			db[category][el] = el.match(/Foods/) ? db.Foods : initEl(elmts, el, [category])
	}

	function initEl(source, el, category) {
		db[el] ? (source[el] = db[el]) : (db[el] = source[el])
		return Ûpð(db[el], { category: [...category] })
	}

	for (const category in db.Buildings) xtractIOP(db.Buildings[category])
	for (const category of ['Creatures', 'Plants']) xtractIOP(db[category])

	function xtractIOP(data) {
		for (const name in data) {
			const i_o_p = data[name]
			for (const iop in i_o_p) {
				if (iop == 'category') continue
				//consume,produce,properties
				const Elmts = i_o_p[iop]
				if (is(Elmts).obj())
					for (const el in Elmts) {
						const val = Elmts[el],
							iopr = iop + (iop.match(/e$/) ? 'r' : ''),
							els = Get(el).els

						if (iop == 'consume')
							for (const el_P in i_o_p.produce)
								for (const el of els)
									Ûpð(db, {
										[el_P]: { source: { [el]: { [name]: {} } } },
										[el]: { transform: { [el_P]: { [name]: {} } } },
									})

						for (const el of els) setIOP(el)

						function setIOP(el) {
							db[el] ??= { [iopr]: {} }
							db[el][iopr] ??= {}

							if (is(val).bool()) {
								db[el][iopr][val] ??= []
								db[el][iopr][val].push(name)
							} else if (el.match(/DLC/)) {
								Ûpð(db[el], { [val]: [name] })
							} else {
								db[el][iopr][name] = val
								// set mass per sec from mass per Cycle
								if (val['g/C'])
									db[el][iopr][name]['g/s'] = val['g/C'] / ttlSecPerCycle
								else if (val['kcal/C'])
									db[el][iopr][name]['g/s'] =
										val['kcal/C'] / (db[el]['kcal/g'] || 16e2) / ttlSecPerCycle
							}
						}
					}
			}
			Calc(name).Ratio.IO()
		}
	}
})()

// function compare(a, b) {}

function Calc(t) {
	const target = db[t],
		mass = 'g/s',
		power = 'W/s',
		heat = 'DTU/s'
	target.ratio ??= {}
	const þ = {
		// Get: {
		// 	el_data: function (io, el) {
		// 		const io_data = target[io][el]
		// 		return io_data[mass] ?? target[io][power] ?? target[io][heat] ?? 0
		// 	},
		// },
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
						// } else if (elConsume == heat) {
						// 	Total[io][heat] += target[io][heat]
						// 	for (const elProduce in target.produce) {
						// 		// clog(elProduce, 'produce')
						// 		this.Heat.in(elProduce)
						// 	}
					}
				}
				io = 'produce'
				for (const elProduce in target[io]) {
					const io_data = target[io][elProduce]
					if (io_data[mass]) Total[io][mass] += Total[io][elProduce] = io_data[mass]
				}
				return (
					Total.produce[mass] &&
					Total.consume[mass] &&
					(target.ratio.IO ??= Total.produce[mass] / Total.consume[mass])
				)
			},
			elements: function (a, b) {
				const a2b = `${a} → ${b}`,
					el = {
						consume: target.consume[a],
						produce: target.produce[b],
					}

				// clog(a2b, t, db)
				if (!target.ratio[a2b]) {
					// && el.consume && el.produce)
					target.ratio[a2b] = el.produce[mass] / el.consume[mass]
					for (const el of Get(a).els)
						db[b].source[el][t] = db[el].transform[b][t] = target.ratio[a2b]
				}
				// clog(target.ratio[a2b])

				return target.ratio[a2b] // this
			},
			Power: {
				in: function (el) {
					const a2b = `${power} → ${el}`

					if (!target.ratio[a2b]) {
						// && target.consume[power] && target.produce[el])
						target.ratio[a2b] = target.produce[el][mass] / target.consume[power]
						db[el].source[power][t] = db[power].transform[el][t] = target.ratio[a2b]
					}
					// clog(el, target.ratio[a2b])

					return target.ratio[a2b] // this
				},
				out: function (a) {
					const a2b = `${a} → ${power}`

					if (!target.ratio[a2b]) {
						// && target.consume[el] && target.produce[power])
						target.ratio[a2b] = target.produce[power] / target.consume[a][mass]
						for (const el of Get(a).els)
							db[power].source[el][t] = db[el].transform[power][t] = target.ratio[a2b]
					}
					// clog(el, target.ratio[a2b])

					return target.ratio[a2b] // this
				},
				toHeat: function () {
					const a2b = `${power} → ${heat}`

					if (!target.ratio[a2b]) {
						// && target.consume[power] && target.produce[heat])
						target.ratio[a2b] = target.produce[heat] / target.consume[power]
						// db[power].source[heat][t] = db[heat].transform[power][t] = target.ratio[a2b]
						Ûpð(
							db[power],
							{
								source: { [heat]: { [t]: target.ratio[a2b] } },
							}
							// [heat]: { transform: { [power]: { [t]: target.ratio[a2b] } } },
						)
					}
					// clog(a2b, target.ratio[a2b])

					return target.ratio[a2b] // this
				},
			},
			Heat: {
				// in: function (a) {
				// 	const a2b = `${heat} → ${a}`

				// 	if (!target.ratio[a2b]) {
				// 		// && target.consume[heat] && target.produce[el])
				// 		target.ratio[a2b] = target.produce[a][mass] / target.consume[heat]
				// 		for (const el of Get(a).els)
				// 			db[el].source[heat][t] = db[heat].transform[el][t] = target.ratio[a2b]
				// 	}

				// 	// clog(el, target.ratio[a2b])

				// 	return target.ratio[a2b] // this
				// },
				out: function (a) {
					const a2b = `${a} → ${heat}`

					if (!target.ratio[a2b]) {
						// && target.consume[el] && target.produce[heat])
						target.ratio[a2b] = target.produce[heat] / target.consume[a][mass]
						for (const el of Get(a).els)
							db[heat].source[el][t] = db[el].transform[heat][t] = target.ratio[a2b]
					}
					// clog(el, target.ratio[a2b])

					return target.ratio[a2b] // this
				},
			},
		},
	}
	return þ
}

function Get(x) {
	return {
		els: (function () {
			const db_link = {
				Compostable: db.Compostable,
				Foods: db.Foods,
				Gas: db.Elements.Gas,
				Liquid: db.Elements.Liquid,
				Solid: db.Elements.Solid,
			}
			return x?.match(/,/) ? x.split(/\s*,\s*/) : db_link[x] ? Object.keys(db_link[x]) : [x]
		})(),
	}
}

// localStorage.setItem('ver','0a.00.01')

clog(db)

clogtEnd('ONImain')
