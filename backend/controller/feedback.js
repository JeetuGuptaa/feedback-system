const Feedback = require("../models/feedback");
const { ALLOWED_CATEGORIES } = require("../config/constants");

const saveFeedback = async (req, res) => {
  try {
    let { name, email, category, text } = req.body;

    if (!name || !email || !text) {
      return res
        .status(400)
        .json({ success: false, data: {}, message: "Name, email and feedback text are required." });
    }

    if (!ALLOWED_CATEGORIES.includes(category)) {
      category = 'other';
    }

    await Feedback.create({
      name,
      email,
      category,
      text,
    });

    return res.status(201).json({ success: true, data: {}, message: "Feedback saved successfully." });
  } catch (err) {
    console.error("Error creating feedback:", err);
    return res.status(500).json({ success: false, data: {}, message: "Unable to save feedback." });
  }
};


const getFeedback = async (req, res) => {
  try {
    const {
      sort = "createdAt",
      order = "desc",
      category,
      page = "1",
      limit = "10",
    } = req.query;

    const pageNum = Math.max(parseInt(page, 10), 1);
    const limNum = Math.max(Math.min(parseInt(limit, 10), 100), 1); 

    const filter = category ? { category } : {};
    const sortSpec = { [sort]: order === "asc" ? 1 : -1 };

    const [total, feedbacks] = await Promise.all([
      Feedback.countDocuments(filter),
      Feedback.find(filter)
        .sort(sortSpec)
        .skip((pageNum - 1) * limNum)
        .limit(limNum)
        .lean(),
    ]);

    const totalPages = Math.ceil(total / limNum);

    return res.json({
      success: true,
      data: {feedbacks, meta: { total, page: pageNum, limit: limNum, totalPages }},
      message: "Feedback retrieved successfully.",
    });
  } catch (err) {
    console.error("Error fetching feedback:", err);
    return res.status(500).json({ success: false, data: {}, message: "Unable to retrieve feedback." });
  }
};

module.exports = { saveFeedback, getFeedback };
