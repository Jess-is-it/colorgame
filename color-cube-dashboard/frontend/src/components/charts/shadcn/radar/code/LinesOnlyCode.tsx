import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from 'src/components/ui/chart';

export const description = 'A radar chart with lines only';

const chartData = [
  { month: 'January', desktop: 186, mobile: 160 },
  { month: 'February', desktop: 185, mobile: 170 },
  { month: 'March', desktop: 207, mobile: 180 },
  { month: 'April', desktop: 173, mobile: 160 },
  { month: 'May', desktop: 160, mobile: 190 },
  { month: 'June', desktop: 174, mobile: 204 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export default function ChartRadarLinesOnlyCode() {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <RadarChart data={chartData}>
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
          <PolarAngleAxis dataKey="month" />
          <PolarGrid radialLines={false} />
          <Radar
            dataKey="desktop"
            fill="var(--color-primary)"
            fillOpacity={0}
            stroke="var(--color-primary)"
            strokeWidth={2}
          />
          <Radar
            dataKey="mobile"
            fill="var(--color-secondary)"
            fillOpacity={0}
            stroke="var(--color-secondary)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </>
  );
}
