import app from "./src/app.js";

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce API is running on port ${PORT}`);
});

// process.on("SIGINT", () => {
//   server.close(() => {
//     console.log("WSV eCommerce API is shutting down");
//   });
// });
