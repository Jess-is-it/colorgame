// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import FrontendLayout from 'src/layouts/blank/FrontendLayout';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ***Dashboard**** */
// Dashboards
const ColorCubeDashboard = Loadable(lazy(() => import('../views/dashboards/ColorCubeDashboard')));
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));
const Ecommercedash = Loadable(lazy(() => import('../views/dashboards/Ecommerce')));
const Musicdash = Loadable(lazy(() => import('../views/dashboards/Music')));
const Generaldash = Loadable(lazy(() => import('../views/dashboards/General')));

// Front-end pages

const Homepage = Loadable(lazy(() => import('../views/frontend-pages/Home')));
const About = Loadable(lazy(() => import('../views/frontend-pages/About')));
const ContactPage = Loadable(lazy(() => import('../views/frontend-pages/Contact')));
const Portfolio = Loadable(lazy(() => import('../views/frontend-pages/Portfolio')));
const PagePricing = Loadable(lazy(() => import('../views/frontend-pages/Pricing')));
const BlogPost = Loadable(lazy(() => import('../views/frontend-pages/BlogPost')));
const BlogDetailpage = Loadable(lazy(() => import('../views/frontend-pages/BlogDetail')));

/* ****Apps***** */
const Contact = Loadable(lazy(() => import('../views/apps/contacts/Contact')));
const Ecommerce = Loadable(lazy(() => import('../views/apps/ecommerce/Ecommerce')));
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/ecommerce/EcommerceDetail')));
const EcommerceAddProduct = Loadable(
  lazy(() => import('../views/apps/ecommerce/EcommerceAddProduct')),
);
const EcommerceEditProduct = Loadable(
  lazy(() => import('../views/apps/ecommerce/EcommerceEditProduct')),
);
const EcomProductList = Loadable(lazy(() => import('../views/apps/ecommerce/EcomProductList')));
const EcomProductCheckout = Loadable(
  lazy(() => import('../views/apps/ecommerce/EcommerceCheckout')),
);
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));
const BlogAdd = Loadable(lazy(() => import('../views/apps/blog/BlogAdd')));
const BlogEdit = Loadable(lazy(() => import('../views/apps/blog/BlogEdit')));
const BlogTable = Loadable(lazy(() => import('../views/apps/blog/BlogTable')));

const Chats = Loadable(lazy(() => import('../views/apps/chats/Chats')));
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const Followers = Loadable(lazy(() => import('../views/apps/user-profile/Followers')));
const Friends = Loadable(lazy(() => import('../views/apps/user-profile/Friends')));
const Gallery = Loadable(lazy(() => import('../views/apps/user-profile/Gallery')));
const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const CreateTickets = Loadable(lazy(() => import('../views/apps/tickets/CreateTickets')));
const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));
const ChatAi = Loadable(lazy(() => import('../views/apps/chat-ai/ChatAi')));
const ImageAI = Loadable(lazy(() => import('../views/apps/image-ai/ImageAI')));

// forms
const FormLayouts = Loadable(lazy(() => import('../views/forms/FormLayouts')));
const FormHorizontal = Loadable(lazy(() => import('../views/forms/FormHorizontal')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));
const FormValidation = Loadable(lazy(() => import('../views/forms/FormValidation')));

const FormSelect2 = Loadable(lazy(() => import('../views/forms/FormSelect2')));
const FormAutocomplete = Loadable(lazy(() => import('../views/forms/FormAutocomplete')));
const FormDropzone = Loadable(lazy(() => import('../views/forms/FormDropzone')));

// // theme pages
const RollbaseCASL = Loadable(lazy(() => import('../views/pages/RollbaseCASL')));
const Faq = Loadable(lazy(() => import('../views/pages/Faq')));
const Pricing = Loadable(lazy(() => import('../views/pages/Pricing')));
const AccountSetting = Loadable(lazy(() => import('../views/pages/AccountSetting')));
const Apikeys = Loadable(lazy(() => import('../views/pages/Apikeys')));
const Integrations = Loadable(lazy(() => import('../views/pages/Integration')));

// //Shadcn Forms
const ShadcnInput = Loadable(lazy(() => import('../views/shadcn-form/ShadcnInput')));
const ShadcnCheckbox = Loadable(lazy(() => import('../views/shadcn-form/ShadcnCheckbox')));
const ShadcnRadio = Loadable(lazy(() => import('../views/shadcn-form/ShadcnRadio')));
const ShadcnSelect = Loadable(lazy(() => import('../views/shadcn-form/ShadcnSelect')));

