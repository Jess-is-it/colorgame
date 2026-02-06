import TiptapEdit from '../editor/TiptapEdit';
import { Card } from 'src/components/ui/card';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';

const GeneralDetail = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-4">General</h5>
        <div className="mb-4">
          <div className="flex">
            <Label htmlFor="prednm">Product Name</Label>
            <span className="text-error ms-1">*</span>
          </div>
          <Input id="prednm" type="text" placeholder="Product Name" value="Super Games" />
          <small className="text-xs text-darklink">
            A product name is required and recommended to be unique.
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Description</Label>
          </div>
          <TiptapEdit />
          <small className="text-xs text-darklink dark:text-bodytext">
            Set a description to the product for better visibility.
          </small>
        </div>
      </Card>
    </>
  );
};

export default GeneralDetail;
