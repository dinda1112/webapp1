async function generateText() {
  const type = document.getElementById("type").value;
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("output");

  if (!prompt) {
    output.innerText = "⚠️ Please enter a topic or description first!";
    return;
  }

  output.innerText = "✏️ Writing... Please wait...";

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, prompt }),
    });

    const data = await response.json();

    output.innerText = data.text || "⚠️ No text received.";
  } catch (error) {
    output.innerText = "❌ Error: " + error.message;
  }
}
