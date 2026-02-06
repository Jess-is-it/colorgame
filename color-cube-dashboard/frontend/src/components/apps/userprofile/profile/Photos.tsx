import user1 from 'src/assets/images/profile/user-2.jpg';
import user2 from 'src/assets/images/profile/user-3.jpg';
import user3 from 'src/assets/images/profile/user-4.jpg';
import user4 from 'src/assets/images/profile/user-5.jpg';
import user5 from 'src/assets/images/profile/user-6.jpg';
import user6 from 'src/assets/images/profile/user-7.jpg';
import user7 from 'src/assets/images/profile/user-8.jpg';
import user8 from 'src/assets/images/profile/user-9.jpg';
import user9 from 'src/assets/images/profile/user-10.jpg';
import { Card } from 'src/components/ui/card';

const photos = [
  {
    cardimg: user1,
    id: 1,
  },
  {
    cardimg: user2,
    id: 2,
  },
  {
    cardimg: user3,
    id: 3,
  },
  {
    cardimg: user4,
    id: 4,
  },
  {
    cardimg: user5,
    id: 5,
  },
  {
    cardimg: user6,
    id: 6,
  },
  {
    cardimg: user7,
    id: 7,
  },
  {
    cardimg: user8,
    id: 8,
  },
  {
    cardimg: user9,
    id: 9,
  },
];

const Photos = () => {
  return (
    <>
      <Card>
        <h5 className="card-title mb-2">Photos</h5>
        <div className="grid grid-cols-12 gap-5">
          {photos.map((photo) => (
            <div key={photo.id} className="md:col-span-4 sm:col-span-6 col-span-4">
              <img src={photo.cardimg} alt="profile" className="rounded-md" />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
};

export default Photos;
