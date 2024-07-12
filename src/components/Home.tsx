import { useState } from "react";

function Home() {
  const [speed, setSpeed] = useState("1");

  return (
    <div className="h-dvh w-dvw flex flex-col items-center gap-8 px-6">
      {/* Clock */}
      <div className="mt-[76px] relative h-80 w-80 border-[10px] border-black-1 bg-primary rounded-full">
        {/* second hand */}
        <div className="bg-black-1 absolute h-[10px] w-[140px] rounded-full -translate-y-[5px] left-1/2 top-1/2 origin-bottom-left" />

        {/* minute hand */}
        <div className="bg-gray-600 absolute h-[10px] w-[120px] rounded-full -translate-y-[5px] left-1/2 top-1/2 origin-bottom-left" />

        {/* hour hand */}
        <div className="bg-white absolute h-[10px] w-[100px] rounded-full -translate-y-[5px] left-1/2 top-1/2 origin-bottom-left" />

        {/* center dot */}
        <div className="bg-gray-1 border-2 border-black-1 absolute h-[20px] w-[20px] rounded-full -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 origin-bottom-left" />
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-2">
        <input
          type="range"
          min="1"
          max="5"
          onChange={(e) => {
            setSpeed(e.target.value);
          }}
        />
        <label>Slider Speed : {speed}x</label>
      </div>

      {/* Quotes */}
      <div>Quotes</div>

      {/* Share Button */}
      <div className="w-full">
        <button
          onClick={() => {}}
          className="w-full bg-primary py-4 rounded-full font-semibold text-white text-sm"
        >
          Go to Tracking Screen
        </button>
      </div>
    </div>
  );
}

export default Home;
