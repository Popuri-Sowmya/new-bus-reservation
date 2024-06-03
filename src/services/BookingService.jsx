import axios from "axios"

const BASE_REST_API_URL="http://localhost:8095/api/bookings"
class BookingService{

    addBooking(booking,token){
        return axios.post(BASE_REST_API_URL+"/add",booking,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
    
    addBookingwithids(booking,userid,busid,token){
        return axios.post(BASE_REST_API_URL+"/user/"+userid+"/bus/"+busid,booking,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }

    getbyUserid(userid,token){
        return axios.get(BASE_REST_API_URL+"/getbyuser/"+userid,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }

    updateBooking(bookingid,booking,token){
        return axios.put(BASE_REST_API_URL+"/update/"+bookingid,booking,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }

    getAllBookings(token){
        return axios.get(BASE_REST_API_URL+"/getAll",
        { headers: {"Authorization" : `Bearer ${token}`} })
    }

    getBookingById(bookingid,token){
        return axios.get(BASE_REST_API_URL+"/get/"+bookingid,
        { headers: {"Authorization" : `Bearer ${token}`} })
    }
}
export default new BookingService();