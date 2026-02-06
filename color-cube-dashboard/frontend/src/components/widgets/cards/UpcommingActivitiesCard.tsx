


import { Icon } from "@iconify/react/dist/iconify.js";
import CardBox from "src/components/shared/CardBox";


const UpcommingActCard = () => {
  const RecentTransData = [
    {
      icon: 'solar:map-point-linear',
      title: 'Trip to singapore',
      subtitle: 'working on',
      rank: '5 mins',
      bgcolor: 'primary',
    },
    {
      icon: 'solar:database-linear',
      title: 'Archived Data',
      subtitle: 'working on',
      rank: '10 mins',
      bgcolor: 'primary',
    },
    {
      icon: 'solar:phone-linear',
      title: 'Meeting with client',
      subtitle: 'pending',
      rank: '10 mins',
      bgcolor: 'warning',
    },
    {
      icon: 'solar:monitor-linear',
      title: 'Screening Task Team',
      subtitle: 'working on',
      rank: '20 mins',
      bgcolor: 'error',
    },
    {
      icon: 'solar:bookmark-square-minimalistic-linear',
      title: 'Send envelope to John',
      subtitle: 'Done',
      rank: '20 mins',
      bgcolor: 'success',
    },
  ]
  return (
    <>
      <CardBox className='pb-7'>
        <div>
          <h5 className='card-title'>Upcoming Activity</h5>
          <p className='card-subtitle'>In New year</p>
        </div>
        <div className='mt-7 flex flex-col gap-6'>
          {RecentTransData.map((item, index) => (
            <div className='flex gap-3.5 items-center' key={index}>
              <div
                className={`h-11 w-11 rounded-md flex justify-center items-center bg-light${item.bgcolor} dark:bg-dark${item.bgcolor} text-${item.bgcolor}`}>
                <Icon icon={item.icon} width={22} height={22} />
              </div>
              <div>
                <h5 className='text-base'>{item.title}</h5>
                <p className='text-sm'>{item.subtitle}</p>
              </div>
              <div className={`ms-auto font-medium text-ld`}>{item.rank}</div>
            </div>
          ))}
        </div>
      </CardBox>
    </>
  );
};

export default UpcommingActCard;
