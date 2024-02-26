import { useState } from "react"
import { Button, IconButton, TextField, Tooltip } from "@radix-ui/themes"
import { Header } from "../components/Header"
import { Plus, PlusIcon } from "lucide-react" 
import { charLimit } from "../utils/charLimit"

import { useForm, SubmitHandler } from "react-hook-form"

interface Ticket  {
    id_ticket: string,
    id_board: string,
	title: string,
	description: string,
	id_creator: string,
	id_accountable: string,
	type: 'Bem'|'Predial'|'Procedimento'
}

interface Column {
    title: string,
    description?: string,
    cards: Ticket[]
}

type NewColumn = {
    newColumnTitle: string,
    newColumnDescription: string
}

const Board = () => {
    const [columns, setColumns] = useState<Column[]>([
        {
            title: "a fazer", 
            description: "description board",
            cards: [
                {
                    description: "arrumar a label dos itens listados abaixo: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t", 
                    title:"title",
                    id_accountable: "wefgdf",
                    id_board: "dgderg",
                    id_creator: "dfgdert",
                    id_ticket: "dfgvcde",
                    type: "Bem"
                },
                {
                    description: "arrumar a label dos itens listados abaixo: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t", 
                    title:"title",
                    id_accountable: "wefgdf",
                    id_board: "dgderg",
                    id_creator: "dfgdert",
                    id_ticket: "dfgvcde",
                    type: "Bem"
                },
                {
                    description: "arrumar a label dos itens listados abaixo: a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t", 
                    title:"title",
                    id_accountable: "wefgdf",
                    id_board: "dgderg",
                    id_creator: "dfgdert",
                    id_ticket: "dfgvcde",
                    type: "Bem"
                },
            ]
        }
    ])

    // controle da aba de criação de colunas

    const {
        register,
        handleSubmit    
    } = useForm()
    
    const [createColumn, setCreateColumn] = useState<boolean>(false)

    const toggleCreateColumn = () => {
        setCreateColumn(!createColumn)
    }

    const onSubmit: SubmitHandler<any> = (data: NewColumn) => {
        console.log(data)
        toggleCreateColumn()
        setColumns([...columns, {
            cards: [],
            title: data.newColumnTitle,
            description: data.newColumnDescription
        }])
    }


    const handleCreateColumn = () => {

    }

    const handleCreateTicket = () => {}

    return (
        <div className="w-screen h-screen max-w-screen max-h-screen absolute">
            <Header/>

        
        {
            /* Tela criar quadro */
            createColumn && (<div className="w-full h-full absolute bg-gray-800/50 top-1/2 translate-y-[-50%] left-1/2 
            translate-x-[-50%] z-10 flex justify-center items-center">
                    <form className="w-[450px] h-[300px] bg-white flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                        <p className="font-light text-2xl">Criar nova coluna</p>
                        <div className="w-[300px] h-[50%] flex flex-col justify-evenly">
                            <TextField.Input placeholder="Titulo" type="text" size="3" {...register("newColumnTitle")}/>
                            <TextField.Input placeholder="Descrissão" type="text" size="3" {...register("newColumnDescription")}/>
                        </div>
                        <div className="w-full flex justify-evenly mt-5">
                            <Button variant="soft" style={{width: "40%", cursor: "pointer"}} onClick={toggleCreateColumn}>Voltar</Button>
                            <Button variant="solid" style={{width: "40%", cursor: "pointer"}} type="submit">Criar</Button>
                        </div>
                    </form>
            </div>)
        }  


            <div className="w-screen h-[50px] flex justify-center items-center">
                <Button variant="soft" className="cursor-pointer" onClick={toggleCreateColumn}>
                    <Plus size={13}/>
                    Adicionar coluna
                </Button>
            </div>

            <div className="w-full h-auto flex justify-around">
                {
                    columns.map(item => {
                        return (
                            <ul className="w-[25%] border rounded-md">
                                <li className="p-3 text-center">
                                    <h2 className="font-bold uppercase">{item.title}</h2>
                                    <div className="flex">
                                        <p className="font-light w-[95%]">{item.description}</p>
                                        <Tooltip content="Adicionar ticket">
                                            <IconButton radius="full">
                                                <PlusIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </li>
                                {
                                    item.cards.map(col => {
                                        return (
                                            <li className="border m-2 p-1 rounded">
                                                <p className="font-medium text-md text-center">{col.title}</p>
                                                <p className="p-2">{charLimit(col.description)}</p>
                                            </li>
                                        ) 
                                    })
                                }
                            </ul>
                        )
                    })
                }
            </div>
        </div>
    )
}

export { Board }