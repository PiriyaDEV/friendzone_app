import axios from "axios";

const URL = "http://localhost:8080/api/gender/"

class GenderService { 
    async getGenderList() { 
        const res = await axios.get(URL + "getGenderList");
        return res.data;
    }
}

export default new GenderService();