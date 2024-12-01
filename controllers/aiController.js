const axios = require("axios");

exports.generateJobDescription = async (req, res) => {
  try {
    const { title, company, requirements } = req.body;

    const prompt = `Generate a job description for a ${title} role at ${company} with the following requirements: ${requirements}.`;
    console.log(prompt);
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      },
      {
        headers: { Authorization: `Bearer ${process.env.AI_API_KEY}` },
      }
    );

    const description = response.data.choices[0].message.content;
    console.log(description);
    res.status(200).json({ description });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};
