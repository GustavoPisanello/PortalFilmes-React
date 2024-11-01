import {Link} from 'react-router-dom'

export default function PageNotFound(){
    return(
        <>
            <section className="w-screen h-screen flex justify-center items-center">
                <div className="w-[80%] h-full flex justify-center items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="font-[Bebas] text-[300px] text-white">404</h1>
                        <p className='text-white font-[Raleway]'>Ops... Não conseguimos encontrar essa página. <Link className='italic'>Voltar ao início</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}