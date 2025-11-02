export default async function handler(req, res) {
  const { type, prompt } = req.body;
  const fullPrompt = `Write a ${type} about: ${prompt}`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }],
        }),
      }
    );

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No text.";

    res.status(200).json({ text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
