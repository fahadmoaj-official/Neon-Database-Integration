import app from "./app";
import { initDB } from "./db";


const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

main();