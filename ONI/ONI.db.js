const ttlSecPerCycle = 600,
	db = {
		Elements: {
			Gas: [`O2`, `CO2`, `H2`, `Polluted O2`, `Cl2`],
			Liquid: [`H2O`, `Polluted H2O`],
			Solid: [
				`Algae`,
				`Coal`,
				`Cu`,
				`Fe`,
				`Fe2O3`,
				`NaCl`,
				`Dirt`,
				`Sand`,
				`Clay`,
				`Polluted Dirt`,
			],
		},
		Creatures: {
			Dupe: {
				consume: {
					O2: { [`g/s`]: 100 },
					[`kcal/C`]: 1000,
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
					H2O: { [`g/C`]: 19000 },
					Dirt: { [`g/C`]: 4000 },
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
					capacity: 20 * 10e6,
					properties: {
						floodable: true,
					},
				},
				[`Liquid Reservoir`]: {
					capacity: 5 * 10e6,
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
							[`g/s`]: 500,
							[`°C`]: 30,
						},
						[`DTU/s`]: 1500,
					},
				},
				['Algae Terrarium']: {
					consume: {
						Algae: { [`g/s`]: 30 },
						H2O: { [`g/s`]: 300 },
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
						H2O: { [`g/s`]: 1000 },
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
						[`Polluted O2`]: { [`g/s`]: 100 },
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
						H2O: { [`g/s`]: 1000 },
						CO2: { [`g/s`]: 300 },
					},
					produce: {
						[`Polluted H2O`]: { [`g/s`]: 1000 },
						[`DTU/s`]: 1000,
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
							[`g/s`]: 400,
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
						Sand: { [`g/s`]: 1000 },
						[`Polluted H2O`]: { [`g/s`]: 5000 },
					},
					produce: {
						H2O: { [`g/s`]: 5000 },
						[`Polluted Dirt`]: { [`g/s`]: 200 },
						[`DTU/s`]: 4000,
					},
				},
			},
			Power: {
				['Coal Generator']: {
					consume: {
						Coal: { [`g/s`]: 1000 },
					},
					produce: {
						CO2: { [`g/s`]: 20 },
						[`W/s`]: 600,
						[`DTU/s`]: 9,
					},
					properties: {
						floodable: true,
						efficiency: 0.5,
					},
				},
				[`Manual Generator`]: {
					produce: {
						[`W/s`]: 400,
						[`DTU/s`]: 1000,
					},
					properties: {
						floodable: false,
					},
				},
			},
		},
	}

;(function () {
	for (const state in db.Elements)
		for (const el of [...db.Elements[state]]) {
			if (is(db.Elements[state]).arr()) db.Elements[state] = { [el]: { state } }
			else db.Elements[state][el] = { state }
			db[el] = db.Elements[el] = db.Elements[state][el]
		}
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
						if (!db[el]) db[el] = { [cppr]: { [name]: val } }
						else if (!db[el][cppr]) db[el][cppr] = { [name]: val }
						else db[el][cppr][name] = val
						// set mass per sec from mass per Cycle
						if (val['g/C']) db[el][cppr][name]['g/s'] = val['g/C'] / ttlSecPerCycle
					}
			}
		}
	}
})()

clog(db)
