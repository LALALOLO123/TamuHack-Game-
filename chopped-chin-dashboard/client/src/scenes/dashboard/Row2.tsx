import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useMemo } from "react";
import {
  Tooltip,
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  PieChart,
  Pie,
  Sector,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts";

const pieData = [
  {
    name: "regular",
    count: "18353",
  },
  {
    name: "gluten free",
    count: "1",
  },
  {
    name: "cheddar",
    count: "14332",
  },
  {
    name: "pepper jack",
    count: "4830",
  },
  {
    name: "alfredo",
    count: "3901",
  },
  {
    name: "no meat",
    count: "3486",
  },
  {
    name: "grilled chicken",
    count: "6224",
  },
  {
    name: "pulled pork",
    count: "1980",
  },
  {
    name: "brisket",
    count: "6927",
  },
  {
    name: "bacon",
    count: "4564",
  },
  {
    name: "ham",
    count: "732",
  },
  {
    name: "no toppings",
    count: "2284",
  },
  {
    name: "broccoli",
    count: "4499",
  },
  {
    name: "corn",
    count: "4243",
  },
  {
    name: "onions",
    count: "5714",
  },
  {
    name: "jalapenos",
    count: "3944",
  },
  {
    name: "tomatoes",
    count: "3217",
  },
  {
    name: "bell peppers",
    count: "3678",
  },
  {
    name: "mushrooms",
    count: "4270",
  },
  {
    name: "pineapple",
    count: "1096",
  },
  {
    name: "parmesan",
    count: "18727",
  },
  {
    name: "breadcrumbs",
    count: "10874",
  },
  {
    name: "no drizzle",
    count: "3901",
  },
  {
    name: "BBQ",
    count: "200",
  },
  {
    name: "garlic parmesan",
    count: "6696",
  },
  {
    name: "buffalo",
    count: "2807",
  },
  {
    name: "pesto",
    count: "2145",
  },
  {
    name: "ranch",
    count: "3649",
  },
  {
    name: "hot honey",
    count: "2150",
  },
  {
    name: "no side",
    count: "12267",
  },
  {
    name: "garlic bread",
    count: "7340",
  },
  {
    name: "cheesy garlic bread",
    count: "5295",
  },
  {
    name: "cheesecake",
    count: "965",
  },
  {
    name: "large chocolate chunk cookie",
    count: "92",
  },
  {
    name: "doritos",
    count: "44",
  },
  {
    name: "cheetos",
    count: "41",
  },
  {
    name: "lays barbecue",
    count: "23",
  },
  {
    name: "lays classic",
    count: "29",
  },
  {
    name: "no drink",
    count: "12347",
  },
  {
    name: "water bottle",
    count: "119",
  },
  {
    name: "apple juice",
    count: "232",
  },
  {
    name: "coke",
    count: "448",
  },
  {
    name: "dr. pepper",
    count: "286",
  },
  {
    name: "sprite",
    count: "215",
  },
  {
    name: "diet coke",
    count: "172",
  },
  {
    name: "powerade",
    count: "90",
  },
  {
    name: "lemonade",
    count: "74",
  },

];

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ names, price, expense }) => {
        return {
          names: names,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="S&P 500 Actual vs Predicted"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="NASDAQ # of Sales" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              1,273,981,102
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 17.39%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are down by 17.01% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader title="Ideal R^2 Value Correlation (1:1)" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
