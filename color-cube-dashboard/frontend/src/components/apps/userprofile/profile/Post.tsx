import { useContext } from 'react';
import { UserDataContext } from 'src/context/userdata-context/index';
import PostBox from './PostBox';
import PostIem from './PostItem';

const Post = () => {
  const { posts } = useContext(UserDataContext);

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <PostBox />
        </div>
        {posts.map((posts) => {
          return (
            <div key={posts.id} className="col-span-12">
              <PostIem post={posts} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Post;
