clogt('ONIdb')

const sec = `s`,
	Cyc = `C`,
	ttlSecPerCycle = 6e2,
	mass = 'g',
	ttlMassPrUnit = 4e2,
	food = `kcal`,
	foodPrMass = `${food}/${mass}`,
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
				Steam: {},
			},
			Liquid: {
				['Crude Oil']: {},
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
				Ice: {},
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
		Heat: [`DTU/s`, `°C`],
		Combustible: ['Coal', 'Ethanol', 'Natural Gas', 'Petroleum'],
		Compostable: ['Egg Shell', 'Foods', 'Polluted Dirt', 'Rot Pile', 'Seeds'],
		Slippery: [
			'Brackwax',
			'Brine Ice',
			'Crude Oil',
			'Frozen Brackene',
			'Frozen Phyto Oil',
			'Gunk',
			'Ice',
			'Phyto Oil',
			'Polluted Ice',
			'Solid Gunk',
			'Tallow',
		],
		['Trans-State']: {
			// ['Liquid Element'] :{ [`°C`]: { ['Gas/Solid Element']:ratio } }
			Brine: {
				[102.75]: { Steam: 0.7, Salt: 0.3 },
				[-22.5]: { ['Brine Ice']: 1 },
			},
			H2O: {
				[99.35]: { Steam: 1 },
				[-0.65]: { Ice: 1 },
			},
			['Crude Oil']: {
				[399.85]: { Petroleum: 1 },
				[-40.15]: { ['Solid Crude Oil']: 1 },
			},
			Petroleum: {
				[538.85]: { ['Sour Gas']: 1 },
				[-57.15]: { ['Solid Petroleum']: 1 },
			},
			['Salt H2O']: {
				[99.69]: { Steam: 0.93, Salt: 0.07 },
				[-7.5]: { Ice: 0.77, Brine: 0.23 },
			},
		},
		Foods: {
			['Meal Lice']: { ['kcal/g']: 6e2 },
			['Bristle Berry']: { ['kcal/g']: 16e2 },
			Pikeapple: { ['kcal/g']: 8e2 },
			Meat: { ['kcal/g']: 16e2 },
		},
		Seeds: [],
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
			Drecko: {
				consume: {
					Mealwood: { [`growth/C`]: 0.25 },
				},
				produce: {
					Phosporite: { [`g/C`]: 1e4 },
					['Reed Fiber']: { ['unit']: 2, [`growth/C`]: 0.13 },
				},
				// drop: {
				// 	meat: { ['g']: 2e3 },
				// },
			},
			['Glossy Drecko']: {
				consume: {
					Mealwood: { [`growth/C`]: 0.33 },
				},
				produce: {
					Phosporite: { [`g/C`]: 9e3 },
					Plastic: { [mass]: 150, [`growth/C`]: 0.33 },
				},
				// drop: {
				// 	meat: { ['g']: 2e3 },
				// },
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
			Mealwood: {
				consume: {
					Dirt: { [`g/C`]: 1e4 },
				},
				produce: {
					[`Meal Lice`]: { [`kcal/C`]: 6e2 / 3 },
				},
				properties: {
					['Life Cycle']: 3,
					floodable: false,
					height: 2,
					widht: 1,
					decor: -10,
					range: 2,
				},
			},
			['Bristle Blossom']: {
				require: { lux: 200 },
				consume: {
					H2O: { [`g/C`]: 2e4 },
				},
				produce: {
					['Bristle Berry']: { [`kcal/C`]: 267 },
				},
				properties: {
					['Life Cycle']: 6,
					floodable: false,
					height: 2,
					widht: 1,
					decor: 15,
					range: 2,
				},
			},
			['Thimble Reed']: {
				consume: {
					['Polluted H2O']: { [`g/C`]: 16e4 },
				},
				produce: {
					['Reed Fiber']: { [`unit/C`]: 1 / 2 },
				},
				properties: {
					['Life Cycle']: 2,
					floodable: true,
					height: 3,
					widht: 1,
					decor: 10,
					range: 1,
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
					['Polluted H2O']: { [`g/C`]: 7e4 },
					Dirt: { [`g/C`]: 1e4 },
				},
				produce: {
					Wood: { [`g/s`]: (5 * 3e2) / 4.5 },
				},
				properties: {
					['Life Cycle']: 4.5,
					floodable: true,
					height: 3,
					widht: 3,
					decor: 15,
					range: 2,
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
					properties: {
						floodable: true,
						// submergeable: true,
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
				Lavatory: {
					consume: {
						H2O: { [`g/s`]: 5e3 },
					},
					produce: {
						[`Polluted H2O`]: { [`g/s`]: 117e2, [`°C`]: 37 },
						Germ: 105e3,
						[`DTU/s`]: 250,
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
				[`Metal Refinery`]: {
					consume: {
						[`W/s`]: 12e2,
						[`DTU/s`]: 16e3,
					},
					produce: {},
					properties: {
						decor: -13.5,
						range: 3,
					},
				},
				Kiln: {
					consume: {},
					produce: {
						[`DTU/s`]: 2e4,
					},
					recipes: {
						Ceramic: {
							Clay: { g: 1e5 },
							Coal: { g: 25e3 },
						},
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
						CO2: { [`g/s`]: 170, [`°C`]: 110 },
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
						[`DTU/s`]: 9e3,
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
			Station: {
				['Research Station']: {
					consume: {
						Dirt: { [`g/p`]: 5e4 },
						[`W/s`]: 120 / 2,
					},
					produce: {
						[`DTU/s`]: 1130,
					},
					properties: {
						floodable: false,
					},
				},
				['Super Computer']: {
					consume: {
						H2O: { [`g/p`]: 5e4 },
						[`W/s`]: 120,
					},
					produce: {
						[`DTU/s`]: 45e2,
					},
					properties: {
						floodable: false,
					},
				},
			},
		},
	}

clogtEnd('ONIdb')
