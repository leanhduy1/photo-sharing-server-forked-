const express = require("express");
const Photo = require("../db/photoModel");
const User = require("../db/userModel");
const router = express.Router();

router.get("/photosOfUser/:id", async (request, response) => {
	const id = request.params.id;
	try {
		const photos = await Photo.find({ user_id: id }, "_id file_name date_time user_id comments");

		if (!photos) {
			return response.status(400).json({ message: "Photos not found" });
		}

		const photosList = JSON.parse(JSON.stringify(photos));
		for (const photo of photosList) {
			if (photo.comments && photo.comments.length > 0) {
				for (const comment of photo.comments) {
					const user = await User.findById(comment.user_id, "_id first_name last_name");
					comment.user = user;
					delete comment.user_id;
				}
			}
		}

		response.json(photosList);
	} catch (err) {
		response.status(400).json({ message: "Invalid user id", error: err });
	}
})

module.exports = router;
