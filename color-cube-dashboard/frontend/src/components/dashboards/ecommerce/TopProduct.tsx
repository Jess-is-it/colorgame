import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import { Card } from 'src/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { Table, TableHead, TableRow, TableHeader, TableCell } from 'src/components/ui/table';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import s5 from 'src/assets/images/products/advance-macbook.jpg';
import s6 from 'src/assets/images/products/super-games.jpg';
import s7 from 'src/assets/images/products/red-valvet-dress.jpg';
import s11 from 'src/assets/images/products/teddybear.jpg';
import {
  AnimatedTableBody,
  AnimatedTableRow,
  AnimatedTableWrapper,
} from 'src/components/animated-component/AnimatedTable';
import PlaceholdersInput from 'src/components/animated-component/AnimatedInputPlaceholder';

// ✅ Sample Product Data
const PerformersData = [
  {
    key: 'performerData1',
    productImg: s11,
    productname: 'Cute Soft Teddybear',
    category: 'Toys',
    date: 'Tue, Sep 2 2025',
    stock: 'In Stock',
    color: 'lightSuccess',
    price: 285,
  },
  {
    key: 'performerData2',
    productImg: s5,
    productname: 'MacBook Air Pro',
    category: 'Electronics',
    date: 'Mon, Sep 1 2025',
    stock: 'Out Of Stock',
    color: 'lightError',
    price: 650,
  },
  {
    key: 'performerData3',
    productImg: s7,
    productname: 'Red Valvet Dress',
    category: 'Fashion',
    date: 'Thu, Aug 28 2025',
    stock: 'In Stock',
    color: 'lightSuccess',
    price: 150,
  },
  {
    key: 'performerData4',
    productImg: s6,
    productname: 'Gaming Console',
    category: 'Electronics',
    date: 'Mon, Sep 1 2025',
    stock: 'In Stock',
    color: 'lightSuccess',
    price: 25,
  },
];

export const TopProduct = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'product' | 'price'>('product');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // ✅ Derived + Filtered + Sorted Data
  const filteredData = useMemo(() => {
    const filtered = PerformersData.filter((item) =>
      item.productname.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'product') {
        return sortOrder === 'asc'
          ? a.productname.localeCompare(b.productname)
          : b.productname.localeCompare(a.productname);
      } else {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
    });

    return sorted;
  }, [searchQuery, sortBy, sortOrder]);

  // ✅ Sorting Triggers
  const sortByProduct = () => {
    setSortBy('product');
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const sortByPrice = () => {
    setSortBy('price');
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h5 className="card-title">Top Products</h5>
            <p className="card-subtitle">Best seller</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center relative">
              <Icon
                icon="solar:magnifer-line-duotone"
                height={18}
                width={18}
                className="absolute top-1/2 start-[15px] -translate-y-1/2"
              />
              <PlaceholdersInput
                value={searchQuery}
                onChange={setSearchQuery}
                placeholders={['Search Product...', 'Find top Product...', 'Look up Product...']}
              />
            </div>
          </div>
        </div>

        {/* ✅ Table Section */}
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <AnimatedTableWrapper className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="ps-0 text-sm">
                        <button
                          onClick={sortByProduct}
                          className="hover:cursor-pointer flex items-center gap-1.5"
                        >
                          Product
                          <Icon icon={'solar:sort-vertical-line-duotone'} width={18} height={18} />
                        </button>
                      </TableHead>
                      <TableHead className="text-sm">Date</TableHead>
                      <TableHead className="text-sm">Status</TableHead>
                      <TableHead className="text-sm w-32">
                        <button
                          onClick={sortByPrice}
                          className="hover:cursor-pointer flex items-center gap-1.5 group"
                        >
                          Price
                          <Icon
                            icon={'solar:sort-vertical-line-duotone'}
                            width={18}
                            height={18}
                            className="hidden group-hover:block"
                          />
                        </button>
                      </TableHead>
                      <TableHead className="text-sm">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <AnimatedTableBody>
                    {filteredData.map((item, index) => (
                      <AnimatedTableRow
                        key={index}
                        index={index}
                        className="border-b border-ld transition-colors"
                      >
                        <TableCell className="whitespace-nowrap ps-0 min-w-[220px]">
                          <div className="flex gap-3 items-center">
                            <img
                              src={item.productImg}
                              alt="icon"
                              className="h-12 w-12 rounded-md"
                            />
                            <div>
                              <h6 className="text-sm font-semibold">{item.productname}</h6>
                              <p>{item.category}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p>{item.date}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge variant={item.color as BadgeProps['variant']} className="text-sm">
                            {item.stock}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p>${item.price}</p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Icon
                                icon="tabler:dots-vertical"
                                className="text-muted dark:text-darklink hover:text-primary dark:hover:text-primary text-lg shrink-0 cursor-pointer"
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" align="center">
                              <DropdownMenuItem asChild>
                                <Link
                                  to={'/apps/ecommerce/list'}
                                  className="flex gap-2 items-center text-muted dark:text-darklink"
                                >
                                  <Icon icon="solar:pen-new-square-broken" className="text-base" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link
                                  to={'/apps/ecommerce/list'}
                                  className="flex gap-2 items-center text-muted dark:text-darklink"
                                >
                                  <Icon
                                    icon="solar:trash-bin-minimalistic-outline"
                                    className="text-base"
                                  />
                                  Delete
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </AnimatedTableRow>
                    ))}
                  </AnimatedTableBody>
                </Table>
              </AnimatedTableWrapper>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
