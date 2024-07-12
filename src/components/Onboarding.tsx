import { useState } from "react";
import background1 from "../assets/onboarding_image_1.png";
import background2 from "../assets/onboarding_image_2.png";
import background3 from "../assets/onboarding_image_3.png";
import { BsArrowRight } from "react-icons/bs";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";

interface CardProps {
  heading: string;
  text: string;
  children: React.ReactNode;
  classname?: string;
}

const Card: React.FC<CardProps> = ({ heading, text, children, classname }) => {
  return (
    <div
      className={`bg-[#FE8C00] w-full h-full max-h-[400px] text-center rounded-[48px] flex flex-col text-white gap-4 transition-all duration-300 ${classname}`}
    >
      {/* Heading */}
      <div className="text-[32px] px-[30px] pt-8 leading-10 font-semibold transition-all duration-300">
        {heading}
      </div>

      {/* Text */}
      <div className="px-[30px] text-sm leading-5">{text}</div>

      {children}
    </div>
  );
};

const Onboarding = () => {
  const [slide, setSlide] = useState<number>(0);

  const content = [
    {
      image: background1,
      heading: "We serve incomparable delicacies",
      text: "All the best restaurants with their top menu waiting for you, they cant't wait for your order!!",
    },
    {
      image: background2,
      heading: "We serve incomparable delicacies",
      text: "All the best restaurants with their top menu waiting for you, they cant't wait for your order!!",
    },
    {
      image: background3,
      heading: "We serve incomparable delicacies",
      text: "All the best restaurants with their top menu waiting for you, they cant't wait for your order!!",
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${content[slide].image})`,
        transition: "background ease-in 300ms",
      }}
      className="h-screen w-screen flex items-end justify-center bg-center bg-cover pb-10 px-8"
    >
      {content.map((item, index) => (
        <Card
          key={index}
          heading={item.heading}
          text={item.text}
          classname={slide === index ? "block" : "hidden"}
        >
          <div className="flex flex-col items-center justify-between h-full pb-8">
            {/* Indicators */}
            <div className="flex w-full items-center justify-center gap-1">
              {content.map((_, index) => (
                <div
                  key={index}
                  className={`${
                    slide === index ? "bg-white" : "bg-[#c2c2c2]"
                  } w-6 h-[6px] rounded-full flex transition-all`}
                />
              ))}
            </div>

            {slide === content.length - 1 ? (
              <Link
                to="/login"
                replace
              >
                <div className="flex items-center justify-center border-white border-2 p-4 rounded-full border-s-[#ffffff16] rotate-45">
                  <div className="bg-white p-5 rounded-full -rotate-45">
                    <GoArrowRight
                      fill="#FE8C00"
                      size={24}
                    />
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full flex justify-between items-center font-semibold px-8">
                <button
                  className="text-white text-sm w-fit"
                  onClick={() => setSlide(content.length - 1)}
                >
                  Skip
                </button>
                <button
                  className="text-white text-sm flex items-center font-semibold"
                  onClick={() =>
                    slide < content.length - 1 && setSlide((slide) => slide + 1)
                  }
                >
                  Next <BsArrowRight />
                </button>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Onboarding;
