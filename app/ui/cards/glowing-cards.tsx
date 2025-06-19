// Styles
import styles from "./style.module.css";

export const GlowingCard = ({
  children,
  title,
  cardHeight,
}: {
  children: React.ReactNode;
  title: string;
  cardHeight: string;
}) => {
  return (
    <>
      <div className={`${styles.top} ${cardHeight} relative overflow-hidden`}>
        {children}
      </div>
      <div className={`flex items-center justify-center p-6`}>
        <div className={styles.btn}>
          <strong>{title}</strong>
          <div className={styles.containerStars} id="container-stars">
            <div className={styles.stars} id="stars"></div>
          </div>

          <div className={styles.glow} id="glow">
            <div className={styles.circle}></div>
            <div className={styles.circle}></div>
          </div>
        </div>
      </div>
    </>
  );
};
