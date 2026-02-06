import { forwardRef } from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Icon } from '@iconify/react';

let MyCustomButton = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function (props, ref) {
    return <button className="..." ref={ref} {...props} />;
  },
);

const RenderDiclosureCode = () => {
  return (
    <div className="w-fit">
      <Disclosure as="div">
        <DisclosureButton
          as={MyCustomButton}
          className="group bg-secondary ui-button w-full text-black"
        >
          What languages do you support?
          <Icon
            icon="solar:alt-arrow-down-outline"
            height={18}
            className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180"
          />
        </DisclosureButton>
        <DisclosurePanel as="ul" className="px-4 py-3">
          <li className="py-1">HTML</li>
          <li className="py-1">CSS</li>
          <li className="py-1">JavaScript</li>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
};

export default RenderDiclosureCode;
