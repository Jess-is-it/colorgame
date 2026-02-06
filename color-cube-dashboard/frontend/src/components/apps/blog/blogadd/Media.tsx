import FileUploadMotion from 'src/components/animated-component/FileUploadMotion';
import { Card } from 'src/components/ui/card';

const Media = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Cover Image</h5>
        <FileUploadMotion />
      </Card>
    </>
  );
};

export default Media;
