import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

function Animate() {
  const [isWaveVisible, setIsaveVisible] = useState(false);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let dispalyTime = isWaveVisible ? 3000 : 5000;
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      setIsaveVisible(!isWaveVisible);
    }, dispalyTime);
  }, [isWaveVisible]);
  return (
    <>
      {isWaveVisible ? <div className="wave">🖐</div> : <div>5days</div>}

      <style jsx>{`
        div {
            margin-left:100px;
          color: transparent;
          text-shadow: 0 0 0 red;
          height:20px;
        }
        .wave {
          animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
          animation-duration: 500ms; /* Change to speed up or slow down */
          animation-iteration-count: infinite; /* Never stop waving :) */
           transform-origin: 50% 70%; /* Pivot around the bottom-left palm */
          display: inline-block;
        }

        @keyframes wave-animation {
          0% {
            transform: rotate( 0.0deg);
          }
          5%{
            transform: rotate( 0.0deg);
          }
          10%{
            transform: rotate( 0.0deg);
          }
          15%{
            transform: rotate( 0deg);
          }
          20%{
            transform: rotate( -15deg);
          }
          25%{
            transform: rotate( -35deg);
          }
          30%{
            transform: rotate( -27deg);
          }
          35%{
            transform: rotate( -18deg);
          }
          40%{
            transform: rotate( 0.0deg);
          }
          45% {
            transform: rotate( 5deg);
          }
          50%{
            transform: rotate( 15deg);
          }
          55%{
            transform: rotate( 27deg);
          }
          60%{
            transform: rotate( 30deg);
          }
          65%{
            transform: rotate( 37deg);
          }
          70%{
            transform: rotate( 30deg);
          }
          75%{
            transform: rotate( 25deg)
          }
          80%{
            transform: rotate( 0deg);
          }
          85%{
            transform: rotate( 0deg);
          }
          90%{
            transform: rotate( 0.0deg);
          }
          95%{
            transform: rotate( 0.0deg);
          }
          100% { transform: rotate( 0.0deg);}
      `}</style>
    </>
  );
}

export default Animate;
