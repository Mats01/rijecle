import React, { FC, useCallback, useEffect, useState } from 'react';
import './App.css';
import Keyboard from './Keyboard';

const isAlpha = (ch: string): boolean => {
  if (ch === 'lj') return true;
  if (ch === 'nj') return true;
  return /^[A-ZŠĐŽČĆ]$/i.test(ch);
}

export const GREEN = '#6ff573';
export const YELLOW = '#f8f86c';
export const GREY = '#aaa';

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    border: '1px solid rgb(155,155,155)',
    width: 40,
    height: 50,
    margin: 5,
    fontSize: 30,
    display: 'flex',
    textAlign: 'center' as 'center',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '1px 1px 2px 2px rgba(55,55,55,0.1)',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    margin: '0 auto',
  },
  keyboardContainer: {
    position: 'absolute' as 'absolute',
    bottom: 20,
    width: '100%',
    display: 'flex',
    alighItems: 'center',

  },
}

function App() {

  const wordOfTheDay = ['š', 'k', 'o', 'l', 'a'];

  const [word, setWord] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>(['white', 'white', 'white', 'white', 'white']);
  const [previousWords, setPreviousWords] = useState<{ word: string[], colors: string[] }[]>([]);
  const [correct, setCorrect] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState<string[]>([]);

  // useEffect(() => {
  //   if (previousWords.length > 5) {
  //     alert('Ostali ste bez pokušaja, rijec je bila: ' + wordOfTheDay.join(''));
  //   }
  // }, [previousWords]);





  const getWiktionary = async (): Promise<boolean> => {
    return fetch(`https://hr.wiktionary.org/w/api.php?action=query&titles=${word.join("")}&prop=revisions&rvprop=content&format=json&origin=*`)
      .then(
        (response) =>
          response.json()
      ).then((data) => {
        let pages = data.query.pages;
        let firstKey = Object.keys(pages)[0];
        if (firstKey === '-1') return false;
        try {
          return data.query.pages[Object.keys(data.query.pages)[0]].revisions[0]['*'].includes("{{hrvatski jezik}}");
        } catch (e) {
          return false;
        }
      }).catch((error) => {
        console.log(error);
        return false;
      })

  }

  const checkWord = useCallback(async () => {
    let isWord = await getWiktionary();
    if (!isWord) {
      alert('Nije u popisu riječi.');
      return;
    }
    let newColors = colors;
    let newCorrect = new Set<string>();
    let newIncorrect = new Set(word);
    if (word.join('') === wordOfTheDay.join('')) {
      console.log('Pobijedili ste');
      alert('Bravo');
      setColors([GREEN, GREEN, GREEN, GREEN, GREEN]);
      return;
    } else {

      let target = wordOfTheDay;



      newColors = [GREY, GREY, GREY, GREY, GREY];
      for (let i = 0; i < word.length; i++) {
        if (word[i] === target[i]) {
          newColors[i] = GREEN;
          target[i] = '_';
          newCorrect.add(word[i]);
          newIncorrect.delete(word[i]);
        }

      }
      for (let i = 0; i < word.length; i++) {
        if (target.includes(word[i])) {
          newColors[i] = YELLOW;
          newCorrect.add(word[i]);
          newIncorrect.delete(word[i]);
        }
      }


    }
    if (previousWords.length > 5) {
      alert('Ostali ste bez pokušaja, rijec je bila: ' + wordOfTheDay.join(''));
      return;
    }
    setCorrect(Array.from(new Set([...Array.from(newCorrect), ...correct])));
    setIncorrect(Array.from(new Set([...Array.from(newIncorrect), ...incorrect])));
    setPreviousWords([...previousWords, { word: word, colors: newColors }]);
    setColors(['white', 'white', 'white', 'white', 'white']);
    setWord([]);

  }, [word, colors, previousWords, correct, incorrect, getWiktionary]); // eslint-disable-line

  const acceptLetter = useCallback((key: string) => {
    if (key === 'Backspace') {
      setWord(word.slice(0, -1));
    }
    if (key === 'Enter') {
      word.length === 5 && checkWord();
    }
    else if (isAlpha(key)) {
      if (word.length < 5) {
        setWord([...word, key]);
      }
    }
  }, [word, checkWord]);



  const getKeyFromPhisycalKeyboard = useCallback(
    (e: KeyboardEvent) => {
      acceptLetter(e.key);
    }, [acceptLetter])

  useEffect(() => {
    document.addEventListener('keydown', getKeyFromPhisycalKeyboard);
    return () => {
      document.removeEventListener('keydown', getKeyFromPhisycalKeyboard);
    }

  }, [word, getKeyFromPhisycalKeyboard])

  return (
    <div className="App" style={styles.app}>
      <h1>Rijecle</h1>
      <div
        style={{
          height: '40vh',
          overflowY: 'scroll',
          width: '100%',
          display: 'flex',
          flexDirection: 'column' as 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {previousWords.map((guess, index) => (
          <Guesses word={guess.word} colors={guess.colors} key={index.toString()} />
        ))}
        <Guesses word={word} colors={colors} />
        <Guesses word={word} colors={colors} />
        <Guesses word={word} colors={colors} />
        <Guesses word={word} colors={colors} />
        <Guesses word={word} colors={colors} />
      </div>
      <div
        style={styles.keyboardContainer}
      >
        <Keyboard correct={correct} incorrect={incorrect} sendKeyPress={(key) => acceptLetter(key)} />
      </div>
    </div >
  );
}

export default App;


const Guesses: FC<{ word: string[], colors: string[] }> = ({ word, colors }) => {

  return (
    <div
      style={styles.wrapper}
    >
      <div
        style={{
          ...styles.container,
          backgroundColor: colors[0]
        }}
      >
        {word[0]}
      </div>
      <div
        style={{
          ...styles.container,
          backgroundColor: colors[1]
        }}
      >
        {word[1]}
      </div>
      <div
        style={{
          ...styles.container,
          backgroundColor: colors[2]
        }}
      >
        {word[2]}
      </div>
      <div
        style={{
          ...styles.container,
          backgroundColor: colors[3]
        }}
      >
        {word[3]}
      </div>
      <div
        style={{
          ...styles.container,
          backgroundColor: colors[4]
        }}
      >
        {word[4]}
      </div>
    </div>
  )
}