import { CartesianGrid, LabelList, Line, LineChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A line chart with a custom label';

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
    color: 'var(--chart-2)',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

export default function ChartLineLabelCustomCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 24,
            left: 24,
            right: 24,
          }}
        >
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" nameKey="visitors" hideLabel />}
          />
          <Line
            dataKey="visitors"
            type="natural"
            stroke="var(--color-secondary)"
            strokeWidth={2}
            dot={{
              fill: 'var(--color-secondary)',
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
              dataKey="browser"
              formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </>
  );
}
