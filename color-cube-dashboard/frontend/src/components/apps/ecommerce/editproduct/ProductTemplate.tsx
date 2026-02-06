import { Card } from 'src/components/ui/card';
import { Label } from 'src/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';

const Producttemplate = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Product Template</h5>
        <div className="">
          <div className="flex">
            <Label htmlFor="temp">Select a product template</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Select required>
            <SelectTrigger id="temp">
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="default">Default Template</SelectItem>
              <SelectItem value="office">Office Stationary</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
          <small className="text-xs text-darklink">
            Assign a template from your current theme to define how a single product is displayed.
          </small>
        </div>
      </Card>
    </>
  );
};

export default Producttemplate;
