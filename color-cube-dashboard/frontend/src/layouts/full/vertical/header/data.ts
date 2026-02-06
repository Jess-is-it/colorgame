//Apps Links Type & Data
interface appsLinkType {
  href: string;
  title: string;
  subtext: string;
  avatar: string;
}
import chatimg from 'src/assets/images/svgs/icon-dd-chat.svg';
import cartimg from 'src/assets/images/svgs/icon-dd-cart.svg';
import invoiceimg from 'src/assets/images/svgs/icon-dd-invoice.svg';
import dateimg from 'src/assets/images/svgs/icon-dd-date.svg';
import mobileimg from 'src/assets/images/svgs/icon-dd-mobile.svg';
import lifeimg from 'src/assets/images/svgs/icon-dd-lifebuoy.svg';
import messageimg from 'src/assets/images/svgs/icon-dd-message-box.svg';
import applicationimg from 'src/assets/images/svgs/icon-dd-application.svg';

const appsLink: appsLinkType[] = [
  {
    href: '/apps/chats',
    title: 'Chat Application',
    subtext: 'New messages arrived',
    avatar: chatimg,
  },
  {
    href: '/apps/ecommerce/shop',
    title: 'eCommerce App',
    subtext: 'New stock available',
    avatar: cartimg,
  },
  {
    href: '/apps/notes',
    title: 'Notes App',
    subtext: 'To-do and Daily tasks',
    avatar: invoiceimg,
  },
  {
    href: '/apps/calendar',
    title: 'Calendar App',
    subtext: 'Get dates',
    avatar: dateimg,
  },
  {
    href: '/apps/contacts',
    title: 'Contact Application',
    subtext: '2 Unsaved Contacts',
    avatar: mobileimg,
  },
  {
    href: '/apps/tickets',
    title: 'Tickets App',
    subtext: 'Submit tickets',
    avatar: lifeimg,
  },
  {
    href: '/apps/email',
    title: 'Email App',
    subtext: 'Get new emails',
    avatar: messageimg,
  },
  {
    href: '/apps/blog/post',
    title: 'Blog App',
    subtext: 'added new blog',
    avatar: applicationimg,
  },
];

interface LinkType {
  href: string;
  title: string;
}

const pageLinks: LinkType[] = [
  {
    href: '/theme-pages/pricing',
    title: 'Pricing Page',
  },
  {
    href: '/auth/auth1/login',
    title: 'Authentication Design',
  },
  {
    href: '/auth/auth1/register',
    title: 'Register Now',
  },
  {
    href: '/404',
    title: '404 Error Page',
  },
  {
    href: '/apps/kanban',
    title: 'Kanban App',
  },
  {
    href: '/apps/user-profile/profile',
    title: 'User Application',
  },
  {
    href: '/apps/blog/post',
    title: 'Blog Design',
  },
  {
    href: '/apps/ecommerce/checkout',
    title: 'Shopping Cart',
  },
];

//   Search Data
interface SearchType {
  href: string;
  title: string;
}

const SearchLinks: SearchType[] = [
  {
    title: 'Modern',
    href: '/',
  },
  {
    title: 'eCommerce',
    href: '/dashboards/eCommerce',
  },
  {
    title: 'General',
    href: '/dashboards/general',
  },
  {
    title: 'Music',
    href: '/dashboards/music',
  },
  {
    title: 'General',
    href: '/dashboards/general',
  },
];

//   Message Data
interface MessageType {
  title: string;
  avatar: string;
  subtitle: string;
}

import avatar1 from 'src/assets/images/profile/user-2.jpg';
import avatar2 from 'src/assets/images/profile/user-3.jpg';
import avatar3 from 'src/assets/images/profile/user-4.jpg';
import avatar4 from 'src/assets/images/profile/user-5.jpg';
import avatar5 from 'src/assets/images/profile/user-6.jpg';

const MessagesLink: MessageType[] = [
  {
    avatar: avatar1,
    title: 'Roman Joined the Team!',
    subtitle: 'Congratulate him',
  },
  {
    avatar: avatar2,
    title: 'New message',
    subtitle: 'Salma sent you new message',
  },
  {
    avatar: avatar3,
    title: 'Bianca sent payment',
    subtitle: 'Check your earnings',
  },
  {
    avatar: avatar4,
    title: 'Jolly completed tasks',
    subtitle: 'Assign her new tasks',
  },
  {
    avatar: avatar5,
    title: 'John received payment',
    subtitle: '$230 deducted from account',
  },
];

//   Notification Data
interface NotificationType {
  title: string;
  icon: string;
  subtitle: string;
  bgcolor: string;
  color: string;
  time: string;
}

const Notification: NotificationType[] = [
  {
    icon: 'solar:widget-3-line-duotone',
    bgcolor: 'bg-lighterror dark:bg-lighterror',
    color: 'text-error',
    title: 'Launch Admin',
    subtitle: 'Just see the my new admin!',
    time: '9:30 AM',
  },
  {
    icon: 'solar:calendar-line-duotone',
    bgcolor: 'bg-lightprimary dark:bg-lightprimary',
    color: 'text-primary',
    title: 'Event Today',
    subtitle: 'Just a reminder that you have event',
    time: '9:15 AM',
  },
  {
    icon: 'solar:settings-line-duotone',
    bgcolor: 'bg-lightsecondary dark:bg-lightsecondary',
    color: 'text-secondary',
    title: 'Settings',
    subtitle: 'You can customize this template as you want',
    time: '4:36 PM',
  },
  {
    icon: 'solar:widget-4-line-duotone',
    bgcolor: 'bg-lightwarning dark:bg-lightwarning ',
    color: 'text-warning',
    title: 'Launch Admin',
    subtitle: 'Just see the my new admin!',
    time: '9:30 AM',
  },
  {
    icon: 'solar:calendar-line-duotone',
    bgcolor: 'bg-lightprimary dark:bg-lightprimary',
    color: 'text-primary',
    title: 'Event Today',
    subtitle: 'Just a reminder that you have event',
    time: '9:15 AM',
  },
  {
    icon: 'solar:settings-line-duotone',
    bgcolor: 'bg-lightsecondary dark:bg-lightsecondary',
    color: 'text-secondary',
    title: 'Settings',
    subtitle: 'You can customize this template as you want',
    time: '4:36 PM',
  },
];

//  Profile Data
interface ProfileType {
  title: string;
  img: string;
  subtitle: string;
  url: string;
}

import acccountIcon from 'src/assets/images/svgs/icon-account.svg';
import inboxIcon from 'src/assets/images/svgs/icon-inbox.svg';
import taskIcon from 'src/assets/images/svgs/icon-tasks.svg';

const profileDD: ProfileType[] = [
  {
    img: acccountIcon,
    title: 'My Profile',
    subtitle: 'Account settings',
    url: '/theme-pages/account-settings',
  },
  {
    img: inboxIcon,
    title: 'My Notes',
    subtitle: 'My Daily Notes',
    url: '/apps/notes',
  },
  {
    img: taskIcon,
    title: 'My Tasks',
    subtitle: 'To-do and Daily tasks',
    url: '/apps/kanban',
  },
];

export { appsLink, pageLinks, SearchLinks, MessagesLink, Notification, profileDD };
