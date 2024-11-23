const CustomPieLabel = ({
  cx,
  cy,
  innerRadius,
  outerRadius,
  midAngle,
  textLabel = '',
  decimals = 0,
  value,
  index,
  colors,
}) => {
  const RADIAN = Math.PI / 180;
  const x = cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill={colors[index % colors.length]}
      textAnchor={x > cx ? 'start' : 'end'}
    >
      <tspan>{textLabel + value.toFixed(decimals)}</tspan>
    </text>
  );
};

export default CustomPieLabel;
