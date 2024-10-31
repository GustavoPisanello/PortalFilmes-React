export default function CastCard({ name, role, character, profile_path }) {
    return (
        <div className="flex flex-col cast-card gap-y-2">
            <div>
                {profile_path ? (<img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={name} />) :
                ("")
            }
            </div>
            <div className="text-center">
                <h3 className="text-sm">{name}</h3>
                {role === "Acting" ? (<p className="text-xs text-primary_color">{character}</p>) :
                    (<p className="text-xs text-primary_color">{role}</p>) }
            </div>
        </div>
    );
}
