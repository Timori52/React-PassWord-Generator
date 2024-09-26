import { useCallback, useState, useEffect } from "react";

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

    for (let i = 1; i <= str.length; i++) {
      let char = (Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [number, character]);

  useEffect(() => {
    passGenerator();
  }, [number, character, length, passGenerator]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto shadow-2xl rounded-lg my-8 px-4  py-3  text-orange-500 bg-gray-700 text-center">
        <h1 className="mb-4 text-center">Password Generator</h1>
        <div className="flex rounded-xl shadow overflow-hidden mb-4">
          <input
            type="text"
            className="w-full px-4  py-1 outline-none"
            placeholder="PWD shown here"
            readOnly
            value={password}
          />
          <button
            type="button"
            className="px-4 bg-orange-500 text-white  hover:bg-orange-400"
            onClick={passGenerator}
          >
            Copy
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
