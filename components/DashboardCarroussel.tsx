import {
  CustomBarChart,
  CustomPieChart,
  CustomTotalChart,
} from "@/components/charts";
import { JSX } from "react";
import { Animated, Dimensions, FlatList, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type DashboardItem = {
  title: string;
  content: JSX.Element;
};

type Props = {
  tipoData: any;
  regiaoData: any;
  turnoData: any;
  statusData: any;
  total: number;
};

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<DashboardItem>
);

export default function DashboardCarousel({
  tipoData,
  regiaoData,
  turnoData,
  statusData,
  total,
}: Props) {
  const items: DashboardItem[] = [
    {
      title: "Total Ocorrências",
      content: <CustomTotalChart total={total} />,
    },
    {
      title: "Por Tipo",
      content: <CustomBarChart data={tipoData} color="#8E24AA" />,
    },
    {
      title: "Por Região",
      content: <CustomPieChart data={regiaoData} />,
    },
    {
      title: "Por Turno",
      content: <CustomPieChart data={turnoData} />,
    },
    {
      title: "Por Status",
      content: <CustomBarChart data={statusData} color="#FB8C00" />,
    },
  ];

  return (
    <AnimatedFlatList
      data={items}
      horizontal
      pagingEnabled
      decelerationRate="fast"
      snapToInterval={width}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <View
          style={{
            width,
            padding: 16,
            minHeight: 420,
            backgroundColor: "#fff",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              marginBottom: 12,
              textAlign: "center",
              color: "#6C2020",
            }}
          >
            {item.title}
          </Text>
          {item.content}
        </View>
      )}
    />
  );
}
