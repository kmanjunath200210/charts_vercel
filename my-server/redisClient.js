import { createClient } from "redis";

const client = createClient({
  url: "redis://localhost:5173",
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log(" Redis Connected");
  }
};

export default client;