import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexCandleStick from 'src/components/charts/apex-charts/ApexCandleSticks';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Area',
  },
];

const CandleStick = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Candlestick" items={BCrumb} />
      <ApexCandleStick />
    </>
  );
};

export default CandleStick;
