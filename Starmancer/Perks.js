// Starmancer
const unknown = 0;
Perks = {
	Aggresive:{ƒ:Char=>Char.Skills.Strength.xpMult+=.1},
	AvrJoe:null,
	Charismatic:{ƒ:Char=>Char.relationMult+=unknown},
	Deaf:{ƒ:Char=>Char.NoisesLv=false},
	Disgusting:{ƒ:Char=>{Char.ComfortMult=0}},
	Excitable:{ƒ:Char=>Char.MoraleBoost+=unknown},
	Faint_Hearth:{ƒ:Char=>Char.deMoralize.bloodBody+=unknown},
	Fast_Learner:{ƒ:Char=>Char.Skills.xpMult+=.05},
	Frail:{ƒ:Char=>Char.maxHP-=5},
	Gluttonous:{ƒ:Char=>Char.hungerSpd+=.5},
	Imsoniac:{ƒ:Char=>Char.sleepTime-=unknown},
	Loner:{ƒ:Char=>Char.relationMult-=unknown},
	Morbid_Curiosity:{ƒ:Char=>Char.deMoralize.bloodBody+=0},
	Multiple_Personality:{ƒ:Char=>Game.newDay && Char.currentPerks[2]=Perks.rand()},
	Mute:unknown,
	Nyctophobia:null, //afraid of the dark
	Oversleeper:{ƒ:Char=>Char.tiredness+=unknown},
	PottyMouth:unknown,
	Slow_Learner:{ƒ:Char=>{Char.Skills.xpMult-=.05; Char.InvSlot+=1}},
	Speedy:{ƒ:Char=>Math.min(Char.Lv.Spd,10)},
	Tolerant:{ƒ:Char=>Char.Morale.Penalties-=unknown},
	Germaphobe:{
		refuse:{
			Jobs:[Transport.BioWaste],
			Sleep:[floor,toilet],
		},
		ƒ:Char=>Char.Skills.Janitor.xpMult+=.5,
	},
	Pacifist:{
		refuse:{
			Jobs:[Security],
			Activity:[Fight],
		}
	},
	
}