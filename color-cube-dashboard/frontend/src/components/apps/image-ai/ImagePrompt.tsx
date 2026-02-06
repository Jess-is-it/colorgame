import React, { useContext, useRef, useState } from 'react';
import { ImageContext } from 'src/context/imageai-context';
import {
  AspectRatio,
  styleOptions,
  toneOptions,
  lightingOptions,
  cameraOptions,
} from 'src/api/image-ai/dropdowndata';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Spinner } from 'src/components/ui/spinner';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from 'src/components/ui/tooltip';
// Toastify imports
import { CustomizerContext } from 'src/context/CustomizerContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ImagePrompt() {
  const { prompt, setPrompt, generateImages, setIsUsingMock, isGenerating, setIsGenerating } =
    useContext(ImageContext);
  const { activeMode } = useContext(CustomizerContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState(AspectRatio[0]);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedTone, setSelectedTone] = useState(toneOptions[0]);
  const [selectedLighting, setSelectedLighting] = useState(lightingOptions[0]);
  const [selectedCamera, setSelectedCamera] = useState(cameraOptions[0]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSelectAspect = (option: typeof selected) => {
    setSelected(option);
  };

  const handleSelectStyle = (option: typeof selected) => {
    setSelectedStyle(option);
  };

  const handleSelectTone = (option: typeof selected) => {
    setSelectedTone(option);
  };

  const handleSelectLighting = (option: typeof selected) => {
    setSelectedLighting(option);
  };

  const handleSelectCamera = (option: typeof selected) => {
    setSelectedCamera(option);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImageUrl(imageUrl); // set preview
      console.log('Selected file:', file);
    }
  };

  const toastColor = activeMode === 'dark' ? 'dark' : 'light';
  const generateImage = async () => {
    if (!prompt.trim()) {
      toast('Please enter a prompt before generating.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: toastColor,
      });
      return;
    }

    setIsGenerating(true); // Start loading
    setIsUsingMock(true);

    setTimeout(async () => {
      try {
        await generateImages(prompt);
      } catch (err) {
        console.error('Generation error:', err);
      } finally {
        setIsGenerating(false); // Done loading
      }
    }, 3000);
  };

  const handleClear = () => {
    setPrompt('');
    setSelected(AspectRatio[0]);
    setSelectedStyle(styleOptions[0]);
    setSelectedTone(toneOptions[0]);
    setSelectedLighting(lightingOptions[0]);
    setSelectedCamera(cameraOptions[0]);
    setSelectedImageUrl(null); // clear preview

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-1">AI image generator</h2>
        <p className="text-sm font-medium ">
          Create an image with Generative AI by describing what you'd like to see. Please note, all
          images are shared publicly by default.
        </p>
      </div>
      <div>
        <Card className="p-4">
          <div>
            {selectedImageUrl && (
              <div className="mb-4">
                <img
                  src={selectedImageUrl}
                  alt="Selected preview"
                  width={200}
                  height={200}
                  className="rounded-lg object-contain max-h-50"
                />
              </div>
            )}
            <p className="text-base font-semibold text-link dark:text-darklink">Prompt</p>
            <Textarea
              className="bg-transparent dark:bg-transparent p-1 border-none resize-none"
              placeholder="Decribe the image you want to generate"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="inline-flex flex-wrap gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div
                      onClick={handleClick}
                      className="w-10 h-10 border border-border dark:border-darkborder rounded-md flex items-center justify-center cursor-pointer hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary"
                    >
                      <Icon icon="solar:gallery-outline" width={20} height={20} />
                      <Input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Add Image</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Dropdowns */}
              {[
                {
                  selected: selected,
                  options: AspectRatio,
                  handler: handleSelectAspect,
                },
                {
                  selected: selectedStyle,
                  options: styleOptions,
                  handler: handleSelectStyle,
                },
                {
                  selected: selectedTone,
                  options: toneOptions,
                  handler: handleSelectTone,
                },
                {
                  selected: selectedLighting,
                  options: lightingOptions,
                  handler: handleSelectLighting,
                },
                {
                  selected: selectedCamera,
                  options: cameraOptions,
                  handler: handleSelectCamera,
                },
              ].map((dropdown, index) => (
                <div
                  key={index}
                  className="border border-border dark:border-darkborder px-3 py-1 h-10 rounded-md hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="flex gap-2 items-center cursor-pointer h-full">
                        <Icon icon={dropdown.selected.icon} height={18} />
                        <span>{dropdown.selected.label}</span>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48">
                      {dropdown.options.map((option, i) => (
                        <DropdownMenuItem
                          key={i}
                          onSelect={() => dropdown.handler(option)}
                          className="flex gap-2 items-center cursor-pointer"
                        >
                          <Icon
                            icon={option.icon}
                            width={20}
                            height={20}
                            className="text-primary rounded-full p-1 !w-auto !h-auto"
                          />
                          <span>{option.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
            {/* Button */}
            <div className="flex items-center gap-2">
              <Button
                onClick={generateImage}
                color={'primary'}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating && <Spinner />}
                <span className={isGenerating ? 'opacity-60' : ''}>Generate</span>
              </Button>
              <Button onClick={handleClear}>Clear</Button>
            </div>
          </div>
        </Card>
      </div>
      <ToastContainer />
    </div>
  );
}

export default ImagePrompt;
