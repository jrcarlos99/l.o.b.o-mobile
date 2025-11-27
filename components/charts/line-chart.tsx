import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
  labels: string[];
  values: number[];
};

export function TotalLineChart({ labels, values }: Props) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
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
