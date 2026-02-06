import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import GalleryApp from 'src/components/apps/userprofile/gallery';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Gallery',
  },
];

const Gallery = () => {
  return (
    <>
      <BreadcrumbComp title="Gallery" items={BCrumb} />
      <GalleryApp />
    </>
  );
};

export default Gallery;
