import { useEffect, useState } from "react"
import type { Characters as CharactersType } from "./interface/Types"
import type { CharacterProps } from "./interface/Props"


const Characters = ({ theme }: CharacterProps) => {
  const [character, setCharacter] = useState<CharactersType[]>([])
  const [searchcharacter, setSearchCharacter] = useState<string>('')
  const [filterCharacter, setFilterCharacter] = useState<CharactersType[]>(character)

  useEffect(() => {
    const fetchingCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        setCharacter(data.results)
        setFilterCharacter(data.results)

      } catch (error) {
        console.error('Error con el fetchingCharacters', error)
      }
    }
    fetchingCharacters();
  }, [])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchCharacter = event.target.value.toLowerCase();
    setSearchCharacter(searchCharacter)

    const filteredCharacters = character.filter(character => {
      return character.name.toLowerCase().includes(searchCharacter)
    })
    setFilterCharacter(filteredCharacters)
  }

  return (
    <div className="max-sm:grid max-sm:grid-cols-1 max-sm:place-items-center max-sm:mr-7">
      <div className={`text-4xl font-extrabold ${theme ? 'text-blue-900' : 'text-yellow-300'}`}>
        Api Rick And Morty
      </div>
      <input
        className={`border mt-20 p-2 w-[280px] rounded-4xl max-sm:mr-0 ${theme ? 'border-black text-black' : 'border-gray-400 text-white'}`}
        type="text"
        placeholder="Buscar personaje..."
        value={searchcharacter}
        onChange={handleSearchChange}
      />
      <section className="flex flex-col h-[80vh] gap-10 mt-10 max-sm:flex-col max-sm:h-[80vh] bg-blue-800 max-sm:m-h-[10vh] max-sm:w-[100%] border-2 border-black rounded-xl max-w-[1000px] overflow-x-hidden overflow-y-auto p-10 max-sm:px-5 max-sm:py-5">
        {filterCharacter.length > 0 ? (
          filterCharacter.map((character: CharactersType) => (
            <li key={character.id} className="max-sm:ml-4 list-none bg-blue-400 max-sm:w-[200px] w-[300px] h-[400px] flex flex-col items-center rounded-md">
              <img
                src={character.image}
                alt={character.name}
                className="object-cover w-[298px] h-[26
                80px] rounded-md" // Cambiado a object-contain
              />
              <div className="text-center p-5">
                <p className="font-bold">{character.name}</p>
                <p>{character.status}</p>
                <p>{character.species}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-2xl text-white font-mono font-bold relative top-40">No se encontraron caracteres</p>
        )}
      </section>
    </div>
  )
}

export default Characters;