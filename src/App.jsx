import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "1234567890";
    if (character) str += ")(*&^%$#@!`~";

    for (let i = 1; i <= length; i++) {
      let char = (Math.random() * str.length + 1);
      pass += str.charAt(char);
      
    }
    setPassword(pass);
  }, [number, character, length]);

  useEffect(() => {
    passGenerator();
  }, [number, character, length, passGenerator]);

   const pwdRef =useRef(null);
   

  const  copyToClipboard = () => {
    pwdRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      <div className=" w-full max-w-lg mx-auto shadow-2xl rounded-lg my-8 px-4  py-3  text-orange-500 bg-gray-700 text-center">
        <h1 className="mb-4 text-center">Password Generator</h1>
        <div className="flex rounded-xl shadow overflow-hidden mb-4">
          <input
            type="text"
            className="w-full px-4  py-1 outline-none"
            placeholder="PWD shown here"
            readOnly
            value={password}
            ref={pwdRef}
          />
          <button
            type="button"
            className="px-4 bg-blue-600 text-white  hover:bg-orange-700"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          <button
            type="button"
            className="px-4 bg-orange-500 text-white  hover:bg-orange-700 shrink-0" 
            onClick={passGenerator}


          >
            Generate New Password
          </button>
        </div>
        <div className="flex gap-x-2 text-sm text-center">
          <div className="flex gap-x-1 items-center">
            <input
              type="range"
              name="length"
              min={6}
              max={100}
              value={length}
              
              onChange={(e) => setLength(e.target.value)}
            />
            <label> length : {length}</label>
          </div>
          <div className="number flex gap-x-1 items-center">
            <input
              type="checkbox"
              name="number"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label> Number</label>
          </div>
          <div className="Character flex gap-x-1 items-center">
            <input
              type="checkbox"
              name="character"
              defaultChecked={character}
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label> Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
