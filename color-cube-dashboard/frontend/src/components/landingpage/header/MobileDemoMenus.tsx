import { demosMegamenu, appsMegamenu } from '../data';
import * as AppsData from 'src/layouts/full/vertical/header/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion';
import { Button } from 'src/components/ui/button';
import { IconHelp } from '@tabler/icons-react';
import { Link } from 'react-router';
import Quicklinks from 'src/layouts/full/vertical/header/Quicklinks';

const MobileDemosMenu = ({ onClose }: { onClose: () => void }) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full mt-4">
        {/* Demos Panel */}
        <AccordionItem value="demos">
          <AccordionTrigger className="py-3 px-0">Demos</AccordionTrigger>
          <AccordionContent className="px-0 py-3">
            <div className="overflow-y-auto max-h-[80vh] px-4">
              <div className="mb-5">
                <h5 className="card-title">Different Demos</h5>
                <p>Included with the Package</p>
              </div>
              <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                {demosMegamenu.map((item, index) => (
                  <div key={index}>
                    <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group">
                      <img src={item.img} alt="tailwindadmin" className="w-full" />
                      {item.link && (
                        <>
                          <Button
                            asChild
                            className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-[1]"
                          >
                            <Link to={item.link} target="_blank" onClick={onClose}>
                              Live Preview
                            </Link>
                          </Button>
                          <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-blue-100 mix-blend-multiply invisible group-hover:visible"></div>
                        </>
                      )}
                    </div>
                    <h5 className="text-center p-3 text-sm font-semibold">{item.name}</h5>
                    {item.include === 'Included With The package' && (
                      <p className="text-xs text-center text-bodytext">Included With The package</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Apps */}
              <div className="mt-8">
                <h5 className="card-title mb-5">Different Apps</h5>
                <div className="grid xl:grid-cols-5 grid-cols-1 gap-6">
                  {appsMegamenu.map((item, index) => (
                    <div key={index}>
                      <div className="overflow-hidden border border-ld rounded-md relative flex justify-center items-center group">
                        <img src={item.img} alt="tailwindadmin" className="w-full" />
                        <Button
                          asChild
                          className="text-xs absolute left-0 right-0 flex justify-center items-center w-fit mx-auto invisible group-hover:visible z-[1]"
                        >
                          <Link to={item.link} onClick={onClose}>
                            Live Preview
                          </Link>
                        </Button>
                        <div className="absolute top-0 bottom-0 left-0 h-full w-full bg-blue-100 mix-blend-multiply invisible group-hover:visible"></div>
                      </div>
                      <h5 className="text-center p-3 text-sm font-semibold">{item.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Pages Panel */}
        <AccordionItem value="pages">
          <AccordionTrigger className="py-3 px-0">Pages</AccordionTrigger>
          <AccordionContent className="px-0 py-3">
            <div className="grid grid-cols-12 w-full overflow-y-auto max-h-[80vh] px-4">
              <div className="xl:col-span-8 col-span-12 flex items-stretch xl:pr-0 px-5 py-5">
                <div className="grid grid-cols-12 gap-3 w-full">
                  {AppsData.appsLink.map((links, index) => (
                    <div className="col-span-12 xl:col-span-6 flex items-stretch" key={index}>
                      <ul>
                        <li>
                          <Link
                            onClick={onClose}
                            to={links.href}
                            className="flex gap-3 items-center hover:text-primary group relative"
                          >
                            <span className="bg-lightprimary h-10 w-10 flex justify-center items-center rounded-md">
                              <img src={links.avatar} width={20} height={20} alt="tailwindadmin" />
                            </span>
                            <div>
                              <h6 className="font-semibold text-sm text-ld hover:text-primary mb-1">
                                {links.title}
                              </h6>
                              <p className="text-xs text-link dark:text-darklink opacity-90 font-medium">
                                {links.subtext}
                              </p>
                            </div>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-12 md:col-span-12 md:border-t border-t-0 border-border dark:border-darkborder hidden xl:flex items-stretch pt-4 pr-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center text-dark dark:text-darklink">
                        <IconHelp width={20} />
                        <Link
                          to="/theme-pages/faq"
                          className="text-sm font-semibold hover:text-primary ml-2 flex gap-2 items-center"
                        >
                          Frequently Asked Questions
                        </Link>
                      </div>
                      <Button>Check</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-4 col-span-12 flex items-stretch">
                <Quicklinks />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default MobileDemosMenu;
