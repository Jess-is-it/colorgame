import { createContext, ReactNode, useEffect, useState } from 'react';
import { getFetcher, postFetcher } from 'src/api/global-fetcher';
import useSWR from 'swr';

interface ImageContextType {
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;

  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;

  displayedImages: string[];
  setDisplayedImages: React.Dispatch<React.SetStateAction<string[]>>;

  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;

  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  generateImages: (prompt: string) => void;

  error: Error | null;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;

  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ImageContext = createContext<ImageContextType | any>(undefined);

export const ImageAiProvider = ({ children }: { children: ReactNode }) => {
  const [prompt, setPrompt] = useState('');
  const [images, setImages] = useState<any>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [displayedImages, setDisplayedImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false); //loading indicator.
  const [isUsingMock, setIsUsingMock] = useState(false);

  // Fetch Post data from the API
  const {
    data,
    isLoading: isImageLoading,
    error: isImageError,
  } = useSWR('/api/image-ai', getFetcher);

  useEffect(() => {
    if (data?.images) {
      setImages(data?.images);
      setLoading(isImageLoading);
    } else if (isImageError) {
      setError(isImageError);
      setLoading(isImageLoading);
    } else {
      setLoading(isImageLoading);
    }
  }, [data, isImageError]);

  const generateImages = async (prompt: string) => {
    setIsGenerating(true);

    try {
      const result = await postFetcher('/api/image-ai', {
        prompt,
        currentIndex,
      });

      if (!result || !result.images) {
        throw new Error('Image generation failed');
      }

      const { images: responseImages, isMock } = result;

      setIsUsingMock(isMock);

      if (isMock) {
        // Store full mock image set (only once)
        if (!images || images.length === 0) {
          setImages(responseImages);
        }

        // Cycle through 4 images at a time
        const nextIndex = currentIndex % responseImages.length;
        let nextImages = responseImages.slice(nextIndex, nextIndex + 4);

        if (nextImages.length < 4) {
          nextImages = nextImages.concat(responseImages.slice(0, 4 - nextImages.length));
        }

        setDisplayedImages(nextImages);
        setCurrentIndex((nextIndex + 4) % responseImages.length);
      } else {
        setDisplayedImages(responseImages);
        setImages(responseImages);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Image generation error:', error);
      alert('Error generating images.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <ImageContext.Provider
      value={{
        prompt,
        setPrompt,
        images,
        displayedImages,
        setDisplayedImages,
        currentIndex,
        setCurrentIndex,
        generateImages,
        isLoading,
        setLoading,
        error,
        setError,
        setImages,
        isGenerating,
        setIsGenerating,
        setIsUsingMock,
        isUsingMock,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};
