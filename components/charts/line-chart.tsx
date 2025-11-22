import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export function TotalLineChart() {
  const data = {
    labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    datasets: [
      {
        data: [80, 100, 120, 140, 150, 160, 163],
        color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForDots: { r: "4", strokeWidth: "2", stroke: "#6C2020" },
  };

  return (
    <LineChart
      data={data}
      width={screenWidth - 32}
      height={200}
      chartConfig={chartConfig}
      bezier
      withShadow={false}
      withInnerLines={false}
      withOuterLines={false}
      fromZero
      style={{ borderRadius: 12 }}
    />
  );
}
