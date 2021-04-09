import axios from "axios";

const URL = "http://localhost:8080/api/auth/"

class AuthService { 
    login(user) { 
        return axios 
            .post(URL + "signin", {
                identification: user.identification,
                password: user.password,
            })
            .then((response) => {
                if(response.data.token) {
                    localStorage.setItem("user", response.data.token, {expires: 1});
                }
                return response.data;
            });
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

    checkUniqueExists(user) {
        return axios
            .post(URL + "checkUniqueExists", {
                username : user.username,
                email : user.email,
            })
            .then((response) => {
                console.log("response " + response);
                return response.data;
            })
            .catch(() => { 
                return "err";
            });
    }
}

export default new AuthService();