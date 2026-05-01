import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  duration?: number;
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  y = 40,
  duration = 0.9,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.65, 0, 0.35, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
