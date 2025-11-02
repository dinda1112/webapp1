export default async function handler(req, res) {
  try {
    const { prompt, type } = req.body || {};

    if (!prompt || !type) {
      return res.status(400).json({ error: "Missing prompt or type" });
    }

    const API_KEY = process.env.API_KEY;

    const fullPrompt = `Write a ${type} about: ${prompt}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No text received from the model.";

    res.status(200).json({ text });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
