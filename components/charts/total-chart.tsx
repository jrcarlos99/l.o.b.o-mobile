import { Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export function CustomTotalChart({ total }: { total: number }) {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  const data = {
    labels: ["Ocorrências"],
    datasets: [{ data: [total] }],
  };

  return (
    <BarChart
      data={data}
      width={screenWidth - 64}
      height={160}
      chartConfig={chartConfig}
      fromZero
      showValuesOnTopOfBars
      yAxisLabel=""
      yAxisSuffix=""
      style={{ borderRadius: 12 }}
    />
  );
}
