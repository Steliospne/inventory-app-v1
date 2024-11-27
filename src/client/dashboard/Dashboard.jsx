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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import FeatureCard from '../components/FeatureCard';
import {
  fetchDailyStockMovement,
  fetchInventoryMovements,
  fetchTopMovingIngredients,
  fetchTurnOverRate,
} from '../lib/data.js';

import CustomPieLabel from '../components/CustomPieLabel';

const Dashboard = () => {
  const COLORS = [
    '#FF6B6B', // coral red
    '#4ECDC4', // turquoise
    '#45B7D1', // sky blue
    '#96CEB4', // sage green
    '#E0BB2C', // soft yellow
  ];

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

  const {
    pendingTopMovingIngredients,
    errorTopMovingIngredients,
    dataTopMovingIngredients,
    fetchingTopMovingIngredients,
  } = fetchTopMovingIngredients();

  const {
    pendingDailyStockMovement,
    errorDailyStockMovement,
    dataDailyStockMovement,
    fetchingDailyStockMovement,
  } = fetchDailyStockMovement();

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
                tickFormatter={(value) => value + '%'}
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
                data={dataTopMovingIngredients && dataTopMovingIngredients}
                dataKey='total_quantity_moved'
                nameKey='name'
                cx='75%'
                cy='50%'
                outerRadius={80}
                label={
                  <CustomPieLabel textLabel='Quantity: ' colors={COLORS} />
                }
              >
                {dataTopMovingIngredients &&
                  dataTopMovingIngredients.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
              </Pie>
              <Pie
                data={dataTopMovingIngredients && dataTopMovingIngredients}
                dataKey='total_value_moved'
                nameKey='name'
                cx='25%'
                cy='50%'
                outerRadius={80}
                label={<CustomPieLabel textLabel='Value: ' colors={COLORS} />}
                legendType='none'
              >
                {dataTopMovingIngredients &&
                  dataTopMovingIngredients.map((entry, index) => (
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

      {/* <FeatureCard title='Price Volatility'>
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
      </FeatureCard> */}

      <FeatureCard title='Daily Stock Movement Patterns'>
        <div className='h-64'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={dataDailyStockMovement && dataDailyStockMovement}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='day_of_week' />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey='transaction_count'
                fill='#8884d8'
                name='Transaction Count'
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </FeatureCard>
    </div>
  );
};

export default Dashboard;
