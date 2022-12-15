// console.log("rendering");
// let toggle = null;

// let SessionBreakToggle = false;
// let audio = new Audio(beep);
// const [session, setSession] = useState("Session");

// useEffect(() => {
//   let Ians = getStringify(sessionval * 60);
//   setClock(Ians);
// }, []);


// let sec = sessionval * 60;

// function displayTimer() {
//   sec -= 1;
//   console.log(sec);

//   if ((sec < 0) & (SessionBreakToggle === false)) {
//     audio.currentTime = 0;
//     audio.play();
//     setSession("Break");
//     SessionBreakToggle = true;
//     sec = breakval * 60;
//   }

//   if ((sec < 0) & (SessionBreakToggle === true)) {
//     audio.currentTime = 0;
//     audio.play();
//     setSession("Session");
//     SessionBreakToggle = false;
//     sec = sessionval * 60;
//   }

//   let ansD = getStringify(sec);
//   setClock(ansD);
// }

// export default displayTimer;
