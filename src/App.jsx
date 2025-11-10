import React, { useCallback, useEffect, useRef, useState } from 'react'

export const App = () => {
    const [length, setLength] = useState(8)
    const [numberAllowed, setNumberAllowed] = useState(false)
    const [charAllowed,setCharAllowed] = useState(false)
    const [password,setPassword] = useState("")

    const passwordGenerator=useCallback(() => {
        let pass=""
        let str=
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if (numberAllowed) str+="0123456789"
        if (charAllowed) str+="!@#$%^&*()_+=[]{}"

        for (let i = 1; i <= length; i++) {
           let char = Math.floor(Math.random()*str.length + 1)
            
           pass+= str.charAt(char)
        }
        setPassword(pass)
             
        
    } ,[length,numberAllowed,charAllowed,setPassword])

    const copypasswordtoClipboard = useCallback(()=>{
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0,10);
        window.navigator.clipboard.writeText(password)
    },[password])

    useEffect(() => {passwordGenerator()
    },[length,numberAllowed,charAllowed,passwordGenerator])

    const passwordRef = useRef(null)
  return (
    <>
   <div className="w-full max-w-md mx-auto my-8 px-4">
  <div className="bg-gray-700 text-orange-500 shadow-md rounded-lg p-4">
    <h1 className='text-white text-center text-xl my-2'>Password Generator</h1>
    <div className="flex items-center gap-2 mb-4 bg-gray-800 rounded-lg overflow-hidden shadow-inner">

      <input
        type="text"
        value={password}
        readOnly
        placeholder="Password"
        ref={passwordRef}
        className="w-full px-3 py-2 bg-transparent text-white outline-none placeholder-gray-400"
      />
      <button
      onClick={copypasswordtoClipboard}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition-colors duration-200"
      >
        Copy
      </button>
    </div>
    <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
            <input
             type="range"
             min={6}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{setLength(e.target.value)}}
                   />
             <label>Length:{length}</label>      
        </div>
        <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            id="numberInput"
            defaultChecked={numberAllowed}
            onChange={()=>{
                setNumberAllowed((prev) => !prev);
            }} 
        />
        <label htmlFor="numberInput">Numbers</label>
        </div>

            <div className="flex items-center gap-x-2">
            <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => 
                    setCharAllowed((prev) => !prev)}
                
            />
            <label htmlFor="charInput">
                Characters
            </label>
                </div>

    </div>
  </div>
</div>


    </>
  )
}
export default App