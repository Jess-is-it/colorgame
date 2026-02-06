import { useContext } from 'react';
import { CustomizerContext } from 'src/context/CustomizerContext';
import { v4 as uuidv4 } from 'uuid';
import { ApexOptions } from 'apexcharts';
import { Badge } from 'src/components/ui/badge';
import { Card } from 'src/components/ui/card';
import Chart from 'react-apexcharts';

export default function TotalAssets() {
  const { activeMode } = useContext(CustomizerContext);

  // chart
  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'bar',
      height: 16,
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    colors: ['var(--color-primary)', 'var(--color-warning)', 'var(--color-secondary)'],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        borderRadiusApplication: 'around',
        borderRadiusWhenStacked: 'all',
      },
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    tooltip: {
      theme: `${activeMode === 'light' ? 'light' : 'dark'}`,
      fillSeriesColor: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
  };
  const seriescolumnchart: ApexAxisChartSeries = [
    { name: 'Product Sales', data: [38] },
    { name: 'Service Revenue', data: [20] },
    { name: 'Other Income', data: [26] },
  ];

  const AllAssets = [
    {
      id: uuidv4(),
      color: 'bg-primary',
      distribution: 'Product Sales',
      value: '$211,887.42',
      percentage: '65',
    },
    {
      id: uuidv4(),
      color: 'bg-warning',
      distribution: 'Service Revenue',
      value: '$211,887.42',
      percentage: '65',
    },
    {
      id: uuidv4(),
      color: 'bg-secondary',
      distribution: 'Other Income',
      value: '$211,887.42',
      percentage: '65',
    },
  ];

  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between gap-5 h-full">
        <h5 className="text-lg font-semibold">Total Assets</h5>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-2xl font-semibold">$478,230.90</h3>
          <div className="flex items-center gap-1">
            <Badge variant="lightSuccess">+15.7%</Badge>
            <h6 className="text-sm font-medium text-link dark:text-darklink">+$39,117.67</h6>
            <p className="text-xs font-medium">compared to last year</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-link dark:text-darklink">Distribution</p>
            <div className="h-7">
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height={26}
                width={'100%'}
              />
            </div>
            <div className="flex flex-col">
              {AllAssets.map((item) => (
                <div
                  key={item.id}
                  className="py-2.5 border-b border-border dark:border-darkborder flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                    <p className="text-sm font-medium text-link dark:text-darklink">
                      {item.distribution}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-normal text-link dark:text-darklink">{item.value}</p>
                    <p className="text-xs font-normal">{`(${item.percentage}%)`}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
