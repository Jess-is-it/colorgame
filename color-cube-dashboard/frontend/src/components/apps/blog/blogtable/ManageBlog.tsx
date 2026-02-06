import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  getPaginationRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import { BlogContext } from 'src/context/blog-context';
import { BlogPostType } from 'src/types/apps/blog';
import { Icon } from '@iconify/react/dist/iconify.js';
import noData from 'src/assets/images/svgs/no-data.webp';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';
import { Button } from 'src/components/ui/button';
import { Checkbox } from 'src/components/ui/checkbox';
import { Badge } from 'src/components/ui/badge';
import { Switch } from 'src/components/ui/switch';
import type { BadgeProps } from 'src/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from 'src/components/ui/tooltip';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'src/components/ui/dialog';

const ManageBlog = () => {
  const { posts } = useContext(BlogContext);

  const [tableData, setTableData] = useState<BlogPostType[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [actionDeleteId, setActionDeleteId] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 7, // default
  });

  const navigate = useNavigate();

  useEffect(() => {
    setTableData(posts);
  }, [posts]);

  const columnHelper = createColumnHelper<BlogPostType>();

  const columns = [
    columnHelper.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(checked) => row.toggleSelected(checked === true)}
          aria-label="Select row"
        />
      ),
    }),

    columnHelper.accessor('title', {
      header: 'Title',
      cell: (info) => {
        const { title, coverImg } = info.row.original;

        return (
          <div className="flex items-center gap-2">
            <img src={coverImg} alt={title} className="w-12 h-9 object-cover rounded" />

            <span className="text-sm font-medium truncate block text-inherit leading-normal max-w-[200px]">
              {title}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: (info) => {
        const category = info.getValue();

        const categoryColors: Record<string, string> = {
          Design: 'lightSuccess',
          Lifestyle: 'lightWarning',
          Gadget: 'lightPrimary',
          Social: 'lightError',
          Health: 'lightInfo',
        };

        return (
          <Badge
            className="text-xs font-medium"
            variant={(category && (categoryColors[category] as BadgeProps['variant'])) || 'gray'}
          >
            {category}
          </Badge>
        );
      },
    }),

    columnHelper.accessor((row) => row.author, {
      id: 'authorName',
      header: 'Author',
      cell: (info) => {
        const author = info.getValue();
        <div className="flex items-center gap-2 whitespace-nowrap ">
          <Avatar>
            <AvatarImage src={author?.avatar || ''} alt={author?.name || 'Unknown'} />
            <AvatarFallback>{author?.name || 'Unknown'}</AvatarFallback>
          </Avatar>

          <p className="text-sm font-medium text-link">{author?.name || 'Unknown'}</p>
        </div>;
      },
    }),

    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => {
        const dateValue = info.getValue();
        return <span>{dateValue ? new Date(dateValue).toLocaleDateString() : '—'}</span>;
      },
    }),
    columnHelper.accessor('published', {
      header: 'published',
      cell: ({ row }) => {
        const postId = row.original.id;
        const published = row.original.published;

        const togglePublished = () => {
          const updatedData = tableData.map((item) =>
            item.id === postId ? { ...item, published: !item.published } : item,
          );
          setTableData(updatedData);
        };

        // return <ToggleSwitch checked={published} onChange={togglePublished} />;
        return (
          <>
            <Switch checked={published} onCheckedChange={togglePublished} />
          </>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const { id } = row.original;

        const handleEdit = () => {
          navigate('/apps/blog/editblog');
        };

        const handleRowDelete = () => {
          // Programmatically select this row
          setRowSelection((prev) => ({
            ...prev,
            [row.id]: true,
          }));

          // Track this specific row's ID for targeted deletion
          setActionDeleteId(id);

          // Show confirmation modal
          setShowConfirm(true);
        };

        return (
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleEdit} variant={'ghost'} size={'sm'}>
                    <Icon icon="solar:pen-linear" width={18} height={18} className="text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Edit Blog</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={'sm'} variant={'ghosterror'} onClick={handleRowDelete}>
                    <Icon icon="solar:trash-bin-minimalistic-linear" color="error" height="18" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete Blog</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    }),
  ];
  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter,
      rowSelection,
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  const handleDelete = () => {
    let selectedIds: string[];

    if (actionDeleteId) {
      selectedIds = [actionDeleteId];
    } else {
      selectedIds = table.getSelectedRowModel().rows.map((row) => row.original.id);
    }

    const newData = tableData.filter((item) => !selectedIds.includes(item.id));

    setTableData(newData);
    setRowSelection({});
    setShowConfirm(false);
    setActionDeleteId(null); // reset
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
        <h3 className="text-lg font-semibold text-dark dark:text-white mb-4 md:mb-0">Blog List</h3>
        <div className="flex flex-wrap lg:flex-nowrap items-center gap-1">
          {/* Search */}
          {!showSearch ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={'sm'} onClick={() => setShowSearch(true)} variant={'ghost'}>
                    <Icon icon={'solar:magnifer-linear'} width={18} height={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <InputPlaceholderAnimate
              value={globalFilter}
              onChange={setGlobalFilter}
              placeholders={['Search blogs...', 'Find top blogs...', 'Look up blogs...']}
              onBlur={() => {
                if (!globalFilter) setShowSearch(false);
              }}
              className="pl-4"
            />
          )}

          {/* Category Filter */}
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value);
              table.getColumn('category')?.setFilterValue(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Design">Design</SelectItem>
              <SelectItem value="Lifestyle">Lifestyle</SelectItem>
              <SelectItem value="Gadget">Gadget</SelectItem>
              <SelectItem value="Social">Social</SelectItem>
              <SelectItem value="Health">Health</SelectItem>
            </SelectContent>
          </Select>

          {/* Bulk delete button */}
          {table.getIsAllPageRowsSelected() && (
            <Button variant={'ghosterror'} onClick={() => setShowConfirm(true)}>
              <Icon icon="solar:trash-bin-2-outline" width={18} height={18} />
            </Button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="border rounded-md border-ld ">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-4 py-2 border-b border-ld text-left  text-ld "
                      >
                        {header.isPlaceholder ? null : (
                          <div
                            className={
                              header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                <>
                                  {header.column.getIsSorted() === 'asc' && (
                                    <Icon icon="solar:alt-arrow-up-bold" />
                                  )}
                                  {header.column.getIsSorted() === 'desc' && (
                                    <Icon icon="solar:alt-arrow-down-bold" />
                                  )}
                                  {header.column.getIsSorted() === false && (
                                    <Icon icon="solar:transfer-vertical-bold" />
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      <div className="flex flex-col items-center">
                        <img src={noData} alt="No data" height={100} width={100} className="mb-4" />
                      </div>
                      No data found!
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0 border-ld">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 py-2 text-dark dark:text-darklink">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      {table.getPageCount() > 0 ? (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-3">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted dark:text-lightgray">Show</p>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                {[3, 7, 10].map((pageSize) => (
                  <SelectItem key={pageSize} value={String(pageSize)}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted dark:text-lightgray">per page</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Page Summary */}
            <div>
              <p className="text-sm font-normal text-muted dark:text-lightgray">
                {table.getRowModel().rows.length > 0
                  ? `${
                      table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                      1
                    }-${Math.min(
                      (table.getState().pagination.pageIndex + 1) *
                        table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length,
                    )} of ${table.getFilteredRowModel().rows.length}`
                  : `0 of 0`}
              </p>
            </div>

            {/* Custom Pagination Controls */}
            <div className="flex items-center gap-2">
              <Icon
                icon="solar:arrow-left-line-duotone"
                className={`text-dark dark:text-white hover:text-primary cursor-pointer ${
                  table.getState().pagination.pageIndex === 0
                    ? 'opacity-50 !cursor-not-allowed'
                    : ''
                }`}
                width={20}
                height={20}
                onClick={() => table.previousPage()}
              />
              <span className="w-8 h-8 bg-lightprimary text-primary flex items-center justify-center rounded-md dark:bg-darkprimary dark:text-white text-sm font-normal">
                {table.getState().pagination.pageIndex + 1}
              </span>
              <Icon
                icon="solar:arrow-right-line-duotone"
                className={`text-dark dark:text-white hover:text-primary cursor-pointer ${
                  table.getState().pagination.pageIndex + 1 === table.getPageCount()
                    ? 'opacity-50 !cursor-not-allowed'
                    : ''
                }`}
                width={20}
                height={20}
                onClick={() =>
                  table.getState().pagination.pageIndex + 1 < table.getPageCount() &&
                  table.nextPage()
                }
              />
            </div>
          </div>
        </div>
      ) : null}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete the selected posts?
            </p>
          </div>
          <DialogFooter className="flex justify-center gap-4">
            <Button onClick={handleDelete}>Yes, Delete</Button>
            <Button variant="destructive" onClick={() => setShowConfirm(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageBlog;
