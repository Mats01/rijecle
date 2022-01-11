import React, { FC } from 'react'


const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    margin: 'auto',
  },
  row: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    margin: 'auto',
  },
  key: {
    border: '1px solid rgb(155,155,155)',
    width: 40,
    height: 50,
    margin: 5,
    fontSize: 30,
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
              <div style={styles.key} key={key} className='key'
                onClick={() => sendKeyPress(key)}
              >
                {key}
              </div>
            ))}
          </>
          <div
            style={{ ...styles.key, width: 80 }}
            onClick={() => sendKeyPress('Backspace')}
          >{'<---'}</div>
        </div>
        <div style={{ ...styles.row, marginLeft: 20 }}>
          <>
            {secondRow.map(key => (
              <div style={styles.key} key={key} className='key'
                onClick={() => sendKeyPress(key)}
              >
                {key}
              </div>
            ))}
          </>
          <div
            style={{ ...styles.key, width: 80 }}
            onClick={() => sendKeyPress('Enter')}
          >{'Enter'}</div>
        </div>
        <div style={styles.row}>
          {thirdRow.map(key => (
            <div style={styles.key} key={key} className='key'
              onClick={() => sendKeyPress(key)}
            >
              {key}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Keyboard