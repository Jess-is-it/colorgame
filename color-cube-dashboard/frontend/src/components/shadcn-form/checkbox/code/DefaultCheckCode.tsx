import { Checkbox } from 'src/components/ui/checkbox';

const DefaultCheckCode = () => {
  return (
    <>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms11" checked />
          <label htmlFor="terms11" className="text-ld">
            Accept terms and conditions
          </label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="privacy22" checked />
          <label htmlFor="privacy22" className="text-ld">
            Accept privacy policy
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="continue33" checked />
          <label htmlFor="continue33" className="text-ld">
            Continue to process?
          </label>
        </div>
      </div>
    </>
  );
};

export default DefaultCheckCode;
