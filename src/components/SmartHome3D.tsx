import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldAlert, Fingerprint, Router, PhoneCall } from 'lucide-react';
import styles from './SmartHome3D.module.css';

const Platform3D = ({ w, h, d, x, y, z, color }: any) => {
  const topColor = color || 'rgba(6, 182, 212, 0.2)';
  const frontLeftColor = color ? color.replace(/[\d.]+\)$/, '0.4)') : 'rgba(6, 182, 212, 0.4)';
  const frontRightColor = color ? color.replace(/[\d.]+\)$/, '0.15)') : 'rgba(6, 182, 212, 0.15)';
  const border = `1px solid ${color ? color.replace(/[\d.]+\)$/, '0.8)') : 'rgba(6,182,212,0.8)'}`;

  return (
    <div style={{ position: 'absolute', width: w, height: h, left: x, top: y, transform: `translateZ(${z}px)`, transformStyle: 'preserve-3d' }}>
      {/* Top face */}
      <div style={{ position: 'absolute', width: w, height: h, transform: `translateZ(${d}px)`, background: topColor, border, backdropFilter: 'blur(4px)' }} />
      {/* Front-left face */}
      <div style={{ position: 'absolute', width: w, height: d, top: h, transformOrigin: 'top', transform: `rotateX(-90deg)`, background: frontLeftColor, border }} />
      {/* Front-right face */}
      <div style={{ position: 'absolute', width: d, height: h, left: w, transformOrigin: 'left', transform: `rotateY(90deg)`, background: frontRightColor, border }} />
    </div>
  );
};

export function SmartHome3D() {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);

  const devices = [
    { id: 1, x: 20, y: 20, z: 60, label: 'Câmera CFTV Alta Resolução', icon: <Camera size={32} /> },
    { id: 2, x: 140, y: 10, z: 120, label: 'Controle de Acesso Facial', icon: <Fingerprint size={32} /> },
    { id: 3, x: 40, y: 140, z: 80, label: 'Roteador Mesh Industrial', icon: <Router size={32} /> },
    { id: 4, x: 180, y: 120, z: 40, label: 'Central de Alarme Inteligente', icon: <ShieldAlert size={32} /> },
    { id: 5, x: 100, y: 220, z: 90, label: 'Interfonia Digital Vídeo', icon: <PhoneCall size={32} /> },
  ];

  return (
    <div className={styles.sceneContainer}>
      <div className={styles.scene}>
        
        {/* Core Connection Grid (Linhas de dados conectando as plataformas no chão imaginário) */}
        <svg className={styles.dataGrid} viewBox="0 0 280 280">
          <path d="M50,50 L170,40 L210,150 L130,250 L70,170 Z" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M170,40 L70,170" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
          <path d="M50,50 L210,150" fill="none" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="2" />
        </svg>

        {devices.map((device) => {
          // Dimensões padrão para cada pedestal flutuante
          const w = 60, h = 60, d = 10;
          const isActive = activeSpot === device.id;
          
          return (
            <div
              key={device.id}
              className={styles.deviceWrapper}
              onMouseEnter={() => setActiveSpot(device.id)}
              onMouseLeave={() => setActiveSpot(null)}
            >
              <Platform3D 
                w={w} h={h} d={d} 
                x={device.x} y={device.y} z={device.z} 
                color={isActive ? 'rgba(16, 185, 129, 0.6)' : 'rgba(6, 182, 212, 0.3)'} 
              />
              
              {/* O Ícone e feixe de luz flutuando ACIMA do pedestal */}
              <motion.div
                className={`${styles.deviceIconGroup} ${isActive ? styles.active : ''}`}
                style={{ 
                  left: `${device.x + w/2}px`, 
                  top: `${device.y + h/2}px`, 
                  transform: `translateZ(${device.z + d + 30}px)` // flutuando 30px acima da plataforma
                }}
                animate={{ z: isActive ? device.z + d + 45 : device.z + d + 20 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                {/* Feixe de luz cilíndrico (Beam) interagindo com a plataforma */}
                <div className={styles.lightBeam} style={{ height: `${device.z + d + 30}px` }}></div>
                
                <div className={styles.iconContainer}>
                  {device.icon}
                </div>

                {isActive && (
                  <div className={styles.tooltipWrapper}>
                    <motion.div 
                      className={styles.tooltip}
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                    >
                      {device.label}
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
