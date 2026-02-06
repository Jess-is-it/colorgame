import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import { motion } from 'framer-motion';
import { ApexOptions } from 'apexcharts';

export const TopPerformers = () => {
  const ChartData: ApexOptions = {
    series: [45, 50, 60, 70],
    chart: {
      type: 'radialBar',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 305,
    },
    colors: [
      'var(--color-primary)',
      'var(--color-secondary)',
      'var(--color-warning)',
      'var(--color-success) ',
    ],
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '50%',
        },
        dataLabels: {
          total: {
            show: true,
            label: 'Team',
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        gradientToColors: ['#615dff'],
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    tooltip: {
      enabled: true,
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  return (
    <TooltipProvider>
      <Card className="p-0">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h6 className="card-title">Top Performers</h6>
              <p className="card-subtitle">How to measure team performance</p>
            </div>
            <div className="flex">
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={user1}
                    alt="user-img"
                    className="rounded-full border-2 border-white dark:border-dark w-9 h-9 relative -right-[13px] cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>John Doe</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={user2}
                    alt="user-img"
                    className="rounded-full border-2 relative border-white dark:border-dark w-9 h-9 left-[6px] cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mark Smith</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <img
                    src={user3}
                    alt="user-img"
                    className="rounded-full border-2 border-white dark:border-dark w-9 h-9 relative z-10 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Johnathan Leo</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 mb-4">
            <div className="lg:col-span-6 col-span-12 py-4 px-3 rounded-md border border-border dark:border-darkborder">
              <div className="flex items-center gap-3">
                <div className="flex">
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src={user1}
                        alt="user-img"
                        className="rounded-full border-2 border-white dark:border-dark w-8 h-8 relative cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>John Doe</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src={user2}
                        alt="user-img"
                        className="rounded-full border-2 relative border-white dark:border-dark w-8 h-8 -left-[6px] cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark Smith</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <h6 className="text-sm leading-none mb-1 font-medium">Monster Dashboard</h6>
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-normal">46% </div>
                    <div className="text-xs font-normal">Due in 3 days</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 col-span-12 py-4 px-3 rounded-md border border-border dark:border-darkborder">
              <div className="flex items-center gap-3">
                <div className="flex">
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src={user3}
                        alt="user-img"
                        className="rounded-full border-2 border-white dark:border-dark w-8 h-8 relative cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>John Doe</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger>
                      <img
                        src={user4}
                        alt="user-img"
                        className="rounded-full border-2 relative border-white dark:border-dark w-8 h-8 -left-[6px] cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mark Smith</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <h6 className="text-sm leading-none mb-1 font-medium">Xtreme Dashboard</h6>
                  <div className="flex items-center gap-4">
                    <div className="text-xs font-normal">87% </div>
                    <div className="text-xs font-normal">Due in 7 days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="radialBar"
              height="305px"
              width={'100%'}
            />
          </div>
          <p className="mb-4 text-center">Your team performance is 5% better this week.</p>
          <div className="flex items-center justify-center">
            <Link to={'/react-tables/columnvisibility'}>
              <Button asChild>
                <motion.button
                  whileHover={{ y: -3, boxShadow: '0 10px 20px rgba(0,0,0,0.08)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  View Details
                </motion.button>
              </Button>
            </Link>
          </div>
        </div>
        <div className="p-4 flex flex-wrap items-center justify-center gap-4 border-t border-border dark:border-darkborder">
          <div className="flex items-center gap-2">
            <Icon icon={'tabler:point-filled'} className="text-xl text-primary" />
            <p>Team A</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={'tabler:point-filled'} className="text-xl text-secondary" />
            <p>Team B</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={'tabler:point-filled'} className="text-xl text-warning" />
            <p>Team C</p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={'tabler:point-filled'} className="text-xl text-success" />
            <p>Team D</p>
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};
