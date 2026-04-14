import express from "express";
import cors from "cors";
import axios from "axios";
import client, { connectRedis } from "./redisClient.js";

const app = express();
app.use(cors());

await connectRedis();

const API_KEY = "6e585c28010b06d95bafcfe154c445f7";



app.get("/weather/:city", async (req, res) => {
  const city = req.params.city.toLowerCase();

  try {
    const cached = await client.get(`weather:${city}`);

    if (cached) {
      console.log(" Temp from Redis");
      return res.json(JSON.parse(cached));
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    await client.setEx(`weather:${city}`, 600, JSON.stringify(data));

    console.log(" Temp from API");

    res.json(data);

  } catch {
    res.status(500).json({ error: "Failed" });
  }
});




app.listen(5000, () => {
  console.log(" Server running on port 5000");
});




























































// app.get("/forecast/:city", async (req, res) => {
//   const city = req.params.city.toLowerCase();

//   try {
//     const cached = await client.get(`forecast:${city}`);

//     if (cached) {
//       console.log(" Chart from Redis");
//       return res.json(JSON.parse(cached));
//     }

//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
//     );

//     const formatted = response.data.list.slice(0, 20).map((item, i) => ({
//       week: `Day ${i + 1}`,
//       actual: item.main.temp,
//       forecast: item.main.feels_like,
//       plan: item.main.temp_min,
//     }));

//     await client.setEx(`forecast:${city}`, 600, JSON.stringify(formatted));

//     console.log(" Chart from API");

//     res.json(formatted);

//   } catch {
//     res.status(500).json({ error: "Failed" });
//   }
// });