import { default as axios, AxiosInstance, AxiosResponse } from "axios";
import { ENV } from "src/environmentConfig";
import { CommonError } from "server/src/errors/errors";
interface QueryParams {
  query: string;
}

interface AxiosHeaders {
  [header: string]: string;
}
let headers = {};

const baseHeaders: AxiosHeaders = {
  contentType: "application/json"
};

export abstract class ApiBaseModule {
  protected api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: ENV.API_URL,
      timeout: 5000
    });
  }

  private getHeaders() {
    return {
      ...baseHeaders,
      ...headers
    };
  }

  public setHeaders(newHeaders: AxiosHeaders) {
    headers = {
      ...newHeaders,
      ...headers
    };
  }

  protected sendQuery(queryParams: QueryParams) {
    return this.api
      .post(
        "/graphql",
        {
          query: queryParams.query
        },
        {
          headers: this.getHeaders()
        }
      )
      .then(response => {
        return response;
      })
      .catch(response => {
        const graphqlError = this.getGraphqlError(response);

        if (graphqlError) {
          return Promise.reject(JSON.parse(graphqlError));
        } else {
          const error = new CommonError(
            CommonError.Status.SOMETHING_WRONG,
            "Something wrong happened"
          ).message;
          return Promise.reject(JSON.parse(error));
        }
      });
  }

  protected getData<T>(response: AxiosResponse, name: string) {
    return (response.data.data as any)[name] as T;
  }

  private getGraphqlError(response: AxiosResponse) {
    const r: any = response;
    if (r && r.response && r.response.data) {
      const { errors } = r.response.data;
      if (errors && errors[0]) {
        return errors[0].message;
      }
    }
  }
}
