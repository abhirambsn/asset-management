import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

type BarChartProps<T> = {
  data: Array<T>;
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
};

const MyBarChart = <T,>({
  data,
  config,
  dataKey,
  nameKey,
}: BarChartProps<T>) => {
  return (
    <ChartContainer config={config}>
      <BarChart
        accessibilityLayer
        data={data}
        layout="vertical"
        margin={{ left: 0 }}
      >
        <YAxis
          dataKey={nameKey}
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) =>
            config[value as keyof typeof config]?.label as string
          }
        />
        <XAxis dataKey={dataKey} type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey={dataKey} layout="vertical" radius={5} />
      </BarChart>
    </ChartContainer>
  );
};

export default MyBarChart;
