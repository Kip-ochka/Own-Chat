import { expect } from "chai";
import { beforeEach } from "mocha";
import { LoginPage, RegistrationPage } from "../pages";
import { Router } from "./Router.ts";
import sinon from "sinon";

const router = new Router();

describe("Проверяем Router.ts", () => {
  beforeEach(() => {
    router.use("/", LoginPage()).use("/registration", RegistrationPage());
    router.start();
  });

  it("Начальная инициализация работает", () => {
    expect(window.location.pathname).to.eq("/");
  });

  it("Метод router.go работает", () => {
    router.go("/registration");
    expect(window.location.pathname).to.eq("/registration");
  });

  it("Метод router.back работает", () => {
    // @ts-expect-error Нужен доступ к router.history
    const historyForwardStub = sinon.stub(router.history, "back");
    router.back();
    expect(historyForwardStub.calledOnce).to.be.true;
    historyForwardStub.restore();
  });

  it("Метод router.forward работает", () => {
    // @ts-expect-error Нужен доступ к router.history
    const historyForwardStub = sinon.stub(router.history, "forward");
    router.forward();
    expect(historyForwardStub.called).to.be.true;
    historyForwardStub.restore();
  });
});
