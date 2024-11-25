import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import alarm from "../../public/images/alarm.gif";
import clock from "../../public/images/clock.gif"

const CountDown: React.FC = () => {
    const [minutes, setMinutes] = useState(0);  // Minutes input
    const [seconds, setSeconds] = useState(0);  // Seconds input
    const [isRunning, setIsRunning] = useState(false); // Controls timer state
    const [remainingTime, setRemainingTime] = useState(0); // Seconds remaining

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRunning && remainingTime > 0) {
            timer = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);
        } else if (remainingTime === 0 && isRunning) {
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, remainingTime]);

    const convertTimeToSeconds = (minutes: number, seconds: number) => {
        return (minutes * 60) + seconds;
    };

    const convertSecondsToTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
        const secs = (seconds % 60).toString().padStart(2, "0");
        return `${mins}:${secs}`;
    };

    const handleStart = () => {
        const totalSeconds = convertTimeToSeconds(minutes, seconds);
        if (totalSeconds > 0) {
            setRemainingTime(totalSeconds);
            setIsRunning(true);
        }
    };

    const handlePause = () => {
        setIsRunning(false);
    };

    const handleRestart = () => {
        setIsRunning(false);
        setRemainingTime(0);
        setMinutes(0);
        setSeconds(0);
    };

    return (
        <div className='flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-sky-300 from-10% via-pink-700 via-50% to-yellow-300 to-90% ...'>
            <div className='img2 absolute top-8 left-7'>
                <Image
                src={alarm}
                alt="alarm"
                width={200}
                height={250}
                className='absolute top-5 left-5 w-50 h-70'
                />
            </div>
            <Image
                src={clock}
                alt="alarm"
                width={200}
                height={250}
                className='absolute top-5 right-5 h-60 w-60 rounded-full '
                />
            <h1 className="text-4xl font-extrabold uppercase mb-4 hover:text-white">Count Down Timer</h1>

            <div className='flex items-center mb-6'>
                <input 
                    type="number" 
                    className='border-2 border-black bg-transparent p-3 rounded-lg text-black text-xl w-20 mr-4' 
                    placeholder="Min" 
                    value={minutes > 0 ? minutes : ""} 
                    onChange={(e) => setMinutes(Number(e.target.value))} 
                />
                <input 
                    type="number" 
                    className='border-2 border-black bg-transparent p-3 rounded-lg text-black text-xl w-20' 
                    placeholder="Sec" 
                    value={seconds > 0 ? seconds : ""} 
                    onChange={(e) => setSeconds(Number(e.target.value))} 
                />
            </div>

            <div className='text-9xl font-bold uppercase mb-6 hover:text-white'>
                {convertSecondsToTime(remainingTime)}
            </div>

            <div>
                <button onClick={handleStart} className='text-white hover:text-black px-8 py-4 font-extrabold rounded-lg bg-black hover:from-green-400 hover:bg-white text-xl mx-4'>Start</button>

                <button onClick={handlePause} className='text-white hover:text-black px-8 py-4 font-extrabold rounded-lg bg-black to-yellow-200 hover:bg-white text-xl mx-4'>Pause</button>

                <button onClick={handleRestart} className='text-white hover:text-black px-8 py-4 font-extrabold rounded-lg bg-black to-yellow-200 hover:bg-white text-xl mx-4'>Restart</button>
            </div>

            <footer className='absolute bottom-4 left-4 text-2xl font-extrabold'>Rimsha Arshad</footer>
        </div>
    );
}

export default CountDown;