import { FinancialIncomeCard } from 'src/components/dashboards/general/FinancialIncomeCard';
import { OrderStatus } from 'src/components/dashboards/general/OrderStatus';
import ProductCarousel from 'src/components/dashboards/general/Productcarousel';
// import { SalesHourly } from 'src/components/dashboards/general/SalesHourly';
import { Tasks } from 'src/components/dashboards/general/Tasks';
import { TopPerformers } from 'src/components/dashboards/general/TopPerformers';
import TotalAssets from 'src/components/dashboards/general/TotalAssets';
import { UpcomingActivity } from 'src/components/dashboards/general/UpcomingActivity';

const GeneralDash = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <FinancialIncomeCard />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <UpcomingActivity />
        </div>
        <div className="lg:col-span-5 col-span-12">
          <TotalAssets />
        </div>
        <div className="lg:col-span-3 col-span-12">
          <ProductCarousel />
        </div>
        <div className="col-span-12">
          <OrderStatus />
        </div>
        <div className="lg:col-span-5 col-span-12">
          <Tasks />
        </div>
        <div className="lg:col-span-7 col-span-12">
          <TopPerformers />
        </div>
      </div>
    </>
  );
};

export default GeneralDash;
