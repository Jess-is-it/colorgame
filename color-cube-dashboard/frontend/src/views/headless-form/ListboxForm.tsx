import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BasicListbox from 'src/components/headless-form/listbox/BasicListbox';
import LabelListbox from 'src/components/headless-form/listbox/LabelListbox';
import DisableListBox from 'src/components/headless-form/listbox/DisableListbox';
import DisableListAll from 'src/components/headless-form/listbox/DisableListBoxAll';
import ListboxWithDescription from 'src/components/headless-form/listbox/ListboxWithDescription';
import ListBoxWithHtmlForm from 'src/components/headless-form/listbox/ListBoxWithHtmlForm';
import ListBoxWidth from 'src/components/headless-form/listbox/ListboxWidth';
import HorizontalListBox from 'src/components/headless-form/listbox/HorizontalListBox';
import TransitionListBox from 'src/components/headless-form/listbox/ListboxTransition';
import ListboxFramerMotion from 'src/components/headless-form/listbox/ListboxFramerMotion';
import ListboxWithMultipleVal from 'src/components/headless-form/listbox/ListboxWithMultipleVal';
import RenderingAsDiffElemtns from 'src/components/headless-form/listbox/RenderingAsDiffElemtns';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Listbox',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Listbox" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicListbox />
        </div>
        <div className="col-span-12">
          <LabelListbox />
        </div>
        <div className="col-span-12">
          <DisableListAll />
        </div>
        <div className="col-span-12">
          <DisableListBox />
        </div>
        <div className="col-span-12">
          <ListboxWithDescription />
        </div>
        <div className="col-span-12">
          <ListBoxWithHtmlForm />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <ListBoxWidth />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <HorizontalListBox />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <TransitionListBox />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <ListboxFramerMotion />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <ListboxWithMultipleVal />
        </div>
        <div className="lg:col-span-4 md:col-span-6 col-span-12">
          <RenderingAsDiffElemtns />
        </div>
      </div>
    </>
  );
};

export default page;
