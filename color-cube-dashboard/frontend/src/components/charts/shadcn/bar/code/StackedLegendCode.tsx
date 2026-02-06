import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A stacked bar chart with a legend';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
  { month: 'July', desktop: 190, mobile: 175 },
  { month: 'August', desktop: 250, mobile: 145 },
  { month: 'September', desktop: 198, mobile: 160 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
  },
  mobile: {
    label: 'Mobile',
  },
} satisfies ChartConfig;

export default function ChartBarStackedCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={chartData} barSize={30}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" stackId="a" fill="var(--color-primary)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="mobile" stackId="a" fill="var(--color-secondary)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
