import { Container } from "inversify";
import "reflect-metadata";

// create container
const container = new Container({
  defaultScope: "Singleton",
  autobind: true,
});
export default container;
