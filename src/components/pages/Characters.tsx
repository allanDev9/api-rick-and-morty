import { useEffect, useState } from "react"
import type { Characters as CharactersType } from "./interface/Character"
import type { CharacterProps } from "./interface/PropsTypes/CharacterProps"


const Characters = ({ title, setTitle }: CharacterProps) => {
  const [character, setCharacter] = useState<CharactersType[]>([])

  useEffect(() => {
    const fetchingCharacters = async () => {
      try {
        const response = await fetch('https://rickandmortyapi.com/api/character')
        const data = await response.json()
        setCharacter(data.results)

      } catch (error) {
        console.error('Error con el fetchingCharacters', error)
      }
    }
    fetchingCharacters();
  })

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle)
    localStorage.setItem('title', newTitle)
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-red-700">{title}</h1>
      <div className="text-3xl font-extrabold text-yellow-300">Api Rick And Morty</div>
      <article className="grid grid-cols-3 gap-10 mt-10">
        {character.map((character: CharactersType) => (
          <section className="text-white text-start rounded-3xl border border-blue-700 p-5 hover:scale-110 hover:border-white transition duration-1000 ease-in-out" key={character.id} onClick={() => handleTitleChange(character.name)}>
            <img className='rounded-3xl hover:sepia-50 transition duration-1000 ease-in-out' src={character.image} alt={character.name}></img>
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