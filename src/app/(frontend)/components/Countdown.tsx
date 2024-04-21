import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
interface CountdownProps {
  date: number;
  className?: string;
}

export default function Countdown({ date, className = "" }: CountdownProps) {
  const timestamp = date;
  const [count, setCount] = useState<string | null>(null);
  const [loader, setLoader] = useState<boolean>(true);

  useEffect(() => {
    let loaderInterval: NodeJS.Timeout;

    if (loader) {
      loaderInterval = setInterval(() => {
        setLoader(false);
      }, 2000);
    }

    const countDownDate = new Date(timestamp * 1000).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setCount(null);
      } else {
        const minutes = Math.floor(distance / (1000 * 60));

        if (minutes <= 15) {
          // If less than or equal to 15 minutes, display "LIVE"
          setCount("LIVE");
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const remainingMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          if (days > 0) {
            setCount(`${days}d ${hours}h ${remainingMinutes}m ${seconds}s`);
          } else if (hours > 0) {
            setCount(`${hours}h ${remainingMinutes}m ${seconds}s`);
          } else if (remainingMinutes > 0) {
            setCount(`${remainingMinutes}m ${seconds}s`);
          } else {
            setCount(`${seconds}s`);
          }
        }
      }
    }, 1000);

    // Clearing the intervals
    return () => {
      clearInterval(interval);
      clearInterval(loaderInterval);
    };
  }, [timestamp, loader]);

  return (
    <div
      className={`${className ? className : "text-xl   absolute top-16"}  font-medium text-center ${
        count === "LIVE" && "text-red-500"
      }`}
    >
      {loader ? (
        // Display loader animation while loading
        <ImSpinner9 className='animate-spin' />
      ) : count !== null ? (
        count
      ) : (
        <span className='text-red-500 animate-pulse'>LIVE</span>
      )}
    </div>
  );
}
