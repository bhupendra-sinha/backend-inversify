import { ContainerModule } from "inversify";
import TYPES from "../../core/types";
import { UserService } from "./services/user.service";
import { UserController } from "./controllers/user.controller";

const userModule = new ContainerModule((bind) => {
  bind<UserService>(TYPES.USER_SERVICE).to(UserService).inSingletonScope();
  bind<UserController>(TYPES.USER_CONTROLLER)
    .to(UserController)
    .inSingletonScope();
});

export default userModule;
