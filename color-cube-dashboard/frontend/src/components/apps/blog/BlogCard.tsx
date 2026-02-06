import { Link } from 'react-router';
import { format } from 'date-fns';
import { GoDot } from 'react-icons/go';
import { Icon } from '@iconify/react';
import { BlogPostType } from 'src/types/apps/blog';
import { Card } from 'src/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from 'src/components/ui/tooltip';
import { Badge } from 'src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';

interface Btype {
  post: BlogPostType;
  index?: number;
}
const BlogCard = ({ post }: Btype) => {
  const { coverImg, title, view, comments, category, author, createdAt } = post;
  const safeTitle = title ?? '';
  const linkTo = safeTitle
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  return (
    <>
      <div className="lg:col-span-4 md:col-span-6 col-span-12">
        <Card className="p-0 overflow-hidden group card-hover">
          <div className="relative">
            <Link to={`/apps/blog/detail/${linkTo}`}>
              <div className="overflow-hidden h-[240px]">
                <img
                  src={coverImg}
                  alt="tailwindadmin"
                  height={240}
                  width={500}
                  className="w-full"
                />
              </div>
              <Badge variant={'white'} className="absolute bottom-8 end-6">
                2 min Read
              </Badge>
            </Link>
            <div className="flex justify-between items-center -mt-6 px-6">
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar>
                        <AvatarImage src={author?.avatar} alt={author?.name} />
                        <AvatarFallback>{author?.name}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>{author?.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <Badge variant={'muted'} className="mt-3">
              {category}
            </Badge>
            <h5 className="text-xl py-6 group-hover:text-primary">
              <Link to={`/apps/blog/detail/${linkTo}`} className="line-clamp-2">
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
                  <small>{format(new Date(createdAt as Date), 'E, MMM d')}</small>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BlogCard;
