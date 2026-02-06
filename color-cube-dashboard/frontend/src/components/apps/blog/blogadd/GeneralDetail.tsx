import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Card } from 'src/components/ui/card';
import TiptapEdit from 'src/views/forms/from-tiptap/TiptapEdit';

const GeneralDetail = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Blog Details</h5>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="prednm">
              Blog Title <span className="text-error ms-1">*</span>
            </Label>
          </div>
          <Input id="prednm" type="text" className="form-control" placeholder="Blog Title" />
          <small className="text-xs text-black dark:text-darklink">
            A blog title is required and recommended to be unique.
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Content</Label>
          </div>
          <TiptapEdit />
          <small className="text-xs text-black dark:text-darklink">
            Set a Content to the blog for better visibility.
          </small>
        </div>
      </Card>
    </>
  );
};

export default GeneralDetail;
