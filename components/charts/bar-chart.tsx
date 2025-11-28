import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export function CustomBarChart({
  data,
  color = "#6B1B1B",
}: {
  data: { labels: string[]; datasets: { data: number[] }[] };
  color?: string;
}) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: () => color,
    labelColor: () => "#000",
    barPercentage: 0.6,
    propsForBackgroundLines: { stroke: "#e3e3e3" },
    propsForLabels: { fontSize: 10 },
  };

  return (
    <BarChart
      data={data}
      width={screenWidth - 32}
      height={420}
      chartConfig={chartConfig}
      verticalLabelRotation={45}
      fromZero
      showValuesOnTopOfBars
      style={{ borderRadius: 12, marginBottom: 16 }}
      yAxisLabel=""
      yAxisSuffix=""
    />
  );
}
