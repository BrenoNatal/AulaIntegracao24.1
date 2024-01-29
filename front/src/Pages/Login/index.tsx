import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import clientService from "../../services/clientService";




type LoginData = {
    email: string
    password: string
}

type RegisterData = {
    email:string
    password:string
    cpf:number
    firstName: string
    lastName: string
}

type Client = {
    id: number
    cpf: string
    firstName: string
    lastName: string
}

export default function LoginPage() {

    const [clients, setClients] = useState<Array<Client>>();
    

    const { handleSubmit: handlesubmitLogin, formState: { errors: errorsLogin }, register:Login } = useForm<LoginData>()
    const { handleSubmit: handlesubmitRegister, formState: { errors: errorsRegister }, register:Register } = useForm<RegisterData>()


    const onSubmit: SubmitHandler<LoginData> = (data) => {
        console.log(data)
        clientService.login(data).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
    }

    const onSubmitRegister: SubmitHandler<RegisterData> = (data) => {
        console.log(data)
        clientService.register(data).then(response => {
            console.log(response)
        }).catch(e => {
            console.log(e)
        })
        
    }

    const getDetails = () => {
        clientService.getDetails().then(response => {
            console.log(response?.data)
        }).catch(e => {
            console.log(e)
        })
    }

    const getClients = () => {
        clientService.getClients().then(response => {
            console.log(response?.data)
            setClients(response?.data)

        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handlesubmitLogin(onSubmit)}>
                <input {...Login("email")} required placeholder="Email" />
                <input type="password" {...Login("password")} required placeholder="Senha"/>
                <button>Submit</button>
            </form>

            <h2>Cadastro</h2>
            <form onSubmit={handlesubmitRegister(onSubmitRegister)} style={{flex:''}}>
                <input {...Register("email")} required placeholder="Email" />
                <input type="password" {...Register("password")} required placeholder="Senha"/>
                <input {...Register("firstName")} required placeholder="Primeiro Nome"/>
                <input {...Register("lastName")} required placeholder="Ultimo Nome"/>
                <input {...Register("cpf")} required placeholder="CPF"/>
                <button>Submit</button>
            </form>

            <button onClick={getClients}>Get Details</button>

            {clients?.map(client => {
                return (
                    <h1>{client.cpf}</h1>
                )
            })}


            <button onClick={getDetails}>Get Details</button>
        </div >
    )
}