// Starmancer
const unknown=0,
Perks={
	// Positives
	Charismatic:{ƒ:Char=>Char.relationMult+=unknown},
	Excitable:{ƒ:Char=>Char.MoraleBoost+=unknown},
	Fast_Learner:{ƒ:Char=>Char.Skills.xpMult+=.05},
	Imsoniac:{ƒ:Char=>Char.sleepTime-=unknown},
	Loner:{ƒ:Char=>Char.relationMult-=unknown},
	Morbid_Curiosity:{ƒ:Char=>Char.deMoralize.bloodBody-=unknown},
	Speedy:{ƒ:Char=>Math.min(Char.Lv.Spd,10)},
	Tolerant:{ƒ:Char=>Char.Morale.Penalties-=unknown},
	// Negatives
	Aggresive:{ƒ:Char=>{Char.Skills.Strength.xpMult+=.1;Char.Agression+=unknown}},
	Anxious:{ƒ:Char=>Char.Morale.Penalties+=unknown},
	Disgusting:{ƒ:Char=>{Char.ComfortMult=0}},
	Faint_Heart:{ƒ:Char=>Char.deMoralize.bloodCorpse+=unknown},
	Frail:{ƒ:Char=>Char.maxHP-=5},
	Gluttonous:{ƒ:Char=>Char.hungerSpd+=.5},
	Incompetent:{ƒ:Char=>{Char.competence-=.25; Char.InvSlot+=1}},
	Oversleeper:{ƒ:Char=>Char.tiredness+=unknown},
	Slow_Learner:{ƒ:Char=>{Char.Skills.xpMult-=.05; Char.InvSlot+=1}},
	// Neutrals
	AvrJoe:unknown,
	Deaf:{ƒ:Char=>Char.NoisesLv=false},
	Germaphobe:{
		Refuse:{
			Jobs:[ Carry.BioWaste ],
			Sleep:[ floor,toilet ],
		},
		ƒ:Char=>Char.Skills.Janitor.xpMult+=.5,
	},
	Multiple_Personality:{ƒ:Char=>Game.newDay && Char.currentPerks[2]=Perks.rand()},
	Mute:unknown,
	Nyctophobia:null, //afraid of the dark
	Pacifist:{
		Refuse:{
			Jobs:[ Security ],
			Activity:[ Fight ],
		},
	},
	PottyMouth:unknown,
},
Combo={ // Begining
	Max:{
		Generic:{
			Skills:[ Speed,Strength ],
			Perks:[ Exciteable,Tolerant ],
			Loves:[ ,, ],
			Refuse:[ Carry.Biowaste ],
			FreeTime:[ Spiritual ],
			Snap:[ Vandal ],
			Break:[],
			Jobs:[ Carry,Scavenge,Security ]
		},
		Medic_Researcher:{ // For collecting dead colonist
			Skills:[ {Doctor:10},Janitor,Research,Chemistry,Programming ],
			Perks:[ Germaphobe,Morbid_Curiosity,Imsoniac ],
			Loves:[ Cleaning,Doctor,Research,Chemistry ],
			Refuse:![ Harvest.Xeno,Carry.Corpse ],
			Break:[ Violent_Outburst,Maniac ],
			FreeTime:[ Intellectual ],
		},
		Miner_Engineer_Farmer:{
			Skills:[ Mining,Engineer,Botanist,Programming ],
			Loves:[ Mining,Pilot,Fixing_Objects,Farming ],
		},
		Guards_Carrier:{
			Skills:[ Health,Handgun,Speed,Strength,Chef,Programming ],
			Perks:[ Speedy,Morbid_Curiosity ],
			Loves:[ Carry.Corpse,Carry.Items,Cooking,Power.Generation,Scavenge,Security, ],
			FreeTime:[ Athletic ],
		},
	},
	Opt:{
		Doctor:{
			Skills:[ {Doctor:+10},Janitor,Chemistry ],
			Perks:[ Germaphobe,Morbid_Curiosity ],
			Loves:[ Cleaning,Doctor,Chemistry ]
			Hates:![ Research ],
			Refuse:![ Carry.Corpse ],
			FreeTime:[ Intellectual ],
		},
		Miner:{
			Skills:[ {Mining:+10},{Engineer:+10},{Botanist:10} ],
			Loves:[ Pilot,Mining ],
			FreeTime:[ Spiritual ],
		},
		Guard_Carrier:{
			Skills:[ Health,Speed,Strength ],
			Perks:![ Pacifist ],
			Loves:[ Scavenge,Carry,Power.Generation ]
			Hates:![ Security ],
			Refuse:![ Security ],
			FreeTime:[ Athletic ],
		},
		Carrier:{
			Skills:[ Speed,Strength ],
			Perks:[ Incompetent,Learn.Slow ],
			Loves:[ Carry,Scavenge ],
			FreeTime:[ Athletic ],
		},
		Researcher:{
			Loves:[ Researching ]
			Perks:[ Imsoniac ],
			FreeTime:[ Intellectual ],
		},
		Hunter:{
			Skills:[ Health,Strength ],
			Perks:![ Pacifist ],
			Loves:[ Explore,Security ]
			FreeTime:[ Athletic ],
		},
	},
	Min:{
		Researcher:{
			Perks:[ Imsoniac ],
			FreeTime:[ Intellectual ],
			Jobs:[ Researching,Cleaning,Chef ]
		},
		Miner:{
			Loves:[ Pilot,Mining ],
			FreeTime:[ Spiritual ],
			Jobs:[ Mining,Pilot,Engineer,Farming ]
		},
		Carrier:{
			Perks:![ Pacifist ],
			Refuse:![ Carry ],
			FreeTime:[ Athletic ],
			Jobs:[ Carry,Power.Generation ],
		},
		Doctor:{
			Perks:[ Morbid_Curiosity ],
			Refuse:![ Carry.Corpse ],
			Jobs:[ Carry.Corpse ],
		},
	},
},
Skills={
	Health:{ xpGain:{
		Activity:[ Eating ],
	}},
	Speed:{ xpGain:{
		Jobs:[ Carry,Power.Generation ],
	}},
	Strength:{ xpGain:{
		Jobs:[ Explore,Scavenge,Security,Carry ],
		FreeTime:[ Athletic ],
	}},
	Doctor:{ xpGain:{
		Jobs:[ Craft,Harvest.Xeno ],
		Action:[ Doctoring ]
	}},
	Research:{ xpGain:{
		Jobs:[ Researching ],
		FreeTime:[ Intellectual ],
	}},
	Mining:{ xpGain:{
		Jobs:[ Mining,Pilot ],
	}},
	Botanist:{ xpGain:{
		Jobs:[ Farming ],
	}},
	Engineer:{ xpGain:{
		Jobs:[ Craft,FixObjs ],
	}},
	Construction:{ xpGain:{
		Jobs:[ Building ],
	}},
	Cheft:{ xpGain:{
		Jobs:[ Cooking ],
	}},
	Programming:{ xpGain:{
		Jobs:[ Craft ],
	}},
	Janitor:{ xpGain:{
		Jobs:[ Cleaning ],
	}},
	Loves:skills=>{skills.forEach(s=>Char.s.xpMult+=.25)},
	Hates:skills=>{skills.forEach(s=>Char.s.xpMult-=.15)},
	Refuse:skills=>{skills.forEach(s=>Char.s.enable=false},
},
FreeTimes=[
	Athletic,		// Speed++ || Melee++ 
	Creative,		// Chance for Pigments
	Entertainment,
	Intellectual,	// Research++
	Spiritual,
],
Snap=[
	Agoraphobia,	// Stay close to bed
	Binge_Eater,	// Stress Eats
	Depressede,		// Mopes around the place refuse to work
	Hider,			// Hiding
	Hoarder,		// Steal Foods
	Hunger_strike,	// Refuse to eat
	Incompetent,	// Competent--
	Incontinent,	// Randomly poop
	Lazy,			// Stays in bed
	Lonely,			// Talks to anything
	Nightmare,		// Lack sleep?
	Prankster,		// Lock Doors
	Space_Terror,	// Flees from everything
	Stress_Vomit,	// Frequently
	Vandal,			// Bore leads to Creative
],
Break=[
	Arsonist,		// Burning things
	Cannibal,		// Eat raw corpse?
	Maniac,			// Looking for blood
	Saboteur,		// Break Objects
	Space_Madness,	// Only eat Ore & Biowaste
	Violent_Burst,	// Agression++
],
Actions={
	Vomit,		// Transmit virus
},
Needs={
	Sleep:{
	},
	Hunger:{
	},
	Bathroom:{
	},
	FreeTime:{
	},
	Social:{
	},
	Oxygen:{
	},
	Temp:{
	},
	Noise:{
	},
	Comfort:{
	},
	Germ:{
	},
},
