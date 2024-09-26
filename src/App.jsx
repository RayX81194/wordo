import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [word, setWord] = useState("");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [theme,setTheme] = useState(true);

  const fetchdata = async () => {
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!res.ok) {
        throw new Error("Word not found. Please try again.");
      }

      const data = await res.json();
      if (data) {
        setDetails(data);
        console.log(data)
        setError(null); 
      } else {
        setDetails(null);
      }
    } catch (error) {
      setError("No results found. Please try a different word.");
      setDetails(null); // Clear details on error
    }
  };

  const handleEvent = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() === "") {
      setError("Please enter a word to search.");
      return;
    }
    fetchdata();
  };

  return (
    <div className={`w-full h-[100vh] ${theme ? "bg-white" : "bg-zinc-900"}`}>
    <div className={`flex flex-col items-center ${theme ? "bg-white" : "bg-zinc-900"}`}>
      <Navbar theme={theme} setTheme={setTheme}  />
      <form onSubmit={handleSubmit}>
        <div className={`w-[350px] sm:w-[600px] md:w-[700px] items-center flex mt-12 h-[60px] rounded-xl shadow-md ${theme ? "bg-slate-200" : "bg-zinc-800"}`}>
          <input
            value={word}
            onChange={handleEvent}
            className={`${theme ? "bg-slate-200 text-black" : "bg-zinc-800 text-white"} outline-none w-[275px] sm:w-[520px] md:w-[620px] h-[60px] mx-5 font-bold`}
            placeholder="Write the word...."
            type="text"
          ></input>
          <button type="submit">
            {theme ? <img className="w-[25px] h-[25px]" src="black-search.svg" alt="search"/> : <img className="w-[25px] h-[25px]" src="white-search.svg" alt="search"/>}
          </button>
        </div>
      </form>

      {error && (
        <div className="w-[350px] sm:w-[600px] md:w-[700px]">
          <p className="text-red-600 font-sans mt-2">{error}</p>
        </div>
      )}


      {details && (
        <div className={`${theme ? "text-black" : "text-gray-100"}`}>
          <div className="mx-44 sm:mx-12 md:mx-0 mt-10 flex items-center justify-between">
            <div>
              <h1 className="font-extrabold text-[3rem]">{details[0].word}</h1>
              <p className="font-serif text-[1.2rem] text-blue-600">
                {details[0].phonetic}
              </p>
            </div>
            <div className="p-5 bg-blue-300 rounded-[100px] cursor-pointer">
              <img className="w-[25px] h-[25px]" src="play.svg" alt="play" />
            </div>
          </div>
          <div className="mx-44 sm:mx-12 md:mx-0 flex items-center mt-7">
            <p className="font-bold text-[1.2rem] italic">noun</p>
            <hr className="w-full ml-4 bg-gray-300 h-[2px]" />
          </div>
          <div className="flex flex-col my-7 mx-44 sm:mx-12 md:mx-0">
            <h2 className="text-slate-600">Meaning</h2>
            <ul className="list-disc ml-10 my-4">
  {details?.[0]?.meanings?.[0]?.definitions?.map((mean, index) => (
    <li key={index} className="mb-5 max-w-[700px]">{mean.definition}</li>
  ))}
</ul>
          </div>
          <div className="flex gap-10 mx-44 sm:mx-12 md:mx-0">
            <h2 className="text-slate-600">Synonyms</h2>
            <h2 className="text-blue-600 font-extrabold">{details?.[0]?.meanings?.[0]?.synonyms?.length > 0 ? details[0].meanings[0].synonyms[0] : "none"}</h2>
          </div>
          <div className="mx-44 sm:mx-12 md:mx-0 flex items-center mt-7">
            <p className="font-bold text-[1.2rem] italic">verb</p>
            <hr className="w-full ml-4 bg-gray-300 h-[2px]" />
          </div>
          <div className="flex flex-col mt-7 mx-44 sm:mx-12 md:mx-0">
            <h2 className="text-slate-600">Meaning</h2>
            <ul className="list-disc ml-10 my-4">
            {details?.[0]?.meanings?.[1]?.definitions?.map((mean, index) => (
    <li key={index} className="mb-5 max-w-[700px]">{mean.definition}</li>
  ))}
            </ul>
          </div>
          <hr className="mx-44 sm:mx-12 md:mx-0 bg-gray-300 h-[2px]" />
          <div className="my-5 text-[13px] flex items-center justify-center gap-4 w-[700px]">
            <p className="text-slate-600">Source</p>
            <div className="flex gap-1">
              <a
                className="underline"
                href={`https://en.wiktionary.org/wiki/${details[0].word}`}
              >
                {`https://en.wiktionary.org/wiki/${details[0].word}`}{" "}
              </a>
              <img className="w-[20px] h-[20px]" src="link.svg" alt="link" />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
