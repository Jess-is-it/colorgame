import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ImageAiApp from 'src/components/apps/image-ai';
import { ImageAiProvider } from 'src/context/imageai-context';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '',
    title: 'Image-AI',
  },
];

function ImageAI() {
  return (
    <>
      <ImageAiProvider>
        <BreadcrumbComp title="Image-AI" items={BCrumb} />
        <ImageAiApp />
      </ImageAiProvider>
    </>
  );
}

export default ImageAI;
