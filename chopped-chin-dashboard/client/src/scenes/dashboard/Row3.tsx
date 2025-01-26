import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetCategoriesQuery
} from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart,Sector, ResponsiveContainer } from "recharts";

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];

  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: categoryData } = useGetCategoriesQuery();
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const pieData = [
  {
    name: "regular",
    value: 18353,
  },
  {
    name: "gluten free",
    value: 1,
  },
  {
    name: "cheddar",
    value: 14332,
  },
  {
    name: "pepper jack",
    value: 4830,
  },
  {
    name: "alfredo",
    value: 3901,
  },
  {
    name: "no meat",
    value: 3486,
  },
  {
    name: "grilled chicken",
    value: 6229,
  },
  {
    name: "pulled pork",
    value: "1980",
  },
  {
    name: "brisket",
    value: "6927",
  },
  {
    name: "bacon",
    value: "4564",
  },
  {
    name: "ham",
    value: "732",
  },
  {
    name: "no toppings",
    value: "2284",
  },
  {
    name: "broccoli",
    value: "4499",
  },
  {
    name: "corn",
    value: "4243",
  },
  {
    name: "onions",
    value: "5714",
  },
  {
    name: "jalapenos",
    value: "3944",
  },
  {
    name: "tomatoes",
    value: "3217",
  },
  {
    name: "bell peppers",
    value: "3678",
  },
  {
    name: "mushrooms",
    value: "4270",
  },
  {
    name: "pineapple",
    value: "1096",
  },
  {
    name: "parmesan",
    value: "18727",
  },
  {
    name: "breadcrumbs",
    value: "10874",
  },
  {
    name: "no drizzle",
    value: "3901",
  },
  {
    name: "BBQ",
    value: "200",
  },
  {
    name: "garlic parmesan",
    value: "6696",
  },
  {
    name: "buffalo",
    value: "2807",
  },
  {
    name: "pesto",
    value: "2145",
  },
  {
    name: "ranch",
    value: "3649",
  },
  {
    name: "hot honey",
    value: "2150",
  },
  {
    name: "no side",
    value: "12267",
  },
  {
    name: "garlic bread",
    value: "7340",
  },
  {
    name: "cheesy garlic bread",
    value: "5295",
  },
  {
    name: "cheesecake",
    value: "965",
  },
  {
    name: "large chocolate chunk cookie",
    value: "92",
  },
  {
    name: "doritos",
    value: "44",
  },
  {
    name: "cheetos",
    value: "41",
  },
  {
    name: "lays barbecue",
    value: "23",
  },
  {
    name: "lays classic",
    value: "29",
  },
  {
    name: "no drink",
    value: "12347",
  },
  {
    name: "water bottle",
    value: "119",
  },
  {
    name: "apple juice",
    value: "232",
  },
  {
    name: "coke",
    value: "448",
  },
  {
    name: "dr. pepper",
    value: "286",
  },
  {
    name: "sprite",
    value: "215",
  },
  {
    name: "diet coke",
    value: "172",
  },
  {
    name: "powerade",
    value: "90",
  },
  {
    name: "lemonade",
    value: "74",
  },

]
console.log(pieData)
  const piChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
console.log(piChartData)
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const productColumns = [
    {
      field: "ordernum",
      headerName: "Order #",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Predicted",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Actual",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="Previous Transactions of Telecom (TIM)"
          sideText={`${productData?.length} orders`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Data Summary"
          sideText={`${productData?.length} orders, $356478.06 total sales`}
        />
        <Box mt="1rem" p="0 0.5rem" height="80%"></Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Stock Breakdown By Category" sideText="+4%" />
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row3;
