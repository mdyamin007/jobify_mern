const Company = require("../models/Company");
const cloudinary = require("cloudinary").v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createCompany = async (req, res) => {
  try {
    const { name, location, description } = req.body;
    let logoUrl = "";

    console.log(req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobify/companies",
      });
      logoUrl = result.secure_url;
    }

    const company = new Company({ name, location, description, logo: logoUrl });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const companies = await Company.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "jobify/companies",
      });
      updates.logo = result.secure_url;
    }

    const company = await Company.findByIdAndUpdate(id, updates, { new: true });
    if (!company) return res.status(404).json({ error: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByIdAndDelete(id);
    if (!company) return res.status(404).json({ error: "Company not found" });

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
