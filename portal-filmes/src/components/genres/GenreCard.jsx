import {Link} from 'react-router-dom'

export default function GenreCard({name}){
    return(
        <>
            <Link className='w-auto' to={`/genres/${name}`}>
                <div className='bg-primary_color w-64 h-28 relative rounded-xl'>
                    <h3 className="text-lg text-white font-bold absolute bottom-4 right-4">{name}</h3>
                </div>
            </Link>
        </>
    )
}