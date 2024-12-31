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

				if (!target.Ratio[a2b])
					// && el.consume && el.produce)
					target.Ratio[a2b] = el.produce[mass] / el.consume[mass]
				// clog(target.Ratio[a2b])

				return target.Ratio[a2b] // this
			},
			Power: {
				in: function (el) {
					const a2b = `${power} → ${el}`

					if (!target.Ratio[a2b])
						// && target.consume[power] && target.produce[el])
						target.Ratio[a2b] = target.produce[el][mass] / target.consume[power]
					// clog(el, target.Ratio[a2b])

					return target.Ratio[a2b] // this
				},
				out: function (el) {
					const a2b = `${el} → ${power}`

					if (!target.Ratio[a2b])
						// && target.consume[el] && target.produce[power])
						target.Ratio[a2b] = target.produce[power] / target.consume[el][mass]
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

clogtEnd('ONImain')
