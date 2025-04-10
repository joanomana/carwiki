"use client";

import Flicking from "@egjs/react-flicking";
import { useRef } from "react";
import styles from "@/style/slider.module.css";
import "@egjs/react-flicking/dist/flicking.css";

const featuredCars = [
  {
    name: "Ferrari F40",
    description: "Un clásico superdeportivo italiano con motor V8 biturbo.",
    image:
      "https://build.ford.com/dig/Lincoln/Navigator/2024/HD-TILE[INTBCK]/Image%5B%7CLincoln%7CNavigator%7C2024%7C1%7C1.%7C800A...PUM...89F.BLA.47B.21C.21V.NAV.643.4X4.%5D/EXT/1/vehicle.png?imwidth=1200",
    background: "/background/backgroundcar.jpg",
  },
  {
    name: "Ford Mustang",
    description: "El icónico muscle car americano con una rica historia.",
    image:
      "https://www.vdm.ford.com/content/dam/na/ford/en_us/images/mustang/2025/jellybeans/Ford_Mustang_2025_100A_PYZ_88D_89W_13A_COU_64F_99H_44U_EBST_DEFAULT_EXT_4.png",
    background: "/background/backgroundcar.jpg",
  },
  {
    name: "Porsche 911",
    description: "Diseño inconfundible y alto rendimiento desde 1964.",
    image:
      "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb65b47550d1e3d8e88cb10/stills_0640_png/MY2023/51646/51646_st0640_116.png",
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
