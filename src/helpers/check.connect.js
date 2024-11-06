import mongoose from "mongoose";
import os from "os";
import process from "process";

const _SECONDS = 5000;

const countConnect = () => {
  const numConnection = mongoose.connections.length;
  return numConnection;
};

//check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnection = countConnect();
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // Example maximum number of connections based on osf cores
    const maxConnection = numCores * 5;

    console.log(`Active connections: ${numConnection}`);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

    if (numConnection > maxConnection) {
      console.error(`Overload: overload detected!`);
    }
  }, _SECONDS); // Monitor every 5 seconds
};

export { countConnect, checkOverLoad };
