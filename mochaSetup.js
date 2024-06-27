import { JSDOM } from "jsdom";

const jsdom = new JSDOM('<body></body>', {url:'http://localhost'})
global.window = jsdom.window;
global.XMLHttpRequest = jsdom.window.XMLHttpRequest
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.FormData = jsdom.window.FormData
