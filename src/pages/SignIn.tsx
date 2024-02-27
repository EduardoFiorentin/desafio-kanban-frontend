import { Button, TextField } from "@radix-ui/themes"
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
// import dotenv from 'dotenv';

// dotenv.config()

interface ISignInData {
    login: string,
    password: string
}

const SignIn = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<ISignInData>()

    const navigate = useNavigate()
    const handleNavigate = (route: string) => navigate(route)

    const [viewPass, setViewPass] = useState<boolean>(false)
    const [err, setErr] = useState<0 | 400 | 500>(0)

    const handleClick = () => setViewPass(!viewPass)

    const logIn = async (login: string, password: string) => {
        setErr(0)
        await fetch("http://localhost:3000/auth", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login,
                password
            })
            
        })
        .then(data => data.json())
        .then(data => {
            if (data.status === 200) {
                localStorage.setItem('user', JSON.stringify(data.data[0]))
                handleNavigate('/board')
            } else if (data.status === 400) {
                setErr(400)
            } else {
                setErr(500)
            }       

        })
        .catch(err => console.log("err", err))

    }

    const onSubmit = (data: ISignInData) => {

        console.log(data)

        if (data.login && data.password) {
            logIn(data.login, data.password)
        }

    }

    return (
        <>
            <Header/>
            <form className="w-[300px] h-[400px] flex flex-col gap-2 m-auto mt-20" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-3xl font-bold text-center">Login</p>
                <TextField.Input placeholder="Login" type="text" size="3" {...register("login", {required: true})}/>
                <TextField.Root size="3" className="relative">
                    <TextField.Input placeholder="Senha" size="3" className="" type={viewPass ? "text" : "password"} {...register("password", {required: true})}/>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-10 bg-white m-1" onClick={handleClick}>
                        {viewPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </div>
                </TextField.Root>
                <div className="h-[10px] text-red-600 font-sans font-bold">
                    {err === 400 && <p>Login ou Senha incorretos!</p>}
                    {err === 500 && <p>Não foi possível autenticar! Tente novamente mais tarde.</p>}
                </div>

                <div className="w-full flex justify-evenly mt-5">
                    <Button variant="soft" style={{width: "40%", cursor: "pointer"}} onClick={() => handleNavigate("/signup")}>Criar Conta</Button>
                    <Button variant="solid" style={{width: "40%", cursor: "pointer"}}>Entrar</Button>
                </div>
            </form>
        </>
    )
}

export { SignIn }