//Headless  Forms
const HeadlessButton = Loadable(lazy(() => import('../views/headless-form/ButtonForm')));
const HeadlessCheckbox = Loadable(lazy(() => import('../views/headless-form/CheckboxForm')));
const HeadlessCombobox = Loadable(lazy(() => import('../views/headless-form/ComboboxForm')));
const HeadlessFieldset = Loadable(lazy(() => import('../views/headless-form/FieldsetForm')));
const HeadlessInput = Loadable(lazy(() => import('../views/headless-form/InputForm')));
const HeadlessListbox = Loadable(lazy(() => import('../views/headless-form/ListboxForm')));
const HeadlessRadio = Loadable(lazy(() => import('../views/headless-form/RadioGroupForm')));
const HeadlessSelect = Loadable(lazy(() => import('../views/headless-form/SelectForm')));
const HeadlessSwitch = Loadable(lazy(() => import('../views/headless-form/SwitchForm')));
const HeadlessTextarea = Loadable(lazy(() => import('../views/headless-form/TextareaForm')));

// widget
const WidgetCards = Loadable(lazy(() => import('../views/widgets/cards/WidgetCards')));
const WidgetBanners = Loadable(lazy(() => import('../views/widgets/banners/WidgetBanners')));
const WidgetCharts = Loadable(lazy(() => import('../views/widgets/charts/WidgetCharts')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));

const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));

const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(
  lazy(() => import('../views/authentication/auth2/ForgotPassword')),
);

const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps')));

const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));
// const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));

// //shadcn table

const ShadcnTable = Loadable(lazy(() => import('../views/shadcn-tables/basic/ShadcnTable')));
const ShadcnHoverTable = Loadable(
  lazy(() => import('../views/shadcn-tables/hover-table/HoverTable')),
);

const ShadcnCheckboxTable = Loadable(
  lazy(() => import('../views/shadcn-tables/checkbox-table/CheckboxTable')),
);
const ShadcnStripedRowTable = Loadable(
  lazy(() => import('../views/shadcn-tables/striped-row/StripedRowTable')),
);

//react tables
const ReactBasicTable = Loadable(lazy(() => import('../views/react-tables/basic/Basic')));
const ReactColumnVisibilityTable = Loadable(
  lazy(() => import('../views/react-tables/columnvisibility/Columnvisibility')),
);
const ReactDenseTable = Loadable(lazy(() => import('../views/react-tables/dense/Dense')));
const ReactDragDropTable = Loadable(lazy(() => import('../views/react-tables/drag-drop/DragDrop')));
const ReactEditableTable = Loadable(lazy(() => import('../views/react-tables/editable/Editable')));
const ReactEmptyTable = Loadable(lazy(() => import('../views/react-tables/empty/Empty')));
const ReactExpandingTable = Loadable(
  lazy(() => import('../views/react-tables/expanding/Expanding')),
);
const ReactFilterTable = Loadable(lazy(() => import('../views/react-tables/filtering/Filtering')));
const ReactPaginationTable = Loadable(
  lazy(() => import('../views/react-tables/pagination/Pagination')),
);
const ReactRowSelectionTable = Loadable(
  lazy(() => import('../views/react-tables/row-selection/RowSelection')),
);
const ReactSortingTable = Loadable(lazy(() => import('../views/react-tables/sorting/Sorting')));
const ReactStickyTable = Loadable(lazy(() => import('../views/react-tables/sticky/Sticky')));

const ReactOrderTable = Loadable(
  lazy(() => import('../views/react-tables/order-datatable/OrderTable')),
);
const ReactUserTable = Loadable(
  lazy(() => import('../views/react-tables/user-datatable/UserTable')),
);

// charts
// apexcharts
const ApexAreaChart = Loadable(lazy(() => import('../views/charts/apex-charts/AreaChart')));
const ApexCandlestickChart = Loadable(
  lazy(() => import('../views/charts/apex-charts/CandlestickChart')),
);
const ApexColumnChart = Loadable(lazy(() => import('../views/charts/apex-charts/ColumnChart')));
const ApexDoughnutChart = Loadable(lazy(() => import('../views/charts/apex-charts/DoughnutChart')));
const ApexGredientChart = Loadable(lazy(() => import('../views/charts/apex-charts/GredientChart')));
const ApexRadialbarChart = Loadable(
  lazy(() => import('../views/charts/apex-charts/RadialbarChart')),
);
const ApexLineChart = Loadable(lazy(() => import('../views/charts/apex-charts/LineChart')));

