import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { CustomizerContext } from 'src/context/CustomizerContext';

import englishFlag from 'src/assets/images/flag/icon-flag-en.svg';
import chineseFlag from 'src/assets/images/flag/icon-flag-cn.svg';
import frenchFlag from 'src/assets/images/flag/icon-flag-fr.svg';
import southAfricaFlag from 'src/assets/images/flag/icon-flag-sa.svg';

const Languages = [
  {
    flagname: 'English (UK)',
    icon: englishFlag,
    value: 'en',
  },
  {
    flagname: '中国人 (Chinese)',
    icon: chineseFlag,
    value: 'ch',
  },
  {
    flagname: 'français (French)',
    icon: frenchFlag,
    value: 'fr',
  },

  {
    flagname: 'عربي (Arabic)',
    icon: southAfricaFlag,
    value: 'ar',
  },
];

export const Language = () => {
  const { i18n } = useTranslation();

  const { isLanguage, setIsLanguage } = useContext(CustomizerContext);
  const currentLang = Languages.find((_lang) => _lang.value === isLanguage) || Languages[1];

  useEffect(() => {
    i18n.changeLanguage(isLanguage);
  }, [isLanguage]);
  return (
    <>
      <div className="relative group/menu px-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="relative after:absolute after:w-10 after:-top-1/2 after:h-10 after:rounded-full hover:after:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer">
              <img
                src={currentLang.icon}
                alt="language"
                className="rounded-full h-5 w-5 shrink-0 object-cover cursor-pointer"
              />
            </span>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56 rounded-sm p-1 z-50">
            {Languages.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onSelect={() => setIsLanguage(item.value)}
                className="flex gap-3 items-center py-2 px-4 cursor-pointer hover:bg-muted"
              >
                <img
                  src={item.icon}
                  alt="language"
                  className="rounded-full h-5 w-5 shrink-0 object-cover cursor-pointer"
                />
                <span className="text-sm text-muted-foreground group-hover:text-primary font-medium leading-[25px]">
                  {item.flagname}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};
