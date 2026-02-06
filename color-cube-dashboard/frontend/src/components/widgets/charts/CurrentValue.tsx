import IncomeChart from './IncomeChart';
import ExpnaceChart from './ExpnaceChart';
import CurrentYear from './CurrentYear';
import CardBox from 'src/components/shared/CardBox';
import OutlineCard from 'src/components/shared/OutlineCard';
import { Button } from 'src/components/ui/button';

const CurrentValue = () => {
  return (
    <>
      <CardBox>
        <div className="flex justify-between items-end">
          <h5 className="card-title">Current Value</h5>
          <div className="flex gap-3">
            <Button>Buy</Button>
            <Button variant={'outline'}>Sell</Button>
          </div>
        </div>

        <div className="grid grid-cols-12 lg:gap-y-30 lg:gap-x-30 gap-y-30 gap-x-0 mt-6">
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
              <IncomeChart />
            </OutlineCard>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
              <ExpnaceChart />
            </OutlineCard>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <OutlineCard className="shadow-none">
              <CurrentYear />
            </OutlineCard>
          </div>
        </div>
      </CardBox>
    </>
  );
};

export default CurrentValue;
