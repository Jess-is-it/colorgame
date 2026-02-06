import { motion, useSpring, MotionValue, useTransform } from 'framer-motion';
import { cn } from 'src/lib/utils';

type AnimatedTooltipProps = {
  name: string;
  designation?: string;
  className?: string;
  x: MotionValue<number>;
};

const AnimatedTooltip = ({ name, designation, x, className }: AnimatedTooltipProps) => {
  const rotate = useSpring(useTransform(x, [-100, 100], [-45, 45]), {
    stiffness: 100,
    damping: 15,
  });

  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), {
    stiffness: 100,
    damping: 15,
  });

  return (
    <motion.div
      style={{ translateX, rotate }}
      className={cn(
        `pointer-events-none absolute -top-16 left-1/2 hidden -translate-x-1/2 flex-col items-center rounded-md bg-primary px-4 py-2 text-xs shadow-xl group-hover:flex ${className}`,
      )}
    >
      <div className="text-base font-bold text-white whitespace-nowrap">{name}</div>
      <div className="text-xs text-white whitespace-nowrap">{designation}</div>
    </motion.div>
  );
};

export default AnimatedTooltip;
