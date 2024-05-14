import { Router } from "./utils/Router.ts";
import {
  LoginPage,
  ProfilePage,
  RegistrationPage,
  ProfilePasswordChangePage,
  ProfileChangePage,
  ChatPage,
  NotFoundPage,
  ErrorPage,
} from "./pages";

const router = new Router();

router
  .use("/", LoginPage())
  .use("/sign-up", RegistrationPage())
  .use("/settings", ProfilePage())
  .use("/settings-edit", ProfileChangePage())
  .use("/password-edit", ProfilePasswordChangePage())
  .use("/messenger", ChatPage())
  .use("/error500", ErrorPage())
  .use("/error404", NotFoundPage());

router.start();
