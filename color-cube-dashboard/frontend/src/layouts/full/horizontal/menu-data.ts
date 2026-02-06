import { uniqueId } from 'lodash';




export interface MenuItem {
  id: string;
  title: string;
  icon?: string;
  href: string;
  column?: number;

  // optional states
  disabled?: boolean;
  subtitle?: string;

  // badge support
  badge?: boolean;
  badgeType?: "filled" | "outlined";

  // recursive children
  children?: MenuItem[];
}



const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: 'solar:home-linear',
    href: '',
    children: [
      {
        title: 'Modern',
        icon: 'solar:widget-2-linear',
        id: uniqueId(),
        href: '/',
      },
      {
        title: 'eCommerce',
        icon: 'solar:bag-5-linear',
        id: uniqueId(),
        href: '/dashboards/eCommerce',
      },
      {
        title: 'Music',
        icon: 'solar:music-note-linear',
        id: uniqueId(),
        href: '/dashboards/music',
      },
      {
        title: 'General',
        icon: 'solar:chart-linear',
        id: uniqueId(),
        href: '/dashboards/general',
      },
      {
        id: uniqueId(),
        title: 'Front Pages',
        icon: 'solar:document-linear',
        href: '',
        children: [
          {
            title: 'Homepage',
            id: uniqueId(),
            href: '/frontend-pages/homepage',
          },
          {
            title: 'About Us',
            id: uniqueId(),
            href: '/frontend-pages/about',
          },
          {
            title: 'Blog',
            id: uniqueId(),
            href: '/frontend-pages/blog/post',
          },
          {
            title: 'Blog Details',
            id: uniqueId(),
            href: '/frontend-pages/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          {
            title: 'Contact Us',
            id: uniqueId(),
            href: '/frontend-pages/contact',
          },
          {
            title: 'Portfolio',
            id: uniqueId(),
            href: '/frontend-pages/portfolio',
          },
          {
            title: 'Pricing',
            id: uniqueId(),
            href: '/frontend-pages/pricing',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Apps',
    icon: 'solar:archive-down-linear',
    href: '',
    children: [
      {
        id: uniqueId(),
        title: 'AI',
        icon: 'solar:star-circle-linear',
        href: '',
        children: [
          {
            title: 'Chat',
            id: uniqueId(),
            href: '/apps/chat-ai',
          },
          {
            title: 'Image',
            id: uniqueId(),
            href: '/apps/image-ai',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Calendar',
        icon: 'solar:calendar-linear',
        href: '/apps/calendar',
      },
      {
        id: uniqueId(),
        title: 'Kanban',
        icon: 'solar:server-minimalistic-linear',
        href: '/apps/kanban',
      },
      {
        id: uniqueId(),
        title: 'Chats',
        icon: 'solar:dialog-linear',
        href: '/apps/chats',
      },

      {
        id: uniqueId(),
        title: 'Email',
        icon: 'solar:letter-linear',
        href: '/apps/email',
      },

      {
        id: uniqueId(),
        title: 'Notes',
        icon: 'solar:notes-linear',
        href: '/apps/notes',
      },
      {
        id: uniqueId(),
        title: 'Contacts',
        icon: 'solar:users-group-rounded-linear',
        href: '/apps/contacts',
      },
      {
        title: 'Invoice',
        id: uniqueId(),
        icon: 'solar:bill-list-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'List',
            href: '/apps/invoice/list',
          },
          {
            id: uniqueId(),
            title: 'Details',
            href: '/apps/invoice/detail/PineappleInc',
          },
          {
            id: uniqueId(),
            title: 'Create',
            href: '/apps/invoice/create',
          },
          {
            id: uniqueId(),
            title: 'Edit',
            href: '/apps/invoice/edit/PineappleInc',
          },
        ],
      },
      {
        title: 'User Profile',
        id: uniqueId(),
        icon: 'solar:user-circle-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Profile',
            href: '/apps/user-profile/profile',
          },
          {
            id: uniqueId(),
            title: 'Followers',
            href: '/apps/user-profile/followers',
          },
          {
            id: uniqueId(),
            title: 'Friends',
            href: '/apps/user-profile/friends',
          },
          {
            id: uniqueId(),
            title: 'Gallery',
            href: '/apps/user-profile/gallery',
          },
        ],
      },
      {
        title: 'Blogs',
        id: uniqueId(),
        icon: 'solar:sort-by-alphabet-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Blog Post',
            href: '/apps/blog/post',
          },
          {
            id: uniqueId(),
            title: 'Blog Detail',
            href: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
        ],
      },
      {
        title: 'Ecommerce',
        id: uniqueId(),
        icon: 'solar:cart-large-2-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Shop',
            href: '/apps/ecommerce/shop',
          },
          {
            id: uniqueId(),
            title: 'Details',
            href: '/apps/ecommerce/detail/3',
          },
          {
            id: uniqueId(),
            title: 'List',
            href: '/apps/ecommerce/list',
          },
          {
            id: uniqueId(),
            title: 'Checkout',
            href: '/apps/ecommerce/checkout',
          },
          {
            id: uniqueId(),
            title: 'Add Product',
            href: '/apps/ecommerce/addproduct',
          },
          {
            id: uniqueId(),
            title: 'Edit Product',
            href: '/apps/ecommerce/editproduct',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Tickets',
        icon: 'solar:ticker-star-linear',
        href: '/apps/tickets',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Ui Elements',
    icon: 'solar:widget-linear',
    href: '',
    children: [
      {
        id: uniqueId(),
        title: 'ShadCn',
        icon: 'solar:slash-square-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Avatar',
            href: 'https://tailwind-admin.com/components/shadcn/avatar',
          },
          {
            id: uniqueId(),
            title: 'Badge',
            href: 'https://tailwind-admin.com/components/shadcn/badge',
          },
          {
            id: uniqueId(),
            title: 'Tooltip',
            href: 'https://tailwind-admin.com/components/shadcn/tooltip',
          },
          {
            id: uniqueId(),
            title: 'Skeleton',
            href: 'https://tailwind-admin.com/components/shadcn/skeleton',
          },
          {
            id: uniqueId(),
            title: 'Alert',
            href: 'https://tailwind-admin.com/components/shadcn/alert',
          },
          {
            id: uniqueId(),
            title: 'Progressbar',
            href: 'https://tailwind-admin.com/components/shadcn/progressbar',
          },
          {
            id: uniqueId(),
            title: 'Breadcrumb',
            href: 'https://tailwind-admin.com/components/shadcn/breadcrumb',
          },
          {
            id: uniqueId(),
            title: 'Tab',
            href: 'https://tailwind-admin.com/components/shadcn/tab',
          },
          {
            id: uniqueId(),
            title: 'Dropdown',
            href: 'https://tailwind-admin.com/components/shadcn/dropdown',
          },
          {
            id: uniqueId(),
            title: 'Accordion',
            href: 'https://tailwind-admin.com/components/shadcn/accordion',
          },
          {
            id: uniqueId(),
            title: 'Card',
            href: 'https://tailwind-admin.com/components/shadcn/card',
          },
          {
            id: uniqueId(),
            title: 'Carousel',
            href: 'https://tailwind-admin.com/components/shadcn/carousel',
          },
          {
            id: uniqueId(),
            title: 'Collapsible',
            href: 'https://tailwind-admin.com/components/shadcn/collapsible',
          },
          {
            id: uniqueId(),
            title: 'Dialogs',
            href: 'https://tailwind-admin.com/components/shadcn/dialogs',
          },
          {
            id: uniqueId(),
            title: 'Drawer',
            href: 'https://tailwind-admin.com/components/shadcn/drawer',
          },
          {
            id: uniqueId(),
            title: 'Datepicker',
            href: 'https://tailwind-admin.com/components/shadcn/datepicker',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Animated Comp',
        icon: 'solar:reel-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Button',
            href: 'https://tailwind-admin.com/animated-components/buttons',
          },
          {
            id: uniqueId(),
            title: 'Card',
            href: 'https://tailwind-admin.com/animated-components/cards',
          },
          {
            id: uniqueId(),
            title: 'Text',
            href: 'https://tailwind-admin.com/animated-components/text',
          },
          {
            id: uniqueId(),
            title: 'Tables',
            href: 'https://tailwind-admin.com/animated-components/tables',
          },
          {
            id: uniqueId(),
            title: 'Tooltip',
            href: 'https://tailwind-admin.com/animated-components/tooltip',
          },
          {
            id: uniqueId(),
            title: 'Lists',
            href: 'https://tailwind-admin.com/animated-components/lists',
          },
          {
            id: uniqueId(),
            title: 'Links',
            href: 'https://tailwind-admin.com/animated-components/links',
          },
          {
            id: uniqueId(),
            title: 'Slider',
            href: 'https://tailwind-admin.com/animated-components/slider',
          },
          {
            id: uniqueId(),
            title: 'Forms',
            href: 'https://tailwind-admin.com/animated-components/forms',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Widgets',
    icon: 'solar:widget-4-linear',
    href: '',
    children: [
      {
        title: 'Cards',
        id: uniqueId(),
        icon: 'solar:card-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Top Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#topCards',
          },
          {
            id: uniqueId(),
            title: 'Best Selling Product Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#bestsellingproduct',
          },
          {
            id: uniqueId(),
            title: 'Payment Gatways Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#paymentgateway',
          },
          {
            id: uniqueId(),
            title: 'Blog Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#blogcards',
          },
          {
            id: uniqueId(),
            title: 'Products Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#productscards',
          },
          {
            id: uniqueId(),
            title: 'Music Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#musiccards',
          },
          {
            id: uniqueId(),
            title: 'Profile Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#profilecards',
          },
          {
            id: uniqueId(),
            title: 'User Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#usercards',
          },
          {
            id: uniqueId(),
            title: 'Social Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#socialcards',
          },
          {
            id: uniqueId(),
            title: 'Settings Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#settingscard',
          },
          {
            id: uniqueId(),
            title: 'Gift Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#giftcards',
          },
          {
            id: uniqueId(),
            title: 'Upcomming Activity Cards',
            href: 'https://tailwind-admin.com/ui-blocks/card#upcommingactcard',
          },
          {
            id: uniqueId(),
            title: 'Recent Transaction Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#recenttransactioncard',
          },
          {
            id: uniqueId(),
            title: 'Recent Comment Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#recentcommentcard',
          },
          {
            id: uniqueId(),
            title: 'Task List',
            href: 'https://tailwind-admin.com/ui-blocks/card#tasklist',
          },
          {
            id: uniqueId(),
            title: 'Recent Messages',
            href: 'https://tailwind-admin.com/ui-blocks/card#recentmessages',
          },
          {
            id: uniqueId(),
            title: 'User info Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#userinfocard',
          },
          {
            id: uniqueId(),
            title: 'Social Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#socialcard',
          },
          {
            id: uniqueId(),
            title: 'Feed Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#feedcard',
          },
          {
            id: uniqueId(),
            title: 'Poll of Week Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#pollofweekcard',
          },
          {
            id: uniqueId(),
            title: 'Result of Poll',
            href: 'https://tailwind-admin.com/ui-blocks/card#resultofpoll',
          },
          {
            id: uniqueId(),
            title: 'Social Post Card',
            href: 'https://tailwind-admin.com/ui-blocks/card#socialpostcard',
          },
        ],
      },
      {
        title: 'Banners',
        id: uniqueId(),
        icon: 'solar:object-scan-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Greeting Banner',
            href: 'https://tailwind-admin.com/ui-blocks/banner#greetingbanner',
          },
          {
            id: uniqueId(),
            title: 'Download Banner',
            href: 'https://tailwind-admin.com/ui-blocks/banner#downloadbanner',
          },
          {
            id: uniqueId(),
            title: 'Empty Cart Banner',
            href: 'https://tailwind-admin.com/ui-blocks/banner#emptybanner',
          },
          {
            id: uniqueId(),
            title: 'Error Banner',
            href: 'https://tailwind-admin.com/ui-blocks/banner#errorbanner',
          },
          {
            id: uniqueId(),
            title: 'Notifications Banner',
            href: 'https://tailwind-admin.com/ui-blocks/banner#notificationsbanner',
          },
          {
            id: uniqueId(),
            title: 'Greeting Banner 2',
            href: 'https://tailwind-admin.com/ui-blocks/banner#greetingbanner2',
          },
        ],
      },
      {
        title: 'Charts',
        id: uniqueId(),
        icon: 'solar:pie-chart-2-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Revenue Updates Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#revenueupdateschart',
          },
          {
            id: uniqueId(),
            title: 'Yarly Breakup Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#yarlybreakupchart',
          },
          {
            id: uniqueId(),
            title: 'Monthly Earning Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#monthlyearning',
          },
          {
            id: uniqueId(),
            title: 'Yarly Sales Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#yearlysaleschart',
          },
          {
            id: uniqueId(),
            title: 'Current Year Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#currentyear',
          },
          {
            id: uniqueId(),
            title: 'Weekly Stats Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#weeklystatschart',
          },
          {
            id: uniqueId(),
            title: 'Expance Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#expancechart',
          },
          {
            id: uniqueId(),
            title: 'Customers Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#customerschart',
          },
          {
            id: uniqueId(),
            title: 'Earned Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#revenuechart',
          },
          {
            id: uniqueId(),
            title: 'Follower Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#followerchart',
          },
          {
            id: uniqueId(),
            title: 'Visit Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#visitchart',
          },
          {
            id: uniqueId(),
            title: 'Income Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#incomechart',
          },
          {
            id: uniqueId(),
            title: 'Impressions Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#impressionschart',
          },
          {
            id: uniqueId(),
            title: 'Sales Overviewchart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#salesoverviewchart',
          },
          {
            id: uniqueId(),
            title: 'Total Earnings Chart',
            href: 'https://tailwind-admin.com/ui-blocks/chart#totalearningschart',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Pages',
    icon: 'solar:book-linear',
    href: '',
    children: [
      {
        title: 'Account Setting',
        icon: 'solar:settings-minimalistic-linear',
        id: uniqueId(),
        href: '/theme-pages/account-settings',
      },
      {
        title: 'FAQ',
        icon: 'solar:question-circle-linear',
        id: uniqueId(),
        href: '/theme-pages/faq',
      },
      {
        title: 'Pricing',
        icon: 'solar:tag-price-linear',
        id: uniqueId(),
        href: '/theme-pages/pricing',
      },
      {
        title: 'Landingpage',
        icon: 'solar:three-squares-linear',
        id: uniqueId(),
        href: '/landingpage',
      },
      {
        title: 'Roll Base Access',
        icon: 'solar:accessibility-linear',
        id: uniqueId(),
        href: '/theme-pages/casl',
      },
      {
        title: 'Integrations',
        id: uniqueId(),
        icon: 'solar:home-add-linear',
        href: '/theme-pages/integration',
      },
      {
        id: uniqueId(),
        title: 'API Keys',
        icon: 'solar:key-linear',
        href: '/theme-pages/apikey',
      },
      {
        id: uniqueId(),
        title: 'Auth',
        icon: 'solar:shield-keyhole-linear',
        href: '/400',
        children: [
          {
            id: uniqueId(),
            title: 'Error',
            icon: 'solar:link-broken-minimalistic-linear',
            href: '/auth/error',
          },
          {
            title: 'Login',
            id: uniqueId(),
            icon: 'solar:login-linear',
            href: '/auth/auth1/login',
            children: [
              {
                id: uniqueId(),
                title: 'Side Login',
                href: '/auth/auth1/login',
              },
              {
                id: uniqueId(),
                title: 'Boxed Login',
                href: '/auth/auth2/login',
              },
            ],
          },
          {
            title: 'Register',
            id: uniqueId(),
            icon: 'solar:user-plus-linear',
            href: '/auth/auth1/register',
            children: [
              {
                id: uniqueId(),
                title: 'Side Register',
                href: '/auth/auth1/register',
              },
              {
                id: uniqueId(),
                title: 'Boxed Register',
                href: '/auth/auth2/register',
              },
            ],
          },
          {
            title: 'Forgot Password',
            id: uniqueId(),
            icon: 'solar:restart-linear',
            href: '/auth/auth1/forgot-password',
            children: [
              {
                id: uniqueId(),
                title: 'Side Forgot Pwd',
                href: '/auth/auth1/forgot-password',
              },
              {
                id: uniqueId(),
                title: 'Boxed Forgot Pwd',
                href: '/auth/auth2/forgot-password',
              },
            ],
          },
          {
            title: 'Two Steps',
            id: uniqueId(),
            icon: 'solar:shield-star-linear',
            href: '/auth/auth1/two-steps',
            children: [
              {
                id: uniqueId(),
                title: 'Side Two Steps',
                href: '/auth/auth1/two-steps',
              },
              {
                id: uniqueId(),
                title: 'Boxed Two Steps',
                href: '/auth/auth2/two-steps',
              },
            ],
          },
          {
            id: uniqueId(),
            title: 'Maintenance',
            href: '/auth/maintenance',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Iconify Icons',
        icon: 'solar:structure-linear',
        href: '/icons/iconify',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Forms',
    icon: 'solar:documents-linear',
    href: '',
    children: [
      {
        title: 'Shadcn Forms',
        id: uniqueId(),
        icon: 'solar:banknote-2-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Button',
            href: 'https://tailwind-admin.com/components/shadcn/buttons',
          },
          {
            id: uniqueId(),
            title: 'Input',
            href: 'https://tailwind-admin.com/components/shadcn/input',
          },
          {
            id: uniqueId(),
            title: 'Select',
            href: 'https://tailwind-admin.com/components/shadcn/select',
          },
          {
            id: uniqueId(),
            title: 'Checkbox',
            href: 'https://tailwind-admin.com/components/shadcn/checkbox',
          },
          {
            id: uniqueId(),
            title: 'Radio',
            href: 'https://tailwind-admin.com/components/shadcn/radio',
          },
          {
            id: uniqueId(),
            title: 'Combobox',
            href: 'https://tailwind-admin.com/components/shadcn/combobox',
          },
          {
            id: uniqueId(),
            title: 'Command',
            href: 'https://tailwind-admin.com/components/shadcn/command',
          },
        ],
      },
      {
        title: 'Form layouts',
        id: uniqueId(),
        icon: 'solar:documents-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Forms Layouts',
            href: '/forms/form-layouts',
          },
          {
            id: uniqueId(),
            title: 'Forms Horizontal',
            href: '/forms/form-horizontal',
          },
          {
            id: uniqueId(),
            title: 'Forms Vertical',
            href: '/forms/form-vertical',
          },
          {
            id: uniqueId(),
            title: 'Form Validation',
            href: '/forms/form-validation',
          },
          {
            id: uniqueId(),
            title: 'Form Examples',
            href: 'https://tailwind-admin.com/components/shadcn/generated-forms/form-examples',
          },
          {
            id: uniqueId(),
            title: 'Repeater Forms',
            href: 'https://tailwind-admin.com/components/shadcn/generated-forms/repeater-forms',
          },
          {
            id: uniqueId(),
            title: 'Form Wizard',
            href: 'https://tailwind-admin.com/components/shadcn/generated-forms/form-wizard',
          },
        ],
      },
      {
        title: 'Form Addons',
        id: uniqueId(),
        icon: 'solar:file-favourite-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Select2',
            href: '/forms/form-select2',
          },
          {
            id: uniqueId(),
            title: 'Autocomplete',
            href: '/forms/form-autocomplete',
          },
          {
            id: uniqueId(),
            title: 'Dropzone',
            href: '/forms/form-dropzone',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Charts',
    icon: 'solar:pie-chart-2-linear',
    href: '/charts/',
    children: [
      {
        title: 'ApexCharts',
        id: uniqueId(),
        icon: 'solar:pie-chart-3-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Line Chart',
            href: '/charts/apex-charts/line',
          },
          {
            id: uniqueId(),
            title: 'Area Chart',
            href: '/charts/apex-charts/area',
          },
          {
            id: uniqueId(),
            title: 'Gradient Chart',
            href: '/charts/apex-charts/gradient',
          },
          {
            id: uniqueId(),
            title: 'Candlestick',
            href: '/charts/apex-charts/candlestick',
          },
          {
            id: uniqueId(),
            title: 'Column',
            href: '/charts/apex-charts/column',
          },
          {
            id: uniqueId(),
            title: 'Doughnut & Pie',
            href: '/charts/apex-charts/doughnut',
          },
          {
            id: uniqueId(),
            title: 'Radialbar & Radar',
            href: '/charts/apex-charts/radialbar',
          },
        ],
      },
      {
        title: 'Shadcn Charts',
        id: uniqueId(),
        icon: 'solar:chart-2-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Line Chart',
            href: '/charts/shadcn/line',
          },
          {
            id: uniqueId(),
            title: 'Area Chart',
            href: '/charts/shadcn/area',
          },
          // {
          //   id: uniqueId(),
          //   title: "Gradient Chart",
          //   href: "/charts/apex-charts/gradient",
          // },
          {
            id: uniqueId(),
            title: 'Radar',
            href: '/charts/shadcn/radar',
          },
          {
            id: uniqueId(),
            title: 'Bar',
            href: '/charts/shadcn/bar',
          },
          {
            id: uniqueId(),
            title: 'Doughnut & Pie',
            href: '/charts/shadcn/pie',
          },
          {
            id: uniqueId(),
            title: 'Radialbar & Radar',
            href: '/charts/shadcn/radial',
          },
        ],
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Tables',
    icon: 'solar:sidebar-minimalistic-linear',
    href: '',
    children: [
      {
        id: uniqueId(),
        title: 'Shadcn Tables',
        icon: 'solar:tablet-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Basic Table',
            href: '/shadcn-tables/basic',
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Tanstack / React Table',
        icon: 'solar:record-linear',
        href: '',
        children: [
          {
            id: uniqueId(),
            title: 'Basic',
            href: '/react-tables/basic',
          },
          {
            id: uniqueId(),
            title: 'Dense',
            href: '/react-tables/dense',
          },
          {
            id: uniqueId(),
            title: 'Sorting',
            href: '/react-tables/sorting',
          },
          {
            id: uniqueId(),
            title: 'Filtering',
            href: '/react-tables/filtering',
          },
          {
            id: uniqueId(),
            title: 'Pagination',
            href: '/react-tables/pagination',
          },
          {
            id: uniqueId(),
            title: 'Row Selection',
            href: '/react-tables/row-selection',
          },
          {
            id: uniqueId(),
            title: 'Column Visibility',
            href: '/react-tables/columnvisibility',
          },
          {
            id: uniqueId(),
            title: 'Editable',
            href: '/react-tables/editable',
          },
          {
            id: uniqueId(),
            title: 'Sticky',
            href: '/react-tables/sticky',
          },
          {
            id: uniqueId(),
            title: 'Drag & Drop',
            href: '/react-tables/drag-drop',
          },
          {
            id: uniqueId(),
            title: 'Empty',
            href: '/react-tables/empty',
          },
          {
            id: uniqueId(),
            title: 'Expanding',
            href: '/react-tables/expanding',
          },
        ],
      },
    ],
  },
];
export default Menuitems;
