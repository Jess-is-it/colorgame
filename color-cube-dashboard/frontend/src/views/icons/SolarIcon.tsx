import { useContext } from 'react'
import { Card } from 'src/components/ui/card';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { CustomizerContext } from 'src/context/CustomizerContext'

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Iconify Icons',
  },
];

const SolarIcon = () => {
  const { activeMode } = useContext(CustomizerContext)
  const selectedStyle = activeMode === 'dark' ? vs2015 : docco
  return (
    <>
      <BreadcrumbComp title="Iconify Icons" items={BCrumb} />
      <Card className="flex flex-col gap-3">
        <div className="space-y-2">
          <h6>⚙️ Installation</h6>
          <p>To use Tabler icons in your project, install the official React package:</p>
          <SyntaxHighlighter language="typescript" style={selectedStyle}>
            {` npm i @iconify-icon/react `}
          </SyntaxHighlighter>
        </div>
        <div className="space-y-2">
          <h6>🧩 Usage Example</h6>
          <p>Import and use any icon in your components:</p>
          <SyntaxHighlighter language="typescript" style={selectedStyle}>
            {`import { Icon } from '@iconify/react';
function MyComponent() {
  return <Icon icon='solar:arrow-right-linear' width='20' height='20' />;
}`}
          </SyntaxHighlighter>
        </div>
        <div className="space-y-2">
          <h6>🔍 Explore Icons</h6>
          <iframe
            src="https://icon-sets.iconify.design/solar/"
            title="Inline Frame Example"
            width="100%"
            height="650"
          ></iframe>
        </div>
      </Card>
    </>
  );
};

export default SolarIcon;
