import axios from "axios"

const BASE_REST_API_URL="http://localhost:8095/api/route"

class RouteService{
    getAllRoutes(){
        return axios.get(BASE_REST_API_URL+"/getAll")
    }
    addRoute(route,token){
        return axios.post(BASE_REST_API_URL+"/add",route,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    getRouteById(id,token){
        return axios.get(BASE_REST_API_URL+"/get/"+id,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    updateRoute(id,route,token){
        return axios.put(BASE_REST_API_URL+"/update/"+id,route,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteRoute(id,token){
        return axios.delete(BASE_REST_API_URL+"/delete/"+id,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
}
export default new RouteService();