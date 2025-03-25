import { useState } from 'react';
import Characters from './components/pages/Characters';

function App() {
  const [title, setTitle] = useState<string>('Pedro')

  return (
    <>
      <div className='flex justify-center flex-row bg-black p-10 text-center'>
        <Characters title={title} />
      </div>
    </>
  )
}

export default App
