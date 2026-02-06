import React, { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';

const ChatAiMsgSent = ({
  onSearchSubmit,
  onFileUpload,
}: {
  onSearchSubmit: (text: string) => void;
  onFileUpload?: (file: File) => void;
}) => {
  const [input, setInput] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    onSearchSubmit(input);
    setInput('');
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
    }
  };
  return (
    <>
      <div className="p-6">
        <div className="relative">
          <Input
            className="!form-control trans-input w-full pr-10 pl-10"
            required
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {/* Image Upload Button */}
          <div className="absolute top-0.5 left-2" onClick={handleImageClick}>
            <Label
              className="!btn-circle-hover cursor-pointer !rounded-full"
              htmlFor="dropzone-file"
            >
              <Icon
                icon="solar:gallery-outline"
                width={20}
                height={20}
                className="text-link dark:text-darklink hover:text-primary dark:hover:text-primary"
              />
              <Input
                type="file"
                id="dropzone-file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </Label>
          </div>

          {/* Send Button */}
          <div className="absolute top-1.5 right-2" onClick={handleSend}>
            <div className="rounded-full p-1.5 cursor-pointer bg-primary hover:bg-primary/90">
              <Icon icon="solar:arrow-up-linear" width={18} height={18} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatAiMsgSent;
