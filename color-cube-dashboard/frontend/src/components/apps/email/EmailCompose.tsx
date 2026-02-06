import { useState } from 'react';
import { Textarea } from 'src/components/ui/textarea';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'src/components/ui/dialog';

const EmailCompose = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="w-full rounded-md" onClick={handleShow}>
        Compose
      </Button>
      <Dialog open={show} onOpenChange={setShow}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="pb-0">
            <DialogTitle>Compose Mail</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <Label htmlFor="to" className="capitalize">
                  To
                </Label>
                <Input type="text" id="to" className="form-control" />
              </div>
              <div className="col-span-12">
                <Label htmlFor="subject" className="capitalize">
                  Subject
                </Label>
                <Input id="subject" className="form-control" type="text" />
              </div>
              <div className="col-span-12">
                <Label htmlFor="message" className="capitalize">
                  Message
                </Label>
                <Textarea id="message" className="form-control-textarea" required rows={4} />
              </div>
              <div className="col-span-12">
                <Label htmlFor="attachment" className="capitalize">
                  Attachment
                </Label>
                <Input type="file" id="attachment" />
              </div>
              <div className="col-span-12">
                <DialogFooter className="p-0 pt-6 flex gap-2 justify-end">
                  <Button type="submit" onClick={() => setShow(false)}>
                    Send
                  </Button>
                  <Button variant={'error'} onClick={() => setShow(false)}>
                    Cancel
                  </Button>
                </DialogFooter>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailCompose;
