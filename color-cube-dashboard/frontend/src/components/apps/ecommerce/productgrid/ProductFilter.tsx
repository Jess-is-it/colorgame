import { useContext } from 'react';
import { EcommerceContext } from 'src/context/ecommerce-context/index';
import { ProductFiterType } from 'src/types/apps/ecommerce';
import { Icon } from '@iconify/react';
import { MdCheck } from 'react-icons/md';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';

const ProductFilter = () => {
  const {
    selectedCategory,
    selectCategory,
    sortBy,
    updateSortBy,
    selectedGender,
    selectGender,
    priceRange,
    updatePriceRange,
    selectedColor,
    selectColor,
    products,
    filterReset,
  } = useContext(EcommerceContext);

  const filterCategory: ProductFiterType[] = [
    { id: 1, filterbyTitle: 'Filter by Category' },
    { id: 2, name: 'All', sort: 'All', icon: 'tabler:circles' },
    { id: 3, name: 'Fashion', sort: 'fashion', icon: 'tabler:hanger' },
    { id: 9, name: 'Books', sort: 'books', icon: 'tabler:notebook' },
    { id: 10, name: 'Toys', sort: 'toys', icon: 'tabler:mood-smile' },
    { id: 11, name: 'Electronics', sort: 'electronics', icon: 'tabler:device-laptop' },
    { id: 6, devider: true },
  ];

  const filterbySort = [
    { id: 1, value: 'newest', label: 'Newest', icon: 'tabler:ad-2' },
    { id: 2, value: 'priceDesc', label: 'Price: High-Low', icon: 'tabler:sort-ascending-2' },
    { id: 3, value: 'priceAsc', label: 'Price: Low-High', icon: 'tabler:sort-descending-2' },
    { id: 4, value: 'discount', label: 'Discounted', icon: 'tabler:ad-2' },
  ];

  const genders = ['All', 'Men', 'Women', 'Kids'];
  const prices = ['All', '0‑50', '50‑100', '100‑200', '200‑99999'];

  const filterbyColors = ['All', ...Array.from(new Set(products.flatMap((p) => p.colors)))];

  return (
    <div className="w-full h-full border-e border-ld">
      {/* Category */}
      <ul className="mt-0 pt-4 flex flex-col gap-1">
        {filterCategory.map((filter) =>
          filter.filterbyTitle ? (
            <h6 key={filter.id} className="capitalize text-sm py-4 px-6">
              {filter.filterbyTitle}
            </h6>
          ) : filter.devider ? (
            <div key={filter.id}>
              <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />
            </div>
          ) : (
            <li
              key={filter.id}
              className={`flex items-center gap-2 py-3 px-4 rounded-md hover:text-primary cursor-pointer mx-6 ${
                selectedCategory === filter.sort
                  ? 'text-primary bg-lightprimary dark:bg-lightprimary'
                  : 'text-bodytext dark:text-darklink bg-hover'
              }`}
              onClick={() => selectCategory(filter.sort!)}
            >
              <Icon icon={filter.icon!} height={18} />
              {filter.name}
            </li>
          ),
        )}
      </ul>

      {/* Sort */}
      <ul className="mt-0 px-6 flex flex-col gap-1">
        <h6 className="capitalize text-sm pb-4">Sort By</h6>
        {filterbySort.map((filter) => (
          <li
            key={filter.id}
            className={`flex items-center gap-2 py-3 px-4 rounded-md  hover:text-primary  cursor-pointer ${
              sortBy === filter.value
                ? 'text-primary bg-lightprimary dark:bg-lightprimary'
                : 'text-bodytext dark:text-darklink bg-hover'
            }`}
            onClick={() => updateSortBy(filter.value)}
          >
            <Icon icon={filter.icon} height={18} />
            {filter.label}
          </li>
        ))}
      </ul>
      <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />

      {/* Gender RadioGroup */}
      <div className="mt-0 px-6">
        <h6 className="capitalize text-sm pb-4">By Gender</h6>
        <RadioGroup
          value={selectedGender}
          onValueChange={(value: string) => selectGender(value)}
          className="flex flex-col gap-2"
        >
          {genders.map((gender) => (
            <div key={gender} className="flex items-center gap-3">
              <RadioGroupItem value={gender} id={`gender-${gender}`} />
              <Label
                htmlFor={`gender-${gender}`}
                className="font-normal text-bodytext dark:text-darklink text-sm"
              >
                {gender}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />

      {/* Pricing RadioGroup */}
      <div className="mt-0 px-6">
        <h6 className="capitalize text-sm pb-4">By Pricing</h6>
        <RadioGroup
          value={priceRange}
          onValueChange={(value: string) => updatePriceRange(value)}
          className="flex flex-col gap-2"
        >
          {prices.map((price) => (
            <div key={price} className="flex items-center gap-3">
              <RadioGroupItem value={price} id={`price-${price}`} />
              <Label
                htmlFor={`price-${price}`}
                className="font-normal text-bodytext dark:text-darklink text-sm"
              >
                {price}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <hr className="h-px border-0 bg-gray-200 dark:bg-gray-700 my-6" />

      {/* Colors */}
      <div className="mt-0 px-6">
        <h6 className="capitalize text-sm pb-4">By Colors</h6>
        <div className="flex flex-row flex-wrap gap-2 mb-7">
          {filterbyColors.map((theme, idx) => (
            <Label
              key={idx}
              className="h-6 w-6 rounded-full cursor-pointer flex items-center justify-center"
              style={{
                backgroundColor: theme !== 'All' ? theme : '#fff',
                border: theme === 'All' ? '1px solid #ccc' : 'none',
              }}
              onClick={() => selectColor(selectedColor === theme ? 'All' : theme)}
            >
              {selectedColor === theme && <MdCheck size={16} className="text-gray-500" />}
            </Label>
          ))}
        </div>

        <Button className="w-full rounded-md" onClick={filterReset}>
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
