export default function LoginButton({isLogged, handleLogin}){
    return (
    <>
        <div className="flex gap-10 items-center">
            {isLogged && "Olá, usuário!"}
            <button onClick={handleLogin} className="bg-white text-primary_color font-bold py-1 px-4 rounded-md">
                {isLogged ? "Logout" : "Login"}
            </button> 
        </div>
    </>
    )
}