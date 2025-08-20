import { controller, httpPost, requestBody } from "inversify-express-utils";

@controller("/user")
export class UserController {
  @httpPost("/")
  async create(@requestBody() body: any) {
    return "create user";
  }
}
