import { Activity, useContext } from 'react';
import { ImageContext } from 'src/context/imageai-context';
import ImagePrompt from './ImagePrompt';
import GeneratedImageDisplay from './GeneratedImageDisplay';
import DefaultImageDisplay from './DefaultImageDisplay';
import { Card } from 'src/components/ui/card';

function ImageAiApp() {
  const { displayedImages, isGenerating } = useContext(ImageContext);

  const hasGeneratedImages = displayedImages && displayedImages.length > 0;
  return (
    <Card>
      <div className="h-full flex flex-auto flex-col gap-5">
        <ImagePrompt />
        <Activity mode={isGenerating || hasGeneratedImages ? 'visible' : 'hidden'}>
          <GeneratedImageDisplay />
        </Activity>
        <DefaultImageDisplay />
      </div>
    </Card>
  );
}

export default ImageAiApp;
