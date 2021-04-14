import axios from "axios";

const URL = "http://localhost:8080/api/auth/"

class AuthService { 
    async login(user) { 
        const response = await axios
            .post(URL + "signin", {
                identification: user.identification,
                password: user.password,
            });
        if (response.data.token) {
            localStorage.setItem("user", response.data.token, { expires: 1 });
        }
        return response.data;
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(user) {
        return axios.post(URL + "signup", {
            username : user.username,
            password : user.password,
            email : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            birthdate : user.birthdate,
            gender_id : user.gender_id,
            bio : user.bio,
        });     
    }

    async checkUniqueExists(user) {
        const res = await axios.post(URL + "checkUniqueExists", {
            username: user.username,
            email: user.email,
        });
        if (res) {
            return res.data;
        }
    }
}

export default new AuthService();