import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A bar chart with an active bar';

const chartData = [
  { browser: 'chrome', visitors: 187, fill: 'var(--color-primary)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-secondary)' },
  { browser: 'firefox', visitors: 275, fill: 'var(--color-warning)' },
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

export default function ChartBarActiveCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} barSize={30}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="browser"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar
            dataKey="visitors"
            strokeWidth={2}
            radius={8}
            activeIndex={2}
            activeBar={({ ...props }) => {
              return (
                <Rectangle
                  {...props}
                  fillOpacity={0.8}
                  stroke={props.payload.fill}
                  strokeDasharray={4}
                  strokeDashoffset={4}
                />
              );
            }}
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
