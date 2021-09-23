import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useLottie } from 'lottie-react'
import lockAnimation from '../public/lock-animation.json'

export default function Home() {
  const [len, setLen] = useState(12);
  const [pass, setpass] = useState('');
  const [num, setNum] = useState(true);
  const [caps, setCaps] = useState(true);
  const [char, setChar] = useState(true);
  const options = {
    animationData: lockAnimation,
    loop: true,
    autoplay: true
  };
  const { View } = useLottie(options);
  useEffect(() => document.querySelector("body").style.background = '#191919', []);

  function generatePassword(numRequired, charRequired, length, capsRequired) {
    let passwordArray = [];

    //generate number
    const generateNumber = () => Math.floor(9 * Math.random()).toString();

    //generate a special character
    const generateChar = () => {
      const charArray = [64, 38, 35, 37, 36, 42, 43];
      let index = Math.floor(7 * Math.random());
      return String.fromCharCode(charArray[index]);
    };

    //generate capital letters
    const generateCaps = () => String.fromCharCode(Math.floor(25 * Math.random() + 65));

    //generate small letters
    const generateSMall = () => String.fromCharCode(Math.floor(25 * Math.random() + 97));

    //generate the whole pass
    const generate = (len) => {
      let turn = Math.floor(len / 3);
      let rem = len;

      if (charRequired) {
        let temp = Math.floor(turn * Math.random() + 1);
        for (let i = 0; i < temp; i++)
          passwordArray.push(generateChar());
        rem = rem - temp;
      }

      if (numRequired) {
        let temp = Math.floor(turn * Math.random() + 1);
        for (let i = 0; i < temp; i++)
          passwordArray.push(generateNumber());
        rem = rem - temp;
      }

      if (capsRequired) {
        let temp = Math.floor(turn * Math.random() + 1);
        for (let i = 0; i < temp; i++)
          passwordArray.push(generateCaps());
        rem = rem - temp;
      }

      for (let i = 0; i < rem; i++)
        passwordArray.push(generateSMall());

      return passwordArray;
    };

    //shuffle Array
    const shuffleArray = (arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      return arr;
    }

    return shuffleArray(generate(length)).join("");
  }

  // limits length to max 20
  const handleLength = (e) => {
    if (e.target.value > 30)
      setLen(30)
    else if (e.target.value < 8)
      setLen(8)
    else
      setLen(e.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <meta name="keywords" content="generate password, secure password, password, generate, next passgen, passgen" />
        <meta name="description" content="A simple application built with NextJS to generate passwords of various complexities." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Next PassGen</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.lottie}>
          {View}
        </div>
        <h1 className={styles.title}>
          <span>Next PassGen</span>
        </h1>

        <p className={styles.description}>
          Generate passwords with ease
        </p>

        <div style={{ textAlign: 'center' }}>
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <input
              className={styles.input}
              type="text"
              name="password"
              id="password"
              placeholder="Click Generate"
              value={pass}
              onChange={(e) => setpass(e.target.value)}
            />
            <input
              className={styles.input}
              type="number"
              min="8"
              max="50"
              value={len}
              onChange={(e) => handleLength(e)}
              style={
                {
                  width: '20%',
                  textAlign: 'center',
                  position: 'absolute',
                  right: '0',
                  borderLeft: 'none',
                  borderTopLeftRadius: '0',
                  borderBottomLeftRadius: '0',
                }
              }
            />
          </div>

          <input
            style={{ marginRight: '5px' }}
            type="checkbox"
            name="num"
            id="num"
            value={num}
            defaultChecked
            onChange={() => num ? setNum(false) : setNum(true)}
          />
          <label htmlFor="num" className={styles.label}>Numbers</label>

          <input
            type="checkbox"
            name="char"
            id="char"
            value={char}
            defaultChecked
            onChange={() => char ? setChar(false) : setChar(true)}
          />
          <label htmlFor="char" className={styles.label}>Special Chars</label>

          <input
            type="checkbox"
            name="caps"
            id="caps"
            value={caps}
            defaultChecked
            onChange={() => caps ? setCaps(false) : setCaps(true)}
          />
          <label htmlFor="caps" className={styles.label}>Uppercase Letters</label>
          <br />

          {/* <p style={{ color: '#eaeaea' }}>num={num.toString()}, caps={caps.toString()}, char={char.toString()}</p> */}

          <button
            className={styles.button}
            onClick={() => setpass(generatePassword(num, char, len, caps))}
          >
            Generate
          </button>

        </div>
      </main>

      <footer className={styles.footer}>
        Built with <span>♥️</span> by <a href="https://github.com/tirmazi2">Ali HamXa</a>
      </footer>
    </div>
  )
}
