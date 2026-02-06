import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A bar chart with negative values';

const chartData = [
  { month: 'January', visitors: 186 },
  { month: 'February', visitors: 205 },
  { month: 'March', visitors: -207 },
  { month: 'April', visitors: 173 },
  { month: 'May', visitors: -209 },
  { month: 'June', visitors: 214 },
  { month: 'July', visitors: -180 },
  { month: 'August', visitors: 230 },
  { month: 'September', visitors: -160 },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
} satisfies ChartConfig;

export default function ChartBarNegativeCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} barSize={30}>
          <CartesianGrid vertical={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel hideIndicator />} />
          <Bar dataKey="visitors">
            <LabelList position="top" dataKey="month" fillOpacity={1} />
            {chartData.map((item) => (
              <Cell
                key={item.month}
                fill={item.visitors > 0 ? 'var(--color-primary)' : 'var(--color-secondary)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </>
  );
}
