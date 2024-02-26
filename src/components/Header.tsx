interface IHeaderProps {
    profileInfo?: {
        name: "Eduardo"
    }
}

const Header = ({profileInfo}: IHeaderProps) => {
    return (
        <header className="flex w-full h-auto flex-start p-5 items-center justify-between px-10 border border-b-1 border-b-slate-200">
            <img src="..\src\assets\img\logo.png" alt="" className=""/>
            <div>
                <p>{profileInfo?.name}</p>
                <img src="" alt="" className="hidden"/>
            </div>
        </header>
    )
}

export { Header }