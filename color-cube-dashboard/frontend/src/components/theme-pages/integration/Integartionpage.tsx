import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import SettingsModal from './SettingsModal';
import DetailModal from './DetailModal';
import NewIntegrationModal from './NewIntegrationModal';
import RemoveModal from './RemoveModal';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Switch } from 'src/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import Mailchimpimg from 'src/assets/images/inetegrationpage/Mailchimp.svg';
import Meetimg from 'src/assets/images/inetegrationpage/Google Meet.svg';
import Zoomimg from 'src/assets/images/inetegrationpage/Zoom.svg';
import Loomimg from 'src/assets/images/inetegrationpage/Loom.svg';
import Linearimg from 'src/assets/images/inetegrationpage/Linear.svg';
import Gmailimg from 'src/assets/images/inetegrationpage/Gmail.svg';
import Notionimg from 'src/assets/images/inetegrationpage/Notion.svg';
import Trelloimg from 'src/assets/images/inetegrationpage/Trello.svg';
import Jiraimg from 'src/assets/images/inetegrationpage/Jira.svg';
import Mailchimpdark from 'src/assets/images/inetegrationpage/Mailchimpdark.svg';

type Integration = {
  name: string;
  desc: string;
  icon: string;
  icondark?: string;
  enabled: boolean;
};

export const integrations = [
  {
    name: 'Gmail',
    desc: 'Integrate Gmail to send, receive, and manage emails directly from your workspace.',
    icon: Gmailimg,
    enabled: false,
  },
  {
    name: 'Google Meet',
    desc: 'Connect your Google Meet account for seamless video conferencing.',
    icon: Meetimg,
    enabled: false,
  },
  {
    name: 'Linear',
    desc: 'Integrate Linear to manage issues, track progress, and streamline your team’s.',
    icon: Linearimg,
    enabled: false,
  },
  {
    name: 'Loom',
    desc: 'Integrate Loom to easily record, share, and manage video messages.',
    icon: Loomimg,
    enabled: false,
  },
  {
    name: 'Zoom',
    desc: 'Integrate Zoom to streamline your virtual meetings and team collaborations.',
    icon: Zoomimg,
    enabled: true,
  },
  {
    name: 'Mailchimp',
    desc: 'Connect Mailchimp to streamline your email marketing—automate campaigns.',
    icon: Mailchimpimg,
    icondark: Mailchimpdark,
    enabled: true,
  },
  {
    name: 'Notion',
    desc: 'Capture, organize, and tackle your to-dos from anywhere.',
    icon: Notionimg,
    enabled: false,
  },
  {
    name: 'Trello',
    desc: 'Capture, organize, and tackle your to-dos from anywhere.',
    icon: Trelloimg,
    enabled: false,
  },
  {
    name: 'Jira',
    desc: 'Track issues and manage projects with ease and full team visibility.',
    icon: Jiraimg,
    enabled: false,
  },
];

function Integartionpage() {
  const [integrationStates, setIntegrationStates] = useState(integrations);
  const [showSettingModal, setShowSettingModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showNewIntegrationModal, setShowNewIntegrationModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [_, setSelectedIntegration] = useState<Integration | null>(null);

  return (
    <Card>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center justify-between mb-5 ">
        <div>
          <h3 className="card-title">Integrations</h3>
        </div>
        <div>
          <Button
            className=" flex items-center gap-2 "
            onClick={() => setShowNewIntegrationModal(true)}
          >
            <Icon icon="solar:add-circle-line-duotone" width={20} height={20}></Icon>
            Add New Integration
          </Button>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrationStates.map((integration, idx) => (
          <Card key={idx} className="p-0">
            <div className="p-5 pb-9">
              <div className="flex items-start justify-between gap-3">
                <div className="mb-5 inline-flex items-center justify-center">
                  <img
                    src={integration.icon}
                    alt={`${integration.name} logo`}
                    className={`h-10 w-10 object-contain ${
                      integration.icondark ? 'block dark:hidden' : ''
                    }`}
                  />

                  {/* Dark mode: show icondark if it exists */}
                  {integration.icondark && (
                    <img
                      src={integration.icondark}
                      alt={`${integration.name} logo (dark)`}
                      className="hidden dark:block h-10 w-10 object-contain"
                    />
                  )}
                </div>

                <DropdownMenu modal={showRemoveModal ? false : true}>
                  <DropdownMenuTrigger asChild>
                    <span className="text-muted dark:text-lightgray cursor-pointer hover:text-black dark:hover:text-white">
                      <Icon icon="lucide:more-horizontal" width={20} />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedIntegration(integration);
                        setShowRemoveModal(true);
                      }}
                    >
                      Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-3">{integration.name}</h4>
                <p className=" card-subtitle max-w-xs text-sm ">{integration.desc}</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border dark:border-darkborder  p-5 ">
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowSettingModal(true)}>
                  <Icon icon="lucide:settings" width={19} height={19} />
                </Button>
                <Button variant="outline" onClick={() => setShowDetailModal(true)}>
                  Details
                </Button>
              </div>
              <div>
                <Switch
                  checked={integration.enabled}
                  onCheckedChange={() => {
                    const updated = [...integrationStates];
                    updated[idx].enabled = !updated[idx].enabled;
                    setIntegrationStates(updated);
                  }}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
      <SettingsModal open={showSettingModal} onClose={() => setShowSettingModal(false)} />
      <DetailModal open={showDetailModal} onClose={() => setShowDetailModal(false)} />
      <NewIntegrationModal
        open={showNewIntegrationModal}
        onClose={() => setShowNewIntegrationModal(false)}
      />
      <RemoveModal open={showRemoveModal} onClose={() => setShowRemoveModal(false)} />
    </Card>
  );
}

export default Integartionpage;
