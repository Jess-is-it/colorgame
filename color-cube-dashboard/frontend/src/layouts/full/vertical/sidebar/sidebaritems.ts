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
  id?: number;
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

const SidebarContent: MenuItem[] = [
  {
    heading: 'Home',
    children: [
      {
        name: 'Dashboard',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        url: '/',
      },
      {
        name: 'eCommerce',
        icon: 'solar:bag-5-linear',
        id: uniqueId(),
        url: '/dashboards/eCommerce',
      },
      {
        name: 'Music',
        icon: 'solar:music-note-linear',
        id: uniqueId(),
        url: '/dashboards/music',
      },
      {
        name: 'General',
        icon: 'solar:chart-linear',
        id: uniqueId(),
        url: '/dashboards/general',
      },
      {
        name: 'Front Pages',
        id: uniqueId(),
        icon: 'solar:document-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Homepage',
            url: '/frontend-pages/homepage',
          },
          {
            id: uniqueId(),
            name: 'About Us',
            url: '/frontend-pages/about',
          },
          {
            id: uniqueId(),
            name: 'Blog',
            url: '/frontend-pages/blog/post',
          },
          {
            id: uniqueId(),
            name: 'Blog Details',
            url: 'frontend-pages/blog/detail/as-yen-tumbles-gadget-loving-japan-goes-for-secondhand-iphones-',
          },

          {
            id: uniqueId(),
            name: 'Portfolio',
            url: '/frontend-pages/portfolio',
          },
          {
            id: uniqueId(),
            name: 'Pricing',
            url: '/frontend-pages/pricing',
          },
          {
            id: uniqueId(),
            name: 'Contact Us',
            url: '/frontend-pages/contact',
          },
        ],
      },
    ],
  },

  {
    heading: 'Apps',
    children: [
      {
        name: 'AI',
        icon: 'solar:star-circle-linear',
        id: uniqueId(),
        children: [
          {
            id: uniqueId(),
            name: 'Chat',
            url: '/apps/chat-ai',
            badge: true,
            badgeType: 'filled',
            badgeContent: 'New',
          },
          {
            id: uniqueId(),
            name: 'Image',
            url: '/apps/image-ai',
            badge: true,
            badgeType: 'filled',
            badgeContent: 'New',
          },
        ],
      },
      {
        id: uniqueId(),
        name: 'Calendar',
        icon: 'solar:calendar-linear',
        url: '/apps/calendar',
      },
      {
        id: uniqueId(),
        name: 'Kanban',
        icon: 'solar:server-minimalistic-linear',

        url: '/apps/kanban',
      },
      {
        id: uniqueId(),
        name: 'Chats',
        icon: 'solar:dialog-linear',
        url: '/apps/chats',
      },

      {
        id: uniqueId(),
        name: 'Email',
        icon: 'solar:letter-linear',

        url: '/apps/email',
      },

      {
        id: uniqueId(),
        name: 'Notes',
        icon: 'solar:notes-linear',

        url: '/apps/notes',
      },
      {
        id: uniqueId(),
        name: 'Contacts',
        icon: 'solar:users-group-rounded-linear',

        url: '/apps/contacts',
      },
      {
        id: uniqueId(),
        name: 'Tickets',
        icon: 'solar:ticker-star-linear',

        url: '/apps/tickets',
      },
      {
        name: 'Invoice',
        id: uniqueId(),
        icon: 'solar:bill-list-linear',

        children: [
          {
            id: uniqueId(),
            name: 'List',
            url: '/apps/invoice/list',
          },
          {
            id: uniqueId(),
            name: 'Details',
            url: '/apps/invoice/detail/PineappleInc',
          },
          {
            id: uniqueId(),
            name: 'Create',
            url: '/apps/invoice/create',
          },
          {
            id: uniqueId(),
            name: 'Edit',
            url: '/apps/invoice/edit/PineappleInc',
          },
        ],
      },
      {
        name: 'Users Profile',
        id: uniqueId(),
        icon: 'solar:user-circle-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Profile',
            url: '/apps/user-profile/profile',
          },
          {
            id: uniqueId(),
            name: 'Followers',
            url: '/apps/user-profile/followers',
          },
          {
            id: uniqueId(),
            name: 'Friends',
            url: '/apps/user-profile/friends',
          },
          {
            id: uniqueId(),
            name: 'Gallery',
            url: '/apps/user-profile/gallery',
          },
        ],
      },
      {
        name: 'Blogs',
        id: uniqueId(),
        icon: 'solar:sort-by-alphabet-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Blog Post',
            url: '/apps/blog/post',
          },
          {
            id: uniqueId(),
            name: 'Blog Detail',
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          {
            id: uniqueId(),
            name: 'Blog Create',
            url: '/apps/blog/addblog',
          },
          {
            id: uniqueId(),
            name: 'Blog Edit',
            url: '/apps/blog/editblog',
          },
          {
            id: uniqueId(),
            name: 'Manage Blog',
            url: '/apps/blog/manage-blog',
          },
        ],
      },
      {
        name: 'Ecommerce',
        id: uniqueId(),
        icon: 'solar:cart-large-2-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Shop',
            url: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            name: 'Details',
            url: '/apps/ecommerce/detail/3',
          },
          {
            id: uniqueId(),
            name: 'List',
            url: '/apps/ecommerce/list',
          },
          {
            id: uniqueId(),
            name: 'Checkout',
            url: '/apps/ecommerce/checkout',
          },
          {
            id: uniqueId(),
            name: 'Add Product',
            url: '/apps/ecommerce/addproduct',
          },
          {
            id: uniqueId(),
            name: 'Edit Product',
            url: '/apps/ecommerce/editproduct',
          },
        ],
      },
      {
        id: uniqueId(),
        icon: 'solar:bedside-table-2-linear',
        name: 'Customers',
        url: '/react-tables/user-table',
      },
      {
        id: uniqueId(),
        icon: 'solar:bedside-table-4-linear',
        name: 'Orders',
        url: '/react-tables/orders-table',
      },
    ],
  },
  {
    heading: 'UI ELEMENTS',
    children: [
      {
        name: "ShadCn",
        id: uniqueId(),
        icon: "solar:slash-square-linear",
        children: [
          {
            id: uniqueId(),
            name: "Avatar",
            url: "https://tailwind-admin.com/components/shadcn/avatar",
          },
          {
            id: uniqueId(),
            name: "Badge",
            url: "https://tailwind-admin.com/components/shadcn/badge",
          },
          {
            id: uniqueId(),
            name: "Tooltip",
            url: "https://tailwind-admin.com/components/shadcn/tooltip",
          },
          {
            id: uniqueId(),
            name: "Skeleton",
            url: "https://tailwind-admin.com/components/shadcn/skeleton",
          },
          {
            id: uniqueId(),
            name: "Alert",
            url: "https://tailwind-admin.com/components/shadcn/alert",
          },
          {
            id: uniqueId(),
            name: "Progressbar",
            url: "https://tailwind-admin.com/components/shadcn/progressbar",
          },
          {
            id: uniqueId(),
            name: "Breadcrumb",
            url: "https://tailwind-admin.com/components/shadcn/breadcrumb",
          },
          {
            id: uniqueId(),
            name: "Tab",
            url: "https://tailwind-admin.com/components/shadcn/tab",
          },
          {
            id: uniqueId(),
            name: "Dropdown",
            url: "https://tailwind-admin.com/components/shadcn/dropdown",
          },
          {
            id: uniqueId(),
            name: "Accordion",
            url: "https://tailwind-admin.com/components/shadcn/accordion",
          },
          {
            id: uniqueId(),
            name: "Card",
            url: "https://tailwind-admin.com/components/shadcn/card",
          },
          {
            id: uniqueId(),
            name: "Carousel",
            url: "https://tailwind-admin.com/components/shadcn/carousel",
          },
          {
            id: uniqueId(),
            name: "Collapsible",
            url: "https://tailwind-admin.com/components/shadcn/collapsible",
          },
          {
            id: uniqueId(),
            name: "Dialogs",
            url: "https://tailwind-admin.com/components/shadcn/dialogs",
          },
          {
            id: uniqueId(),
            name: "Drawer",
            url: "https://tailwind-admin.com/components/shadcn/drawer",
          },
          {
            id: uniqueId(),
            name: "Datepicker",
            url: "https://tailwind-admin.com/components/shadcn/datepicker",
          },
        ],
      },
      {
        name: "Animated Comp",
        id: uniqueId(),
        icon: "solar:reel-linear",
        children: [
          {
            id: uniqueId(),
            name: "Button",
            url: "https://tailwind-admin.com/animated-components/buttons",
          },
          {
            id: uniqueId(),
            name: "Card",
            url: "https://tailwind-admin.com/animated-components/cards",
          },
          {
            id: uniqueId(),
            name: "Text",
            url: "https://tailwind-admin.com/animated-components/text",
          },
          {
            id: uniqueId(),
            name: "Tables",
            url: "https://tailwind-admin.com/animated-components/tables",
          },
          {
            id: uniqueId(),
            name: "Tooltip",
            url: "https://tailwind-admin.com/animated-components/tooltip",
          },
          {
            id: uniqueId(),
            name: "Lists",
            url: "https://tailwind-admin.com/animated-components/lists",
          },
          {
            id: uniqueId(),
            name: "Links",
            url: "https://tailwind-admin.com/animated-components/links",
          },
          {
            id: uniqueId(),
            name: "Slider",
            url: "https://tailwind-admin.com/animated-components/slider",
          },
          {
            id: uniqueId(),
            name: "Forms",
            url: "https://tailwind-admin.com/animated-components/forms",
          },
        ],
      },
    ],
  },
  {
    heading: "FORM ELEMENTS",
    children: [
      {
        name: "Shadcn Forms",
        id: uniqueId(),
        icon: "solar:banknote-2-linear",
        children: [
          {
            id: uniqueId(),
            name: "Button",
            url: "https://tailwind-admin.com/components/shadcn/buttons",
          },
          {
            id: uniqueId(),
            name: "Input",
            url: "https://tailwind-admin.com/components/shadcn/input",
          },
          {
            id: uniqueId(),
            name: "Select",
            url: "https://tailwind-admin.com/components/shadcn/select",
          },
          {
            id: uniqueId(),
            name: "Checkbox",
            url: "https://tailwind-admin.com/components/shadcn/checkbox",
          },
          {
            id: uniqueId(),
            name: "Radio",
            url: "https://tailwind-admin.com/components/shadcn/radio",
          },
          {
            id: uniqueId(),
            name: "Combobox",
            url: "https://tailwind-admin.com/components/shadcn/combobox",
          },
          {
            id: uniqueId(),
            name: "Command",
            url: "https://tailwind-admin.com/components/shadcn/command",
          },
        ],
      },
      {
        name: "Form layouts",
        id: uniqueId(),
        icon: "solar:documents-linear",
        children: [
          {
            id: uniqueId(),
            name: "Forms Layouts",
            url: "/forms/form-layouts",
          },
          {
            id: uniqueId(),
            name: "Forms Horizontal",
            url: "/forms/form-horizontal",
          },
          {
            id: uniqueId(),
            name: "Forms Vertical",
            url: "/forms/form-vertical",
          },
          {
            id: uniqueId(),
            name: "Form Validation",
            url: "/forms/form-validation",
          },
          {
            id: uniqueId(),
            name: 'Form Examples',
            url: 'https://tailwind-admin.com/components/shadcn/generated-forms/form-examples',
          },
          {
            id: uniqueId(),
            name: 'Repeater Forms',
            url: 'https://tailwind-admin.com/components/shadcn/generated-forms/repeater-forms',
          },
          {
            id: uniqueId(),
            name: 'Form Wizard',
            url: 'https://tailwind-admin.com/components/shadcn/generated-forms/form-wizard',
          },
        ],
      },
      {
        name: "Form Addons",
        id: uniqueId(),
        icon: "solar:file-favourite-linear",
        children: [
          {
            id: uniqueId(),
            name: "Select2",
            url: "/forms/form-select2",
          },
          {
            id: uniqueId(),
            name: "Autocomplete",
            url: "/forms/form-autocomplete",
          },
          {
            id: uniqueId(),
            name: "Dropzone",
            url: "/forms/form-dropzone",
          },
        ],
      },
    ],
  },
  {
    heading: 'Widgets',
    children: [
      {
        name: "Cards",
        id: uniqueId(),
        icon: "solar:card-linear",
        children: [
          {
            id: uniqueId(),
            name: "Top Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#topCards",
          },
          {
            id: uniqueId(),
            name: "Best Selling Product Card",
            url: "https://tailwind-admin.com/ui-blocks/card#bestsellingproduct",
          },
          {
            id: uniqueId(),
            name: "Payment Gatways Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#paymentgateway",
          },
          {
            id: uniqueId(),
            name: "Blog Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#blogcards",
          },
          {
            id: uniqueId(),
            name: "Products Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#productscards",
          },
          {
            id: uniqueId(),
            name: "Music Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#musiccards",
          },
          {
            id: uniqueId(),
            name: "Profile Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#profilecards",
          },
          {
            id: uniqueId(),
            name: "User Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#usercards",
          },
          {
            id: uniqueId(),
            name: "Social Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#socialcards",
          },
          {
            id: uniqueId(),
            name: "Settings Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#settingscard",
          },
          {
            id: uniqueId(),
            name: "Gift Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#giftcards",
          },
          {
            id: uniqueId(),
            name: "Upcomming Activity Cards",
            url: "https://tailwind-admin.com/ui-blocks/card#upcommingactcard",
          },
          {
            id: uniqueId(),
            name: "Recent Transaction Card",
            url: "https://tailwind-admin.com/ui-blocks/card#recenttransactioncard",
          },
          {
            id: uniqueId(),
            name: "Recent Comment Card",
            url: "https://tailwind-admin.com/ui-blocks/card#recentcommentcard",
          },
          {
            id: uniqueId(),
            name: "Task List",
            url: "https://tailwind-admin.com/ui-blocks/card#tasklist",
          },
          {
            id: uniqueId(),
            name: "Recent Messages",
            url: "https://tailwind-admin.com/ui-blocks/card#recentmessages",
          },
          {
            id: uniqueId(),
            name: "User info Card",
            url: "https://tailwind-admin.com/ui-blocks/card#userinfocard",
          },
          {
            id: uniqueId(),
            name: "Social Card",
            url: "https://tailwind-admin.com/ui-blocks/card#socialcard",
          },
          {
            id: uniqueId(),
            name: "Feed Card",
            url: "https://tailwind-admin.com/ui-blocks/card#feedcard",
          },
          {
            id: uniqueId(),
            name: "Poll of Week Card",
            url: "https://tailwind-admin.com/ui-blocks/card#pollofweekcard",
          },
          {
            id: uniqueId(),
            name: "Result of Poll",
            url: "https://tailwind-admin.com/ui-blocks/card#resultofpoll",
          },
          {
            id: uniqueId(),
            name: "Social Post Card",
            url: "https://tailwind-admin.com/ui-blocks/card#socialpostcard",
          },
        ],
      },
      {
        name: "Banners",
        id: uniqueId(),
        icon: "solar:object-scan-linear",
        children: [
          {
            id: uniqueId(),
            name: "Greeting Banner",
            url: "https://tailwind-admin.com/ui-blocks/banner#greetingbanner",
          },
          {
            id: uniqueId(),
            name: "Download Banner",
            url: "https://tailwind-admin.com/ui-blocks/banner#downloadbanner",
          },
          {
            id: uniqueId(),
            name: "Empty Cart Banner",
            url: "https://tailwind-admin.com/ui-blocks/banner#emptybanner",
          },
          {
            id: uniqueId(),
            name: "Error Banner",
            url: "https://tailwind-admin.com/ui-blocks/banner#errorbanner",
          },
          {
            id: uniqueId(),
            name: "Notifications Banner",
            url: "https://tailwind-admin.com/ui-blocks/banner#notificationsbanner",
          },
          {
            id: uniqueId(),
            name: "Greeting Banner 2",
            url: "https://tailwind-admin.com/ui-blocks/banner#greetingbanner2",
          },
        ],
      },
      {
        name: "Charts",
        id: uniqueId(),
        icon: "solar:pie-chart-2-linear",
        children: [
          {
            id: uniqueId(),
            name: "Revenue Updates Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#revenueupdateschart",
          },
          {
            id: uniqueId(),
            name: "Yarly Breakup Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#yarlybreakupchart",
          },
          {
            id: uniqueId(),
            name: "Monthly Earning Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#monthlyearning",
          },
          {
            id: uniqueId(),
            name: "Yarly Sales Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#yearlysaleschart",
          },
          {
            id: uniqueId(),
            name: "Current Year Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#currentyear",
          },
          {
            id: uniqueId(),
            name: "Weekly Stats Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#weeklystatschart",
          },
          {
            id: uniqueId(),
            name: "Expance Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#expancechart",
          },
          {
            id: uniqueId(),
            name: "Customers Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#customerschart",
          },
          {
            id: uniqueId(),
            name: "Earned Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#revenuechart",
          },
          {
            id: uniqueId(),
            name: "Follower Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#followerchart",
          },
          {
            id: uniqueId(),
            name: "Visit Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#visitchart",
          },
          {
            id: uniqueId(),
            name: "Income Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#incomechart",
          },
          {
            id: uniqueId(),
            name: "Impressions Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#impressionschart",
          },
          {
            id: uniqueId(),
            name: "Sales Overviewchart",
            url: "https://tailwind-admin.com/ui-blocks/chart#salesoverviewchart",
          },
          {
            id: uniqueId(),
            name: "Total Earnings Chart",
            url: "https://tailwind-admin.com/ui-blocks/chart#totalearningschart",
          },
        ],
      },
    ],
  },
  {
    heading: 'TABLES',
    children: [
      {
        name: 'Shadcn Tables',
        id: uniqueId(),
        icon: 'solar:tablet-linear',
        children: [
          {
            name: 'Basic Table',
            id: uniqueId(),
            url: '/shadcn-tables/basic',
          },
          {
            name: 'Striped Row Table',
            id: uniqueId(),
            url: '/shadcn-tables/striped-row',
          }, {
            name: 'Hover Table',
            id: uniqueId(),
            url: '/shadcn-tables/hover',
          },
          {
            name: 'Checkbox Table',
            id: uniqueId(),
            url: '/shadcn-tables/checkbox',
          },
        ],
      },
      {
        name: 'Tanstack / React Table',
        id: uniqueId(),
        icon: 'solar:bedside-table-3-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Basic',
            url: '/react-tables/basic',
          },
          {
            id: uniqueId(),
            name: 'Dense',
            url: '/react-tables/dense',
          },
          {
            id: uniqueId(),
            name: 'Sorting',
            url: '/react-tables/sorting',
          },
          {
            id: uniqueId(),
            name: 'Filtering',
            url: '/react-tables/filtering',
          },
          {
            id: uniqueId(),
            name: 'Pagination',
            url: '/react-tables/pagination',
          },
          {
            id: uniqueId(),
            name: 'Row Selection',
            url: '/react-tables/row-selection',
          },
          {
            id: uniqueId(),
            name: 'Column Visibility',
            url: '/react-tables/columnvisibility',
          },
          {
            id: uniqueId(),
            name: 'Editable',
            url: '/react-tables/editable',
          },
          {
            id: uniqueId(),
            name: 'Sticky',
            url: '/react-tables/sticky',
          },
          {
            id: uniqueId(),
            name: 'Drag & Drop',
            url: '/react-tables/drag-drop',
          },
          {
            id: uniqueId(),
            name: 'Empty',
            url: '/react-tables/empty',
          },
          {
            id: uniqueId(),
            name: 'Expanding',
            url: '/react-tables/expanding',
          },
        ],
      },
    ],
  },
  {
    heading: 'Charts',
    children: [
      {
        name: 'ApexCharts',
        id: uniqueId(),
        icon: 'solar:pie-chart-3-linear',
        children: [
          {
            name: 'Line Chart',
            id: uniqueId(),
            url: '/charts/apex-charts/line',
          },
          {
            name: 'Area Chart',
            id: uniqueId(),
            url: '/charts/apex-charts/area',
          },
          {
            name: 'Gradient Chart',
            id: uniqueId(),
            url: '/charts/apex-charts/gradient',
          },
          {
            name: 'Candlestick',
            id: uniqueId(),
            url: '/charts/apex-charts/candlestick',
          },
          {
            name: 'Column',
            id: uniqueId(),
            url: '/charts/apex-charts/column',
          },
          {
            name: 'Doughnut & Pie',
            id: uniqueId(),
            url: '/charts/apex-charts/doughnut',
          },
          {
            name: 'Radialbar & Radar',
            id: uniqueId(),
            url: '/charts/apex-charts/radialbar',
          },
        ],
      },
      {
        name: 'Shadcn Charts',
        id: uniqueId(),
        icon: 'solar:chart-2-linear',
        children: [
          {
            name: 'Line Chart',
            id: uniqueId(),
            url: '/charts/shadcn/line',
          },
          {
            name: 'Area Chart',
            id: uniqueId(),
            url: '/charts/shadcn/area',
          },
          {
            name: 'Radar Chart',
            id: uniqueId(),
            url: '/charts/shadcn/radar',
          },
          {
            name: 'Bar Chart',
            id: uniqueId(),
            url: '/charts/shadcn/bar',
          },
          {
            name: 'Pie Chart',
            id: uniqueId(),
            url: '/charts/shadcn/pie',
          },
          {
            name: 'Radial Chart',
            id: uniqueId(),
            url: '/charts/shadcn/radial',
          },
        ],
      },
    ],
  },
  {
    heading: 'Pages',
    children: [
      {
        name: 'Account Setting',
        icon: 'solar:settings-minimalistic-linear',
        id: uniqueId(),
        url: '/theme-pages/account-settings',
      },
      {
        name: 'FAQ',
        icon: 'solar:question-circle-linear',
        id: uniqueId(),
        url: '/theme-pages/faq',
      },
      {
        name: 'Pricing',
        icon: 'solar:tag-price-linear',
        id: uniqueId(),
        url: '/theme-pages/pricing',
      },
      {
        name: 'Landingpage',
        icon: 'solar:three-squares-linear',
        id: uniqueId(),
        url: '/landingpage',
      },
      {
        name: 'Roll Base Access',
        icon: 'solar:accessibility-linear',
        id: uniqueId(),
        url: '/theme-pages/casl',
      },
      {
        id: uniqueId(),
        name: 'Integrations',
        icon: 'solar:home-add-linear',
        url: '/theme-pages/integration',
        badge: true,
        badgeType: 'filled',
        badgeContent: 'New',
      },
      {
        id: uniqueId(),
        name: 'API Keys',
        icon: 'solar:key-linear',
        url: '/theme-pages/apikey',
        badge: true,
        badgeType: 'filled',
        badgeContent: 'New',
      },
    ],
  },
  {
    heading: 'Icons',
    children: [
      {
        id: uniqueId(),
        name: 'Iconify Icons',
        icon: 'solar:smile-circle-linear',
        url: '/icons/iconify',
      },
    ],
  },
  {
    heading: 'Auth',
    children: [
      {
        name: 'Login',
        id: uniqueId(),
        icon: 'solar:login-2-linear',
        children: [
          {
            id: uniqueId(),
            name: 'Side Login',
            url: '/auth/auth1/login',
          },
          {
            id: uniqueId(),
            name: 'Boxed Login',
            url: '/auth/auth2/login',
          },
        ],
      },
      {
        name: 'Register',
        id: uniqueId(),
        icon: 'solar:user-plus-rounded-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Side Register',
            url: '/auth/auth1/register',
          },
          {
            id: uniqueId(),
            name: 'Boxed Register',
            url: '/auth/auth2/register',
          },
        ],
      },
      {
        name: 'Forgot Password',
        id: uniqueId(),
        icon: 'solar:password-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Side Forgot Pwd',
            url: '/auth/auth1/forgot-password',
          },
          {
            id: uniqueId(),
            name: 'Boxed Forgot Pwd',
            url: '/auth/auth2/forgot-password',
          },
        ],
      },
      {
        name: 'Two Steps',
        id: uniqueId(),
        icon: 'solar:shield-keyhole-minimalistic-linear',

        children: [
          {
            id: uniqueId(),
            name: 'Side Two Steps',
            url: '/auth/auth1/two-steps',
          },
          {
            id: uniqueId(),
            name: 'Boxed Two Steps',
            url: '/auth/auth2/two-steps',
          },
        ],
      },
      {
        id: uniqueId(),
        name: 'Error',
        icon: 'solar:link-broken-minimalistic-linear',

        url: '/auth/error',
      },
      {
        id: uniqueId(),
        name: 'Maintenance',
        icon: 'solar:settings-linear',

        url: '/auth/maintenance',
      },
    ],
  },
];

export default SidebarContent;
