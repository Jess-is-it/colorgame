import { Link } from 'react-router';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import { Card } from 'src/components/ui/card';

export const RecentTransaction = () => {
  const timelineData = [
    {
      key: 'timeline1',
      time: '08:45 am',
      desc: 'Payment received from John Doe of $385.90',
      isSale: false,
      borderColor: 'border-primary',
      isLastItem: false,
    },
    {
      key: 'timeline2',
      time: '09:30 am',
      desc: 'New sale recorded',
      isSale: true,
      borderColor: 'border-info',
      isLastItem: false,
    },
    {
      key: 'timeline3',
      time: '10:00 am',
      desc: 'Payment was made of $64.95 to Michael',
      isSale: false,
      borderColor: 'border-success',
      isLastItem: false,
    },
    {
      key: 'timeline4',
      time: '12:00 pm',
      desc: 'New sale recorded',
      isSale: true,
      borderColor: 'border-warning',
      isLastItem: false,
    },
    {
      key: 'timeline5',
      time: '03:00 pm',
      desc: 'New sale recorded',
      isSale: true,
      borderColor: 'border-error',
      isLastItem: false,
    },
    {
      key: 'timeline6',
      time: '04:45 pm',
      desc: 'Payment Done',
      isSale: false,
      borderColor: 'border-success',
      isLastItem: true,
    },
  ];
  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6 justify-between h-full">
        <div>
          <h5 className="card-title">Recent Transactions</h5>
          <p className="card-subtitle">How to secure recent transactions</p>
        </div>
        {/* timeline */}
        <div className="flex flex-col gap-6">
          {timelineData.map((item, index) => {
            return (
              <AnimatedItem key={item.key} index={index}>
                <div key={item.key} className="flex gap-x-3">
                  <div className="w-1/4 text-end">
                    <span>{item.time}</span>
                  </div>
                  <div
                    className={`relative ${
                      item.isLastItem ? 'after:hidden' : null
                    } after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-border dark:after:bg-darkborder`}
                  >
                    <div className="relative z-[1] w-7 h-7 flex justify-center items-center">
                      <div
                        className={`h-3 w-3 rounded-full bg-transparent border-2 ${item.borderColor}`}
                      ></div>
                    </div>
                  </div>
                  <div className="w-1/4 grow">
                    {!item.isSale ? (
                      <p>{item.desc}</p>
                    ) : (
                      <div>
                        <h6>New sale recorded </h6>
                        <Link to="#" className="text-primary">
                          #ML-3467
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedItem>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
