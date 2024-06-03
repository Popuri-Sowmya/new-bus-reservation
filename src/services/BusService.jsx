import axios from "axios"

const BASE_REST_API_URL="http://localhost:8095/api/bus"
class BusService{
    getAllBuses(token){
        return axios.get(BASE_REST_API_URL+"/getAll",
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    addBus(bus,token){
        return axios.post(BASE_REST_API_URL+"/",bus,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    updateBus(id, bus,token){
        return axios.put(BASE_REST_API_URL+"/update/"+id,bus,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    deleteBus(busid,token){
        return axios.delete(BASE_REST_API_URL+"/delete/"+busid,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    getRouteByRouteId(routeId,token) {
        return axios.get("http://localhost:8095/api/route/get/" + routeId,
        { headers: {"Authorization" : `Bearer ${token}`} });
    }
    getBusesbySearch(source,destination,date){
        return axios.get(BASE_REST_API_URL+"/search", {
            params: {
                routeFrom : source,
                routeTo : destination,
                busJourneyDate : date
            }
          })
    }
    getBusesbyPrice(minPrice,maxPrice){
        return axios.get(BASE_REST_API_URL+"/byprice",{
            params: {
                minPrice : minPrice,
                maxPrice : maxPrice
            }
        })
    }
    getBusbyId(busid,token){
        return axios.get(BASE_REST_API_URL+"/get/"+busid,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
}
export default new BusService();