import CategoryTags from 'src/components/apps/blog/blogedit/CategoryTags';
import GeneralDetail from 'src/components/apps/blog/blogedit/GeneralDetail';
import Media from 'src/components/apps/blog/blogedit/Media';
import PostDate from 'src/components/apps/blog/blogedit/PostDate';
import Status from 'src/components/apps/blog/blogedit/Status';
import { Button } from 'src/components/ui/button';
import { BlogProvider } from 'src/context/blog-context';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/apps/blog/post',
    title: 'Blog',
  },
  {
    to: '',
    title: 'Blog Edit',
  },
];

function BlogEdit() {
  return (
    <>
      <BlogProvider>
        <BreadcrumbComp title="Blog app" items={BCrumb} />
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="lg:col-span-8 col-span-12">
            <div className="flex flex-col gap-[30px]">
              {/* General */}
              <GeneralDetail />
              {/* Media  */}
              <Media />
            </div>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="flex flex-col gap-[30px]">
              {/* Status */}
              <Status />
              {/* CategoryTags */}
              <CategoryTags />
              {/* PostDate */}
              <PostDate />
            </div>
          </div>
          <div className="lg:col-span-8 col-span-12">
            <div className="sm:flex gap-3">
              <Button className="sm:mb-0 mb-3 w-fit">Save changes</Button>
              <Button variant={'lighterror'} className="w-fit">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </BlogProvider>
    </>
  );
}

export default BlogEdit;
