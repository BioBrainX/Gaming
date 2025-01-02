clogt('ONIdb')

const ttlSecPerCycle = 6e2,
	mass = 'g',
	massPrSec = `${mass}/s`,
	massPrCyc = `${mass}/C`,
	food = `kcal`,
	foodPrMass = 16e2,
	power = 'W/s',
	db = {
		Elements: {
			// States are @ comfort temp -89..71.85°C
			Gas: {
				CH4: {},
				Cl2: {},
				CO2: {},
				H2: {},
				O2: {},
				['Polluted O2']: {},
			},
			Liquid: {
				Ethanol: {},
				H2O: {},
				Petroleum: {},
				['Polluted H2O']: {},
			},
			Solid: {
				Algae: {},
				Clay: {},
				Coal: {},
				Cu: {},
				Dirt: {},
				Fe: {},
				Fe2O3: {},
				NaCl: {},
				Oxylite: {
					emit: {
						O2: { ratio: 0.5 },
					},
				},
				Slime: {
					emit: {
						['Polluted O2']: { ratio: 18 / 37 },
					},
				},
				['Polluted Dirt']: {
					emit: {
						['Polluted O2']: ø, //{ ratio: 18 / 37 },
					},
				},
				Sand: {},
				Wood: {},
			},
		},
		Compostable: ['Egg Shell', 'Foods', 'Polluted Dirt', 'Rot Pile', 'Seeds'],
		Foods: ['Bristle Berry', 'Pikeapple'],
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
			Puft: {
				consume: {
					[`Polluted O2`]: { [`g/C`]: 5e4 },
				},
				produce: {
					Slime: { [`g/C`]: 475e2 },
				},
			},
			Oakshell: {
				consume: {
					['Polluted Dirt, Rot Pile, Slime']: { [`g/C`]: 7e4 },
				},
				produce: {
					Sand: { [`g/C`]: 175e2 }, // 25% of mass consumed
					['Oakshell Molt']: { [`g/C`]: 1e5 },
				},
			},
			Flox: {
				consume: {
					[`Pikeapple, Bristle Berry`]: { [`kcal/C`]: 160 },
				},
				produce: {
					Wood: { [`g/C`]: 6e4 },
				},
			},
		},
		Plants: {
			['Bristle Blossom']: {
				require: { lux: 200 },
				consume: {
					H2O: { [`g/C`]: 2e4 },
				},
				produce: {
					['Bristle Berry']: { [`kcal/C`]: 267 },
				},
			},
			[`Oxyfern`]: {
				consume: {
					CO2: { [`g/s`]: 375 },
					H2O: { [`g/C`]: 19e3 },
					Dirt: { [`g/C`]: 4e3 },
				},
				produce: {
					O2: { [`g/C`]: 18780, [`°C`]: 30 },
				},
			},
			[`Arbor Tree`]: {
				consume: {
					['Polluted H2O']: { [`g/C`]: 70 },
					Dirt: { [`g/C`]: 1e4 },
				},
				produce: {
					Wood: { [`g/s`]: (5 * 3e2) / 4.5 },
				},
			},
			Wheezewort: {
				consume: {
					Phosporite: { [`g/C`]: 4e3 },
					Gas: { [`g/s`]: 1e3 },
				},
				produce: {
					[`DTU/s`]: 1e3,
					Gas: { [`g/s`]: 1e3, [`°C`]: 5 },
				},
				properties: {
					floodable: false,
					height: 2,
					widht: 1,
					decor: 15,
					range: 2,
				},
			},
			// [`Mushroom`]: {
			// 	consume: {
			// 		H2O: { [`g/s`]: 1e3 },
			// 		CO2: { [`g/s`]: 1e3 },
			// 	},
			// 	produce: {
			// 		[`Mush Bar`]: { [`g/s`]: 1e3, [`°C`]: 30 },
			// 	},
			// },
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
						O2: { [`g/s`]: 5e2, [`°C`]: 30 },
						[`DTU/s`]: 15e2,
					},
				},
				['Algae Terrarium']: {
					consume: {
						Algae: { [`g/s`]: 30 },
						H2O: { [`g/s`]: 3e2 },
						CO2: { [`g/s`]: 1 / 3 },
					},
					produce: {
						O2: { [`g/s`]: 40, [`°C`]: 30 },
						['Polluted H2O']: { [`g/s`]: 871 / 3, [`°C`]: 30 },
					},
					properties: {
						floodable: true,
						efficiency: {
							val: 0.1,
							condition: {
								lux: 1, //light
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
						O2: { [`g/s`]: 888, [`°C`]: 70 },
						H2: { [`g/s`]: 112, [`°C`]: 70 },
						[`DTU/s`]: 1250,
					},
				},
				Deodorizer: {
					consume: {
						[`W/s`]: 5,
						Sand: { [`g/s`]: 4e2 / 3 },
						[`Polluted O2`]: { [`g/s`]: 1e2 },
					},
					produce: {
						Clay: { [`g/s`]: 430 / 3 },
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
						O2: { [`g/s`]: 570, [`°C`]: 75 },
						Fe: { [`g/s`]: 4e2, [`°C`]: 75 },
						Cl2: { [`g/s`]: 30, [`°C`]: 75 },
						[`DTU/s`]: 1130,
					},
				},
			},
			Refinements: {
				Compost: {
					consume: {
						Compostable: { [`g/s`]: 1e2 },
					},
					produce: {
						Dirt: { [`g/s`]: 1e2, [`°C`]: 75 },
						[`DTU/s`]: 1125,
					},
					properties: {
						floodable: false,
					},
				},
				Outhouse: {
					consume: {
						Dirt: { [`g/s`]: 13e3 },
					},
					produce: {
						[`Polluted Dirt`]: { [`g/s`]: 197e2, [`°C`]: 37 },
						[`DTU/s`]: 250,
						Germ: 2e5,
					},
					properties: {
						floodable: false,
					},
				},
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
				[`Rock Crusher`]: {
					consume: {
						[`W/s`]: 120 * 2,
					},
					produce: {
						[`DTU/s`]: 16e3,
					},
					// recipes:{

					// },
				},
				Lavatory: {
					consume: {
						H2O: { [`g/s`]: 5e3 },
					},
					produce: {
						[`Polluted H2O`]: { [`g/s`]: 117e2 },
						Germ: 105e3,
						[`DTU/s`]: 250,
					},
				},
				[`Algae Distiller`]: {
					consume: {
						Slime: { [`g/s`]: 6e2 },
						[`W/s`]: 120,
					},
					produce: {
						Algae: { [`g/s`]: 2e2 },
						[`Polluted H2O`]: { [`g/s`]: 4e2 },
						[`DTU/s`]: 15e2,
					},
				},
				[`Ethanol Distiller`]: {
					consume: {
						Wood: { [`g/s`]: 1e3 },
						[`W/s`]: 120 * 2,
					},
					produce: {
						Ethanol: { [`g/s`]: 5e2, [`°C`]: 73.4 },
						[`Polluted Dirt`]: { [`g/s`]: 1e3 / 3, [`°C`]: 93.4 },
						CO2: { [`g/s`]: 5e2 / 3, [`°C`]: 93.4 },
						[`DTU/s`]: 45e2,
					},
					properties: {
						floodable: false,
					},
				},
				[`Sublimation Station`]: {
					consume: {
						[`Polluted Dirt`]: { [`g/s`]: 1e3 },
						[`W/s`]: 120 / 2,
					},
					produce: {
						[`Polluted O2`]: { [`g/s`]: 660 },
					},
					required: {
						DLC: 'Spaced Out!',
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
						CO2: { [`g/s`]: 20, [`°C`]: 110 },
						[`W/s`]: 6e2,
						[`DTU/s`]: 9,
					},
					properties: {
						floodable: false,
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
						Steam: { [`g/s`]: 2e3, [`°C`]: 125 },
					},
					produce: {
						H2O: { [`g/s`]: 2e3, [`°C`]: 95 },
						[`W/s`]: 8e2,
						[`DTU/s`]: 1e4,
					},
					properties: {
						floodable: false,
					},
				},
				['Solar Panel']: {
					consume: {
						lux: 7 * 5e4, // 7 tiles * 5e4 lumens per tile
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

clogtEnd('ONIdb')
