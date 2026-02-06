import img1 from 'src/assets/images/landingpage/demos/demo-main.png';
import img2 from 'src/assets/images/landingpage/demos/demo-dark.png';
import img3 from 'src/assets/images/landingpage/demos/demo-horizontal.png';
import img4 from 'src/assets/images/landingpage/demos/demo-mini.png';
import img5 from 'src/assets/images/landingpage/demos/demo-rtl.png';

import img6 from 'src/assets/images/landingpage/apps/app-calendar.png';
import img7 from 'src/assets/images/landingpage/apps/app-chat.png';
import img8 from 'src/assets/images/landingpage/apps/app-contact.png';
import img9 from 'src/assets/images/landingpage/apps/app-user-profile.png';
import img10 from 'src/assets/images/landingpage/apps/app-note.png';
import img11 from 'src/assets/images/landingpage/apps/app-blog.png';
import img12 from 'src/assets/images/landingpage/apps/app-shop.png';
import img13 from 'src/assets/images/landingpage/apps/app-productlist.png';
import img14 from 'src/assets/images/landingpage/apps/app-invoice.png';
import img15 from 'src/assets/images/landingpage/apps/app-blog-detail.png';
import img16 from 'src/assets/images/landingpage/apps/app-product-detail.png';
import img17 from 'src/assets/images/landingpage/apps/app-kanban.png';
import img18 from 'src/assets/images/landingpage/apps/app-tickets.png';
import img19 from 'src/assets/images/landingpage/apps/app-ai-chat.png';
import img20 from 'src/assets/images/landingpage/apps/app-ai-image.png';

import front1 from 'src/assets/images/landingpage/front-pages/front-homepage.png';
import front2 from 'src/assets/images/landingpage/front-pages/front-about.png';
import front3 from 'src/assets/images/landingpage/front-pages/front-blog.png';
import front4 from 'src/assets/images/landingpage/front-pages/front-contact.png';
import front5 from 'src/assets/images/landingpage/front-pages/front-pricing.png';
import front6 from 'src/assets/images/landingpage/front-pages/front-portfolio.png';



interface DemoTypes {
  link: string;
  img: string | any;
  name: string;
  type: boolean;
  include: string;
}

const Demos: DemoTypes[] = [
  {
    type: true,
    img: img1,
    name: 'Main',
    link: 'https://tailwindadmin-reactjs-main.netlify.app/',
    include: 'Demo',
  },
  {
    type: true,
    img: img2,
    name: 'Dark',
    link: 'https://tailwindadmin-nextjs-dark.vercel.app/',
    include: 'Demo',
  },
  {
    type: true,
    img: img3,
    name: 'Horizontal',
    link: 'https://tailwindadmin-nextjs-horizontal.vercel.app/',
    include: 'Demo',
  },
  {
    type: true,
    img: img4,
    name: 'Minisidebar',
    link: 'https://tailwindadmin-nextjs-minisidebar.vercel.app/',
    include: 'Demo',
  },
  {
    type: true,
    img: img5,
    name: 'RTL',
    link: 'https://tailwindadmin-nextjs-rtl.vercel.app/',
    include: 'Demo',
  },

  {
    type: false,
    img: img19,
    name: 'AI Chat App',
    link: '/apps/chat-ai',
    include: 'Application',
  },
  {
    type: false,
    img: img20,
    name: 'AI Image App',
    link: '/apps/image-ai',
    include: 'Application',
  },
  {
    type: false,
    img: img18,
    name: 'Tickets App',
    link: '/apps/tickets',
    include: 'Application',
  },
  {
    type: false,
    img: img6,
    name: 'Calandar App',
    link: '/apps/calendar',
    include: 'Application',
  },
  {
    type: false,
    img: img7,
    name: 'Chat App',
    link: '/apps/chats',
    include: 'Application',
  },
  {
    type: false,
    img: img8,
    name: 'Contact App',
    link: '/apps/contacts',
    include: 'Application',
  },
  {
    type: false,
    img: img9,
    name: 'User Profile App',
    link: '/apps/user-profile/profile',
    include: 'Application',
  },
  {
    type: false,
    img: img10,
    name: 'Notes App',
    link: '/apps/notes',
    include: 'Application',
  },
  {
    type: false,
    img: img11,
    name: 'Blog App',
    link: '/apps/blog/post',
    include: 'Application',
  },
  {
    type: false,
    img: img15,
    name: 'Blog Detail App',
    link: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
    include: 'Application',
  },
  {
    type: false,
    img: img12,
    name: 'eCommerce Shop App',
    link: '/apps/ecommerce/shop',
    include: 'Application',
  },
  {
    type: false,
    img: img16,
    name: 'eCommerce Product Detail App',
    link: '/apps/ecommerce/detail/1',
    include: 'Application',
  },
  {
    type: false,
    img: img13,
    name: 'eCommerce Product List App',
    link: '/apps/ecommerce/list',
    include: 'Application',
  },
  {
    type: false,
    img: img14,
    name: 'Invoice App',
    link: '/apps/invoice/list',
    include: 'Application',
  },
  {
    type: false,
    img: img17,
    name: 'Kanban App',
    link: '/apps/kanban',
    include: 'Application',
  },
];
const FrontDemos = [
  {
    img: front1,
    name: 'Homepage',
    link: '/frontend-pages/homepage',
    include: 'Frontend Pages',
  },
  {
    img: front2,
    name: 'About Us',
    link: '/frontend-pages/about',
    include: 'Frontend pages',
  },
  {
    img: front3,
    name: 'Blog',
    link: '/frontend-pages/blog/post',
    include: 'Frontend Pages',
  },
  {
    img: front4,
    name: 'Contact',
    link: '/frontend-pages/contact',
    include: 'Frontend Pages',
  },
  {
    img: front5,
    name: 'Pricing',
    link: '/frontend-pages/pricing',
    include: 'Frontend Pages',
  },

  {
    img: front6,
    name: 'Portfolio',
    link: '/frontend-pages/portfolio',
    include: 'Frontend Pages',
  },
];

