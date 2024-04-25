import React, { useEffect, useState } from 'react'
export const useAudio = (url: string | undefined) => {
  const [audio] = useState(new Audio(url));
  audio.volume= 0.1;

  const [playing, setPlaying] = useState(false);
  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [audio, playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [ toggle];
};

function Cries(props: { url: string | undefined; }) {
  const [toggle] = useAudio(props.url);

  return (
    <svg onClick={toggle} className=' ml-0 sm:ml-4 inline-block w-8 h-8 transition-transform cursor-pointer hover:scale-110 hover:-rotate-12' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"></path>
    </svg>
  )
}

export default Cries