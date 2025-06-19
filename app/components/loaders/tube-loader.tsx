import styles from "./style.module.css";

interface CustomStyle extends React.CSSProperties {
  "--i"?: number; // Define your custom property
}

export default function TubeLoaders() {
  return (
    <section className={styles.loader}>
      <div className={styles.slider} style={{ "--i": 0 } as CustomStyle}></div>
      <div className={styles.slider} style={{ "--i": 1 } as CustomStyle}></div>
      <div className={styles.slider} style={{ "--i": 2 } as CustomStyle}></div>
      <div className={styles.slider} style={{ "--i": 3 } as CustomStyle}></div>
      <div className={styles.slider} style={{ "--i": 4 } as CustomStyle}></div>
    </section>
  );
}
