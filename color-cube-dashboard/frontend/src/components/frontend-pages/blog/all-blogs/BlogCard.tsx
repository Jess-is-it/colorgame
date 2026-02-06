import { format } from 'date-fns';
import { GoDot } from 'react-icons/go';
import { Icon } from '@iconify/react';
import { Link } from 'react-router';
import CardBox from 'src/components/shared/CardBox';
import { BlogPostType } from 'src/types/apps/blog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import { Badge } from 'src/components/ui/badge';

interface Btype {
  post: BlogPostType;
  index?: number;
}
const BlogCard = ({ post }: Btype) => {
  const { coverImg, title, view, comments, category, author, createdAt } = post;
  const linkTo =
    title ||
    ''
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  return (
    <>
      <div className="lg:col-span-4 md:col-span-6 col-span-12">
        <CardBox className="p-0 overflow-hidden group card-hover">
          <div className="relative">
            <Link to={`/frontend-pages/blog/detail/${linkTo}`}>
              <div className="overflow-hidden h-[240px]">
                <img src={coverImg} alt="niceadmin" height={240} width={500} className="w-100" />
              </div>
              <Badge variant={'gray'} className="absolute bottom-8 end-6 rounded-md">
                2 min Read
              </Badge>
            </Link>
            <div className="flex justify-between items-center -mt-6 px-6">
              <div>
                {/* <Tooltip content={author?.name} className="">
                  <Avatar img={author?.avatar} rounded />
                </Tooltip> */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="cursor-pointer">
                        <AvatarImage src={author?.avatar} alt={author?.name} />
                        <AvatarFallback>{author?.name?.charAt(0) ?? '?'}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{author?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <Badge variant={'lightgray'} className="mt-3 rounded-md">
              {category}
            </Badge>
            <h5 className="text-xl py-6 group-hover:text-primary">
              <Link to={`/frontend-pages/blog/detail/${linkTo}`} className="line-clamp-2">
                {' '}
                {title}
              </Link>
            </h5>
            <div>
              <div className="flex gap-3">
                <div className="flex gap-2 items-center text-darklink text-[15px]">
                  <Icon icon="tabler:eye" height="18" className="text-ld" /> {view}
                </div>
                <div className="flex gap-2 items-center text-darklink text-[15px]">
                  <Icon icon="tabler:message-2" height="18" className="text-ld" />{' '}
                  {comments?.length}
                </div>
                <div className="ms-auto flex gap-2 items-center  text-darklink text-[15px]">
                  <GoDot size="16" className="text-ld" />
                  <small>{createdAt ? format(new Date(createdAt), 'E, MMM d') : null}</small>
                </div>
              </div>
            </div>
          </div>
        </CardBox>
      </div>
    </>
  );
};

export default BlogCard;
