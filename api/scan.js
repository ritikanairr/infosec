export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { sys, userMsg } = req.body;

  try {
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: sys }] },
        contents: [{ parts: [{ text: userMsg }] }],
        generationConfig: { responseMimeType: "application/json" }
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
