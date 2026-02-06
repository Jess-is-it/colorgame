import { GoogleGenAI, Modality } from '@google/genai';
import { http, HttpResponse } from 'msw';

import flower1 from '/src/assets/images/image-ai/flower1.jpg';
import flower2 from '/src/assets/images/image-ai/flower2.jpg';
import flower3 from '/src/assets/images/image-ai/flower3.jpg';
import flower4 from '/src/assets/images/image-ai/flower4.jpg';
import spaceship1 from '/src/assets/images/image-ai/spaceship1.jpg';
import spaceship2 from '/src/assets/images/image-ai/spaceship2.jpg';
import spaceship3 from '/src/assets/images/image-ai/spaceship3.jpg';
import spaceship4 from '/src/assets/images/image-ai/spaceship4.jpg';
import laptop1 from '/src/assets/images/image-ai/leptop1.jpg';
import laptop2 from '/src/assets/images/image-ai/leptop2.jpg';
import laptop3 from '/src/assets/images/image-ai/leptop3.jpg';
import laptop4 from '/src/assets/images/image-ai/leptop4.jpg';

const imageData = [
  flower1,
  flower2,
  flower3,
  flower4,
  spaceship1,
  spaceship2,
  spaceship3,
  spaceship4,
  laptop1,
  laptop2,
  laptop3,
  laptop4,
];

export const ImageAiHandlers = [
  http.get('/api/image-ai', () => {
    return HttpResponse.json({ status: 200, images: imageData });
  }),

  http.post('/api/image-ai', async ({ request }) => {
    const { prompt, currentIndex = 0 } = (await request.json()) as {
      prompt: string;
      currentIndex: number;
    };
    const GEMINI_API_KEY = import.meta.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      // MOCK mode
      const nextIndex = currentIndex % imageData.length;
      let nextImages = imageData.slice(nextIndex, nextIndex + 4);

      if (nextImages.length < 4) {
        nextImages = nextImages.concat(imageData.slice(0, 4 - nextImages.length));
      }

      return HttpResponse.json({
        images: imageData,
        isMock: true,
      });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.0-flash-preview-image-generation',
        contents: prompt,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });


      const generatedImages: string[] = [];
      const parts = response?.candidates?.[0]?.content?.parts;

      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            const imageData = part.inlineData.data;
            const mimeType = part.inlineData.mimeType || "image/png";

            // Convert base64 image data into data URL
            const dataUrl = `data:${mimeType};base64,${imageData}`;
            generatedImages.push(dataUrl);
          }
        }
      }

      return HttpResponse.json({
        images: generatedImages,
        isMock: false,
      });
    } catch (err) {
      console.error('Error generating with Gemini AI:', err);
      return HttpResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }
  }),
];
