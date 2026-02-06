import userimg1 from 'src/assets/images/profile/user-3.jpg';
import userimg2 from 'src/assets/images/profile/user-5.jpg';
import userimg3 from 'src/assets/images/profile/user-6.jpg';
import userimg4 from 'src/assets/images/profile/user-7.jpg';
import userimg5 from 'src/assets/images/profile/user-8.jpg';
import { useMemo, useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';

export const TopPerformer = () => {
  const PerformersData = [
    {
      key: 'performerData1',
      profileImg: userimg1,
      username: 'Sunil Joshi',
      designation: 'Web Designer',
      project: 'Elite Admin',
      priority: 'Low',
      color: 'lightPrimary',
      budget: 3.9,
    },
    {
      key: 'performerData2',
      profileImg: userimg2,
      username: 'John Deo',
      designation: 'Web Developer',
      project: 'Flexy Admin',
      priority: 'Medium',
      color: 'lightWarning',
      budget: 24.5,
    },
    {
      key: 'performerData3',
      profileImg: userimg3,
      username: 'Nirav Joshi',
      designation: 'Web Manager',
      project: 'Material Pro',
      priority: 'High',
      color: 'lightError',
      budget: 12.8,
    },
    {
      key: 'performerData4',
      profileImg: userimg4,
      username: 'Yuvraj Sheth',
      designation: 'Project Manager',
      project: 'Xtreme Admin',
      priority: 'Low',
      color: 'lightPrimary',
      budget: 4.8,
    },
    {
      key: 'performerData5',
      profileImg: userimg5,
      username: 'Micheal Doe',
      designation: 'Content Writer',
      project: 'Helping Hands WP Theme',
      priority: 'High',
      color: 'lightError',
      budget: 9.3,
    },
  ];

  // search
  const [searchQuery, setSearchQuery] = useState('');

  // tabel data sorting logic
  const [tableData, setTableData] = useState(PerformersData);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const priorityOrder: Record<string, number> = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  const filteredData = useMemo(() => {
    return tableData.filter((item) =>
      item.username.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, tableData]);

  const sortByAssign = () => {
    const sorted = [...tableData].sort((a, b) =>
      sortOrder === 'asc'
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username),
    );
    setTableData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByProject = () => {
    const sorted = [...tableData].sort((a, b) =>
      sortOrder === 'asc' ? a.project.localeCompare(b.project) : b.project.localeCompare(a.project),
    );
    setTableData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByPriority = () => {
    const sorted = [...tableData].sort((a, b) =>
      sortOrder === 'asc'
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority],
    );
    setTableData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const sortByBudget = () => {
    const sorted = [...tableData].sort((a, b) =>
      sortOrder === 'asc' ? a.budget - b.budget : b.budget - a.budget,
    );
    setTableData(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h5 className="card-title">Top Performers</h5>
            <p className="card-subtitle">Best employees</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center relative">
              <Icon
                icon="solar:magnifer-line-duotone"
                height={18}
                width={18}
                className="absolute top-1/2 start-[15px] -translate-y-1/2"
              />
              <InputPlaceholderAnimate
                value={searchQuery}
                onChange={setSearchQuery}
                placeholders={['Search employees...', 'Find top performer...', 'Look up docs...']}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-sm font-semibold ps-0">
                        <button
                          onClick={sortByAssign}
                          className="hover:cursor-pointer flex items-center gap-1.5"
                        >
                          Assigned
                          <span>
                            <Icon
                              icon={'solar:sort-vertical-line-duotone'}
                              width={18}
                              height={18}
                            />
                          </span>
                        </button>
                      </TableHead>
                      <TableHead className="text-sm font-semibold">
                        <button
                          onClick={sortByProject}
                          className="hover:cursor-pointer flex items-center gap-1.5 group"
                        >
                          Project
                          <span>
                            <Icon
                              icon={'solar:sort-vertical-line-duotone'}
                              width={18}
                              height={18}
                              className="hidden group-hover:block"
                            />
                          </span>
                        </button>
                      </TableHead>
                      <TableHead className="text-sm font-semibold">
                        <button
                          onClick={sortByPriority}
                          className="hover:cursor-pointer flex items-center gap-1.5 group"
                        >
                          Priority
                          <span>
                            <Icon
                              icon={'solar:sort-vertical-line-duotone'}
                              width={18}
                              height={18}
                              className="hidden group-hover:block"
                            />
                          </span>
                        </button>
                      </TableHead>
                      <TableHead className="text-sm font-semibold min-w-28">
                        <button
                          onClick={sortByBudget}
                          className="hover:cursor-pointer flex items-center gap-1.5 group"
                        >
                          Budget
                          <span>
                            <Icon
                              icon={'solar:sort-vertical-line-duotone'}
                              width={18}
                              height={18}
                              className="hidden group-hover:block"
                            />
                          </span>
                        </button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-border dark:divide-darkborder ">
                    {filteredData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="whitespace-nowrap ps-0 md:min-w-auto min-w-[200px]">
                          <div className="flex gap-3 items-center">
                            <img
                              src={item.profileImg}
                              alt="icon"
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <h6 className="text-sm font-semibold mb-1">{item.username}</h6>
                              <p className="text-xs font-normal text-bodytext dark:text-darklink">
                                Web Designer
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p className="text-link dark:text-darklink text-sm w-fit">
                            {item.project}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge variant={item.color as BadgeProps['variant']} className="text-sm">
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <p className="dark:text-darklink text-link text-sm">{item.budget}k</p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
