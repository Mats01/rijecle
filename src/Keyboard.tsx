import React, { FC } from 'react'
import { GREEN, GREY } from './App'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    margin: 'auto',
    width: '98%',
    maxWidth: '600px',
  },
  row: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'center',
    alignItems: 'space-between',
    margin: 'auto',
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
  key: {
    border: '1px solid rgb(155,155,155)',
    maxWidth: 40,
    minWidth: 20,
    flexGrow: 1,
    height: 50,
    margin: 2,
    fontSize: '1rem',
    display: 'flex',
    textAlign: 'center' as 'center',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    boxShadow: '1px 1px 2px 2px rgba(55,55,55,0.1)',
    borderRadius: '5px',
    cursor: 'pointer',
  }
}


const Keyboard: FC<{ correct: string[], incorrect: string[], sendKeyPress: (key: string) => void }> = ({ correct, incorrect, sendKeyPress }) => {

  const firstRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'š', 'đ'];
  const secondRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'č', 'ć', 'ž'];
  const thirdRow = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'lj', 'nj'];

  return (
    <>
      <div style={styles.wrapper}>

        <div style={styles.row}>
          <>
            {firstRow.map(key => (
              <div
                style={{ ...styles.key, backgroundColor: correct.includes(key) ? GREEN : incorrect.includes(key) ? GREY : 'white' }}
                key={key} className='key'
                onClick={() => sendKeyPress(key)}
              >
                {key}
              </div>
            ))}
          </>

        </div>
        <div style={{ ...styles.row }}>
          <>
            {secondRow.map(key => (
              <div
                style={{ ...styles.key, backgroundColor: correct.includes(key) ? GREEN : incorrect.includes(key) ? GREY : 'white' }}
                key={key} className='key'
                onClick={() => sendKeyPress(key)}
              >
                {key}
              </div>
            ))}
          </>

        </div>
        <div style={styles.row}>
          <>
            {thirdRow.map(key => (
              <div
                style={{ ...styles.key, backgroundColor: correct.includes(key) ? GREEN : incorrect.includes(key) ? GREY : 'white' }}

                key={key} className='key'
                onClick={() => sendKeyPress(key)}
              >
                {key}
              </div>
            ))}
          </>

        </div>
        <div style={{ ...styles.row }}>

          <div
            style={{ ...styles.key, minWidth: 100, flexGrow: 3 }}
            onClick={() => sendKeyPress('Enter')}
          >{'Provjeri'}</div>
          <div
            style={{ ...styles.key, minWidth: 100, flexGrow: 3 }}
            onClick={() => sendKeyPress('Backspace')}
          >{'Obriši'}</div>
        </div>

      </div>
    </>
  )
}
export default Keyboard