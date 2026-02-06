import { Pie, PieChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A pie chart with stacked sections';

const desktopData = [
  { month: 'january', desktop: 186, fill: 'var(--color-primary)' },
  { month: 'february', desktop: 305, fill: 'var(--color-secondary)' },
  { month: 'march', desktop: 237, fill: 'var(--color-warning)' },
  { month: 'april', desktop: 173, fill: 'var(--color-error)' },
  { month: 'may', desktop: 209, fill: 'var(--color-info)' },
];

const mobileData = [
  { month: 'january', mobile: 80, fill: 'var(--color-primary)' },
  { month: 'february', mobile: 200, fill: 'var(--color-secondary)' },
  { month: 'march', mobile: 120, fill: 'var(--color-warning)' },
  { month: 'april', mobile: 190, fill: 'var(--color-error)' },
  { month: 'may', mobile: 130, fill: 'var(--color-info)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
  },
  mobile: {
    label: 'Mobile',
  },
  january: {
    label: 'January',
    color: 'var(--chart-1)',
  },
  february: {
    label: 'February',
    color: 'var(--chart-2)',
  },
  march: {
    label: 'March',
    color: 'var(--chart-3)',
  },
  april: {
    label: 'April',
    color: 'var(--chart-4)',
  },
  may: {
    label: 'May',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export default function ChartPieStackedCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <PieChart>
          <ChartTooltip
            content={
              <ChartTooltipContent
                labelKey="visitors"
                nameKey="month"
                indicator="line"
                labelFormatter={(_, payload) => {
                  return chartConfig[payload?.[0].dataKey as keyof typeof chartConfig].label;
                }}
              />
            }
          />
          <Pie data={desktopData} dataKey="desktop" outerRadius={60} />
          <Pie data={mobileData} dataKey="mobile" innerRadius={70} outerRadius={90} />
        </PieChart>
      </ChartContainer>
    </>
  );
}
