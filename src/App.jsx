import { useCallback, useEffect, useRef, useState } from 'react'


function App() {
  const [length, setLength] = useState(8)
  const [numallow, setNumallow] = useState(false)
  const [charallow, setCharallow] = useState(false)
  const [password, setPassword] = useState("")
  
  const passRef=useRef(null)
  const passwordGen = useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numallow) str += "0123456789"
    if(charallow) str += "~!#$@%^&*(){}`[]+=*-/"
    for(let i=1;i<=length;i++){
      let char =Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numallow,charallow,setPassword])
  
 const copypassANDpaste=useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,8);
    window.navigator.clipboard.writeText(password);
  },[password])
  
  useEffect(()=>{
    passwordGen()
  },[length,numallow,charallow,passwordGen])
  return (
    <>
      {/* <h1 className='my-3 text-4xl text-center'>Password Generator</h1> */}
      <div className='w-full max-w-md mx-auto my-6 text-orange-500 bg-gray-700 rounded-lg shadow-md px-9'>
      <h1 className='my-3 text-4xl text-center'>Password Generator</h1>
        <div className='flex overflow-hidden rounded-lg shadow mp-4'>
          <input
          type='text'
          value={password}
          className='w-full px-2 py-1 outline-none'
          placeholder='password'
          readOnly
          ref={passRef}
          />
          <button onClick={copypassANDpaste} className='px-3 py-0.5 text-white bg-blue-700 outline-none shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex text-center gap-x-1'>
            <input
            type='range' 
            min={6}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
            />
            <lebel>Length:{length}</lebel>
          </div>
          <div className='flex text-center gap-x-1'>
            <input
            type='checkbox' 
            defaultChecked={numallow}
            
            id='NumberInput'
            onChange={()=>{setNumallow((prev)=>!prev);}}
            />
            <lebel htmlFor="NumberInput">Number</lebel>
          </div>
          <div className='flex text-center gap-x-1'>
            <input
            type='checkbox' 
            defaultChecked={charallow}
           
            id='CharacterInput'
            onChange={()=>{setCharallow((prev)=>!prev);}}
            />
            <lebel htmlFor="CharacterInput">Character</lebel>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
