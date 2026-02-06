import CountUp from 'src/components/animated-component/CountUp';

export const Metrics = () => {
  const MetricsInfo = [
    { id: 'metric1', title: 'founded', metric: 2019, subtitle: 'When we founded TailwindAdmin' },
    { id: 'metric2', title: 'growth', metric: 1400, subtitle: 'Revenue growth in 2025' },
    { id: 'metric3', title: 'customers', metric: 300, subtitle: 'Customers on TailwindAdmin' },
    {
      id: 'metric4',
      title: 'dashboards',
      metric: 25,
      subtitle: 'Dashboards built using TailwindAdmin',
    },
  ];

  function getSuffix(title: string) {
    switch (title) {
      case 'growth':
        return '%';
      case 'customers':
      case 'dashboards':
        return 'k+';
      default:
        return '';
    }
  }

  return (
    <div className="w-full custom-shadow border-t border-border dark:border-darkborder">
      <div className="container-md px-4 lg:py-24 py-12 ">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12 lg:pe-28 pe-0">
            <h3 className="lg:text-40 text-32 font-bold text-link dark:text-white leading-tight mb-4">
              Key metric at a glance
            </h3>
            <div className="text-base text-lightmuted dark:text-darklink leading-loose">
              From the year we were founded to the impressive customer base we've built, and the
              growth percentages that reflect our continuous improvement, these numbers tell our
              story at a glance. Explore the data that drives our mission and underscores our
              commitment to excellence.
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12 px-4">
            <div className="grid grid-cols-12 gap-6 lg:gap-y-12 gap-y-8">
              {MetricsInfo.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="lg:col-span-6 md:col-span-6 col-span-12 flex flex-col gap-2"
                  >
                    <p className="text-[13px] font-medium text-primary uppercase">{item.title}</p>
                    <h4 className="font-semibold text-link dark:text-white lg:text-5xl text-32">
                      <CountUp to={item.metric} formatWithCommas={item.title !== 'founded'} />
                      {getSuffix(item.title)}
                    </h4>
                    <p className="text-base text-lightmited dark:text-darklink">{item.subtitle}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
