import { AllBlogs } from 'src/components/frontend-pages/blog/all-blogs/AllBlogs';
import { HeroSection } from 'src/components/frontend-pages/shared/HeroSection';

const BlogPost = () => {
  return (
    <>
      <HeroSection title="BLOG" desc="Our most recent articles" />
      <AllBlogs />
    </>
  );
};

export default BlogPost;
