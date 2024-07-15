import axios from "axios";
import { useEffect, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quote, setQuote] = useState<string>("");
  const speedParam = searchParams.get("speed") || "1";

  // speed factor to control the countdown pace
  const [speed, setSpeed] = useState(speedParam);

  //boolean to start the countdown function
  const [startCountdown, setStartCountdown] = useState<boolean>(false);

  //provides the current time
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  //provides the time to when the clock should move during countdown
  const [targetTime, setTargetTime] = useState<Date>(
    new Date(new Date().getTime() - 120 * 60 * 1000),
  );
  // function to fetch random quotes
  useEffect(() => {
    const getQuotes = async () => {
      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/quotes",
          {
            headers: {
              "X-Api-Key": "NMJlU5iFdYgKLUScW1SsFA==22dQrxaCAcsvNafa",
            },
          },
        );
        // console.log(response);
        setQuote(response?.data[0].quote);
      } catch (error) {
        console.error(error);
      }
    };

    getQuotes();

    const updateQuotes = setInterval(getQuotes, 5000);

    return () => {
      clearInterval(updateQuotes);
    };
  }, []);

  // function to get the current time and target time for the countdown
  useEffect(() => {
    const updateTime = setInterval(() => {
      if (startCountdown) {
        setCurrentTime((prevTime) => {
          const newTime = new Date(prevTime.getTime() - 1000);
          if (newTime <= targetTime) {
            setStartCountdown(false);
          }
          return newTime;
        });
      } else {
        setCurrentTime(new Date());
        setTargetTime(new Date(new Date().getTime() - 120 * 60 * 1000));
      }
    }, 1000 / parseInt(speed));

    return () => {
      clearInterval(updateTime);
    };
  }, [startCountdown, targetTime, speed]);

  //update query parameters
  useEffect(() => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());
      newParams.set("speed", speed.toString());
      return newParams;
    });
  }, [speed, setSearchParams]);

  const hourDeg =
    ((currentTime.getHours() % 12) + currentTime.getMinutes() / 60) * 30;

  const minDeg =
    ((currentTime.getMinutes() + currentTime.getSeconds() / 60) * 6) % 360;

  const secDeg =
    ((currentTime.getSeconds() + currentTime.getMilliseconds() / 1000) * 6) %
    360;

  const handleShare = () => {
    console.log(window.location.href);
    const speedParam = speed;

    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("speed", speedParam.toString());

    if (navigator.share) {
      navigator.share({
        title: "Countdown Timer",
        url: shareUrl.toString(),
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert(`Share this link: ${shareUrl.toString()}`);
    }
  };

  const Logout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="mt-[76px] max-h-dvh w-dvw flex flex-col items-center gap-5 px-6 drop-shadow-md">
      <div className="flex w-full items-center justify-between gap-4 h-16">
        {/* Target Time */}
        <div className="border-2 border-primary rounded-lg w-full h-full flex flex-col p-2 items-center justify-center">
          <div className="font-semibold">Target Time</div>
          <div className="text-sm">{targetTime.toLocaleTimeString()}</div>
        </div>

        {/* Logout */}
        <div
          className="text-right border-2 border-primary h-full rounded-lg w-full text-nowrap flex items-center justify-center"
          onClick={Logout}
        >
          <div className="text-semibold">Logout</div>
        </div>
      </div>

      {/* Clock */}
      <div className="relative h-80 w-80 border-[12px] border-primary bg-black-1 rounded-full">
        {/* second hand */}
        <div
          style={{
            rotate: `${secDeg}deg`,
          }}
          className={`bg-primary absolute h-[135px] w-[4px] rounded-full -translate-x-[2px] left-1/2 bottom-1/2 origin-bottom-left z-30`}
        />

        {/* minute hand */}
        <div
          style={{
            rotate: `${minDeg}deg`,
          }}
          className="bg-white absolute h-[120px] w-[10px] rounded-full -translate-x-[5px] left-1/2 bottom-1/2 origin-bottom-left z-10"
        />

        {/* hour hand */}
        <div
          style={{
            rotate: `${hourDeg}deg`,
          }}
          className="bg-gray-1 border-x-4 border-t-4 border-white absolute h-[90px] w-[10px] rounded-full -translate-x-[5px] left-1/2 bottom-1/2 origin-bottom-left z-20"
        />

        {/* center dot */}
        <div className="bg-white absolute h-[20px] w-[20px] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 origin-bottom-left z-30" />
        <div className="bg-primary absolute h-[10px] w-[10px] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 origin-bottom-left z-30" />
      </div>

      <div className="w-full flex items-center justify-between">
        {/* Slider */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <input
            type="range"
            min="1"
            max="10"
            defaultValue={speed}
            onChange={(e) => {
              setSpeed(e.target.value);
            }}
            className="appearance-none bg-black-1 rounded-full h-2 disabled:opacity-50"
          />
          <label className="font-medium text-gray-1">
            Slider Speed : {speed}x
          </label>
        </div>

        {/* countdown button */}
        <div>
          <button
            onClick={() => {
              setStartCountdown(true);
              console.log(startCountdown);
            }}
            className="w-full bg-primary px-6 py-4 rounded-full font-semibold text-white text-sm"
          >
            Start Countdown
          </button>
        </div>
      </div>

      {/* Share Button */}
      <div className="w-full">
        <button
          onClick={handleShare}
          className="w-full flex items-center justify-center gap-2 bg-primary py-4 rounded-full font-semibold text-white"
        >
          Share URL <FaShareAlt size={16} />
        </button>
      </div>

      {/* Quotes */}
      <div className="border-2 border-gray-1 p-2 rounded-lg text-sm font-medium max-h-60 overflow-y-scroll">
        "{quote}"
      </div>
    </div>
  );
}

export default Home;
