const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
} as const;

type Options = {
  method?: keyof typeof METHODS;
  timeout?: number;
  headers?: Record<string, string>;
  data?: unknown;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = <R = unknown>(
  path: string,
  options?: OptionsWithoutMethod
) => Promise<R>;

function queryStringify(data: Record<string, string>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  static BASE_API_URL: string = "https://ya-praktikum.tech/api/v2";
  protected endpoint: string;
  constructor({
    baseUrl = "",
    endpoint = "",
  }: {
    baseUrl?: string;
    endpoint?: string;
  }) {
    this.endpoint = `${baseUrl || HTTPTransport.BASE_API_URL}${endpoint}`;
  }
  get: HTTPMethod = (path = "", options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHODS.GET });

  put: HTTPMethod = (path = "", options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (path = "", options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (path = "", options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHODS.DELETE });

  patch: HTTPMethod = (path = "", options = {}) =>
    this.request(this.endpoint + path, { ...options, method: METHODS.PATCH });

  request = <Response>(
    url: string,
    options: Options = { method: METHODS.GET }
  ): Promise<Response> => {
    const { headers = {}, method = "GET", data, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method === METHODS.GET && !!data
          ? url + queryStringify(data as Record<string, string>)
          : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status < 400) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.withCredentials = true;
      xhr.responseType = "json";
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        const body = data instanceof FormData ? data : JSON.stringify(data);
        if (!(data instanceof FormData)) {
          xhr.setRequestHeader("Content-Type", "application/json");
        }
        xhr.send(body);
      }
    });
  };
}
