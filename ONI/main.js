function compare(a, b) {}

function getBuilding(b) {
	const building = db[b];
	return {
		io_ratio: () => {
			const Total = calculateTotalIO(building);
			getRatio(b).AlgaeToO2();
			clog(Total);
			return (Total.ratio = building.io_ratio = Total.consume[`g/s`] / Total.produce[`g/s`]);
		},
	};
}

function calculateTotalIO(building) {
	const Total = {};
	const io = ['consume', 'produce'];
	for (const i of io) {
		const io_item = building[i];
		Total[i] = { [`g/s`]: 0 };
		for (const item in io_item) {
			const io_data = io_item[item];
			if (elements.includes(item)) {
				Total[i][`g/s`] += io_data[`g/s`];
				Total[i][item] = io_data[`g/s`];
			}
		}
	}
	return Total;
}

function getRatio(building) {
	return {
		AlgaeToO2: () => {
			if (db[building].ratio?.AlgaeToO2) return db[building].ratio.AlgaeToO2;
			if (!db[building].consume.Algae) return;
			const Algae = db[building].consume.Algae[`g/s`];
			const O2 = db[building].produce.O2[`g/s`];
			return (db[building].ratio = { AlgaeToO2: Algae / O2 });
		},
	};
}
