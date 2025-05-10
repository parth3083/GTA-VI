import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { ArrowDown } from "lucide-react";

const App = () => {
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check device size on mount and window resize
  useEffect(() => {
    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    checkDeviceSize();
    window.addEventListener('resize', checkDeviceSize);
    
    return () => window.removeEventListener('resize', checkDeviceSize);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "power4.inOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.inOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          document.querySelector(".svg").remove();
          setShowContent(true);
          this.kill();
        }
      },
    });
  });
  
  useGSAP(() => {
    const main = document.querySelector(".main");

    // Only apply mouse move effects on non-mobile devices
    if (!isMobile && main) {
      main.addEventListener("mousemove", function (e) {
        const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
        gsap.to(".imagesdiv .text", {
          x: `${xMove * 0.4} %`,
        });
        gsap.to(".imagesdiv .sky", {
          x: xMove,
        });
        gsap.to(".imagesdiv .bg", {
          x: `${xMove * 1.3} %`,
        });
      });
    }
  }, [showContent, isMobile]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-black">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="250"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  VI
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>

      {showContent && (
        <div className="w-full main">
          <div className="landing overflow-hidden w-full h-screen bg-black">
            <div className="navbar absolute top-0 left-0 z-[10] p-10 w-full md:p-10 p-5">
              <div className="logo flex gap-7 md:gap-7 gap-3">
                <div className="lines flex flex-col gap-[5px]">
                  <div className="line md:w-10 w-7 h-1 bg-white"></div>
                  <div className="line md:w-8 w-5 h-1 bg-white"></div>
                  <div className="line md:w-5 w-3 h-1 bg-white"></div>
                </div>
                <h3 className="md:text-4xl text-2xl -mt-[8px] leading-none text-white">
                  Rockstar
                </h3>
              </div>
            </div>
            <div className="imagesdiv relative w-full h-screen">
              <img
                className="absolute scale-[1.2] sky top-0 left-0 w-full h-full object-cover"
                src="./sky.png"
                alt=""
              />
              <img
                className="absolute bg scale-[1.3] top-0 left-0 w-full h-full object-cover"
                src="./bg.png"
                alt=""
              />
              <div className={`text text-white flex flex-col gap-3 absolute ${isMobile ? 'top-20' : isTablet ? 'top-16' : 'top-10'} left-1/2 -translate-x-1/2`}>
                <h1 className={`${isMobile ? 'text-6xl -ml-10' : isTablet ? 'text-9xl -ml-20' : 'text-[12rem] -ml-40'} leading-none`}>grand</h1>
                <h1 className={`${isMobile ? 'text-6xl ml-5' : isTablet ? 'text-9xl ml-10' : 'text-[12rem] ml-20'} leading-none`}>theft</h1>
                <h1 className={`${isMobile ? 'text-6xl -ml-10' : isTablet ? 'text-9xl -ml-20' : 'text-[12rem] -ml-40'} leading-none`}>auto</h1>
              </div>
              <img
                className={`absolute character left-1/2 -translate-x-1/2 ${isMobile ? '-bottom-[30%] w-[90%]' : isTablet ? '-bottom-[40%] w-[80%]' : '-bottom-[60%]'}`}
                src="./girlbg.png"
                alt=""
              />
            </div>
            <div className="btmbar text-white w-full absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-10 z-[10] md:p-10 p-5">
              <div className="flex gap-3 items-center cursor-pointer">
                <ArrowDown className={`${isMobile ? 'text-xl' : 'text-3xl'}`} />
                <h3 className={`font-mono ${isMobile ? 'text-base' : 'text-xl'}`}>Scroll down</h3>
              </div>
              <img
                src="./ps5.png"
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isMobile ? 'h-[30px]' : isTablet ? 'h-[40px]' : 'h-[45px]'}`}
                alt=""
              />
            </div>
          </div>
          <div className={`w-full min-h-screen bg-black ${isMobile ? 'flex flex-col px-6 py-12' : isTablet ? 'gap-10 flex items-center justify-center px-10' : 'gap-20 flex items-center justify-center px-20'}`}>
            <div className={`${isMobile ? 'w-full' : isTablet ? 'w-[48%]' : 'left w-[45%]'} ${isMobile ? 'h-auto' : 'h-full'} flex items-center justify-center relative`}>
               <img
                  className={`${isMobile ? 'w-full h-auto' : isTablet ? 'w-full h-[70%]' : 'w-full h-[80%]'} object-cover`}
                  src="./imag.png"
                  alt=""
                />
           </div>
            <div className={`${isMobile ? 'w-full mt-10' : isTablet ? 'w-[48%]' : 'left w-[45%]'} ${isMobile ? 'h-auto' : 'h-full'} text-white py-16 flex flex-col gap-5`}>
              <h1 className={`${isMobile ? 'text-5xl' : isTablet ? 'text-6xl' : 'text-8xl'}`}>Still Running,</h1>
              <h1 className={`${isMobile ? 'text-5xl' : isTablet ? 'text-6xl' : 'text-8xl'}`}>Not Hunting</h1>
              <p className="font-mono mt-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum iusto deserunt, libero porro unde exercitationem. Itaque qui aliquid sit rerum eveniet. Commodi odio itaque ipsam quae magni nihil facilis nisi!</p>
              <p className="font-mono mt-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Natus ipsum sint dolorem dolor aliquid veritatis, esse magnam illum molestias iste fugit rerum fugiat dolores perspiciatis quis itaque non porro laborum possimus atque voluptatibus cum. Esse, nostrum enim repellendus asperiores sint deleniti corrupti. Quasi natus, dolores molestiae sapiente soluta nam saepe!</p>
              <button className={`bg-yellow-500 ${isMobile ? 'px-5 py-5 w-full text-2xl' : isTablet ? 'px-8 py-8 w-[70%] text-3xl' : 'px-10 py-10 w-[60%] text-4xl'} cursor-pointer text-black mt-10`}>
                  Download Now
              </button>
           </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;