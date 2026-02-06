import { useEffect, useRef, useState } from 'react';
import piggyBg from 'src/assets/images/backgrounds/piggy.png';
import { Badge } from 'src/components/ui/badge';
import { Card } from 'src/components/ui/card';
import { Progress } from 'src/components/ui/progress';

// Simple hook to animate progress when `start` is true
function useAnimatedProgress(target: number, start: boolean) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!start) return;

    const intervalDuration = 30;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < target) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, intervalDuration);

    return () => clearInterval(interval);
  }, [start, target]);

  return progress;
}

const SellingProducts = () => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer watching the whole card
  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  // Use the animation hook with shared `isInView` trigger
  const progress1 = useAnimatedProgress(55, isInView);
  const progress2 = useAnimatedProgress(65, isInView);

  return (
    <Card className="p-0 overflow-hidden h-full" ref={cardRef}>
      <div className="p-7 pb-0 bg-primary">
        <h5 className="card-title text-white">Best Selling Products</h5>
        <p className="card-subtitle text-white dark:text-white">Overview 2024</p>
        <div className="flex justify-center mt-3">
          <img src={piggyBg} alt="piggy-bg" />
        </div>
      </div>
      <div className="px-2 pb-2 bg-primary">
        <Card>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h6 className="text-base mb-0.5">MaterialPro</h6>
                <p>$23,568</p>
              </div>
              <div>
                <Badge variant="lightPrimary" className="text-sm rounded-md py-1.1">
                  55%
                </Badge>
              </div>
            </div>
            <Progress value={progress1} variant="primary" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <h6 className="text-base mb-0.5">Modernize</h6>
                <p>$24,468</p>
              </div>
              <div>
                <Badge variant="lightSecondary" className="text-sm rounded-md py-1.1">
                  65%
                </Badge>
              </div>
            </div>
            <Progress value={progress2} variant="secondary" />
          </div>
        </Card>
      </div>
    </Card>
  );
};

export { SellingProducts };
