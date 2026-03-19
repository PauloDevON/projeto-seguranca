import { motion } from 'framer-motion';
import { Camera, ShieldAlert, Fingerprint, Router, Video } from 'lucide-react';
import styles from './BackgroundSilhouettes.module.css';

export function BackgroundSilhouettes() {
  const elements = [
    { id: 1, Icon: Camera, top: '20vh', left: '-5vw', size: 300, delay: 0 },
    { id: 2, Icon: Fingerprint, top: '90vh', right: '-10vw', size: 400, delay: 0.2 },
    { id: 3, Icon: Router, top: '160vh', left: '-5vw', size: 450, delay: 0.1 },
    { id: 4, Icon: ShieldAlert, top: '230vh', right: '-8vw', size: 400, delay: 0.3 },
    { id: 5, Icon: Video, top: '290vh', left: '5vw', size: 300, delay: 0.1 },
  ];

  return (
    <div className={styles.silhouettesWrapper}>
      {elements.map((item) => (
        <motion.div
          key={item.id}
          className={styles.silhouetteItem}
          style={{ top: item.top, left: item.left, right: item.right }}
          initial={{ opacity: 0, y: 100, scale: 0.5 }}
          whileInView={{ opacity: 0.04, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 1.5, delay: item.delay, ease: "easeOut" }}
        >
          <item.Icon size={item.size} strokeWidth={0.5} />
        </motion.div>
      ))}
    </div>
  );
}
