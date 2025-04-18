import { useEffect, useState } from 'react';
import Characters from './components/pages/Characters';
import './colors.css'
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';

function App() {
  const [theme, setTheme] = useState<boolean>(() => {
    const saveTheme = localStorage.getItem('theme')
    return saveTheme === 'light' || saveTheme === 'dark';
  })

  useEffect(() => {
    const saveTheme = localStorage.getItem('theme')
    if (saveTheme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
      setTheme(true)
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
      setTheme(false)

    }
  }, [])

  const handletoggleMode = () => {
    const newMode = theme ? 'dark' : 'light'
    setTheme(!theme)

    document.body.classList.toggle('dark-theme', newMode === 'dark')
    document.body.classList.toggle('light-theme', newMode === 'light')

    localStorage.setItem('theme', newMode)
  }

  return (
    <>
      <div className={`flex justify-center flex-row bg-black p-10 text-center ${theme ? 'ligth-theme' : 'dark-theme'}`}>
        <div className='flex'>
          <button className={`text-black h-[50px] w-[55px] rounded-4xl p relative left-275 max-sm:left-75 max-sm:w-[40px] max-sm:h-[35px] transition duration-300 ease-in-out ${theme ? 'bg-black text-white hover:bg-gray-800 border border-black ' : 'bg-white text-black hover:bg-gray-200'}`} onClick={handletoggleMode}>
            {theme ? <NightlightRoundIcon /> : <WbSunnyIcon />}
          </button>
        </div>
        <Characters theme={theme} />
      </div>
    </>
  )
}

export default App
