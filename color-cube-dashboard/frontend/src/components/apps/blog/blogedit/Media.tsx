import { useContext } from 'react';
import { BlogContext } from 'src/context/blog-context';
import { Icon } from '@iconify/react';
import { Card } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';

const Media = () => {
  const { posts } = useContext(BlogContext);
  const coverImage = posts.length > 0 ? posts[0].coverImg : null;

  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Cover Image</h5>

        <div className="flex w-full items-center justify-center mb-4">
          <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-primary bg-lightprimary dark:bg-darkprimary"
          >
            {coverImage ? (
              <img src={coverImage} alt="Cover" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <Icon
                  icon="solar:cloud-upload-outline"
                  height={32}
                  className="mb-3 text-primary dark:text-darklink"
                />
                <p className="mb-2 text-sm text-primary dark:text-darklink">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-primary dark:text-darklink">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <Input type="file" id="dropzone-file" className="hidden" />
          </Label>
        </div>
      </Card>
    </>
  );
};

export default Media;
