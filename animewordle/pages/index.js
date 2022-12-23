import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'
import colors from '../styles/colors.json'
import Popup from '../components/popup'
import Help from '../components/help'
import Gameend from '../components/gameend'
import useWindowSize from '../components/useWindow'

const fetcher = async (...args) => await fetch(...args).then((res) => res.json())

export default function Home() {
  const [guess, setGuess] = useState(0);
  const [winlose, setWinLose] = useState(null);
  const [results, setResults] = useState([]);
  const [focused, setFocus] = useState(false);
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [popup, setPopup] = useState({ show: false, title: '' });
  const [dropdown, setDropdown] = useState(false);
  const size = useWindowSize();
  const minWidth = size.width <= 600 ? '50%' : null;

  const { data, error } = useSWR('https://animewordle.herokuapp.com/animeWordle/oftheday/character', fetcher)

  useEffect(() =>
  {
    if (typeof window !== "undefined" && localStorage.getItem('character') !== null)
    {
      let character = JSON.parse(localStorage.getItem('character'))

      if (Date.parse(character.expiration) > Date.parse(new Date()))
      {
        setWinLose(character.result);
      }
    }
  }, [])

  const handleChange = (name) => {
    if (name.length > 0) {
      fetch(`https://animewordle.herokuapp.com/animeWordle/searchcharacter/${name}`)
        .then((response) => response.json())
        .then((data) => setResults(data));
    }
    else {
      setResults([])
    }
  }

  const checkGuess = async (name) => {
    setFocus(false);

    if (winlose !== null && (winlose.failed || winlose.guessCorrect)) return;

    let res = await fetch(`https://animewordle.herokuapp.com/animeWordle/guesscharacter/${name}/${guess + 1}`)
      .then((response) => response.json())
      .then((data) => { return data });
      
    setGuess(guess + 1);

    if (res.guessCorrect || res.failed) {
      setWinLose(res)
      // show popup (user won and correct character with info)
      setPopup({ show: true, title: res.guessCorrect ? "Guessed Correct!" : "Guessed Wrong!" })

      var dateFuture = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      let character = { result: res , expiration: dateFuture }

      localStorage.setItem('character', JSON.stringify(character))

      return;
    }

    setWrongGuesses([...wrongGuesses, name])

    // localStorage.setItem("wrongGuesses", JSON.stringify([...wrongGuesses, name]))
  }

  const getNextDay = () => {
    var dateFuture = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
    var dateNow = new Date();

    var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);

    return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>WEEBDLE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{
        position: 'fixed', transform: 'translate(-50%, -50%)',
        top: '50%', left: '50%', display: popup.show ? null : 'none', zIndex: 11
      }}>
        {
          popup.show ?
            <Popup
              title={popup.title} close={() => setPopup({ show: false, title: '' })}
              minWidth={minWidth} getDate={() => getNextDay()}
            >
              {
                // how
                popup.title === "How to play" ?
                  <Help minWidth={minWidth} />
                  // Statistics
                : popup.title === "Statistics" ?
                  <>
                  </>
                // game win/lose
                : popup.title.includes("Guessed") ?
                    <Gameend winlose={winlose} minWidth={minWidth} />
                : null
              }
            </Popup>
          : null
        }
      </div>

      <div className={styles.header}
        style={{
          display: 'flex', zIndex: 2, maxWidth: '100%', backgroundColor: 'gray',
          padding: 10, justifyContent: minWidth ? 'space-evenly' : null,
        }}
      >
        <h1 className={styles.title} style={{ fontSize: '35px', alignSelf: 'center', textAlign: 'center', color: 'black' }}>
          WEEBDLE
        </h1>
        {
          minWidth ?
            <>
              <label for="check" className={styles.bar}>
                <input id="check" type="checkbox" onClick={() => setDropdown(!dropdown)} />
                <span className={styles.top}></span>
                <span className={styles.middle}></span>
                <span className={styles.bottom}></span>
              </label>
              <div style={{
                minWidth: minWidth ? '85%' : null, position: 'absolute',
                display: dropdown ? 'flex' : 'none', transform: 'translate(0, 60px)',
                zIndex: 2, flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', borderRadius: 35,
                background: "linear-gradient(145deg, #9fbebe, #86a0a0)",
                boxShadow:  "5px 5px 10px #3c4747, -5px -5px 10px #eeffff",
                filter: `blur(${popup.show ? 50 : 0}px)`
              }}>
                <p onClick={() => {
                  // setDropdown(false)
                  setPopup({ show: true, title: 'How to play' })
                }}
                  style={{
                    backgroundColor: 'transparent', cursor: 'pointer',
                    minWidth: '140px', textAlign: 'center', fontSize: 15,
                    padding: 10, margin: 10
                  }}
                >
                  How to play
                </p>
                <p onClick={() => {
                  // setDropdown(false)
                  setPopup({ show: true, title: `Guessed ${winlose.guessCorrect ? 'Correct!' : 'Wrong!'}` })
                }}
                  style={{
                    backgroundColor: 'transparent', cursor: 'pointer',
                    minWidth: '140px', textAlign: 'center', fontSize: 15,
                    padding: 15, display: winlose ? null : 'none'
                  }}
                >
                  Results
                </p>
                <p onClick={() => {
                  // setDropdown(false)
                  setPopup({ show: true, title: 'Statistics' })
                }}
                  style={{
                    backgroundColor: 'transparent', cursor: 'pointer',
                    minWidth: '140px', textAlign: 'center', fontSize: 15,
                    padding: 15
                  }}
                >
                  Statistics
                </p>
              </div>
            </>
            :
            <div style={{ marginLeft: 20 }}>
              <button
                onClick={() => setPopup({ show: true, title: 'How to play' })}
                style={{
                  cursor: 'pointer', height: 50, border: '0px solid transparent',
                  minWidth: '140px', textAlign: 'center', fontSize: 15,
                  padding: 5, borderRadius: 10, margin: '1rem',
                  background: 'linear-gradient(145deg, #c1e6e6, #e5ffff)',
                  boxShadow: '8px 8px 16px #566666, -8px -8px 16px #ffffff'
                }}
              >
                How to play
              </button>
              <button
                onClick={() => setPopup({ show: true, title: `Guessed ${winlose.guessCorrect ? 'Correct!' : 'Wrong!'}` })}
                style={{
                  cursor: 'pointer', height: 50, border: '0px solid transparent',
                  minWidth: '140px', textAlign: 'center', fontSize: 15,
                  padding: 5, borderRadius: 10, margin: '1rem',
                  background: 'linear-gradient(145deg, #c1e6e6, #e5ffff)',
                  boxShadow: '8px 8px 16px #566666, -8px -8px 16px #ffffff',
                  display: winlose ? null : 'none'
                }}
              >
                Results
              </button>
              <button
                onClick={() => setPopup({ show: true, title: 'Statistics' })}
                style={{
                  cursor: 'pointer', height: 50, border: '0px solid transparent',
                  minWidth: '140px', textAlign: 'center', fontSize: 15,
                  padding: 5, borderRadius: 10, margin: '1rem',
                  background: 'linear-gradient(145deg, #c1e6e6, #e5ffff)',
                  boxShadow: '8px 8px 16px #566666, -8px -8px 16px #ffffff'
                }}
              >
                Statistics
              </button>
            </div>
        }
      </div>

      <main className={styles.main} style={{ filter: `blur(${popup.show ? 50 : 0}px)`, paddingRight: 10, paddingLeft: 10 }}>
        <div className={styles.description}>
          <p className={styles.findChar} style={{ padding: 10, marginTop: 0, color: 'black' }}>
            Find the character of the day who fits these characteristics
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 40 }}>
          <p style={{ marginTop: 0, color: 'red', fontWeight: 'bold', fontSize: 20, textAlign: 'center', textTransform: 'uppercase' }}>Guess {guess} of 4</p>
          <input id='search_anime' type="text" onChange={(e) => handleChange(e.target.value)}
            className={styles.input} onFocus={() => setFocus(true)}
            style={{ minWidth: minWidth, color: 'black' }}
            placeholder='Type character name here!'
          />
          {
            results.length > 0 && focused ?
              <div style={{
                display: 'flex', flexDirection: 'column',
                zIndex: 10, minWidth: minWidth ? '75%' : '500px', maxHeight: '200px', overflow: 'auto',
                position: 'absolute', backgroundColor: '#242223', justifySelf: 'center',
                padding: 20, transform: 'translate(0px, 105px)', borderRadius: '10px',
                boxShadow: '5px 5px rgb(0, 0, 0 / 12%)',
              }}>
                {
                  results.map(({ item }, index) => {
                    return (
                      <p style={{ width: '100%', cursor: 'pointer' }}
                        onClick={() => checkGuess(item.name)} key={index}
                      >
                        {item.name}
                      </p>
                    )
                  })
                }
              </div>
              : null
          }
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', maxWidth: '500px' }}>
            {
              wrongGuesses.length > 0 ?
                wrongGuesses.map((item, index) => {
                  return (
                    <p className={styles.wrong}
                      key={index}
                      style={{
                        fontSize: '15px', color: 'white', marginBottom: 0,
                        fontWeight: 'bold', padding: 10, marginRight: 10,
                      }}
                    >
                      {item}
                    </p>
                  )
                })
                : null
            }
          </div>
        </div>

        <div className={styles.characteristicsBG} style={{
          maxWidth: '500px', padding: '15px', color: 'black', borderRadius: '10px',
          fontSize: '20px', textTransform: 'uppercase',
          display: 'flex', flexDirection: 'column', fontWeight: 'bold',
          paddingRight: 5, paddingLeft: 5, minWidth: minWidth
        }}>
          <p style={{ textAlign: 'center', fontSize: 25 }}>Characteristics</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            {
              data?.characteristics.map((item, index) => {
                return (
                  <p className={styles.characteristics} key={index}
                    style={{
                      fontSize: '15px', backgroundColor: colors[index + 14],
                      padding: minWidth ? 10 : null
                    }}
                  >
                    {item}
                  </p>
                )
              })
            }
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
