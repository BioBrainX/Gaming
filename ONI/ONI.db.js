const ttlSecPerCycle = 6e2,
	db = {
		Elements: [
			// States are @ room temp 18-24°C
			// Gas
			`CH4`,
			`Cl2`,
			`CO2`,
			`H2`,
			`O2`,
			`Polluted O2`,
			// Liquid
			`Ethanol`,
			`H2O`,
			`Petroleum`,
			`Polluted H2O`,
			// Solid
			`Algae`,
			`Clay`,
			`Coal`,
			`Cu`,
			`Dirt`,
			`Fe`,
			`Fe2O3`,
			`NaCl`,
			`Polluted Dirt`,
			`Sand`,
			`Wood`,
		],
		Creatures: {
			Dupe: {
				consume: {
					O2: { [`g/s`]: 1e2 },
					[`kcal/C`]: 1e3,
				},
				produce: {
					CO2: { [`g/s`]: 2 },
				},
			},
		},
		Plants: {
			['Bristle Blossom']: {
				require: { light: 1 },
				consume: {
					H2O: { [`g/s`]: 5 },
					CO2: { [`g/s`]: 0.2 },
				},
				produce: {
					['Bristle Berry']: {
						[`g/s`]: 1,
						[`°C`]: 30,
					},
				},
			},
			[`Oxyfern`]: {
				consume: {
					CO2: { [`g/s`]: 375 },
					H2O: { [`g/C`]: 19e3 },
					Dirt: { [`g/C`]: 4e3 },
				},
				produce: {
					O2: {
						[`g/C`]: 18780,
						[`°C`]: 30,
					},
				},
			},
		},
		Buildings: {
			Storages: {
				[`Storage Bin`]: {
					capacity: 20e6,
					properties: {
						floodable: true,
					},
				},
				[`Liquid Reservoir`]: {
					capacity: 5e6,
					properties: {
						floodable: true,
					},
				},
			},
			Oxygenators: {
				[`Oxygen Diffuser`]: {
					consume: {
						[`W/s`]: 120,
						Algae: { [`g/s`]: 550 },
					},
					produce: {
						O2: {
							[`g/s`]: 5e2,
							[`°C`]: 30,
						},
						[`DTU/s`]: 15e2,
					},
				},
				['Algae Terrarium']: {
					consume: {
						Algae: { [`g/s`]: 30 },
						H2O: { [`g/s`]: 3e2 },
						CO2: { [`g/s`]: 0.3333 },
					},
					produce: {
						O2: {
							[`g/s`]: 40,
							[`°C`]: 30,
						},
						['Polluted H2O']: {
							[`g/s`]: 290.3333,
							[`°C`]: 30,
						},
					},
					properties: {
						floodable: true,
						efficiency: {
							val: 0.1,
							condition: {
								light: 1, //lumen
							},
						},
					},
				},
				Electrolyzer: {
					consume: {
						[`W/s`]: 120,
						H2O: { [`g/s`]: 1e3 },
					},
					produce: {
						O2: {
							[`g/s`]: 888,
							[`°C`]: 70,
						},
						H2: {
							[`g/s`]: 112,
							[`°C`]: 70,
						},
						[`DTU/s`]: 1250,
					},
				},
				Deodorizer: {
					consume: {
						[`W/s`]: 5,
						Sand: { [`g/s`]: 133.33 },
						[`Polluted O2`]: { [`g/s`]: 1e2 },
					},
					produce: {
						Clay: { [`g/s`]: 143.33 },
						O2: { [`g/s`]: 90 },
						[`DTU/s`]: 625,
					},
				},
				[`Carbon Skimmer`]: {
					consume: {
						[`W/s`]: 120,
						H2O: { [`g/s`]: 1e3 },
						CO2: { [`g/s`]: 3e2 },
					},
					produce: {
						[`Polluted H2O`]: { [`g/s`]: 1e3 },
						[`DTU/s`]: 1e3,
					},
				},
				[`Rust Deoxidizer`]: {
					consume: {
						[`W/s`]: 60,
						Fe2O3: { [`g/s`]: 750 },
						NaCl: { [`g/s`]: 250 },
					},
					produce: {
						O2: {
							[`g/s`]: 570,
							[`°C`]: 75,
						},
						Fe: {
							[`g/s`]: 4e2,
							[`°C`]: 75,
						},
						Cl2: {
							[`g/s`]: 30,
							[`°C`]: 75,
						},
						[`DTU/s`]: 1130,
					},
				},
			},
			Refinements: {
				[`Water Sieve`]: {
					consume: {
						Sand: { [`g/s`]: 1e3 },
						[`Polluted H2O`]: { [`g/s`]: 5e3 },
					},
					produce: {
						H2O: { [`g/s`]: 5e3 },
						[`Polluted Dirt`]: { [`g/s`]: 200 },
						[`DTU/s`]: 4e3,
					},
				},
			},
			Power: {
				[`Manual Generator`]: {
					produce: {
						[`W/s`]: 4e2,
						[`DTU/s`]: 1e3,
					},
					properties: {
						floodable: false,
					},
				},
				[`Wood Burner`]: {
					consume: {
						Wood: { [`g/s`]: 12e2 },
					},
					produce: {
						[`W/s`]: 3e2,
						[`DTU/s`]: 9e3,
					},
					properties: {
						floodable: false,
					},
				},
				['Coal Generator']: {
					consume: {
						Coal: { [`g/s`]: 1e3 },
					},
					produce: {
						CO2: { [`g/s`]: 20 },
						[`W/s`]: 6e2,
						[`DTU/s`]: 9,
					},
					properties: {
						floodable: true,
						efficiency: 0.5,
					},
				},
				[`Hydrogen Generator`]: {
					consume: {
						H2: { [`g/s`]: 1e2 },
					},
					produce: {
						[`W/s`]: 8e2,
						[`DTU/s`]: 4e3,
					},
					properties: {
						floodable: false,
					},
				},
				['Natural Gas Generator']: {
					consume: {
						CH4: { [`g/s`]: 90 },
					},
					produce: {
						CO2: { [`g/s`]: 22.5, [`°C`]: 110 },
						['Polluted H2O']: { [`g/s`]: 67.5, [`°C`]: 40 },
						[`W/s`]: 8e2,
						[`DTU/s`]: 1e4,
					},
					properties: {
						floodable: false,
					},
				},
				['Petroleum Generator']: {
					consume: {
						['Petroleum, Ethanol']: { [`g/s`]: 2e2 },
					},
					produce: {
						CO2: { [`g/s`]: 5e2, [`°C`]: 110 },
						['Polluted H2O']: { [`g/s`]: 750, [`°C`]: 40 },
						[`W/s`]: 2e3,
						[`DTU/s`]: 2e4,
					},
					properties: {
						floodable: false,
					},
				},
				[`Steam Turbine`]: {
					consume: {
						Steam: { [`g/s`]: 2e2, [`°C`]: 125 },
					},
					produce: {
						[`W/s`]: 8e2,
						[`DTU/s`]: 1e4,
					},
					properties: {
						floodable: false,
					},
				},
				['Solar Panel']: {
					consume: {
						light: 7 * 5e4, // 7 tiles * 5e4 lumens per tile
					},
					produce: {
						[`W/s`]: 380,
					},
					properties: {
						floodable: false,
					},
				},
			},
		},
	}

