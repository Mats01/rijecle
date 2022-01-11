import React, { FC, useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const isAlpha = (ch: string): boolean => {
  return /^[A-ZŠĐŽČĆ]$/i.test(ch);
}


const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 60,
  },
  container: {
    border: '1px solid black',
    width: 40,
    height: 50,
    margin: 5,
    fontSize: 30,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    margin: 'auto',
  },
}

function App() {

  const wordOfTheDay = ['š', 'k', 'o', 'l', 'a'];

  const [word, setWord] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>(['white', 'white', 'white', 'white', 'white']);
  const [previousWords, setPreviousWords] = useState<{ word: string[], colors: string[] }[]>([]);

  // useEffect(() => {
  //   if (previousWords.length > 5) {
  //     alert('Ostali ste bez pokušaja, rijec je bila: ' + wordOfTheDay.join(''));
  //   }
  // }, [previousWords]);

  const getKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setWord(word.slice(0, -1));
      }
      if (e.key === 'Enter') {
        checkWord();
      }
      else if (isAlpha(e.key)) {
        if (word.length < 5) {
          setWord([...word, e.key]);
        }
      }
    }, [word])

  const getWiktionary = async (): Promise<boolean> => {
    return fetch(`https://en.wiktionary.org/w/api.php?action=query&titles=${word.join("")}&prop=revisions&rvprop=content&format=json&origin=*`)
      .then(
        (response) =>
          response.json()
      ).then((data) => {
        let pages = data.query.pages;
        let firstKey = Object.keys(pages)[0];
        return firstKey !== '-1';
      }).catch((error) => {
        console.log(error);
        return false;
      })

  }

  const checkWord = async () => {
    let isWord = await getWiktionary();
    if (!isWord) {
      alert('Nije rijec');
      return;
    }
    let newColors = colors;
    if (word === wordOfTheDay) {
      alert('Bravo');
      setColors(['green', 'green', 'green', 'green', 'green']);
    } else {

      newColors = colors.map((color, index) => {
        if (wordOfTheDay[index] === word[index]) {
          return 'green';
        } else if (wordOfTheDay.includes(word[index])) {
          return 'yellow';
        } else {
          return 'gray';
        }
      })


    }
    setPreviousWords([...previousWords, { word: word, colors: newColors }]);
    setColors(['white', 'white', 'white', 'white', 'white']);
    setWord([]);

  }

  useEffect(() => {
    document.addEventListener('keydown', getKey);
    return () => {
      document.removeEventListener('keydown', getKey);
    }

  }, [word])

  return (
    <div className="App" style={styles.app}>
      <h1>Rijecle</h1>
      {previousWords.map((guess) => (
        <Guesses word={guess.word} colors={guess.colors} />
      ))}
      <Guesses word={word} colors={colors} />
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