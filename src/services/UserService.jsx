import axios from 'axios';

const BASE_URL = "http://localhost:8095/api/users";

class UserService {
    getAllUsers(token) {
        return axios.get(BASE_URL + '/getAll',
        { headers: {"Authorization" : `Bearer ${token}`} });
    }
    createUser(userobj) {
        return axios.post(BASE_URL + '/new' , userobj);
    }
    getUserbyid(userId,token) {
        return axios.get(BASE_URL + '/get/' + userId,
        { headers: {"Authorization" : `Bearer ${token}`} });
    }
    updateUser(userId, userObj) {
        return axios.put(BASE_URL + '/updateuser/' + userId, userObj);
    }
    deleteUser(userId, token) {
        return axios.delete(BASE_URL + '/delete/' + userId,
        { headers: {"Authorization" : `Bearer ${token}`} });
    }
    saveUserRegistration(user) {
        return axios.post(BASE_URL + '/register', user);
    }
    userlogin(user) {
        return axios.post(BASE_URL + '/authenticate', user);
    }
    getbyUsername(username){
        return axios.get(BASE_URL+"/username",{
            params: {
                username : username
            }
        })
    }
}
export default new UserService();
