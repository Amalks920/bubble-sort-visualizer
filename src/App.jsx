import React, { useState } from 'react'
import './App.css'
import BubbleSort from './BubbleSort'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BubbleSort/>
    </div>
  )
}

export default App
