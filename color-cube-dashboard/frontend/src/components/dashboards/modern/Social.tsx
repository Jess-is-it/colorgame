import user1 from 'src/assets/images/profile/user-1.jpg';
import user2 from 'src/assets/images/profile/user-2.jpg';
import user3 from 'src/assets/images/profile/user-3.jpg';
import user4 from 'src/assets/images/profile/user-4.jpg';
import user5 from 'src/assets/images/profile/user-5.jpg';
import { Link } from 'react-router';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { useMotionValue } from 'framer-motion';
import AnimatedTooltip from 'src/components/animated-component/AnimatedTooltip';

const Social = () => {
  const SocialFigure = [
    {
      key: 'user2',
      img: user2,
      name: 'Maria Rodriguez',
      designation: 'Cloud Architect',
    },
    {
      key: 'user3',
      img: user3,
      name: 'David Smith',
      designation: 'Cybersecurity Analyst',
    },
    {
      key: 'user4',
      img: user4,
      name: 'Charles Martha',
      designation: 'SEO Strategist',
    },
    {
      key: 'user5',
      img: user5,
      name: 'James Johnson',
      designation: 'Blockchain Developer',
    },
  ];
  // use motion value
  const x = useMotionValue(0);
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between gap-6 h-full">
        <div className="flex items-center gap-6">
          <div className="shrink-0">
            <img
              src={user1}
              className="rounded-md shrink-0"
              alt="user-img"
              width={72}
              height={72}
            />
          </div>
          <div>
            <h5 className="card-title mb-2.5 leading-tight">Mathew Anderson</h5>
            <p className="card-subtitle">22 March, 2025</p>
          </div>
        </div>
        {/* Avatar List with Tooltip */}
        <div className="flex justify-between">
          <div className="flex">
            {SocialFigure.map((item) => (
              <div key={item.key} className="group relative -ml-3 first:ml-0">
                {/* Tooltip */}
                <AnimatedTooltip name={item.name} designation={item.designation} x={x} />
                {/* Image */}
                <img
                  onMouseMove={(e) =>
                    x.set(e.nativeEvent.offsetX - e.currentTarget.offsetWidth / 2)
                  }
                  src={item.img}
                  alt={item.name}
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white object-cover transition duration-500 group-hover:z-30 group-hover:scale-105 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Icon */}
          <Button variant={'lightprimary'} asChild>
            <Link to="/apps/chats" className="text-xl">
              <Icon icon="tabler:message-2" />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export { Social };
