const db = {},
	ttlSecPerCycle = 600,
	elements = [
		`Algae`,
		`Cl2`,
		`CO2`,
		`Coal`,
		`Cu`,
		`Dirt`,
		`Fe`,
		`Fe2O3`,
		`H2`,
		`NaCl`,
		`H2O`,
		`O2`,
		`Polluted H2O`,
		`Polluted O2`,
	],
	buildings = {
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
		Storage: {
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
		Oxygenator: {
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
						[`g/s`]: 290.33,
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
	}

for (const category in buildings) {
	const items = buildings[category]
	for (const name in items) {
		const item = items[name]
		db[name] = item
		db[name].category = category
		for (const c_p_p in item) {
			//consume,produce,properties
			const props = item[c_p_p]
			if (is(props).obj())
				for (const el in props) {
					const val = props[el]
					const cpp = c_p_p + (c_p_p.match(/e$/) ? 'r' : '')
					if (!db[el]) db[el] = { [cpp]: { [name]: val } }
					else if (!db[el][cpp]) db[el][cpp] = { [name]: val }
					else db[el][cpp][name] = val
					// set mass per sec from mass per Cycle
					if (val['g/C']) db[el][cpp][name]['g/s'] = val['g/C'] / ttlSecPerCycle
				}
		}
	}
}

clog(db)
