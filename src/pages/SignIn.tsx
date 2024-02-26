import { Button, Flex, TextField } from "@radix-ui/themes"
import { Header } from "../components/Header"
import { Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const SignIn = () => {

    const navigate = useNavigate()
    const handleNavigate = () => navigate('/signup')

    const [viewPass, setViewPass] = useState<boolean>(false)

    const handleClick = () => setViewPass(!viewPass)

    return (
        <>
            <Header/>
            <div className="w-[300px] h-[400px] flex flex-col gap-2 m-auto mt-20">
                <p className="text-3xl font-bold text-center">Login</p>
                <TextField.Input placeholder="Login" type="text" size="3"/>
                <TextField.Root size="3" className="relative">
                    <TextField.Input placeholder="Senha" size="3" className="" type={viewPass ? "text" : "password"}/>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-10 bg-white m-1" onClick={handleClick}>
                        {viewPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </div>
                </TextField.Root>
                {/* <TextField.Input placeholder="Enter your email" /> */}

                <div className="w-full flex justify-evenly mt-5">
                    <Button variant="soft" style={{width: "40%", cursor: "pointer"}} onClick={handleNavigate}>Criar Conta</Button>
                    <Button variant="solid" style={{width: "40%", cursor: "pointer"}}>Entrar</Button>
                </div>
            </div>
        </>
    )
}

export { SignIn }