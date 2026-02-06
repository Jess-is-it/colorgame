import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A multiple bar chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
  { month: 'July', desktop: 198, mobile: 150 },
  { month: 'August', desktop: 225, mobile: 160 },
  { month: 'September', desktop: 245, mobile: 170 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
  },
  mobile: {
    label: 'Mobile',
  },
} satisfies ChartConfig;

export default function ChartBarMultipleCode() {
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
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
          <Bar dataKey="desktop" fill="var(--color-primary)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-secondary)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
