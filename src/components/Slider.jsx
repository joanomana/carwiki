"use client";

import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import styles from "@/style/slider.module.css";
import "@egjs/react-flicking/dist/flicking.css";

const featuredCars = [
  {
    name: "Lincoln Navigator",
    description: "A classic luxury SUV with a powerful V8 engine.",
    image:
      "https://build.ford.com/dig/Lincoln/Navigator/2024/HD-TILE[INTBCK]/Image%5B%7CLincoln%7CNavigator%7C2024%7C1%7C1.%7C800A...PUM...89F.BLA.47B.21C.21V.NAV.643.4X4.%5D/EXT/1/vehicle.png?imwidth=1200",
    background: "/background/backgroundcar.jpg",
  },
  {
    name: "Ford Mustang",
    description: "The iconic American muscle car with a rich history.",
    image:
      "https://www.vdm.ford.com/content/dam/na/ford/en_us/images/mustang/2025/jellybeans/Ford_Mustang_2025_100A_PYZ_88D_89W_13A_COU_64F_99H_44U_EBST_DEFAULT_EXT_4.png",
    background: "/background/backgroundcar.jpg",
  },
  {
    name: "Lexus LC 500",
    description: "A luxury grand tourer with striking design and exhilarating performance.",
    image:
      "https://cdn.jdpower.com/ChromeImageGallery/Expanded/Transparent/640/2024LEC34_640/2024LEC341935475_640_01.png",
    background: "/background/backgroundcar.jpg",
  },
];

export default function FeaturedCarsSlider() {
  const flickingRef = useRef(null);

  const handlePrev = () => {
    flickingRef.current?.prev();
  };

  const handleNext = () => {
    flickingRef.current?.next();
  };

  return (
    <div className={styles.sliderContainer}>
      <Flicking
        ref={flickingRef}
        circular={true}
        autoResize={true}
        moveType="snap"
        align="center"
      >
        {featuredCars.map((car, index) => (
          <div key={index} className={styles.slide}>
            <div
              className={styles.background}
              style={{ backgroundImage: `url(${car.background})` }}
            >
              <button
                className={`${styles.navButton} ${styles.prev}`}
                onClick={handlePrev}
              >
                ❮
              </button>
              <button
                className={`${styles.navButton} ${styles.next}`}
                onClick={handleNext}
              >
                ❯
              </button>

              <div className={styles.content}>
                <h2>{car.name}</h2>
                <p>{car.description}</p>
                <img
                  src={car.image}
                  alt={car.name}
                  className={styles.carImage}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}
      </Flicking>
    </div>
    
  );
}
