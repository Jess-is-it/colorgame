import TitleCard from '../../shared/TitleBorderCard';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const InputVariants = () => {
  return (
    <div>
      <TitleCard title="Input Variants">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <div>
              <Label htmlFor="input-gray" className="text-gray">
                Gray
              </Label>
            </div>
            <Input id="input-gray" placeholder="Input Gray" required variant="gray" />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="input-info" className="text-info">
                Info
              </Label>
            </div>
            <Input id="input-info" placeholder="Input Info" required variant="info" />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="input-success" className="text-success">
                Success
              </Label>
            </div>
            <Input id="input-success" placeholder="Input Success" required variant="success" />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="input-failure" className="text-error">
                Failure
              </Label>
            </div>
            <Input id="input-failure" placeholder="Input Failure" required variant="failure" />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="input-warning" className="text-warning">
                Warning
              </Label>
            </div>
            <Input id="input-warning" placeholder="Input Warning" required variant="warning" />
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default InputVariants;
