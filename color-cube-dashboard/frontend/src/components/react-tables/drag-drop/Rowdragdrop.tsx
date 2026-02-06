import { CSSProperties } from 'react';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  Cell,
} from '@tanstack/react-table';
import { IconDots } from '@tabler/icons-react';
import { Icon } from '@iconify/react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TitleIconCard from 'src/components/shared/TitleIconCard';
import React from 'react';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';

import s1 from 'src/assets/images/blog/blog-img1.jpg';
import s2 from 'src/assets/images/blog/blog-img2.jpg';
import s3 from 'src/assets/images/blog/blog-img3.jpg';
import s4 from 'src/assets/images/blog/blog-img4.jpg';
import s5 from 'src/assets/images/blog/blog-img5.jpg';
import { GripHorizontal } from 'lucide-react';

export interface RowdragdropTableType {
  id: string;
  avatar?: string;
  name?: string;
  handle?: string;
  courses: {
    status: string;
    statuscolor: string;
  }[];
  users?: string;
  actions?: boolean;
  dragHandle?: boolean;
}

const basicTableData5: RowdragdropTableType[] = [
  {
    id: '1',
    avatar: s1,
    name: 'Top Authors',
    handle: 'Successful Fellas',
    users: '4300 Users',
    courses: [
      { status: 'Angular', statuscolor: 'lightError' },
      { status: 'PHP', statuscolor: 'lightPrimary' },
    ],
  },
  {
    id: '2',
    avatar: s2,
    name: 'Popular Authors',
    handle: 'Most Successful',
    users: '1200 Users',
    courses: [{ status: 'Bootstrap', statuscolor: 'lightPrimary' }],
  },
  {
    id: '3',
    avatar: s3,
    name: 'New Users',
    handle: 'Awesome Users',
    users: '2000 Users',
    courses: [
      {
        status: 'Reactjs',
        statuscolor: 'lightSuccess',
      },
      {
        status: 'Angular',
        statuscolor: 'lightError',
      },
    ],
  },
  {
    id: '4',
    avatar: s4,
    name: 'Active Customers',
    handle: 'Best Customers',
    users: '1500 Users',
    courses: [
      {
        status: 'Bootstrap',
        statuscolor: 'lightPrimary',
      },
    ],
  },
  {
    id: '5',
    avatar: s5,
    name: 'Bestseller Theme',
    handle: 'Amazing Templates',
    users: '9500 Users',
    courses: [
      {
        status: 'Angular',
        statuscolor: 'lightError',
      },
      {
        status: 'Reactjs',
        statuscolor: 'lightSuccess',
      },
    ],
  },
];

const columnHelper = createColumnHelper<RowdragdropTableType>();

const columns = [
  columnHelper.accessor('dragHandle', {
    cell: () => (
      <span>
        <GripHorizontal className="cursor-grab" size={18} />
      </span>
    ),
    header: () => <span></span>,
  }),

  columnHelper.accessor('avatar', {
    cell: (info) => (
      <div className="flex gap-3 items-center">
        <img
          src={info.getValue()}
          width={50}
          height={50}
          alt="icon"
          className="h-10 w-10 rounded-md"
        />
        <div className="truncate line-clamp-2 max-w-56">
          <h6 className="text-base">{info.row.original.name}</h6>
          <p className="text-sm ">{info.row.original.handle}</p>
        </div>
      </div>
    ),
    header: () => <span>Authors</span>,
  }),
  columnHelper.accessor('courses', {
    cell: (info) => (
      <div className="flex gap-2">
        {info.getValue().map((course, index) => (
          <Badge
            key={index}
            variant={course.statuscolor as BadgeProps['variant']}
            className="capitalize"
          >
            {course.status}
          </Badge>
        ))}
      </div>
    ),
    header: () => <span>Courses</span>,
  }),
  columnHelper.accessor('users', {
    cell: (info) => <p className=" text-sm">{info.getValue()}</p>,
    header: () => <span>Users</span>,
  }),
  columnHelper.accessor('actions', {
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
            <IconDots size={22} />
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          {[
            { icon: 'solar:add-circle-outline', listtitle: 'Add' },
            { icon: 'solar:pen-new-square-broken', listtitle: 'Edit' },
            { icon: 'solar:trash-bin-minimalistic-outline', listtitle: 'Delete' },
          ].map((item, index) => (
            <DropdownMenuItem key={index} className="flex gap-3 items-center">
              <Icon icon={item.icon} height={18} />
              <span>{item.listtitle}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    header: () => <span></span>,
  }),
];

const DraggableRow = ({ row }: { row: Row<RowdragdropTableType> }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: row.original.id,
  });

  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: 'move',
  };

  return (
    <tr ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {row.getVisibleCells().map((cell: Cell<RowdragdropTableType, any>) => (
        <td key={cell.id} className="whitespace-nowrap py-3 px-4">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
};

function Rowdragdrop() {
  const [data, setData] = React.useState<RowdragdropTableType[]>(basicTableData5);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setData((prevData) => {
        const oldIndex = prevData.findIndex((item) => item.id === active.id);
        const newIndex = prevData.findIndex((item) => item.id === over?.id);
        return arrayMove(prevData, oldIndex, newIndex);
      });
    }
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );
  const handleDownload = () => {
    const headers = ['Name', 'Handle', 'Users', 'Courses'];
    const rows = data.map((item) => [
      item.name,
      item.handle,
      item.users,
      item.courses.map((course) => course.status).join(', '),
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'table-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
      <TitleIconCard title="Row Drag & Drop Table" onDownload={handleDownload}>
        <div className="border rounded-md border-ld overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-base text-ld font-semibold text-left border-b border-ld px-4 py-3"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-border dark:divide-darkborder">
                <SortableContext
                  items={data.map((row) => row.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              </tbody>
            </table>
          </div>
        </div>
      </TitleIconCard>
    </DndContext>
  );
}

export default Rowdragdrop;
