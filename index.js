import express from "express";
import axios from "axios";
import env from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
env.config();
const app = express();
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/fetch-results", async (req, res) => {
  const { keyword } = req.body;

  if (!keyword) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  try {
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(
      keyword
    )}&api_key=${apiKey}`;

    const response = await axios.get(apiUrl);
    const results = response.data.organic_results.map((result) => ({
      title: result.title,
      link: result.link,
      snippet: result.snippet,
    }));

    res.json({ results });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch results" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// module.exports = app;
