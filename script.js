async function generateText() {
  const type = document.getElementById("type").value;
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("output");

  if (!prompt) {
    output.innerText = "⚠️ Please enter a topic first!";
    return;
  }

  output.innerText = "✏️ Writing... Please wait...";

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, prompt }),
    });

    const data = await res.json();
    output.innerText = data.text || "⚠️ No response received.";
  } catch (err) {
    output.innerText = "❌ Error: " + err.message;
  }
}
