import express from "express";
import routes from "./routes";

export const buildServer = () => {
  const server = express();

  server.use(express.json());

  server.get("/", (req, res) => {
    res.status(200).send({ message: "CRM API" });
  });

  server.use("/crm", routes);

  return server;
};