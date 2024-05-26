import { expect } from "chai";
import sinon, {
  SinonFakeXMLHttpRequestStatic,
  SinonFakeXMLHttpRequest,
} from "sinon";
import { HTTPTransport } from "./HTTPTransport.ts";
import { afterEach, beforeEach, describe } from "mocha";

describe("HTTPTransport", () => {
  let xhr: SinonFakeXMLHttpRequestStatic;
  let requests: SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    xhr.restore();
  });

  const transport = new HTTPTransport({ baseUrl: "/data" });

  it("Должен работать GET запрос", async () => {
    const data = { message: "GET request success" };

    const promiseResult = transport.get<{ message: string }>("");

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(data)
    );
    const response = await promiseResult;

    expect(response).to.deep.equal(data);
  });

  it("Должен работать GET запрос с query params", async () => {
    const data = { message: "GET request success" };

    const promiseResult = transport.get<{ message: string }>("", { data });

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(data)
    );
    const response = await promiseResult;

    expect(response).to.deep.equal(data);
  });

  it("Должен работать POST запрос", async () => {
    const requestData = { message: "POST request" };
    const responseData = { message: "POST request success" };

    const result = transport.post("", { data: requestData });

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseData)
    );

    const response = await result;
    expect(responseData).to.deep.equal(response);
  });

  it("Должен работать POST запрос c formData", async () => {
    const requestData = { data: "POST request" };
    const formData = new FormData();
    formData.append("message", requestData.data);
    const responseData = { message: "POST request success" };

    const result = transport.post("", { data: formData });

    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseData)
    );

    const response = await result;
    expect(responseData).to.deep.equal(response);
  });

  it("Должен работать DELETE запрос", async () => {
    const responseData = { message: "DELETE request successful" };

    const result = transport.delete("");
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseData)
    );

    const response = await result;
    expect(response).to.deep.equal(responseData);
  });

  it("Должен работать PUT запрос", async () => {
    const requestData = { message: "PUT request" };
    const responseData = { message: "PUT request success" };

    const result = transport.put("", { data: requestData });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseData)
    );

    const response = await result;
    expect(responseData).to.deep.equal(response);
  });

  it("Должен работать PATCH запрос", async () => {
    const requestData = { message: "PATCH request" };
    const responseData = { message: "PATCH request success" };

    const result = transport.put("", { data: requestData });
    requests[0].respond(
      200,
      { "Content-Type": "application/json" },
      JSON.stringify(responseData)
    );

    const response = await result;
    expect(responseData).to.deep.equal(response);
  });
});
