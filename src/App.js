import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import React, { useState } from "react";

import { chunkGallery } from "./helpers/createChunk";
import { slides } from "./data/slides";

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentChunk, setCurrentChunk] = useState(0);

  const chunkArray = chunkGallery(slides, 3, currentChunk);
  
  //btn slider
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  //btn gallery
  const prevChunk = () => {
    const currentIndex = currentChunk === 0;
    return currentIndex ? 0 : setCurrentChunk((prev) => prev - 1);
  };

  const nextChunk = () => {
    const currentIndex = currentChunk === slides.length / chunkArray.length - 1;
    return currentIndex ? currentChunk : setCurrentChunk((prev) => prev + 1);
  };

  //btn for change main image in slider
  const handleGallery = (url) => {
    const element = slides.find((element) => element.url === url);
    console.log(element);
    setCurrentIndex(element?.id);
  };

  return (
    <div className="bg-slate-600 ">
      <div className="h-[100vh] container mx-auto">
        <div className="max-w-[1400px] h-[580px] w-full m-auto py-4 px-4 relative">
          <div
            style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
            className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
          ></div>

          {/* left arrow */}
          <div
            onClick={prevSlide}
            className="absolute top-[50%] -translate-Y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          >
            <BsChevronCompactLeft size={30} />
          </div>

          {/* right arrow */}
          <div
            onClick={nextSlide}
            className="absolute top-[50%] -translate-Y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer"
          >
            <BsChevronCompactRight size={30} />
          </div>
        </div>

        {/* gallery */}
        <div className="flex max-w-[1400px] h-[200px] gap-4 px-4 py-8 relative">
          {slides.length > 3
            ? chunkArray.map((slide, index) => (
                <div
                  onClick={() => handleGallery(slide.url)}
                  key={index}
                  style={{ backgroundImage: `url(${slide.url})` }}
                  className="w-full h-full rounded-2xl bg-center bg-cover duration-500 cursor-pointer"
                ></div>
              ))
            : slides.map((slide, index) => (
                <div
                  key={index}
                  style={{ backgroundImage: `url(${slide.url})` }}
                  className="w-full h-full rounded-2xl bg-center bg-cover duration-500 cursor-pointer"
                ></div>
              ))}

          {/* left arrow */}
          {slides.length > 3 && (
            <div
              onClick={prevChunk}
              className="absolute top-[35%] -translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/60 text-white cursor-pointer"
            >
              <BsChevronCompactLeft size={20} />
            </div>
          )}

          {/* right arrow */}
          {slides.length > 3 && (
            <div
              onClick={nextChunk}
              className="absolute top-[35%] -translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/60 text-white cursor-pointer"
            >
              <BsChevronCompactRight size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
