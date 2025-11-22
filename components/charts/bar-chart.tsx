import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export function CustomBarChart({
  data,
}: {
  data: { labels: string[]; datasets: { data: number[] }[] };
}) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.6,
    propsForBackgroundLines: { stroke: "#e3e3e3" },
  };

  return (
    <BarChart
      data={data}
      width={screenWidth - 32}
      height={220}
      chartConfig={chartConfig}
      verticalLabelRotation={0}
      fromZero
      showValuesOnTopOfBars
      style={{ borderRadius: 12 }}
      yAxisLabel=""
      yAxisSuffix=""
    />
  );
}
