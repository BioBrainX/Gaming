// Starmancer
const unknown=0,
Crafting={
	Any:{
		Supply_Station:{
			Medkit_Small::[{Goolerium:1},[1,+1],,120],
			Fuel:[{Goolerium:1,Biomass:1},[1,+1],,60],
			Moonshine:[{Goolerium:1,Biomass:1},[1,+1],,60],
			Water_Clean:[{Water_Dirty:1},[1,+1],,60],
		},
	},
	Chemistry:{
		Chemistry_Table:{
			RefnGoo:[{Goolerium:2},[1,+1],,60],
			Fuel:[{Goolerium:1,Biomass:1},[1,+1],,60],
			ClSol:[{RefnGoo:1},[1,+1],4,60],
			C4:[{Sulfur:1},[1,+1],20,30],
			SpcRock:[{Biomass:1,Ore:1},[1,+1],,60],
			DNA:[{Biowaste:1,Goolerium:1,Biomass:1},[1,+1],,30],
			Pigments:[{Biomass:1,VnomSac:1,BluJel:1},[1,+1],,30],
			FireFoam:[{Goolerium:1,Biomass:1},[1,+1],,60],
			MixChem:[{Goolerium:1},[1,+1],,30],
		},
	},
	Doctor:{
		Medical_Desk:{
			
		},
	},
	Engineer:{
		/* product:[{Mats:amount},output[min,upgraded],minSkill,duration,output] */
		Ore_Refinery:{
			Metal:[{Ore:2},[1,+1],,60],		// Materials - Metal
			Magtz:[{Ore:2},[1,+1],10,60],	// Materials - Magnetized Metal
			Scrap:[{Metal:1},[10,+5],,30],	// Currency - Scrap
			HullF:[{Metal:1},[10,+5],,30],	// Currency - Hull Framework
			Tinker:[{Ore:1},[1,0],,30],		// Training
		},
		Gear_Station:{
			Fabric:[{Silk:3},[1,+1],,120],						// Materials - Rough Fabric
			Helmet:[{Fabric:1,Metal:1},[1,+1],10,120],			// Gears - Helmet
			JetPack:[{Servo:1,Fuel:1,Metal:1},[1,+1],15,120],	// Gears - Jetpack
			Shiv:[{Metal:1},[1,+1],15,120],						// Weapon - Shiv
		},
		Workbench:{
			Sculpt:[{Ice:1},[1,+1],1,120],
			Flux:[{Magtz:1},[1,+1],25,120],
			Handgun:[{Metal:2},[1,+1],15,180],
			MgzSml:[{Metal:1},[1,+1],15,180],
			MgzLrg:[{Metal:2},[1,+1],25,150],
			Cyborg:[{Chip:1,Magtz:1},[1,+1],35,120],
			Nanobot:[{Chip:1,Magtz:1},[1,+1],45,120],
			Bullet:[{Metal:1},[1,+1],15,120],
		},
	},
	Programming:{
		Terminal:{
			Chip:[{Silicon:2},[1,+1],,60],				// Materials - Data Chip
			ByPass:[{Chip:2},[1,+1],,60],				// Tools - Bypass Module
			Novel:[{Chip:1},[1,+1],12,60],				// Good$ - Romance Novel
			Certs:[{Magtz:1,Chip:1},[1,+1],35,60],		// Good$ - Forged Certs
			Electr:[{Chip:1},[1,+1],,30],				// Currency - Electronics
			Analyze:[{Silicon:1},[1,0],,60],			// Training
		},
	},
	
}