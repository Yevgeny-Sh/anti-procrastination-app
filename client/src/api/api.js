import axios from "axios";
let myUrl = "http://localhost:5000/api"; //development

//for production
if (process.env.NODE_ENV === "production") {
  myUrl = "api";
}

export default axios.create({
  baseURL: myUrl,
});
