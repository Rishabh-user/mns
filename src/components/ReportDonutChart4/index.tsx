import Chart from "@/components/Base/Chart";
import { ChartData, ChartOptions } from "chart.js/auto";
import { getColor } from "@/utils/colors";
import { selectColorScheme } from "@/stores/colorSchemeSlice";
import { selectDarkMode } from "@/stores/darkModeSlice";
import { useAppSelector } from "@/stores/hooks";
import { useMemo } from "react";

interface MainProps extends React.ComponentPropsWithoutRef<"canvas"> {
  width?: number | "auto";
  height?: number | "auto";
}

function Main({ width = "auto", height = "auto", className = "" }: MainProps) {
  const props = {
    width: width,
    height: height,
    className: className,
  };
  const colorScheme = useAppSelector(selectColorScheme);
  const darkMode = useAppSelector(selectDarkMode);

  const chartData = [35, 65];
  const data: ChartData = useMemo(() => {
    return {
      labels: ["31 - 50 Years old", ">= 50 Years old", "17 - 30 Years old"],
      datasets: [
        {
          data: chartData,
          backgroundColor: colorScheme
            ? [getColor("primary", 0.6), getColor("success", 0.6)]
            : "",
          hoverBackgroundColor: colorScheme
            ? [getColor("primary", 0.6), getColor("success", 0.6)]
            : "",
          borderWidth: 1,
          borderColor: colorScheme
            ? [getColor("primary", 0.6), getColor("success", 0.6)]
            : "",
        },
      ],
    };
  }, [colorScheme, darkMode]);

  const options: ChartOptions = useMemo(() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      cutout: "89%",
      rotation: -90,
      circumference: 180,
    };
  }, [colorScheme, darkMode]);

  return (
    <Chart
      type="doughnut"
      width={props.width}
      height={props.height}
      data={data}
      options={options}
      className={props.className}
    />
  );
}

export default Main;