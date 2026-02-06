import { Icon } from '@iconify/react';
import { IconDotsVertical } from '@tabler/icons-react';

// SHADCN COMPONENTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';

import { Badge } from 'src/components/ui/badge';
import { Checkbox } from 'src/components/ui/checkbox';
import { Progress } from 'src/components/ui/progress';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';
import { checkboxTableData } from './table-data';

const CheckboxTable = () => {
  const tableActionData = [
    { icon: 'tabler:plus', listtitle: 'Add' },
    { icon: 'tabler:edit', listtitle: 'Edit' },
    { icon: 'tabler:trash', listtitle: 'Delete' },
  ];

  return (
    <>
      <div className="border rounded-md border-ld overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-base font-semibold py-3">#</TableHead>
                <TableHead className="text-base font-semibold py-3">Invoice</TableHead>
                <TableHead className="text-base font-semibold py-3">Status</TableHead>
                <TableHead className="text-base font-semibold py-3">Customer</TableHead>
                <TableHead className="text-base font-semibold py-3">Progress</TableHead>
                <TableHead className="text-base font-semibold py-3"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-border dark:divide-darkborder">
              {checkboxTableData.map((item, index) => (
                <TableRow key={index}>
                  {/* Checkbox */}
                  <TableCell className="whitespace-nowrap">
                    <Checkbox />
                  </TableCell>

                  {/* Invoice */}
                  <TableCell className="whitespace-nowrap">
                    <h6 className="text-sm">{item.invoice}</h6>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="whitespace-nowrap">
                    <Badge
                      variant={
                        item?.statuscolor as
                          | 'default'
                          | 'primary'
                          | 'secondary'
                          | 'success'
                          | 'warning'
                          | 'info'
                          | 'error'
                          | 'outline'
                          | 'outlineSecondary'
                          | 'outlineSuccess'
                          | 'outlineWarning'
                          | 'outlineError'
                          | 'outlineInfo'
                          // ... add the rest if needed
                          | undefined
                      }
                      className="capitalize flex items-center gap-1 w-fit"
                    >
                      {item.statusicon && <item.statusicon size={15} />}

                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* Customer */}
                  <TableCell className="whitespace-nowrap">
                    <div className="flex gap-3 items-center">
                      <img
                        src={item.avatar}
                        alt="icon"
                        className="h-10 w-10 rounded-full"
                        width={40}
                        height={40}
                      />
                      <div className="truncate line-clamp-2 max-w-56">
                        <h6 className="text-base">{item.name}</h6>
                        <p className="text-sm text-bodytext">{item.handle}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Progress */}
                  <TableCell className="whitespace-nowrap">
                    <div className="text-bodytext text-sm flex items-center gap-3 w-full">
                      <Progress value={item.progress} className="w-full" />
                      {item.progress}%
                    </div>
                  </TableCell>

                  {/* Dropdown Menu */}
                  <TableCell className="whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                          <IconDotsVertical size={22} />
                        </span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        {tableActionData.map((action, idx) => (
                          <DropdownMenuItem key={idx} className="flex gap-3">
                            <Icon icon={action.icon} height={18} />
                            <span>{action.listtitle}</span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CheckboxTable;
