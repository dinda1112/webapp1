export default async function handler(req, res) {
  try {
    const { prompt, type } = req.body || {};

    if (!prompt || !type) {
      return res.status(400).json({ error: "Missing prompt or type" });
    }

    const API_KEY = process.env.API_KEY;

    const fullPrompt = `Write a ${type} about: ${prompt}`;

  const response = await fetch(
  "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" + API_KEY,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
    }),
  }
);




    const data = await response.json();

    let text = "⚠️ No text received from the model.";

if (data?.candidates && data.candidates.length > 0) {
  const parts = data.candidates[0].content?.parts;
  if (parts && parts.length > 0) {
    text = parts.map(p => p.text).join("\n");
  }
}

// fallback for newer structure (if using function calling or different format)
if (!text && data.output_text) {
  text = data.output_text;
}

    console.log("Full API response:", JSON.stringify(data, null, 2));
console.log("Candidate parts:", JSON.stringify(data?.candidates, null, 2));

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
}
