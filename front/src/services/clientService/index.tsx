import api from "../api";

interface dataLogin {
    email: string;
    password: string;
}

interface dataRegister {
    email:string
    password:string
    cpf:number
    firstName: string
    lastName: string
}

export default {
    async login(data: dataLogin){
        try {

            const response = api.post("/login", data, {
                withCredentials: true
            });
            return response;
            
        } catch (e) {
            console.log(e)
        }
    },

    async register(data: dataRegister) {
        try {
            const response = api.post("/Client", data);
            return response;
        } catch (e) {
            console.log(e)
        }
    },

    async getDetails() {
        try {
            const response = api.get("/getDetails", {
            withCredentials: true
            });
            return response;
        } catch (e) {
            console.log(e);

        }
    },

    async getClients() {
        try {
            const response = api.get("/clients");
            return response;
        } catch (e) {
            console.log(e);

        }
    }
}