export interface ChildItem {
  id?: number | string;
  name: string;
  icon?: string;
  children?: ChildItem[];
  item?: unknown;
  url?: string;
  color?: string;
  disabled?: boolean;
  subtitle?: string;
  badge?: boolean;
  badgeType?: string;
  badgeContent?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: number | string;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  disabled?: boolean;
  subtitle?: string;
  badgeType?: string;
  badge?: boolean;
  badgeContent?: string;
}

import { uniqueId } from 'lodash';

// Minimal sidebar for the MVP: keep template chrome, remove unused pages.
const SidebarContent: MenuItem[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Face Detection',
        icon: 'solar:user-speak-rounded-linear',
        id: uniqueId(),
        url: '/',
      },
    ],
  },
];

export default SidebarContent;
