import { useState } from "react";

function WordCounter() {
  //   const [text, setText] = useState("");
  const [count, setCount] = useState([]);
  /*
  function handleCount(newarr) {
    const countt = [];
    for (let i = 0; i < newarr.length; i++) {
      let wordd = newarr[i].toLowerCase();
      if (wordd === "") continue;
      let cnt = 1;
      if (countt.find(({ word }) => word === wordd)) continue;
      for (let j = 0; j < newarr.length; j++) {
        if (j === i) continue;
        if (newarr[j].toLowerCase() === wordd) {
          cnt += 1;
        }
      }
      countt.push({ word: wordd, count: cnt });
    }
    setCount(countt);
  }

  useEffect(() => {
    const interval = setTimeout(() => {
      if (text === "") return;
      const words = text.split(" ");
      const newarr = words.map((w) => w.replace(/[^a-zA-Z0-9]/g, ""));
      handleCount(newarr);
    }, 1000);
    return () => clearInterval(interval);
  }, [text]);
*/

  // optimised solution
  function handleCount(input) {
    const freq = input
      .split(/\s+/)
      .map((w) => w.replace(/[^a-zA-Z0-9]/g, "").toLowerCase())
      .filter((w) => w !== "")
      .reduce((acc, w) => {
        acc[w] = (acc[w] || 0) + 1;
        return acc;
      }, {});
    const formatted = Object.entries(freq).map(([word, count]) => ({
      word,
      count,
    }));
    setCount(formatted);
  }
  return (
    <div className="wordCounter">
      <h1>Word Counter</h1>

      <div className="container">
        <textarea
          className="textarea"
          placeholder="Type your text here"
          data-testid="textarea"
          onChange={(e) => {
            // if (e.target.value === "") return;
            // setText(e.target.value);
            handleCount(e.target.value);
          }}
        ></textarea>

        {count.length > 0 && (
          <div className="results">
            <h3>Word Frequencies</h3>
            <ul data-testid="result-list">
              {count.map(({ word, count }, index) => (
                <li key={word} data-testid={`word-${word}`}>
                  <strong>{word}</strong>: {count} Times
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
export default WordCounter;
