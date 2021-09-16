import axios from "axios";

const API_URL = "https://funetus-api.herokuapp.com/auth/";

class AuthService {

    login(data) {
        var config = {
            method: 'post',
            url: API_URL + 'login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
            .then(function (response) {
                if(response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    loginWorker(data) {
        var config = {
            method: 'post',
            url: API_URL + 'workerLogin',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };
        return axios(config)
            .then(function (response) {
                if(response.data) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();