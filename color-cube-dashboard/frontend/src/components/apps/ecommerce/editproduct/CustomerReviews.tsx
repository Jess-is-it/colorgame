import user1 from 'src/assets/images/profile/user-2.jpg';
import user2 from 'src/assets/images/profile/user-3.jpg';
import user3 from 'src/assets/images/profile/user-4.jpg';
import user4 from 'src/assets/images/profile/user-5.jpg';
import RatingStars from 'src/components/shared/RatingStars';
import { Card } from 'src/components/ui/card';
import { Table, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import {
  AnimatedTableWrapper,
  AnimatedTableBody,
  AnimatedTableRow,
} from 'src/components/animated-component/AnimatedTable';

const LatestReviewData = [
  {
    profile: user1,
    customername: 'Arlene McCoy',
    customeremail: 'macoy@arlene.com',
    review: 5,
    reviewtext: 'I like this design',
    time: '1 day ago',
  },
  {
    profile: user2,
    customername: 'Jerome Bell',
    customeremail: 'belljerome@yahoo.com',
    review: 4,
    reviewtext: 'Awesome quality with great materials used, but could be more comfortable',
    time: 'Today',
  },
  {
    profile: user3,
    customername: 'Jacob Jones',
    customeremail: 'jones009@hotmail.com',
    review: 4,
    reviewtext:
      ' The best experience we could hope for.Customer service team is amazing and thequality of their products',
    time: 'Nov 8',
  },
  {
    profile: user4,
    customername: 'Annette Black',
    customeremail: 'blackanne@yahoo.com',
    review: 3,
    reviewtext:
      ' The controller is quite comfy for me. Despiteits increased size, the controller still fits well',
    time: 'Nov 10',
  },
  {
    profile: user2,
    customername: 'Jerome Bell',
    customeremail: 'belljerome@yahoo.com',
    review: 4,
    reviewtext: 'Awesome quality with great materials used, but could be more comfortable',
    time: 'Today',
  },
  {
    profile: user3,
    customername: 'Jacob Jones',
    customeremail: 'jones009@hotmail.com',
    review: 4,
    reviewtext:
      ' The best experience we could hope for.Customer service team is amazing and thequality of their products',
    time: 'Nov 8',
  },
  {
    profile: user4,
    customername: 'Annette Black',
    customeremail: 'blackanne@yahoo.com',
    review: 3,
    reviewtext:
      ' The controller is quite comfy for me. Despiteits increased size, the controller still fits well',
    time: 'Nov 10',
  },
];

const CustomerReviews = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-2">Customer Reviews</h5>
        <AnimatedTableWrapper className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-sm font-semibold  pb-2">Customer</TableHead>
                <TableHead className="text-sm font-semibold pb-2">Comment</TableHead>
                <TableHead className="text-sm font-semibold pb-2">Date</TableHead>
              </TableRow>
            </TableHeader>
            <AnimatedTableBody className="divide-y divide-border dark:divide-darkborder">
              {LatestReviewData.map((item, index) => (
                <AnimatedTableRow key={index} index={index}>
                  <TableCell className="whitespace-nowrap ps-6 md:min-w-auto min-w-[200px]">
                    <div className="flex gap-3 items-center">
                      <img src={item.profile} alt="icon" className="h-8 w-8 rounded-full" />
                      <h6 className="text-base">{item.customername}</h6>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap md:min-w-auto min-w-[200px]">
                    <RatingStars rating={item.review} />
                    <p className="text-darklink truncat line-clamp-2 text-wrap max-w-56 text-sm">
                      {item.reviewtext}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <p className="text-darklink text-sm">{item.time}</p>
                  </TableCell>
                </AnimatedTableRow>
              ))}
            </AnimatedTableBody>
          </Table>
        </AnimatedTableWrapper>
      </Card>
    </>
  );
};

export default CustomerReviews;
