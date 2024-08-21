import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(0);
  const [number, setNumber] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("Copy");

  const passwordRef = useRef(null); // useRef used to get reference of current element

  // useCallback hook
  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str += "0123456789";
    if(specialChar) str += "!#$%&()*+-/<=>?@[]^_{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length +1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  },[number, specialChar, length, setPassword])

  // function called, when you click on copy text
  async function copyText(){
    if(password){
     await navigator.clipboard.writeText(password).then(()=>{
        passwordRef.current.select();
      setCopy("Copied");
      setTimeout(()=>{
      setCopy("Copy");
    },1000);
      })
    }
  }
  // useEffect hook
  useEffect(()=>{
    passwordGenerator();
  }, [number,specialChar,length, passwordGenerator]);

  return (
    <div className=' w-full h-screen bg-[#0E0D12] flex'>
      <div className='w-full max-w-lg mx-auto mt-40'>
      <h2 className='font-bold text-stone-400 text-center mb-2'>Password Generator</h2>
      <div className='flex justify-between items-center overflow-hidden rounded-lg mb-3 gap-1 bg-[#23222B]'>
        <input
        value={password}
        ref={passwordRef}
        className='bg-transparent px-3 py-4 outline-none text-3xl font-semibold text-slate-200 cursor-default overflow-hidden w-4/5 '
        type="text" 
        placeholder='Pa$5W0rD!' 
        readOnly />
        <button 
        onClick={copyText}
        className='px-3 py-2 sm:px-4 sm:py-4 text-xl text-[#A3FFAE] font-medium cursor-pointer  right-2'>{copy}</button>
        </div>
        {/* 2nd Section */}
        <div className='bg-[#23222B] rounded-lg p-5 relative'>
          <div className='flex items-center justify-between mb-4' >
          <label htmlFor="slider" className='flex flex-col basis-full text-lg text-slate-400'>Password Length
            <input 
            value={length}
            onChange={(e)=>setLength(e.target.value)}
            type="range" 
            min={0} 
            max={20} 
            id='slider' 
            className='accent-[#A3FFAE] cursor-pointer'/>
          </label>
          <span className='absolute right-5 top-4 text-2xl text-[#A3FFAE] font-semibold'>{length}</span>
          </div>
          {/* Checkbox */}
          <div className='flex flex-col text-xl font-semibold text-slate-200 relative'>
            <label className='flex items-center' htmlFor="number">
              <input 
              defaultChecked={number}
              onChange={()=>{
                setNumber(prev => !prev);
              }}
              className='w-5 h-5 mr-2 appearance-none border-2 hover:border-[#A3FFAE] checked:bg-[#A3FFAE] checked:border-[#A3FFAE] cursor-pointer' 
              type="checkbox" id='number'/> 
              {/* Condition, if number is checked then add tick icon */}
              {number && <i className="fa-solid fa-check absolute text-stone-950 font-semibold left-[1.5px]"></i>}
              Include Numbers</label>
            <label className='flex items-center' htmlFor="special">
              <input 
              defaultChecked={specialChar}
              onChange={()=>{
                setSpecialChar(prev => !prev);
              }}
              className='w-5 h-5 mr-2 appearance-none border-2 hover:border-[#A3FFAE] checked:bg-[#A3FFAE] checked:border-[#A3FFAE] cursor-pointer' 
              type="checkbox" id='special' />
              {/* Condition, if specialChar is checked then add tick icon */}
              {specialChar && <i className="fa-solid fa-check absolute text-stone-950 font-semibold left-[1.5px]"></i>}
               Include Special Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
