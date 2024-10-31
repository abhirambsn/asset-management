import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type LineChartProps<T> = {
    data: Array<T>;
    config: ChartConfig;
    dataKey: string;
    nameKey: string;
}

const MyLineChart = <T, >({
    data,
    config,
    dataKey,
    nameKey,
}: LineChartProps<T>) => {
  return (
    <ChartContainer config={config}>
        <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12 }}
        >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={nameKey} tickLine={false} axisLine={false} tickMargin={8} tickFormatter={val => val.slice(0,3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey={dataKey} type='linear' stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} />
        </LineChart>
    </ChartContainer>
  )
}

export default MyLineChart