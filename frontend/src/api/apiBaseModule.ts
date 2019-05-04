import { default as axios, AxiosInstance, AxiosResponse } from "axios";
import { ENV } from "src/environmentConfig";

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
        const errorMessage = this.getErrorMessage(response);
        if (errorMessage) {
          throw new Error(this.getErrorMessage(response));
        }

        throw new Error("Something wrong happened");
      });
  }

  protected getData<T>(response: AxiosResponse, name: string) {
    return (response.data.data as any)[name] as T;
  }

  private getErrorMessage(response: AxiosResponse) {
    const r: any = response;

    const { errors } = r && r.response && r.response.data;
    if (errors && errors[0]) {
      return errors[0].message;
    }
    return null;
  }
}
