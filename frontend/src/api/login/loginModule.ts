import { ApiBaseModule } from "src/api/apiBaseModule";
import {
  Login__Create_Request,
  Login__Create_Response,
  Logins__Get_Response
} from "server/src/resolvers/login/types";
import { Login } from "server/src/models/login/types";

export class LoginModule extends ApiBaseModule {
  public create(
    request: Login__Create_Request
  ): Promise<Login__Create_Response> {
    const query = `
    mutation {
      createLogin(
        request: {
          data: """${request.data}""",
          key: """${request.key}""",
        }) {
        login {
          data,
          id,
        },
        loginKey {
          data,
          userId,
          loginId
        }
      }
    }
    `;
    return this.sendQuery({
      query
    }).then(response => {
      return this.getData<Login__Create_Response>(response, "createLogin");
    });
  }

  public getLogins(): Promise<Logins__Get_Response> {
    const query = `
    query {
      logins {
        id,
        data
      }
    }
    `;
    return this.sendQuery({
      query
    }).then(response => {
      return {
        logins: this.getData<Login[]>(response, "logins")
      };
    });
  }
}
