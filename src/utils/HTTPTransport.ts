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
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, "method">;

type HTTPMethod = (
  url: string,
  options: OptionsWithoutMethod
) => Promise<unknown>;

function queryStringify(data: Record<string, string>) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  get: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.GET });

  put: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PUT });

  post: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.POST });

  delete: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.DELETE });

  patch: HTTPMethod = (url, options = {}) =>
    this.request(url, { ...options, method: METHODS.PATCH });

  request = (url: string, options: Options = { method: METHODS.GET }) => {
    const { headers = {}, method = "GET", data, timeout = 5000 } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        method,
        method === METHODS.GET && !!data ? url + queryStringify(data) : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as XMLHttpRequestBodyInit);
      }
    });
  };
}
