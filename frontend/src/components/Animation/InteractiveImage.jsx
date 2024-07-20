import React, { useEffect, useRef, useState } from "react";
import "./InteractiveImage.css"; 
import intImg1 from "../../assets/intImg.png";
import intImg2 from "../../assets/intImg2.png";
import intImg3 from "../../assets/intImg3.png";

function InteractiveImage() {
  const containerRef = useRef(null);
  const images = [intImg1, intImg2, intImg3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotateAngle, setRotateAngle] = useState(0);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = (e) => {
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const mouseX = e.pageX - container.offsetLeft;
      const mouseY = e.pageY - container.offsetTop;

      const rotateY = (mouseX / containerWidth - 0.5) * 30; 
      const rotateX = (mouseY / containerHeight - 0.5) * -30;

      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotateAngle((angle) => angle - 120);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setRotateAngle((angle) => angle + 120);
      }, 700);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="imgContainer" ref={containerRef}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`interactive-image ${
            index === currentImageIndex ? "active" : ""
          }`}
          style={{ transform: `rotateY(${rotateAngle}deg)` }}
        />
      ))}
    </div>
  );
}

export default InteractiveImage;
