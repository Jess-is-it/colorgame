import { useEffect, useRef, useState } from 'react';
import { masonryImages } from 'src/api/image-ai/dropdowndata';
import { Card } from 'src/components/ui/card';

function DefaultImageDisplay() {
  const [allImages, setAllImages] = useState([...masonryImages]);
  const loadMoreRef = useRef(null);
  const loadCount = useRef(0);
  const MAX_LOADS = 2;

  // Observer to detect when bottom of page is reached
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loadCount.current < MAX_LOADS) {
          // Append same 12 images again
          setAllImages((prev) => [...prev, ...masonryImages]);
          loadCount.current += 1;
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      },
    );
    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold ">Recent images</h3>
        <div className="columns-2 md:columns-4 space-y-0">
          {allImages.map((url, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <img
                src={url}
                alt={`AI generated image ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>

        {/* This div triggers loading more images when in view */}
        {loadCount.current < MAX_LOADS && <div ref={loadMoreRef} className="h-10" />}

        {loadCount.current >= MAX_LOADS && (
          <p className="text-center mt-4">You’ve reached the end.</p>
        )}
      </div>
    </Card>
  );
}

export default DefaultImageDisplay;
