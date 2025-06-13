import { useForm } from "@inertiajs/react"

export default function Navbar() {
    const {post} = useForm()


    const handleLogout = () => {
        post(route("logout"))
    }


    return (
        <nav className="w-full h-14 bg-(--orange) px-8 flex justify-between items-center text-white">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">Petshop Site</h1>
                <svg  width="32" height="32" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.084 21.1249C18.084 18.2189 15.727 15.8624 12.8204 15.8624C9.91384 15.8624 7.55786 18.2189 7.55786 21.1249C7.55786 24.033 9.91332 26.3885 12.8204 26.3885C15.7275 26.3885 18.084 24.033 18.084 21.1249Z" fill="#FFF"/>
                <path d="M39.0724 16.8904C36.1663 16.8904 33.8098 19.2469 33.8098 22.1529C33.8098 25.0611 36.1663 27.4155 39.0724 27.4155C41.9789 27.4155 44.3354 25.0611 44.3354 22.1529C44.3354 19.2469 41.9795 16.8904 39.0724 16.8904Z" fill="#FFF"/>
                <path d="M34.2925 28.0112C33.9267 27.5603 33.4088 27.0382 32.8141 26.4907C31.2272 24.4342 28.7451 23.1036 25.947 23.1036C23.4566 23.1036 21.2179 24.1581 19.6357 25.8384C18.7369 26.6205 17.9377 27.3838 17.4291 28.0118L17.0887 28.4274C15.5008 30.3636 13.5241 32.7725 13.5387 36.8602C13.5527 40.6562 16.644 43.7465 20.4291 43.7465C22.591 43.7465 24.5723 42.747 25.8608 41.0693C27.1483 42.747 29.1301 43.7465 31.2941 43.7465C35.0777 43.7465 38.1685 40.6567 38.183 36.8602C38.1975 32.7725 36.2204 30.3636 34.633 28.4274L34.2925 28.0112Z" fill="#FFF"/>
                <path d="M26.3118 19.7466C29.5146 19.7466 32.111 17.1503 32.111 13.9475C32.111 10.7447 29.5146 8.14836 26.3118 8.14836C23.1091 8.14836 20.5127 10.7447 20.5127 13.9475C20.5127 17.1503 23.1091 19.7466 26.3118 19.7466Z" fill="#FFF"/>
                </svg>
            </div>


            <ul className="flex items-center gap-4">
                <li className="hover:font-bold hover:cursor-pointer">Atendimentos</li>
                <li className="hover:font-bold hover:cursor-pointer">Meus Pets</li>
                <li className="hover:font-bold hover:cursor-pointer" onClick={handleLogout}>Sair</li>
            </ul>
        </nav>
    )
}
