import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import FeatureCard from '../components/FeatureCard';
import { fetchInventoryMovements, fetchTurnOverRate } from '../lib/data.js';

const Dashboard = () => {
  const sampleTopIngredients = [
    { name: 'Flour', value: 2500 },
    { name: 'Sugar', value: 2000 },
    { name: 'Salt', value: 1500 },
    { name: 'Yeast', value: 1000 },
    { name: 'Butter', value: 800 },
  ];

  const sampleDayPatterns = [
    { day: 'Mon', count: 45 },
    { day: 'Tue', count: 50 },
    { day: 'Wed', count: 35 },
    { day: 'Thu', count: 40 },
    { day: 'Fri', count: 55 },
  ];

  const samplePriceVolatility = [
    { month: '2024-01', avg_price: 100, deviation: 10 },
    { month: '2024-02', avg_price: 105, deviation: 15 },
    { month: '2024-03', avg_price: 95, deviation: 8 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const {
    pendingInvMovement,
    errorInvMovement,
    invMovementData,
    fetchingInvMovement,
  } = fetchInventoryMovements();

  const {
    pendingTurnOverRate,
    errorTurnOverRate,
    dataTurnOverRate,
    fetchingTurnOverRate,
  } = fetchTurnOverRate();

  return (
    <div className='flex flex-col gap-4 p-4'>
      <FeatureCard title='Total Value of Inventory Movements'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={invMovementData && invMovementData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey='purchase' fill='#8884d8' name='Purchases' />
              <Bar dataKey='usage' fill='#82ca9d' name='Usage' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>

      <FeatureCard title='Inventory Turnover Rate'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={dataTurnOverRate && dataTurnOverRate}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis
                dataKey='turnover_rate'
                type='number'
                padding={{ bottom: 10 }}
                domain={[-150, 0]}
              />
              <Tooltip />
              <Line
                type='monotone'
                dataKey='turnover_rate'
                stroke='#8884d8'
                strokeWidth={2}
                name='Turnover Rate (%)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>

      <FeatureCard title='Top Moving Ingredients'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={sampleTopIngredients}
                dataKey='value'
                nameKey='name'
                cx='50%'
                cy='50%'
                outerRadius={80}
                label
              >
                {sampleTopIngredients.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>

      <FeatureCard title='Price Volatility'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart data={samplePriceVolatility}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='month' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='avg_price'
                stroke='#8884d8'
                fill='#8884d8'
                fillOpacity={0.3}
                name='Average Price'
              />
              <Area
                type='monotone'
                dataKey='deviation'
                stroke='#82ca9d'
                fill='#82ca9d'
                fillOpacity={0.3}
                name='Price Deviation'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>

      <FeatureCard title='Daily Stock Movement Patterns'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={sampleDayPatterns}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='count' fill='#8884d8' name='Transaction Count' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>
    </div>
  );
};

export default Dashboard;
