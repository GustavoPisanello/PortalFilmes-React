import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom'
import {useState} from 'react';
import LoginButton from './LoginButton';

export default function Header(){

    const [isLogged, setIsLogged] = useState(false);

    const handleLogin = () => {
        setIsLogged(prev => !prev)
    }

    return (
        <>
            <header className="w-full bg-primary_color h-10 flex justify-between items-center p-10 text-white border-b border-white font-[Raleway]">
                <div>
                    <Link to="/"className='font-[Bebas] text-3xl'>Portal filmes</Link>
                </div>

                <nav>
                    <ul className="flex gap-5">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/Movies">Filmes</NavLink></li>
                        <li><NavLink to="/Genres">Gêneros</NavLink></li>
                        <li><NavLink to="/MyList">Minhas Listas</NavLink></li>
                        {isLogged && <li><NavLink to="">Configurações</NavLink></li>}
                    </ul>
                </nav>
                <LoginButton isLogged={isLogged} handleLogin={handleLogin}/> 
            </header>
        </>
    )
}