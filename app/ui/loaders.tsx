"use client";
import { motion } from "framer-motion";

interface PulsingRingLoaderProps {
  height?: string | number;
}

const PulsingRingLoader = ({ height }: PulsingRingLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${height || "h-screen"}`}>
      <motion.div
        className="w-8 h-8 border-2 border-teal-500 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

interface PingAnimationLoaderProps {
  height?: string | number;
}

const PingAnimationLoader = ({ height }: PingAnimationLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${height || "h-screen"}`}>
      <div className="relative">
        <div className="w-12 h-12 rounded-full bg-teal-400 opacity-75 animate-ping"></div>
        <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-teal-600"></div>
      </div>
    </div>
  );
};

interface DualRingLoaderProps {
  height?: string | number;
}

const DualRingLoader = ({ height }: DualRingLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${height || "h-screen"}`}>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-teal-300 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-teal-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export { PulsingRingLoader, PingAnimationLoader, DualRingLoader };
