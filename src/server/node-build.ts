import { createServer } from "./index";

function startServer() {
  try {
    const app = createServer();
    const port = process.env.PORT || 3000;
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }).on("error", (err) => {
      console.error("Failed to start server network listener:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Critical error during server initialization:", error);
    process.exit(1);
  }
}

startServer();
