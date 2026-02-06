import { Card } from 'src/components/ui/card';
import FileUploadMotion from 'src/components/animated-component/FileUploadMotion';

const Media = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Media</h5>
        <FileUploadMotion />
      </Card>
    </>
  );
};

export default Media;
