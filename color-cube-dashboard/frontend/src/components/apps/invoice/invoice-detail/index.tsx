import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { InvoiceContext } from 'src/context/invoice-context';
import { Link, useLocation } from 'react-router';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';
import { useReactToPrint } from 'react-to-print';
import { format, isValid, parseISO } from 'date-fns';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import { Label } from 'src/components/ui/label';
import { InvoiceList } from 'src/types/apps/invoice';

const InvoiceDetail = () => {
  const { invoices } = useContext(InvoiceContext);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceList | null>(null);
  const [openModal, setOpenModal] = useState(false);

  // print the page
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    // Set the first invoice as the default selected invoice initially
    if (invoices.length > 0) {
      setSelectedInvoice(invoices[0]);
    }
  }, [invoices]);

  // Get the last part of the URL path as the billFrom parameter
  const location = useLocation();
  const pathName = location.pathname;
  const getTitle = pathName.split('/').pop();

  // Find the invoice that matches the billFrom extracted from the URL
  useEffect(() => {
    if (getTitle) {
      const invoice = invoices.find((p: { billFrom: string }) => p.billFrom === getTitle);
      if (invoice) {
        setSelectedInvoice(invoice);
      }
    }
  }, [getTitle, invoices]);

  if (!selectedInvoice) {
    return <div>Loading...</div>;
  }

  // const createDate = selectedInvoice.createdDate
  //   ? isValid(parseISO(selectedInvoice.createdDate))
  //     ? format(parseISO(selectedInvoice.createdDate), 'dd MMMM yyyy')
  //     : 'Invalid Date'
  //   : format(new Date(), 'EEEE, MMMM dd, yyyy');

  // const dueDate = selectedInvoice.dueDate
  //   ? isValid(parseISO(selectedInvoice.dueDate))
  //     ? format(parseISO(selectedInvoice.dueDate), 'dd MMMM yyyy')
  //     : 'Invalid Date'
  //   : format(new Date(), 'EEEE, MMMM dd, yyyy');

  const formatInvoiceDate = (date: string | Date | undefined) => {
    if (!date) return format(new Date(), 'EEEE, MMMM dd, yyyy');
    const parsedDate = typeof date === 'string' ? parseISO(date) : date;
    return isValid(parsedDate) ? format(parsedDate, 'dd MMMM yyyy') : 'Invalid Date';
  };

  const createDate = formatInvoiceDate(selectedInvoice.createdDate);
  const dueDate = formatInvoiceDate(selectedInvoice.dueDate);

  // download pdf
  const handleDownloadPdf = async () => {
    const node = contentRef.current;

    if (node) {
      node.classList.add('no-scrollbar');
      const dataUrl = await toPng(node);
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${selectedInvoice.id}.pdf`);
    }
  };
  return (
    <>
      {/* top links */}
      <div className="p-4 bg-body rounded-2xl">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="sm:border-e sm:border-ld sm:pe-3">
            <Button variant={'ghost'} asChild>
              <Link
                to={`/apps/invoice/edit/${selectedInvoice.billFrom}`}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Icon icon="solar:pen-linear" width={20} height={20} />
                Edit Invoice
              </Link>
            </Button>
          </div>
          <div className="sm:border-e sm:border-ld sm:pe-3">
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 text-sm font-medium"
              onClick={reactToPrintFn}
            >
              <span>
                <Icon icon={'solar:eye-linear'} width={20} height={20} />
              </span>
              View Invoice
            </Button>
          </div>
          <div className="sm:border-e sm:border-ld sm:pe-3">
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 text-sm font-medium"
              onClick={handleDownloadPdf}
            >
              <span>
                <Icon icon={'solar:cloud-download-linear'} width={20} height={20} />
              </span>
              Download Invoice
            </Button>
          </div>
          <div className="sm:border-e sm:border-ld sm:pe-3">
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 text-sm font-medium"
              onClick={reactToPrintFn}
            >
              <span>
                <Icon icon={'solar:printer-linear'} width={20} height={20} />
              </span>
              Print Invoice
            </Button>
          </div>
          <div>
            <Button
              variant={'ghost'}
              className="flex items-center gap-2 text-sm font-medium"
              onClick={() => setOpenModal(true)}
            >
              <span>
                <Icon icon={'solar:plain-linear'} width={20} height={20} />
              </span>
              Send Invoice
            </Button>
          </div>
        </div>
      </div>
      <div className="border-t border-border my-5" />
      {/* previous code */}
      <div ref={contentRef}>
        <div className="flex sm:flex-row flex-col justify-between items-start mb-6 gap-5">
          <h3 className="items-center mt-1 text-xl sm:order-1 order-2"># {selectedInvoice.id}</h3>
          <div className="sm:order-2 order-1">
            <FullLogo />
          </div>
          <div className="sm:order-3 order-3">
            <Badge variant={'success'}>{selectedInvoice.status}</Badge>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="md:col-span-6 col-span-12">
            <Label className="text-base">Bill From</Label>
            <div className="p-4 bg-body border border-border rounded-2xl flex flex-col gap-1">
              <p className="text-foreground">{selectedInvoice.billFrom}</p>
              <p className="text-foreground">{selectedInvoice.billFromEmail}</p>
              <p className="text-foreground">{selectedInvoice.billFromAddress}</p>
              <p className="text-foreground">{selectedInvoice.billFromPhone}</p>
            </div>
            <div className="py-5">
              <Label className="text-sm">Create date</Label>
              <h6>{createDate}</h6>
            </div>
          </div>
          <div className="md:col-span-6 col-span-12">
            <Label className="text-base">Bill To</Label>
            <div className="p-4 bg-body border border-border rounded-2xl flex flex-col gap-1">
              <p className="text-foreground">{selectedInvoice.billTo}</p>
              <p className="text-foreground">{selectedInvoice.billToEmail}</p>
              <p className="text-foreground">{selectedInvoice.billToAddress}</p>
              <p className="text-foreground">{selectedInvoice.billToPhone}</p>
            </div>
            <div className="py-5">
              <Label className="text-sm">Due date</Label>
              <h6>{dueDate}</h6>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <div className="mb-10 border border-border rounded-2xl!">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead className="text-end">Total Cost</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedInvoice.orders.map(
                  (
                    order: {
                      itemName:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                      unitPrice:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                      units:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                      unitTotalPrice:
                        | string
                        | number
                        | boolean
                        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                        | Iterable<React.ReactNode>
                        | React.ReactPortal
                        | Iterable<React.ReactNode>
                        | null
                        | undefined;
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <TableRow key={index}>
                      <TableCell className="whitespace-nowrap">
                        <h5 className="text-sm">{order.itemName}</h5>
                      </TableCell>
                      <TableCell className="text-ld">{order.unitPrice}</TableCell>
                      <TableCell className="text-ld">{order.units}</TableCell>
                      <TableCell className="text-end">
                        <h4 className="text-sm">{order.unitTotalPrice}</h4>
                      </TableCell>
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
          <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-2xl flex flex-col gap-1">
            <div className="flex justify-end mb-3">
              <div className="flex gap-3 lg:w-1/5">
                <h2 className="max-w-52 w-full text-black/60 dark:text-white/60 font-normal">
                  Sub Total:
                </h2>
                <h3 className="ms-auto text-base text-black/60 dark:text-white/60 font-normal">
                  ${selectedInvoice.totalCost}
                </h3>
              </div>
            </div>
            <div className="flex justify-end mb-3">
              <div className="flex gap-3 lg:w-1/5 border-b border-ld">
                <h2 className="max-w-52 w-full text-black/60 dark:text-white/60 font-normal">
                  Tax:
                </h2>
                <h3 className="ms-auto text-base text-black/60 dark:text-white/60 font-normal">
                  {selectedInvoice.vat}%
                </h3>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex gap-3 lg:w-1/5">
                <h2 className="max-w-52 w-full">Grand Total:</h2>
                <h3 className="ms-auto text-base">${selectedInvoice.grandTotal}</h3>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs">
              <strong>Notes:</strong> Thank you for your business. If you have any questions
              regarding this invoice, feel free to contact us.
            </p>
          </div>
        </div>
      </div>
      {/* send invoice modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to send this invoice to <strong>toFirst@agth.com?</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end">
            <Button variant="destructive" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpenModal(false)}>Send</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default InvoiceDetail;
