import { Badge } from 'src/components/ui/badge';

const OutlineBadgeCode = () => {
  return (
    <>
      <div className="flex items-center gap-3 mt-4">
        <Badge variant="outline">Primary</Badge>
        <Badge variant="outlineSecondary">Secondary</Badge>
        <Badge variant="outlineSuccess">Success</Badge>
        <Badge variant="outlineWarning">Warning</Badge>
        <Badge variant="outlineInfo">Info</Badge>
        <Badge variant="outlineError">Error</Badge>
      </div>
    </>
  );
};

export default OutlineBadgeCode;
