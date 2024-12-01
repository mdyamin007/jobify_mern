const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, company, description, location, salary } = req.body;
    const job = new Job({ title, company, description, location, salary });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sort, filter } = req.query;

    const query = {};
    if (search) query.title = { $regex: search, $options: "i" };
    if (filter) query.location = filter;

    const jobs = await Job.find(query)
      .sort(sort ? { [sort]: 1 } : {})
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const job = await Job.findByIdAndUpdate(id, updates, { new: true });
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findByIdAndDelete(id);
    if (!job) return res.status(404).json({ error: "Job not found" });

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