interface ListFeatureTypes {
  featureicon: string;
  title: string;
  subtitle: string;
}

const listFeature: ListFeatureTypes[] = [
  {
    featureicon: 'tabler:wand',
    title: '6 Theme Colors',
    subtitle: 'TailwindAdmin Admin comes with 6 pre-defined theme colors.',
  },
  {
    featureicon: 'tabler:diamond',
    title: '3400+ Font Icons',
    subtitle: 'The tailwindadmin Admin package includes numerous icon fonts.',
  },
  {
    featureicon: 'tabler:calendar',
    title: 'Calendar Design',
    subtitle: 'Our package includes a well-designed calendar.',
  },
  {
    featureicon: 'tabler:refresh',
    title: 'Regular Updates',
    subtitle: 'We continuously enhance our pack with new features.',
  },
  {
    featureicon: 'tabler:archive',
    title: '90+ Page Templates',
    subtitle: 'Indeed, we offer 6 demos, each featuring over 90+ pages, to simplify the process.',
  },
  {
    featureicon: 'tabler:adjustments',
    title: '45+ UI Components',
    subtitle: 'The tailwindadmin Admin Pack includes nearly 45 UI components.',
  },
  {
    featureicon: 'tabler:brand-tailwind',
    title: 'Tailwind',
    subtitle: 'It is built using Tailwind, a robust UI component framework.',
  },
  {
    featureicon: 'tabler:hexagons',
    title: 'Flowbite React',
    subtitle: 'A utility-first CSS framework and UI component library for React applications.',
  },
  {
    featureicon: 'tabler:brand-firebase',
    title: 'Firebase',
    subtitle:
      'Offer robust real-time database capabilities, authentication, and additional features.',
  },
  {
    featureicon: 'tabler:database',
    title: 'Axios',
    subtitle:
      'Axios is a promise-based HTTP client designed for both Node.js and browser environments.',
  },
  {
    featureicon: 'tabler:tags',
    title: 'i18 React',
    subtitle: 'react-i18 is a robust framework for internationalization in React applications.',
  },

  {
    featureicon: 'tabler:shield-lock',
    title: 'Next-Auth',
    subtitle: 'We have integrated Google, GitHub, and Credential providers with NextAuth.',
  },

  {
    featureicon: 'tabler:layers-intersect',
    title: 'Lots of Table Examples',
    subtitle: "Tables are a fundamental requirement, and we've included them",
  },

  {
    featureicon: 'tabler:book',
    title: 'Detailed Documentation',
    subtitle: 'We have created comprehensive documentation to make usage straightforward.',
  },

  {
    featureicon: 'tabler:user-screen',
    title: 'Dedicated Support',
    subtitle: 'We believe that exceptional support is essential, and we provide it.',
  },
  {
    featureicon: 'tabler:chart-pie',
    title: 'Lots of Chart Options',
    subtitle:
      'With ApexCharts, we offer a wide variety of chart options if you can name it, we likely have it.',
  },
];

/*User Review Section*/
import review1 from 'src/assets/images/profile/user-2.jpg';
// import review2 from 'src/assets/images/profile/user-3.jpg';
import review3 from 'src/assets/images/profile/user-4.jpg';

