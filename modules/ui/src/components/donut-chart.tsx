import { Label, Pie, PieChart } from "recharts";
import _ from "lodash";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useMemo } from "react";

type DonutChartProps<T> = {
  data: Array<T>;
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
};

const DonutChart = <T,>({
  data,
  config,
  dataKey,
  nameKey,
}: DonutChartProps<T>) => {
  const aggregateData = useMemo(() => {
    return data.reduce((acc, item) => acc + (_.get(item, 'count') || 0), 0);
  }, [data]);

  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square min-h-[200px] max-h-[250px]"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={60}
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {aggregateData.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total Assets
                    </tspan>
                  </text>
                );
              }
            }}
          ></Label>
        </Pie>
      </PieChart>
    </ChartContainer>
  );
};

export default DonutChart;
