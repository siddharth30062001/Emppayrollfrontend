import axios from "axios";

class UserService{
    addEmployee(Object,imageUrl){
        return axios.post("http://localhost:8082/addEmp",Object,{
            params: {
                imageUrl:imageUrl
            }
        })
    }

    getAllEmployee(){
        return axios.get("http://localhost:8082/getAllEmp")
    }

    deleteEmployee(id){
        return axios.delete(`http://localhost:8082/deleteEmp/${id}`)
    }

    getEmployee(id){
        return axios.get(`http://localhost:8082/getEmp/${id}`)
    }

    updateEmployee(id,Object,imageUrl){
        return axios.put(`http://localhost:8082/updateEmp/${id}`,Object,{
            params: {
                imageUrl:imageUrl
            }
        })
    }
    }
export default new UserService();