interface UserReviewTypes {
  img: string;
  review: string;
  title: string;
  subtitle: string;
  rating: number;
  link: string;
}
const userReview: UserReviewTypes[] = [
  {
    img: "https://user-images.trustpilot.com/65a14dc50b345200120170f1/73x73.png",
    title: "Nicolas LÉZORAY",
    subtitle: "Varified User",
    rating: 5,
    review:
      "I ordered an Angular Template which offers very well structured data, it is a real time saving. I had a problem with my order, support quickly took care of me and resolved my problem.",
    link: "https://www.trustpilot.com/reviews/678a3365b34a249699d13c03"
  },
  {
    img: review1,
    title: "Gayle Everton ",
    subtitle: "Varified User",
    rating: 5,
    review:
      "Using Wrappixel's admin dashboard templates is like having a personal assistant who never sleeps. Everything is organized and just a click away. Truly a lifesaver!",
    link: "https://www.trustpilot.com/reviews/66d780ad488ad3ae384ccc89"
  },
  {
    img: "https://user-images.trustpilot.com/668cc755f9eac02cbb844022/73x73.png",
    title: "Kimberly Rodejo",
    subtitle: "Varified User",
    rating: 5,
    review:
      "Found the WrapPixel Angular template when I was looking for a tool to help speed up the development process but was also easy to use and integrate. And it did not disappoint, it was everything and more! Highly recommend!!",
    link: "https://www.trustpilot.com/reviews/668cc75c14c23514c344c355"
  },
  {
    img: "https://user-images.trustpilot.com/603e240536deb6001a5a9dcb/73x73.png",
    title: "Fazreen Razeek",
    subtitle: "Varified User",
    rating: 5,
    review:
      "Amazing service. Have been working with them for a long time now and the work quality is top notch and delivery is as promised.",
    link: "https://www.trustpilot.com/reviews/6687ca0e1119332b2ba32ce6"
  },
  {
    img: review3,
    title: "Arun Bhargavan",
    subtitle: "Varified User",
    rating: 5,
    review:
      "I recently discovered Wrappixel.com, and it has quickly become my go-to resource for high-quality UI kits and templates. The website offers an impressive variety of options that cater to various frameworks like Bootstrap, Angular, React, and Vue.js.The designs are visually stunning and functionally robust, making them easy to integrate into projects.Navigating the site is a breeze, thanks to its intuitive layout and search functionality.",
    link: "https://www.trustpilot.com/reviews/666426a5c7e3339b51eb7191"
  },
  {
    img: "https://user-images.trustpilot.com/6654a6d4713a434365e43e5a/73x73.png",
    title: "Shreeram Iyer",
    subtitle: "Varified User",
    rating: 5,
    review:
      'Excellent Choice for best Bootstrap Templates:I was stunned at the range of choice that WP had to offer in terms of completeness of template, themes, options etc."MatDash Pro" was my go to choice that completely fitted our need and had no second thoughts to buy it at such an affordable price.',
    link: "https://www.trustpilot.com/reviews/6654b01602593a81eeb485c5"
  },
];

interface DemosMegaMenuTypes {
  img: string;
  name: string;
  link: string;
  include: string;
}
const FrontMenu = [
  {
    img: front1,
    name: 'Homepage',
    link: '/frontend-pages/homepage',
    include: 'Frontend Pages',
  },
  {
    img: front2,
    name: 'About Us',
    link: '/frontend-pages/about',
    include: 'Frontend Pages',
  },
  {
    img: front4,
    name: 'Contact Us',
    link: '/frontend-pages/contact',
    include: 'Frontend Pages',
  },
  {
    img: front6,
    name: 'Portfolio',
    link: '/frontend-pages/portfolio',
    include: 'Frontend Pages',
  },
  {
    img: front5,
    name: 'Pricing',
    link: '/frontend-pages/pricing',
    include: 'Frontend Pages',
  },
  {
    img: front3,
    name: 'Blog',
    link: '/frontend-pages/blog',
    include: 'Frontend Pages',
  },
];
/*Demos Megamenu*/
const demosMegamenu: DemosMegaMenuTypes[] = [
  {
    img: img1,
    name: 'Main',
    link: 'https://tailwindadmin-reactjs-main.netlify.app/',
    include: '',
  },
  {
    img: img2,
    name: 'Dark',
    link: 'https://tailwindadmin-nextjs-dark.vercel.app/',
    include: '',
  },
  {
    img: img3,
    name: 'Horizontal',
    link: 'https://tailwindadmin-nextjs-horizontal.vercel.app/',
    include: '',
  },
  {
    img: img4,
    name: 'Minisidebar',
    link: 'https://tailwindadmin-nextjs-minisidebar.vercel.app/',
    include: '',
  },
  {
    img: img5,
    name: 'RTL',
    link: 'https://tailwindadmin-nextjs-rtl.vercel.app/',
    include: '',
  },
];
const appsMegamenu: DemosMegaMenuTypes[] = [
  {
    img: img19,
    name: 'AI Chat App',
    link: '/apps/chat-ai',
    include: '',
  },
  {
    img: img20,
    name: 'AI Image App',
    link: '/apps/image-ai',
    include: '',
  },
  {
    img: img8,
    name: 'Contact App',
    link: '/apps/contacts',
    include: '',
  },
  {
    img: img9,
    name: 'User Profile App',
    link: '/apps/user-profile/profile',
    include: '',
  },
  {
    img: img10,
    name: 'Notes App',
    link: '/apps/notes',
    include: '',
  },
];

export { Demos, listFeature, userReview, demosMegamenu, appsMegamenu, FrontMenu, FrontDemos };
