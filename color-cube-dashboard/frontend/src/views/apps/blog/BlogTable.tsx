import ManageBlog from 'src/components/apps/blog/blogtable/ManageBlog';
import { Card } from 'src/components/ui/card';
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
    title: 'Blog List',
  },
];

function BlogTable() {
  return (
    <BlogProvider>
      <BreadcrumbComp title="Blog app" items={BCrumb} />
      <Card>
        <ManageBlog />
      </Card>
    </BlogProvider>
  );
}

export default BlogTable;
