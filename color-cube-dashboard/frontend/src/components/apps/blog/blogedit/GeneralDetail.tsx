import { useContext, useEffect, useState } from 'react';
import { BlogContext } from 'src/context/blog-context';
import { Card } from 'src/components/ui/card';
import { Textarea } from 'src/components/ui/textarea';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const GeneralDetail = () => {
  const { posts } = useContext(BlogContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (posts.length > 0) {
      const firstPost = posts[0];
      setTitle(firstPost.title ?? '');
      setContent(firstPost.content ?? '');
    }
  }, [posts]);
  console.log(title);

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
          <Input
            id="prednm"
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <small className="text-xs text-black dark:text-darklink">
            A blog title is required and recommended to be unique.
          </small>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="desc">Content</Label>
          </div>
          <Textarea
            id="comment"
            placeholder="Blog Content..."
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <small className="text-xs text-black dark:text-darklink">
            Set a Content to the blog for better visibility.
          </small>
        </div>
      </Card>
    </>
  );
};

export default GeneralDetail;
