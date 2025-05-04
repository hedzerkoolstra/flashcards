import "./App.css";
import { useState } from "react";
import { useEventListener } from "usehooks-ts";

import allCategories from "./data/_index";

const upside = "italian";
const downside = "english";

function App() {
  const [currentWords, setCurrentWords] = useState([]);
  const [language, setLanguage] = useState(upside);
  const [currentWordIndex, setCurrentWordIndex] = useState(null);

  const onTurnCard = () => setLanguage(language === upside ? downside : upside);

  const areAllDone = (words) => words.every((w) => !!w.done);

  const getRandomWord = (words) => {
    setLanguage(upside);
    if (areAllDone(words)) return;
    const index = Math.floor(Math.random() * words.length);
    return words[index].done ? getRandomWord(words) : index;
  };

  const onRetryAll = () => {
    setCurrentWords((words) => {
      const updatedWords = words.map((word, i) => {
        return { ...word, done: false, learned: false };
      });
      setCurrentWordIndex(getRandomWord(updatedWords));
      return updatedWords;
    });
  };

  const onRetryMistakes = () => {
    setCurrentWords((words) => {
      const updatedWords = words.map((word, i) => {
        return { ...word, done: word.learned ? true : false };
      });
      setCurrentWordIndex(getRandomWord(updatedWords));
      return updatedWords;
    });
  };

  const onKnow = () => {
    setCurrentWords((words) => {
      const updatedWords = words.map((word, i) => {
        return i !== currentWordIndex ? word : { ...word, done: true, learned: true };
      });
      setCurrentWordIndex(getRandomWord(updatedWords));
      return updatedWords;
    });
  };
  const onDontKNow = () => {
    setCurrentWords((words) => {
      const updatedWords = words.map((word, i) => {
        return i !== currentWordIndex ? word : { ...word, done: true };
      });
      setCurrentWordIndex(getRandomWord(updatedWords));
      return updatedWords;
    });
  };

  const onSetCategory = (i) => {
    setCurrentWords(allCategories[i].Words);
    setCurrentWordIndex(getRandomWord(allCategories[i].Words));
  };

  const allWords = allCategories.reduce((total, category) => (total += category.Words.length), 0);

  useEventListener("keydown", (event) => {
    if (event.key === "z") {
      onDontKNow();
    } else if (event.key === "x") {
      onKnow();
    } else if (event.key === " ") {
      event.preventDefault();
      onTurnCard();
    }
  });

  return (
    <div className="App">
      <div className="category-list">
        {allCategories.map((category, i) => (
          <button onClick={() => onSetCategory(i)}>
            {`${category.Name} (${category.Words.length})`}
          </button>
        ))}
        <div>Total words: {allWords}</div>
      </div>
      <main>
        <div className="start">
          <button onClick={onRetryAll} disabled={!currentWords.length || !areAllDone(currentWords)}>
            Retry All
          </button>
          <button
            onClick={onRetryMistakes}
            disabled={!currentWords.length || !areAllDone(currentWords)}
          >
            Retry Mistakes
          </button>
        </div>
        {currentWordIndex !== null && (
          <>
            <div className="card" onClick={onTurnCard}>
              {!areAllDone(currentWords) ? currentWords[currentWordIndex][language] : "Finito!"}
            </div>

            <div className="controls">
              <button onClick={onDontKNow} disabled={areAllDone(currentWords)}>
                Nope
              </button>
              <button onClick={onKnow} disabled={areAllDone(currentWords)}>
                Got it
              </button>
            </div>

            <div>
              <div>Learned: {currentWords.filter((w) => w.learned).length}</div>
              <div>Didn't know: {currentWords.filter((w) => !w.learned && w.done).length}</div>
              <div>To Go: {currentWords.filter((w) => !w.done).length}</div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
