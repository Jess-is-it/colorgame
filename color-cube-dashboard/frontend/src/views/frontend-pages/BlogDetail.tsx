import BlogDetailData from 'src/components/apps/blog/detail';

import { BlogProvider } from 'src/context/blog-context/index';

import { HeroSection } from 'src/components/frontend-pages/shared/HeroSection';

const BlogDetail = () => {
  return (
    <>
      <HeroSection title="BLOG PAGE" desc="Latest blog & news" />
      <div className="container mt-6 p-4 !max-w-4xl">
        <BlogProvider>
          <BlogDetailData />
        </BlogProvider>
      </div>
    </>
  );
};

export default BlogDetail;
