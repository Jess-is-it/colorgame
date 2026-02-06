import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import AnimatedDropzone from 'src/components/form-components/form-dropzone/AnimatedDropzone';
import DefaultDropzone from 'src/components/form-components/form-dropzone/DefaultDropzone';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Dropzone',
  },
];

const FormDropzone = () => {
  return (
    <>
      <BreadcrumbComp title="Dropzone" items={BCrumb} />
      <div className="flex flex-col gap-6">
        <div>
          <DefaultDropzone />
        </div>
        <div>
          <AnimatedDropzone />
        </div>
      </div>
    </>
  );
};

export default FormDropzone;
