import { Button, TextField } from "@radix-ui/themes"
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { Loader2 } from "lucide-react" 

interface ISignUpData {
    name: string,
    login: string,
    password: string,
    confirm_password: string
}

const SignUp = () => {

    const navigate = useNavigate()
    const handleNavigate = () => navigate('/signin')

    const {
        register,
            handleSubmit,
            formState: { errors }
        } = useForm<ISignUpData>()

    const onSubmit = (data: ISignUpData) => {
        console.log("verifica")
        if (data.name && data.login && data.password && data.confirm_password && data.password === data.confirm_password) {
            setRequestErr(0)
            createUserRequest(data)
        } else setRequestErr(300)
    }

    
    // controle de erros 
    // 0 - sem erros
        // 300 - informações incorretas 
        // 400 - bad request (informações inválidas)
        // 500 - erro no request
    const [requestErr, setRequestErr] = useState< 0 | 300 | 400 | 500 >(0)

    const [isRequesting, setIsRequesting] = useState<boolean>(false)

        
    const createUserRequest = async (info: ISignUpData) => {
        console.log("manda")
        setIsRequesting(true)
        await fetch("http://localhost:3000/users", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: info.name,
                login: info.login,
                password: info.password
            })
        }).then(data => {
            setIsRequesting(false)
            data.json()
            console.log(data)
            handleNavigate()
        }).catch((err: any) => {
            setIsRequesting(false)
            console.log(err)
            setRequestErr(500)
        })
    }

    return (
        <>
            <Header/>
            <form className="w-[300px] h-[400px] flex flex-col gap-2 m-auto mt-20" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-3xl font-bold text-center">Cadastro</p>
                <TextField.Input placeholder="Nome" type="text" size="3" {...register("name", {required: true})}/>
                <TextField.Input placeholder="Login" type="text" size="3" {...register("login", {required: true})}/>
                <TextField.Input placeholder="Senha" type="password" size="3" {...register("password", {required: true})} onChange={() => {if (requestErr === 300) setRequestErr(0)}}/>
                <TextField.Input placeholder="Confirmar Senha" type="password" size="3" {...register("confirm_password", {required: true})} onChange={() => {if (requestErr === 300) setRequestErr(0)}}/>

                <div className="h-auto text-red-600 font-sans font-bold text-xs">
                    
                    {requestErr === 300 && <p>Senhas não correspondentes</p>}
                    {requestErr === 400 && <p>Informações inválidas</p>}
                    {requestErr === 500 && <p>Erro inesperado! Tente novamente mais tarde.</p>}
                    {(
                        errors.login?.type === "required" || 
                        errors.password?.type === "required" ||
                        errors.name?.type === "required" || 
                        errors.confirm_password?.type === "required"
                    )
                    && <p className="text-red-600 font-bold text-xm" role="alert">Todos os campos são obrigatórios!</p>}    
                </div>

                <div className="w-full flex justify-evenly mt-5">
                    <Button variant="soft" style={{width: "40%", cursor: "pointer"}} onClick={handleNavigate}>Entrar</Button>
                    <Button variant="solid" style={{width: "40%", cursor: "pointer"}} type="submit" disabled={isRequesting}>{isRequesting ? <Loader2 className="animate-spin"/> : "Criar"}</Button>
                </div>
            </form>
        </>
    )
}

export { SignUp }