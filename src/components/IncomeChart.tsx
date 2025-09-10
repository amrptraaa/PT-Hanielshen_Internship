"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const incomeData = [
  { month: "Jan", income: 1200000 },
  { month: "Feb", income: 1800000 },
  { month: "Mar", income: 1500000 },
  { month: "Apr", income: 2100000 },
  { month: "May", income: 1750000 },
  { month: "Jun", income: 2500000 },
];

export default function IncomeChart() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Monthly Income</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={incomeData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value: number) =>
                  `Rp ${value.toLocaleString("id-ID")}`
                }
              />
              <Bar dataKey="income" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
