import { useEffect, useState } from 'react';
import Characters from './components/pages/Characters';

function App() {
  const [title, setTitle] = useState<string>(localStorage.getItem('title') || 'Pedro')

  useEffect(() => {
    localStorage.setItem('title', title)
  }, [title])

  return (
    <>
      <div className='flex justify-center flex-row bg-black p-10 text-center'>
        <Characters title={title} setTitle={setTitle} />
      </div>
    </>
  )
}

export default App
