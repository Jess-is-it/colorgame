import { TopCards } from 'src/components/dashboards/modern/TopCards';
import { RevenueUpdate } from 'src/components/dashboards/modern/RevenueUpdate';
import { YearlyBreakup } from 'src/components/dashboards/modern/YearlyBreakup';
import { MonthlyEarning } from 'src/components/dashboards/modern/MonthlyEarning';
import { EmployeeSalary } from 'src/components/dashboards/modern/EmployeeSalary';
import { Customers } from 'src/components/dashboards/modern/Customers';
import { Projects } from 'src/components/dashboards/modern/Projects';
import { Social } from 'src/components/dashboards/modern/Social';
import { SellingProducts } from 'src/components/dashboards/modern/SellingProducts';
import { WeeklyStats } from 'src/components/dashboards/modern/WeeklyStats';
import { TopPerformer } from 'src/components/dashboards/modern/TopPerformer';

const Moderndash = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <TopCards />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <RevenueUpdate />
        </div>
        <div className="lg:col-span-4 col-span-12 ">
          <div className="flex flex-col gap-6 h-full">
            <YearlyBreakup />
            <MonthlyEarning />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12 ">
          <EmployeeSalary />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-6 h-full">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-6 col-span-12">
                <Customers />
              </div>
              <div className="lg:col-span-6 col-span-12">
                <Projects />
              </div>
            </div>
            <Social />
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <SellingProducts />
        </div>
        <div className="lg:col-span-4 col-span-12">
          <WeeklyStats />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <TopPerformer />
        </div>
      </div>
    </>
  );
};

export default Moderndash;
