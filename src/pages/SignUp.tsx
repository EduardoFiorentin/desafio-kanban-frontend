import { Button, TextField } from "@radix-ui/themes"
import { Header } from "../components/Header"
import { useNavigate } from "react-router-dom"

const SignUp = () => {

    const navigate = useNavigate()
    const handleNavigate = () => navigate('/signin')

    return (
        <>
            <Header/>
            <div className="w-[300px] h-[400px] flex flex-col gap-2 m-auto mt-20">
                <p className="text-3xl font-bold text-center">Cadastro</p>
                <TextField.Input placeholder="Nome" type="text" size="3"/>
                <TextField.Input placeholder="Login" type="text" size="3"/>
                <TextField.Input placeholder="Senha" type="password" size="3" />
                <TextField.Input placeholder="Confirmar Senha" type="password" size="3"/>
                {/* <TextField.Input placeholder="Enter your email" /> */}

                <div className="w-full flex justify-evenly mt-5">
                    <Button variant="soft" style={{width: "40%", cursor: "pointer"}} onClick={handleNavigate}>Entrar</Button>
                    <Button variant="solid" style={{width: "40%", cursor: "pointer"}}>Criar</Button>
                </div>
            </div>
        </>
    )
}

export { SignUp }