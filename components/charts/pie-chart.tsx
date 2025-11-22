import { Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type PieItem = {
  name: string;
  population: number;
  color: string;
  legendFontColor?: string;
  legendFontSize?: number;
};

export function CustomPieChart({ data }: { data: PieItem[] }) {
  return (
    <PieChart
      data={data}
      width={screenWidth - 32}
      height={220}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="8"
      center={[0, 0]}
      hasLegend={true}
      chartConfig={{
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(107, 27, 27, ${opacity})`,
        labelColor: () => "#333",
      }}
      style={{ borderRadius: 12 }}
    />
  );
}
