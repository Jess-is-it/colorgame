import TitleCard from 'src/components/shared/TitleBorderCard';
import FileUploadMotion from 'src/components/animated-component/FileUploadMotion';

const AnimatedDropzone = () => {
  return (
    <>
      <TitleCard title="Animated Dropzone">
        <div>
          <FileUploadMotion />
        </div>
      </TitleCard>
    </>
  );
};

export default AnimatedDropzone;
