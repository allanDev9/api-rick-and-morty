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
    <div>
      <div className={`text-4xl font-extrabold ${theme ? 'text-blue-900' : 'text-yellow-300'}`}>Api Rick And Morty</div>
      <input className={`border border-gray-400 mt-10 mr-210 p-2 w-[250px] rounded-4xl text-white ${theme ? 'border-black bg-gray-600 text-black' : 'border-white text-black'}`} type="text" placeholder="Buscar personaje..." value={searchcharacter} onChange={handleSearchChange} />
      <article className="grid grid-cols-3 gap-10 mt-10">
        {filterCharacter.map((character: CharactersType) => (
          <section className={`text-start rounded-3xl border border-blue-700 p-5 hover:scale-110 hover:border-white transition duration-300 ${theme ? 'text-black border-gray-700 bg-gray-400' : 'text-white'}`} key={character.id}>
            <img className='rounded-3xl hover:sepia-50 transition duration-300 ease-in-out' src={character.image} alt={character.name}></img>
            <div className="flex flex-col">
              <h2>{character.name}</h2>
              <span>{character.status}</span>
              <span>{character.species}</span>
            </div>
          </section>
        ))}
      </article>
    </div>
  )
}

export default Characters;