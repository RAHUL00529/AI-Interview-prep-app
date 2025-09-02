const Session = require("../models/Session");
const Question = require("../models/Question");
const { create } = require("../models/User");

exports.createSession = async (req, res) => {
  try {
    const { role, experience, topicsTofocus, description, questions } =
      req.body;
    const userId = req.user.id;

    const session = await Session.create({
      user: userId,
      role,
      experience,
      topicsTofocus,
      description,
    });

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = await Question.create({
          session: session._id,
          question: q.question,
          answer: q.answer,
        });
        return question._id;
      })
    );
    session.questions = questionDocs;
    await session.save();

    res.status(201).json({ success: true, message: session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.getMySessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session Not found" });
    }
    return res.status(200).json({ success: true, message: session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
exports.deleteSession = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
