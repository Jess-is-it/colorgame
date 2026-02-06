import { Expense } from 'src/components/dashboards/ecommerce/Expense';
import { IncrementedSales } from 'src/components/dashboards/ecommerce/IncrementedSales';
import { MonthlyEarning } from 'src/components/dashboards/ecommerce/MonthlyEarning';
import { PaymentGateway } from 'src/components/dashboards/ecommerce/PaymentGateways';
import { RecentTransaction } from 'src/components/dashboards/ecommerce/RecentTransaction';
import { Sales } from 'src/components/dashboards/ecommerce/Sales';
import { SalesGrowth } from 'src/components/dashboards/ecommerce/SalesGrowth';
import { TopProduct } from 'src/components/dashboards/ecommerce/TopProduct';
import { QuarterlyStatus } from 'src/components/dashboards/ecommerce/QuarterlyStatus';
import { WelcomeCard } from 'src/components/dashboards/ecommerce/WelcomeCard';
import { WeeklySales } from 'src/components/dashboards/ecommerce/WeeklySales';
import UserActivity from 'src/components/dashboards/ecommerce/UseActivity';
import CustomerSegmentation from 'src/components/dashboards/ecommerce/CustomerSegmentation';

const Ecomm = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="lg:col-span-8 col-span-12">
          <WelcomeCard />
        </div>
        <div className="lg:col-span-4  col-span-12">
          <div className="grid grid-cols-12 gap-6">
            <div className="sm:col-span-6 col-span-12">
              <Expense />
            </div>
            <div className="sm:col-span-6 col-span-12">
              <Sales />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <UserActivity />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <CustomerSegmentation />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-6 h-full">
            <div className="grid grid-cols-12 gap-6">
              <div className="sm:col-span-6 col-span-12">
                <IncrementedSales />
              </div>
              <div className="sm:col-span-6 col-span-12">
                <SalesGrowth />
              </div>
            </div>
            <MonthlyEarning />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <QuarterlyStatus />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <WeeklySales />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <PaymentGateway />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <RecentTransaction />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <TopProduct />
        </div>
      </div>
    </>
  );
};

export default Ecomm;