// shadcn charts
const ShadcnAreaChart = Loadable(lazy(() => import('../views/charts/shadcn/AreaChart')));
const ShadcnBarChart = Loadable(lazy(() => import('../views/charts/shadcn/BarChart')));
const ShadcnLineChart = Loadable(lazy(() => import('../views/charts/shadcn/LineChart')));
const ShadcnPieChart = Loadable(lazy(() => import('../views/charts/shadcn/PieChart')));
const ShadcnRadarChart = Loadable(lazy(() => import('../views/charts/shadcn/RadarChart')));
const ShadcnRadialChart = Loadable(lazy(() => import('../views/charts/shadcn/RadialChart')));

// // icons
const SolarIcon = Loadable(lazy(() => import('../views/icons/SolarIcon')));

// // landingpage
const Landingpage = Loadable(lazy(() => import('../views/pages/landingpage/Landingpage')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <ColorCubeDashboard /> },
      { path: '/dashboards/modern', exact: true, element: <Modern /> },
      { path: '/dashboards/eCommerce', exact: true, element: <Ecommercedash /> },
      { path: '/dashboards/music', exact: true, element: <Musicdash /> },
      { path: '/dashboards/general', exact: true, element: <Generaldash /> },

      // { path: '/', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },

      { path: '/apps/contacts', element: <Contact /> },
      { path: '/apps/ecommerce/shop', element: <Ecommerce /> },
      { path: '/apps/ecommerce/list', element: <EcomProductList /> },
      { path: '/apps/ecommerce/checkout', element: <EcomProductCheckout /> },
      { path: '/apps/ecommerce/addproduct', element: <EcommerceAddProduct /> },
      { path: '/apps/ecommerce/editproduct', element: <EcommerceEditProduct /> },
      { path: '/apps/ecommerce/detail/:id', element: <EcommerceDetail /> },
      { path: '/apps/blog/post', element: <Blog /> },
      { path: '/apps/blog/detail/:id', element: <BlogDetail /> },
      { path: '/apps/blog/addblog', element: <BlogAdd /> },
      { path: '/apps/blog/editblog', element: <BlogEdit /> },
      { path: '/apps/blog/manage-blog', element: <BlogTable /> },

      { path: '/apps/chats', element: <Chats /> },
      { path: '/apps/user-profile/profile', element: <UserProfile /> },
      { path: '/apps/user-profile/followers', element: <Followers /> },
      { path: '/apps/user-profile/friends', element: <Friends /> },
      { path: '/apps/user-profile/gallery', element: <Gallery /> },
      { path: '/apps/invoice/list', element: <InvoiceList /> },
      { path: '/apps/invoice/create', element: <InvoiceCreate /> },
      { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
      { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },
      { path: '/apps/notes', element: <Notes /> },
      { path: '/apps/calendar', element: <Calendar /> },
      { path: '/apps/email', element: <Email /> },
      { path: '/apps/tickets', element: <Tickets /> },
      { path: '/apps/tickets/create', element: <CreateTickets /> },
      { path: '/apps/kanban', element: <Kanban /> },
      { path: '/apps/chat-ai', element: <ChatAi /> },
      { path: '/apps/image-ai', element: <ImageAI /> },

      { path: '/theme-pages/casl', element: <RollbaseCASL /> },
      { path: '/theme-pages/pricing', element: <Pricing /> },
      { path: '/theme-pages/faq', element: <Faq /> },
      { path: '/theme-pages/account-settings', element: <AccountSetting /> },
      { path: '/theme-pages/apikey', element: <Apikeys /> },
      { path: '/theme-pages/integration', element: <Integrations /> },

      { path: '/forms/form-validation', element: <FormValidation /> },
      { path: '/forms/form-horizontal', element: <FormHorizontal /> },
      { path: '/forms/form-vertical', element: <FormVertical /> },
      { path: '/forms/form-layouts', element: <FormLayouts /> },

      { path: '/forms/form-select2', element: <FormSelect2 /> },
      { path: '/forms/form-autocomplete', element: <FormAutocomplete /> },
      { path: '/forms/form-dropzone', element: <FormDropzone /> },

      { path: '/shadcn-form/input', element: <ShadcnInput /> },
      { path: '/shadcn-form/select', element: <ShadcnSelect /> },
      { path: '/shadcn-form/checkbox', element: <ShadcnCheckbox /> },
      { path: '/shadcn-form/radio', element: <ShadcnRadio /> },

      { path: '/headless-form/buttons', element: <HeadlessButton /> },
      { path: '/headless-form/checkbox', element: <HeadlessCheckbox /> },
      { path: '/headless-form/combobox', element: <HeadlessCombobox /> },
      { path: '/headless-form/fieldset', element: <HeadlessFieldset /> },
      { path: '/headless-form/input', element: <HeadlessInput /> },
      { path: '/headless-form/listbox', element: <HeadlessListbox /> },
      { path: '/headless-form/radiogroup', element: <HeadlessRadio /> },
      { path: '/headless-form/select', element: <HeadlessSelect /> },
      { path: '/headless-form/switch', element: <HeadlessSwitch /> },
      { path: '/headless-form/textarea', element: <HeadlessTextarea /> },

      { path: '/widgets/cards', element: <WidgetCards /> },
      { path: '/widgets/banners', element: <WidgetBanners /> },
      { path: '/widgets/charts', element: <WidgetCharts /> },

      { path: '/shadcn-tables/basic', element: <ShadcnTable /> },
      { path: '/shadcn-tables/hover', element: <ShadcnHoverTable /> },
      { path: '/shadcn-tables/checkbox', element: <ShadcnCheckboxTable /> },
      { path: '/shadcn-tables/striped-row', element: <ShadcnStripedRowTable /> },

      { path: '/react-tables/basic', element: <ReactBasicTable /> },
      { path: '/react-tables/columnvisibility', element: <ReactColumnVisibilityTable /> },
      { path: '/react-tables/drag-drop', element: <ReactDragDropTable /> },
      { path: '/react-tables/dense', element: <ReactDenseTable /> },
      { path: '/react-tables/editable', element: <ReactEditableTable /> },
      { path: '/react-tables/empty', element: <ReactEmptyTable /> },
      { path: '/react-tables/expanding', element: <ReactExpandingTable /> },
      { path: '/react-tables/filtering', element: <ReactFilterTable /> },
      { path: '/react-tables/pagination', element: <ReactPaginationTable /> },
      { path: '/react-tables/row-selection', element: <ReactRowSelectionTable /> },
      { path: '/react-tables/sorting', element: <ReactSortingTable /> },
      { path: '/react-tables/sticky', element: <ReactStickyTable /> },
      { path: '/react-tables/orders-table', element: <ReactOrderTable /> },
      { path: '/react-tables/user-table', element: <ReactUserTable /> },

      { path: '/charts/apex-charts/area', element: <ApexAreaChart /> },
      { path: '/charts/apex-charts/line', element: <ApexLineChart /> },
      { path: '/charts/apex-charts/gradient', element: <ApexGredientChart /> },
      { path: '/charts/apex-charts/candlestick', element: <ApexCandlestickChart /> },
      { path: '/charts/apex-charts/column', element: <ApexColumnChart /> },
      { path: '/charts/apex-charts/doughnut', element: <ApexDoughnutChart /> },
      { path: '/charts/apex-charts/radialbar', element: <ApexRadialbarChart /> },

      { path: '/charts/shadcn/area', element: <ShadcnAreaChart /> },
      { path: '/charts/shadcn/bar', element: <ShadcnBarChart /> },
      { path: '/charts/shadcn/line', element: <ShadcnLineChart /> },
      { path: '/charts/shadcn/pie', element: <ShadcnPieChart /> },
      { path: '/charts/shadcn/radar', element: <ShadcnRadarChart /> },
      { path: '/charts/shadcn/radial', element: <ShadcnRadialChart /> },

      { path: '/icons/iconify', element: <SolarIcon /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      {
        path: '/frontend-pages',
        element: <FrontendLayout />,
        children: [
          { path: 'homepage', element: <Homepage /> },
          { path: 'about', element: <About /> },
          { path: 'contact', element: <ContactPage /> },
          { path: 'portfolio', element: <Portfolio /> },
          { path: 'pricing', element: <PagePricing /> },
          { path: 'blog/post', element: <BlogPost /> },
          {
            path: 'blog/detail/as-yen-tumbles-gadget-loving-japan-goes-for-secondhand-iphones-',
            element: <BlogDetailpage />,
          },
        ],
      },

      { path: '/landingpage', element: <Landingpage /> },
      { path: '/auth/auth1/login', element: <Login /> },
      { path: '/auth/auth2/login', element: <Login2 /> },
      { path: '/auth/auth1/register', element: <Register /> },
      { path: '/auth/auth2/register', element: <Register2 /> },
      { path: '/auth/auth1/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/auth2/forgot-password', element: <ForgotPassword2 /> },

      { path: '/auth/auth1/two-steps', element: <TwoSteps /> },
      { path: '/auth/auth2/two-steps', element: <TwoSteps2 /> },

      { path: '/auth/maintenance', element: <Maintainance /> },

      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
