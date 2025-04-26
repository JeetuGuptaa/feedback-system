const Feedback = require("../models/feedback");

const saveFeedback = async (req, res) => {
  try {
    const { name, email, category, text } = req.body;

    if (!name || !email || !text) {
      return res
        .status(400)
        .json({ error: "Name, email and feedback text are required." });
    }

    const newFeedback = await Feedback.create({
      name,
      email,
      category,
      text,
    });

    return res.status(201).json(newFeedback);
  } catch (err) {
    console.error("Error creating feedback:", err);
    return res.status(500).json({ error: "An unexpected error occurred." });
  }
};

module.exports = { saveFeedback };
