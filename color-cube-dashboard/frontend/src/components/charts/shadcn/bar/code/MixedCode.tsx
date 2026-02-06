import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A mixed bar chart';

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-primary)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-warning)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-error)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-info)' },
];

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
  },
  safari: {
    label: 'Safari',
  },
  firefox: {
    label: 'Firefox',
  },
  edge: {
    label: 'Edge',
  },
  other: {
    label: 'Other',
  },
} satisfies ChartConfig;

export default function ChartBarMixedCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          barSize={30}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <YAxis
            dataKey="browser"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
          />
          <XAxis dataKey="visitors" type="number" hide />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="visitors" layout="vertical" radius={5} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
