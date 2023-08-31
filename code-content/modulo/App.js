import { Play, Pause, RotateCcw } from "react-feather";
import Card from "./Card";
import styles from "./App.module.css";
import { MotionConfig, motion } from "framer-motion";
import VisuallyHidden from "./VisuallyHidden";
import React from "react";
import clsx from "clsx";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

export default function App() {
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    if (!isRunning) return;

    const tid = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 1000);

    return () => {
      clearInterval(tid);
    };
  }, [isRunning]);
  // TODO: This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[timeElapsed % COLORS.length];

  return (
    <MotionConfig reducedMotion="user">
      <Card as="section" className={styles.wrapper}>
        <ul className={styles.colorsWrapper}>
          {COLORS.map((color, index) => {
            const isSelected = color.value === selectedColor.value;

            return (
              <li className={styles.color} key={index}>
                {isSelected && (
                  <motion.div
                    layoutId="outline"
                    className={styles.selectedColorOutline}
                  />
                )}
                <div
                  className={clsx(
                    styles.colorBox,
                    isSelected && styles.selectedColorBox
                  )}
                  style={{
                    backgroundColor: color.value,
                  }}
                >
                  <VisuallyHidden>{color.label}</VisuallyHidden>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.timeWrapper}>
          <dl className={styles.timeDisplay}>
            <dt>Time Elapsed</dt>
            <dd>{timeElapsed}</dd>
          </dl>
          <div className={styles.actions}>
            <button onClick={() => setIsRunning(!isRunning)}>
              {isRunning ? (
                <>
                  <Pause />
                  <VisuallyHidden>Pause</VisuallyHidden>
                </>
              ) : (
                <>
                  <Play />
                  <VisuallyHidden>Play</VisuallyHidden>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsRunning(false);
                setTimeElapsed(0);
              }}
            >
              <RotateCcw />
              <VisuallyHidden>Reset</VisuallyHidden>
            </button>
          </div>
        </div>
      </Card>
    </MotionConfig>
  );
}
