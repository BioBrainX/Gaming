{
	Optimalist:{
		Scientist:{Research,Rocketry,Supply},
		Chef/Farmer/Rancher:{Cook,Farm,Ranch,Ranching I},
		Transporter:{Rocketry,Supply,Operating,Mechatronic},
		Digger:{Diggin,Supply,Tidying},
		Designer:{Const,Deco,Supply},
	},
	Minimalist:{
		Sciencetist/Mechatornics:{
			Interest:[ Research,Operating, ],
		},
		Digger/Builder/Decor:{
			Interest:[ Research,Operating, ],
			Trait:[ Mechatronics ]
		},
		Chef/Farmer:{
			Interest:[ Research,Operating, ],
		}
	},
	Specialist:{
		All:{
			Trait:[ -UnpracticedArtist ],
			Stress:UglyCrier,
		},
		Builder:{
			Interest:[ Building,SuitWearing,Supplying ],
			Trait:[ Mechatronics,Handy,TwinkleToes ],
			Overjoy:Yodeler,
		},
		Digger:{
			Interest:[ Digging,SuitWearing,Supplying ],
			Trait:[ MoleHands,Buff,TwinkleToes ],
			Overjoy:Balloon Artist,
		},
		Researcher:{
			Interest:[ Research,Operating,Doctor ],
			Trait:[ NightOwl,QuickLearner,Caregiver ],
			Overjoy:Super Productive,
		},
		Chef/Farmer:{
			Interest:[ Cooking,Farming,Supplying ],
			Trait:[ Gourmet,CropTending,GreenThumb ],
			Overjoy:Super Productive,
		},
		Decorator:{
			Interest:[ Decorating,SuitWearing,Supplying ],
			Trait:[ ArtFundamental, AestheticDesign, Masterwork ],
			Overjoy:Sticker Bomber,
		},
		Rancher:{
			Interest:[ Ranching ],
			Trait:[ AnimalLover, ],
			Overjoy:Super Productive,
		},
		Hauler:{
			Interest:[ SuitWearing,Supplying,Tidying ],
			Trait:[ ExoTrain,Buff,TwinkleToes ],
			Overjoy:Sparkle Streaker,
		},
	}
}

Attributes:{
	Agriculture:+5% harvest, +3% tending, +3% seed, +10% touch duration - Farming
	Athletic:+10% runspeed - Suit Wearing
	Construction:+25% - Building
	Cuisine:+5% - Cooking
	Creativity:+10% - Decorating
	Excavation:+25% speed, +5% attack - Digging
	Husbandry:+5% wrangling, +10% groom duration - Ranching
	Medicine:+10% fabrication, +20% treatment - Doctoring
	Machinery:+10%, +3% Tune-Up duration - Operating
	Piloting:+3% - Rocketery
	Science:+40%, +10 leveling, +5% geotuning - Researching
	Strength:+25% tidying speed, +40kg capacity - Supplying & Tidying
}

OverJoy:{
	Balloon Artist:{ +8:[ Creative,Science,Cuisine,Medicine,Agriculture,Husbandry ], duration:{Cycle:1} },
	Sparkle Streaker:{ Athletic:+8, Others:{Athletic:+5}, duration:{Cycle:1} },
	Super Productive:{ duty:current, condition:incomplete duty > 1 sec, status:complete, chance:10% },
	Sticker Bomber:{ Decor:+20, radius:3 },
	Yodeler:+8:[ Machinery,Construction,Strength ],
}