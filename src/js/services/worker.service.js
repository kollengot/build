import axios from 'axios';

const API_URL = "https://funetus-api.herokuapp.com/";

class WorkerService {

    updateWorkerProfile(id, data) {
        var config = {
            method: 'put',
            url: API_URL + 'worker/' + id,
            data: data
        };
        return axios(config)
            .then(function (response) {
                console.log(response);
                return response;
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

export default new WorkerService();