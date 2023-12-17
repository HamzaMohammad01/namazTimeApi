const router = require("express").Router();
const mongoose = require("mongoose");

const Mosque = mongoose.model(
	"Mosque",
	new mongoose.Schema({
		name: String,
		salahTime: {},
		Location: String,
	})
);
const createMosque = async (obj) => {
	const mosque = new Mosque({
		name: obj.name,
		salahTime: {
			fajr: {
				id: "1",
				name: obj.salahTime.fajr.name,
				time: obj.salahTime.fajr.time,
				color: "#F7CD5D",
			},
			zuhr: {
				id: obj.salahTime.zuhr.name,
				name: obj.salahTime.zuhr.time,
				time: "13:00",
				color: "#fcd115",
			},
			asr: {
				id: "3",
				name: obj.salahTime.asr.name,
				time: obj.salahTime.asr.time,
				color: "#FAD6A5",
			},
			maghrib: {
				id: "4",
				name: obj.salahTime.maghrib.name,
				time: obj.salahTime.maghrib.time,
				color: "#e56a45",
			},
			isha: {
				id: "5",
				name: obj.salahTime.isha.name,
				time: obj.salahTime.isha.time,
				color: "yellow",
			},
		},
		Location: obj.location,
	});
	return (result = await mosque.save());
};

const updateMosque = async (id, obj) => {
	return (result = await Mosque.findByIdAndUpdate(id, obj, { new: true }));
};

const deleteMosque = async (id) => {
	return (result = await Mosque.findByIdAndDelete(id));
};

router.get("/", async (req, res) => {
	res.send(await Mosque.find());
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
