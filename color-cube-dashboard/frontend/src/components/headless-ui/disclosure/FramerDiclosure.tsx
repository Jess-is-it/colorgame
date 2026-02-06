import FramerMotion from './codes/FramerMotionCode';
import FramerMotionCode from './codes/FramerMotionCode.tsx?raw';
import CodeDialog from '../../shared/CodeDialog';
import CardBox from 'src/components/shared/CardBox';

const FramerDiclosure = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Disclosure With Framer Motion</h4>
            <FramerMotion />
          </div>
          <CodeDialog>{FramerMotionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default FramerDiclosure;
