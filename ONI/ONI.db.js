const db={},

buildings = {
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
	Oxygen: {
		[`Oxygen Diffuser`]: {
			consume: {
				power: 120,
				Algae: {
					mass: 550, // g/s
				},
			},
			produce: {
				O2: {
					mass: 500,
					temp: 30,
				},
			},
		},
		['Algae Terrarium']: {
			consume: {
				power: 120, // W/s
				Algae: {
					mass: 30,
				},
				H2O: {
					mass: 300,
				},
				CO2: {
					mass: 0.3333,
				},
			},
			produce: {
				O2: {
					mass: 40,
					temp: 30,
				},
				['Polluted H2O']: {
					mass: 290.33,
					temp: 30,
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
				power: 120,
				H2O: {
					mass: 1000,
				},
			},
			produce: {
				O2: {
					mass: 888,
					temp: 70,
				},
				H2: {
					mass: 112,
					temp: 70,
				},
			},
		},
	},
	Plants: {
		['Bristle Blossom']: {
			consume: {
				power: 10,
				H2O: {
					mass: 5,
				},
				CO2: {
					mass: 0.2,
				},
			},
			produce: {
				['Bristle Berry']: {
					mass: 1,
					temp: 30,
				},
			},
		},
		[`Oxyfern`]: {
			consume: {
				CO2: {
					mass: 0.625,
				},
				H2O: {
					mass: 19000,
					per: 'cycle',
				},
				Dirt: {
					mass: 4000,
					per: 'cycle',
				},
			},
			produce: {
				O2: {
					mass: 18780,
					per: 'cycle',
					temp: 30,
				},
			},
		},
	},
	Power: {
		['Coal Generator']: {
			consume: {
				Coal: {
					mass: 1000,
				},
			},
			produce: {
				CO2: {
					mass: 20,
				},
				power: 600,
				heat: 9,
			},
			properties: {
				floodable: true,
				efficiency: 0.5,
			},
		},
	},
}

for (const [category, items] of Object.entries(buildings)) {
	for (const [name, item] of Object.entries(items)) {
		db[name] = {
			category,
			...item,
		}
	}
}