const router = require("express").Router();
const mongoose = require("mongoose");

const Mosque = mongoose.model(
	"Mosque",
	new mongoose.Schema({
		name: String,
		location: String,
		salahTime: {},
	})
);
const createMosque = async (obj) => {
	console.log(obj.location);
	const mosque = new Mosque({
		name: obj.name,
		location: obj.location,
		salahTime: {
			fajr: {
				id: "1",
				name: "fajr",
				time: obj.fajr,
				color: "#F7CD5D",
			},
			zuhr: {
				id: "2",
				name: "zuhr",
				time: obj.zuhr,
				color: "#fcd115",
			},
			asr: {
				id: "3",
				name: "asr",
				time: obj.asr,
				color: "#FAD6A5",
			},
			maghrib: {
				id: "4",
				name: "maghrib",
				time: obj.maghrib,
				color: "#e56a45",
			},
			isha: {
				id: "5",
				name: "isha",
				time: obj.isha,
				color: "yellow",
			},
			juma: {
				id: "6",
				name: "juma",
				time: obj.juma,
				color: "red",
			},
		},
	});
	return (result = await mosque.save());
};

const updateMosque = async (id, obj) => {
	return (result = await Mosque.findByIdAndUpdate(id, obj, { new: true }));
};

const deleteMosque = async (id) => {
	return (result = await Mosque.findByIdAndDelete(id));
};

const searchMosque = async (query) => {
	const searchQuery = new RegExp(`^${query}`, "ig");
	return (result = await Mosque.find({ name: searchQuery }));
};

router.get("/", async (req, res) => {
	if (req.query.search) {
		res.send(await searchMosque(req.query.search));
		return;
	}
	res.send(await Mosque.find());
});
router.get("/:id", async (req, res) => {
	res.send(await Mosque.findById(req.params.id));
});

router.post("/", async (req, res) => {
	console.log(req.body);
	res.send(await createMosque(req.body));
});

router.put("/:id", async (req, res) => {
	console.log(req.body);
	res.send(await updateMosque(req.params.id, req.body));
});

router.delete("/:id", async (req, res) => {
	res.send(await deleteMosque(req.params.id));
});
module.exports = router;
