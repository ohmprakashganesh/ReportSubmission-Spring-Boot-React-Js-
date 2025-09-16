
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const Landing = ({ assignments, submissions, unChecked, checked }) => {
  const data = [
    { name: "Pending", value: unChecked?.length || 0 },
    { name: "Checked", value: checked?.length || 0 },
  ];

  const COLORS = ["#3b82f6", "#6366f1", "#facc15", "#22c55e"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full h-96">
      <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
       Submission Summery
      </h3>
      <ResponsiveContainer width="90%" height="90%" className="pt-5">
        <PieChart>
          <Pie className="mb-5"
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend  verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Landing;

