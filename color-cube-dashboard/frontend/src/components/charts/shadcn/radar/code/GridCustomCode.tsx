import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A radar chart with a custom grid';

const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 273 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export default function ChartRadarGridCustomCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <PolarGrid radialLines={false} polarRadius={[90]} strokeWidth={1} />
          <PolarAngleAxis dataKey="month" />
          <Radar dataKey="desktop" fill="var(--color-primary)" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    </>
  );
}
