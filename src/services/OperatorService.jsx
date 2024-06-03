import axios from "axios"

const BASE_REST_API_URL="http://localhost:8095/api/operators"

class OperatorService{
    getAllOperators(token){
        return axios.get(BASE_REST_API_URL+"/getAll",
        { headers: {"Authorization" : `Bearer ${token}`} }
        )
    }
    addOperator(operator,token){
        return axios.post(BASE_REST_API_URL+"/",operator,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    getOperatorById(operatorid,token){
        return axios.get(BASE_REST_API_URL+"/get/"+operatorid,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    updateOperator(operatorid,operator,token){
        return axios.put(BASE_REST_API_URL+"/update/"+operatorid,operator,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteOperator(operatorId,token){
        return axios.delete(BASE_REST_API_URL+"/delete/"+operatorId,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
}
export default new OperatorService();