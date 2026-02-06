import { useState } from 'react';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';
import { IconCheck, IconSquareX } from '@tabler/icons-react';
import { Icon } from '@iconify/react';
import TitleIconCard from 'src/components/shared/TitleIconCard';
import React from 'react';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import { Input } from 'src/components/ui/input';

export interface EditableTableType {
  id: string;
  username: string;
  projectname: string;
  status: string;
  statuscolor: string;
  edit?: boolean;
}

const basicTableData2: EditableTableType[] = [
  {
    id: '1',
    username: 'Olivia Rhye',
    projectname: 'Xtreme admin',
    status: 'active',
    statuscolor: 'lightError',
  },
  {
    id: '2',
    username: 'Barbara Steele',
    projectname: 'Adminpro admin',
    status: 'cancel',
    statuscolor: 'lightError',
  },
  {
    id: '3',
    username: 'Leonard Gordon',
    projectname: 'Monster admin',
    status: 'active',
    statuscolor: 'lightPrimary',
  },
  {
    id: '4',
    username: 'Evelyn Pope',
    projectname: 'matdashpro admin',
    status: 'pending',
    statuscolor: 'lightSuccess',
  },
  {
    id: '5',
    username: 'Tommy Garza',
    projectname: 'Elegant admin',
    status: 'cancel',
    statuscolor: 'lightError',
  },
  {
    id: '6',
    username: 'Isabel Vasquez',
    projectname: 'Modernize admin',
    status: 'pending',
    statuscolor: 'lightPrimary',
  },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'cancel', label: 'Cancel' },
  { value: 'pending', label: 'Pending' },
];

const statusColorMapping: { [key: string]: string } = {
  active: 'lightPrimary',
  cancel: 'lightError',
  pending: 'lightSuccess',
  default: 'default',
};

const columnHelper = createColumnHelper<EditableTableType>();

const columns = [
  columnHelper.accessor('username', {
    header: () => <span>Username</span>,
    cell: (info) => <p className="text-base">{info.getValue()}</p>,
  }),
  columnHelper.accessor('projectname', {
    header: () => <span>Project Name</span>,
    cell: (info) => <p className="text-base">{info.getValue()}</p>,
  }),
  columnHelper.accessor('status', {
    header: () => <span>Status</span>,
    cell: (info) => (
      <Badge
        variant={(statusColorMapping[info.getValue()] as BadgeProps['variant']) || 'default'}
        className="capitalize"
      >
        {info.getValue()}
      </Badge>
    ),
  }),
  columnHelper.accessor('edit', {
    id: 'edit',
    header: () => <span>Edit</span>,
    cell: ({ row }) => (
      <button onClick={() => row.getToggleExpandedHandler()} className="text-blue-500">
        <Icon icon="solar:pen-new-square-broken" height={20} />
      </button>
    ),
  }),
];

const Editable = () => {
  const [data, setData] = useState<EditableTableType[]>(basicTableData2);
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<EditableTableType | null | any>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleEdit = (row: EditableTableType) => {
    setEditRowId(row.id);
    setEditedData({ ...row });
  };

  const handleSave = () => {
    if (editedData) {
      setData(data.map((item) => (item.id === editedData.id ? editedData : item)));
      setEditRowId(null);
      setEditedData(null);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    field: keyof EditableTableType,
  ) => {
    if (editedData) {
      setEditedData({
        ...editedData,
        [field]: e.target.value,
      });
    }
  };

  const handleDownload = () => {
    const headers = ['Username', 'Project Name', 'Status'];
    const rows = data.map((item) => [item.username, item.projectname, item.status]);

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
    <TitleIconCard title="Editable Table" onDownload={handleDownload}>
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="whitespace-nowrap py-3 px-4">
                      {cell.column.id === 'edit' ? (
                        editRowId === row.original.id ? (
                          <>
                            <button onClick={handleSave} className="hover:text-primary mr-2">
                              <IconCheck size={20} />
                            </button>
                            <button onClick={() => setEditRowId(null)} className="hover:text-error">
                              <IconSquareX size={20} />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(row.original)}
                            className="btn-circle-hover"
                          >
                            <Icon icon="solar:pen-new-square-broken" height={20} />
                          </button>
                        )
                      ) : editRowId === row.original.id ? (
                        cell.column.id === 'status' ? (
                          <div className="select-md">
                            <select
                              value={editedData?.status || ''}
                              onChange={(e) => handleChange(e, 'status')}
                              className="form-control-input"
                            >
                              {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <Input
                            type="text"
                            value={editedData?.[cell.column.id] || ''}
                            onChange={(e) =>
                              handleChange(e, cell.column.id as keyof EditableTableType)
                            }
                            className="form-control-input"
                          />
                        )
                      ) : (
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </TitleIconCard>
  );
};

export default Editable;
