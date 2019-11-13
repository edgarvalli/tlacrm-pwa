import Cryptr from "cryptr";
import { secret } from "../config";
let txt = "Helo {{ name }}, hoy es {{date}}";
const data = {
  name: "Edgar Valli",
  date: new Date()
};

txt.match(/\{\{(.*?)\}\}/g).forEach(t => {
  let _var = t.replace("{{", "");
  _var = _var.replace("}}", "");
  _var = _var.trim();
  txt = txt.replace(t, data[_var]);
});

export default function(collection) {
  const cryptr = new Cryptr(secret);
  // const url = `http://${this.host}:3080/evserver`;
  const url = `https:/ev-server.ddns.net/evserver`;

  const headers = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: ""
  };

  const token =
    localStorage.getItem("ev-token") || sessionStorage.getItem("ev-token");
  headers.headers.db = "tlacrm";
  headers.headers.collection = collection;
  headers.headers.token = token;

  return {
    setStore() {
      let store;
      if (localStorage.getItem("ev-autologin") !== null) {
        store = localStorage;
      } else {
        store = sessionStorage;
      }
      return store;
    },

    isAuth() {
      const store = this.setStore();
      if (store.getItem("ev-token") !== null) {
        return true;
      } else {
        return false;
      }
    },

    setParams(key = "key", value = "value") {
      const store = this.setStore();
      store.setItem(key, value);
    },

    async makeRequest(_url = url) {
      const request = await fetch(_url, headers);
      if (!request.ok) {
        return {
          error: true,
          message: request.statusText
        };
      }
      let response = await request.json();
      if (response.error) {
        if (response.tokenExpired) {
          await this.autoLogin();
          await this.makeRequest(url);
        }
      }
      return response;
    },

    async login(username, password, autologin) {
      headers.method = "post";
      headers.body = JSON.stringify({ username, password });
      const request = await fetch(`${url}/login`, headers);
      if (!request.ok)
        return { error: true, message: "Ocurrio un error en la peticion" };
      const response = await request.json();
      if (response.error) return response;
      let store = null;
      autologin ? (store = localStorage) : (store = sessionStorage);
      // set params
      store.setItem("ev-autologin", autologin);
      store.setItem("ev-id", response.user._id);
      store.setItem("ev-email", response.user.email);
      store.setItem("ev-token", response.user.token);
      store.setItem("ev-avatar", response.user.avatar);
      store.setItem("ev-isAdmin", response.user.isAdmin);
      store.setItem("ev-username", response.user.username);
      store.setItem("ev-fullname", response.user.fullname);
      store.setItem("ev-password", cryptr.encrypt(password));
      headers.headers.token = response.user.token;

      return response;
    },

    async autoLogin() {
      const store = this.setStore();
      const username = store.getItem("ev-username");
      const password = cryptr.decrypt(store.getItem("ev-password"));
      let response = await this.login(username, password, true);
      return response;
    },

    async get(skip = 0, limit = 50) {
      headers.method = "get";
      if ("body" in headers) delete headers.body;
      let response = await this.makeRequest(
        `${url}/?skip=${skip}&limit=${limit}`
      );
      return response;
    },

    async search(val = "", keys = []) {
      const props = keys.join(",");
      headers.method = "get";
      if ("body" in headers) delete headers.body;
      let response = await this.makeRequest(
        `${url}/search?value=${val}&props=${props}`
      );
      return response;
    },

    async add(child = {}) {
      headers.method = "post";
      headers.body = JSON.stringify({ child });
      const response = await this.makeRequest();
      return response;
    },

    async update(id = "", child = {}) {
      headers.method = "put";
      headers.body = JSON.stringify({ id, child });
      const response = await this.makeRequest();
      return response;
    },

    async remove(id = "") {
      headers.method = "delete";
      if ("body" in headers) delete headers.body;
      const response = await this.makeRequest(url + "/?id=" + id);
      return response;
    },

    logOut() {
      const store = this.setStore();
      store.clear();
      window.location.reload();
    },

    uploadAvatar(id = "", file = new Blob()) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async ev => {
        const imageBase64 = ev.target.result;
        const image = imageBase64.split(",");
        const extension = image[0].split("/")[1].split(";")[0];
        headers.method = "post";
        headers.body = JSON.stringify({ id, image, extension });
        const response = await this.makeRequest(url + "/upload-image");
        return response;
      };
    }
  };
}