;(function () {
	const elmts = [...db.Elements]
	db.Elements = {}
	for (const el of elmts) db[el] = db.Elements[el] = {}
	for (const category in db.Buildings) xtractIOP(db.Buildings[category], category)
	for (const category of ['Creatures', 'Plants']) xtractIOP(db[category], category)

	function xtractIOP(data, category) {
		for (const name in data) {
			const i_o_p = data[name]
			db[name] = i_o_p
			db[name].category = category
			for (const cpp in i_o_p) {
				//consume,produce,properties
				const Elmts = i_o_p[cpp]
				if (is(Elmts).obj())
					for (const el in Elmts) {
						const val = Elmts[el],
							cppr = cpp + (cpp.match(/e$/) ? 'r' : '')

						if (el.match(/,/)) for (const e of el.split(/\s*,\s*/)) setIOP(e)
						else setIOP(el)

						function setIOP(el) {
							if (!db[el]) db[el] = { [cppr]: {} }
							else if (!db[el][cppr]) db[el][cppr] = {}

							if (is(val).bool()) {
								if (!db[el][cppr][val]) db[el][cppr][val] = []
								db[el][cppr][val].push(name)
							} else {
								db[el][cppr][name] = val
								// set mass per sec from mass per Cycle
								if (val['g/C'])
									db[el][cppr][name]['g/s'] = val['g/C'] / ttlSecPerCycle
							}
						}
					}
			}
		}
	}
})()

clog(db)
