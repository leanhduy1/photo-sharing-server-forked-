const express = require("express");
const User = require("../db/userModel");
const router = express.Router();

router.get("/list", async (request, response) => {
  try {
		const users = await User.find({}, "_id first_name last_name");
		response.json(users);
	} catch (err) {
		response.status(500).json({ error: err });
	}
});

router.get("/:id", async (request, response) => {
	const id = request.params.id;
	try {
		const user = await User.findById(id, "_id first_name last_name location description occupation");
		if (!user) {
			return response.status(400).json({ message: "User not found" });
		}
		response.json(user);
	} catch (err) {
		response.status(400).json({ message: "Invalid user id", error: err });
	}
})


module.exports = router;