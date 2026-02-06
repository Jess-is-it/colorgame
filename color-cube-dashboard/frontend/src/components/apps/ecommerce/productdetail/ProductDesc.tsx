import OutlineCard from 'src/components/shared/OutlineCard';
import { Icon } from '@iconify/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'src/components/ui/tabs';
import { Progress } from 'src/components/ui/progress';
import { Button } from 'src/components/ui/button';
import { Star } from 'lucide-react';

const ProductDesc = () => {
  return (
    <>
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="mt-4">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <div className="py-4">
            <h5 className="text-lg mb-6">
              Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet
              lorem.
            </h5>
            <p className="text-sm text-muted-foreground mb-6">
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
              fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
              volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
            </p>
            <p className="text-sm text-muted-foreground">
              Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
              fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
              volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="py-4">
            <div className="grid grid-cols-12 gap-5">
              {/* Average Rating Card */}
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col justify-center items-center py-5">
                    <h6 className="text-sm text-muted-foreground">Average Rating</h6>
                    <h2 className="text-4xl text-primary my-3">4/5</h2>
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5"
                          fill={i < 4 ? '#facc15' : 'none'}
                          stroke={i < 4 ? '#facc15' : '#d1d5db'}
                        />
                      ))}
                    </div>
                  </div>
                </OutlineCard>
              </div>

              {/* Star Distribution */}
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col gap-3 p-4">
                    {[
                      { stars: '1 Stars', value: 45, count: 485 },
                      { stars: '2 Stars', value: 30, count: 215 },
                      { stars: '3 Stars', value: 25, count: 110 },
                      { stars: '4 Stars', value: 80, count: 620 },
                      { stars: '5 Stars', value: 20, count: 160 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-5">
                        <span className="text-xs text-muted-foreground">{item.stars}</span>
                        <div className="grow">
                          <Progress value={item.value} />
                        </div>
                        <span className="text-sm font-semibold text-muted">({item.count})</span>
                      </div>
                    ))}
                  </div>
                </OutlineCard>
              </div>

              {/* Write Review Button */}
              <div className="lg:col-span-4 col-span-12 flex items-stretch">
                <OutlineCard className="shadow-none">
                  <div className="flex flex-col justify-center items-center py-5">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Icon icon="solar:pen-2-outline" height={22} />
                      Write a review
                    </Button>
                  </div>
                </OutlineCard>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductDesc;
