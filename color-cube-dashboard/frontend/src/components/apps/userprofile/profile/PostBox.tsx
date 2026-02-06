import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Textarea } from 'src/components/ui/textarea';
import { Icon } from '@iconify/react';

const PostBox = () => {
  return (
    <>
      <Card>
        <Textarea className="form-control-textarea" rows={5} placeholder="Share your thoughts" />
        <div className="flex gap-5 mt-3">
          <div className="flex items-center gap-3 cursor-pointer text-ld font-medium text-primary-ld">
            <Button className="btn-circle p-0 rounded-full">
              <Icon icon="tabler:photo" height="16" />
            </Button>
            Photos / Video
          </div>
          <div className="flex items-center gap-3 cursor-pointer text-ld font-medium text-primary-ld">
            <Button className="btn-circle p-0 rounded-full" variant={'secondary'}>
              <Icon icon="tabler:notebook" height="16" />
            </Button>
            Article
          </div>
          <Button className="ms-auto rounded-md">Post</Button>
        </div>
      </Card>
    </>
  );
};

export default PostBox;
