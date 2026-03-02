import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './OpeningAnimation.css';
import Logo from './components/Logo';

// Particle Component
const Particles = () => {
  const particles = Array.from({ length: 50 }); // Increased density
  return (
    <div className="particles-container">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="particle"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight, // Start from bottom
            opacity: 0,
            scale: Math.random() * 0.8 + 0.2
          }}
          animate={{
            y: Math.random() * window.innerHeight * 0.2, // Float up to top
            x: (Math.random() - 0.5) * 200 + (Math.random() * window.innerWidth), // Drift
            opacity: [0, 1, 0],
            scale: [0.2, 1.2, 0]
          }}
          transition={{
            duration: 1.5 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
          style={{
            width: Math.random() * 6 + 'px',
            height: Math.random() * 6 + 'px',
          }}
        />
      ))}
    </div>
  );
};

const OpeningAnimation = ({ onComplete }) => {
  const [animationStep, setAnimationStep] = useState('initial'); // initial, handle, opening, showText, exit
  const [guestName, setGuestName] = useState('Harman Singh!'); // Default to show full effect

  // Audio Refs (Placeholders - user needs to add files)
  const doorAudioRef = useRef(null);
  const sparkleAudioRef = useRef(null);

  useEffect(() => {
    // 1. Get Guest Name from URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    if (name) setGuestName(name);

    // 2. Start Animation Sequence
    const sequence = async () => {
      // Wait a beat before starting
      await new Promise(r => setTimeout(r, 600));

      // Step 1: Handle Rotate
      setAnimationStep('handle');
      await new Promise(r => setTimeout(r, 500));

      // Step 2: Door Open
      setAnimationStep('opening');
      if (doorAudioRef.current) {
        doorAudioRef.current.volume = 0.5;
        doorAudioRef.current.play().catch(() => { });
      }

      // Step 3: Reveal Text
      await new Promise(r => setTimeout(r, 600)); // Faster text reveal
      setAnimationStep('showText');
      if (sparkleAudioRef.current) {
        sparkleAudioRef.current.volume = 0.4;
        sparkleAudioRef.current.play().catch(() => { });
      }

      // Step 4: Exit
      await new Promise(r => setTimeout(r, 4000)); // Read time
      setAnimationStep('exit');
    };

    sequence();
  }, []);

  const handleSkip = () => {
    setAnimationStep('exit');
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {animationStep !== 'exit' && (
        <motion.div
          className="luxury-welcome-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
          onClick={handleSkip}
          style={{ cursor: 'pointer' }}
        >
          {/* Logo in Top-Right Corner */}
          <div className="welcome-logo">
            <Logo variant="header" />
          </div>

          {/* Audio Elements */}
          <audio ref={doorAudioRef} src="/sounds/door-open.mp3" preload="auto" />
          <audio ref={sparkleAudioRef} src="/sounds/sparkle.mp3" preload="auto" />

          {/* Particles Background - Triggered earlier for magic feel */}
          {animationStep !== 'initial' && <Particles />}

          {/* 3D Door Environment */}
          <div className="door-frame">
            {/* The "Interior Room" Glow behind the door */}
            <motion.div
              className="door-interior"
              initial={{ opacity: 0 }}
              animate={animationStep === 'opening' || animationStep === 'showText' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />

            <motion.div
              className="door"
              initial={{ rotateY: 0 }}
              animate={
                animationStep === 'opening' || animationStep === 'showText'
                  ? { rotateY: -85 } // Open WIDE
                  : { rotateY: 0 }
              }
              transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <div className="door-face door-front">
                <div className="door-panel top"></div>
                <div className="door-panel bottom"></div>

                <motion.div
                  className="door-handle-plate"
                  initial={{ rotate: 0 }}
                  animate={
                    animationStep === 'handle' || animationStep === 'opening' || animationStep === 'showText'
                      ? { rotate: 25 }
                      : { rotate: 0 }
                  }
                  transition={{ duration: 0.4, ease: "backOut" }}
                >
                  <div className="handle-bar"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Text Content - Stacked Layout */}
          <AnimatePresence>
            {animationStep === 'showText' && (
              <motion.div
                className="welcome-text-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              >
                <motion.h1
                  className="welcome-line-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Welcome
                </motion.h1>
                <motion.h2
                  className="welcome-line-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  in 1061,
                </motion.h2>
                <motion.h1
                  className="guest-name"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {guestName}
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OpeningAnimation;
