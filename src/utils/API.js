import axios from "axios";
const BASEURL = "https://dummyapi.io/data/api/user?limit=20";
const APPID = "5fcd81ef78c44ac777e4ad92";
// eslint-disable-next-line
export default {
    users: function () {
        return axios.get(BASEURL, { headers: { 'app-id': APPID } })
    }
};
