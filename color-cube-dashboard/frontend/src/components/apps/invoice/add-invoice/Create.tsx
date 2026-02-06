import { useState, useContext, useEffect, ChangeEvent } from 'react';
import { InvoiceContext } from 'src/context/invoice-context';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Calendar } from 'src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import { Badge } from 'src/components/ui/badge';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { Button } from 'src/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { order } from 'src/types/apps/invoice';

function CreateInvoice() {
  const { addInvoice, invoices } = useContext(InvoiceContext);
  const [showAlert, setShowAlert] = useState(false);

  const [editModeFrom, seteditModeFrom] = useState(false);
  const [editModeTo, seteditModeTo] = useState(false);

  const [date, setDate] = useState<Date | undefined>(new Date());

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: 0,
    billFrom: 'Acme Corp',
    billTo: 'Globex Industries',
    totalCost: 0,
    status: 'Pending',
    billFromAddress: '123 Market Street, San Francisco, CA 94103',
    billToAddress: '456 Innovation Ave, Austin, TX 73301',
    billFromPhone: '4151234567',
    billToPhone: '7379876543',
    billFromEmail: 'accounts@acmecorp.com',
    billToEmail: 'finance@globex.com',
    billFromFax: '1234567890',
    billToFax: '0987654321',
    orders: [{ itemName: '', unitPrice: 0, units: 0, unitTotalPrice: 0 }],
    vat: 0,
    grandTotal: 0,
    subtotal: 0,
    date: new Date().toISOString().split('T')[0], // create date
    dueDate: '',
  });
  useEffect(() => {
    if (invoices.length > 0) {
      const lastId = invoices[invoices.length - 1].id;
      setFormData((prevData) => ({
        ...prevData,
        id: lastId + 1,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        id: 1,
      }));
    }
  }, [invoices]);

  const calculateTotals = (orders: order[]) => {
    let subtotal = 0;

    orders.forEach((order) => {
      const unitPrice = order.unitPrice || 0;
      const units = order.units || 0;
      const totalCost = unitPrice * units;

      subtotal += totalCost;
      order.unitTotalPrice = totalCost;
    });

    const vat = subtotal * 0.1;
    const grandTotal = subtotal + vat;

    return { subtotal, vat, grandTotal };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };
      const totals = calculateTotals(newFormData.orders);
      return {
        ...newFormData,
        ...totals,
      };
    });
  };

  const handleOrderChange = (index: number, field: string, value: string) => {
    setFormData((prevData) => {
      const updatedOrders = [...prevData.orders];
      updatedOrders[index] = {
        ...updatedOrders[index],
        [field]: value,
      };
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleAddItem = () => {
    setFormData((prevData) => {
      const updatedOrders = [
        ...prevData.orders,
        { itemName: '', unitPrice: 0, units: 0, unitTotalPrice: 0 },
      ];
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleDeleteItem = (index: number) => {
    setFormData((prevData) => {
      const updatedOrders = prevData.orders.filter((_, i) => i !== index);
      const totals = calculateTotals(updatedOrders);
      return {
        ...prevData,
        orders: updatedOrders,
        ...totals,
      };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const invoiceToAdd = {
        ...formData,
        billFromPhone: Number(formData.billFromPhone),
        billToPhone: Number(formData.billToPhone),
        billFromFax: Number(formData.billFromFax),
        billToFax: Number(formData.billToFax),
        createdDate: formData.date,
        dueDate: formData.dueDate,
        orderDate: new Date(),
        completed: false,
        isSelected: false,
      };
      await addInvoice(invoiceToAdd);
      setFormData({
        id: 0,
        billFrom: '',
        billTo: '',
        totalCost: 0,
        status: 'Pending',
        billFromAddress: '',
        billToAddress: '',
        billFromPhone: '',
        billToPhone: '',
        billFromEmail: '',
        billToEmail: '',
        billFromFax: '',
        billToFax: '',
        orders: [{ itemName: '', unitPrice: 0, units: 0, unitTotalPrice: 0 }],
        vat: 0,
        grandTotal: 0,
        subtotal: 0,
        date: new Date().toISOString().split('T')[0], // reset to today
        dueDate: '',
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      seteditModeFrom(false);
      navigate('/apps/invoice/list');
    } catch (error) {
      console.error('Error adding invoice:', error);
    }
  };

  // toggle edit mode from
  const toggleEditModeFrom = () => seteditModeFrom((prev) => !prev);
  const toggleEditModeTo = () => seteditModeTo((prev) => !prev);

  return (
    <div>
      <div className="flex sm:flex-row flex-col justify-between items-start mb-6 gap-5">
        <h3 className="items-center mt-1 text-xl sm:order-1 order-2"># {formData.id}</h3>
        <div className="sm:order-2 order-1">
          <FullLogo />
        </div>
        <div className="sm:order-3 order-3">
          <Badge variant={'lightWarning'}>{formData.status}</Badge>
        </div>
      </div>
      <form>
        <div>
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billFrom" className="text-base">
                  Bill From
                </Label>
              </div>
              <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-md">
                <div className="flex justify-between items-start gap-2">
                  {editModeFrom ? (
                    <div className="flex flex-col gap-1 flex-1">
                      <Input
                        id="billFrom"
                        name="billFrom"
                        value={formData.billFrom}
                        onChange={handleChange}
                        type="text"
                        placeholder="Acme Corp"
                      />
                      <Input
                        id="billFromAddress"
                        name="billFromAddress"
                        value={formData.billFromAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="123 Market Street, San Francisco, CA 94103"
                      />
                      <Input
                        id="billFromEmail"
                        name="billFromEmail"
                        value={formData.billFromEmail}
                        onChange={handleChange}
                        type="text"
                        placeholder="accounts@acmecorp.com"
                      />
                      <Input
                        id="billFromPhone"
                        name="billFromPhone"
                        value={formData.billFromPhone}
                        onChange={handleChange}
                        type="text"
                        placeholder="4151234567"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 flex-1 text-muted text-sm">
                      <p>{formData.billFrom}</p>
                      <p>{formData.billFromEmail}</p>
                      <p>{formData.billFromAddress}</p>
                      <p>{formData.billFromPhone}</p>
                    </div>
                  )}
                  <button
                    className="p-2 rounded-full hover:cursor-pointer hover:bg-lightprimary hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEditModeFrom();
                    }}
                  >
                    {editModeFrom ? (
                      <Icon icon={'solar:check-read-linear'} width={20} height={20} />
                    ) : (
                      <Icon icon={'solar:pen-linear'} width={20} height={20} />
                    )}
                  </button>
                </div>
              </div>
              {/* create date */}
              <div className="py-5">
                <h6 className="text-sm ">Create date</h6>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      disabled
                      variant="outline"
                      className={` w-full justify-start text-left font-normal border border-ld hover:bg-transparent hover:border-primary ${
                        !date
                          ? 'text-muted-foreground hover:text-muted-foreground'
                          : 'text-ld hover:text-ld'
                      }`}
                    >
                      {date ? format(date, 'MMMM d, yyyy') : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="lg:col-span-6 md:col-span-6 col-span-12">
              <div className="mb-2 block">
                <Label htmlFor="billTo" className="text-base">
                  Bill To
                </Label>
              </div>
              <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-md flex flex-col gap-1">
                <div className="flex justify-between items-start gap-2">
                  {editModeTo ? (
                    <div className="flex flex-col gap-1 flex-1">
                      <Input
                        id="billTo"
                        name="billTo"
                        value={formData.billTo}
                        onChange={handleChange}
                        type="text"
                        placeholder="Globex Industries"
                      />
                      <Input
                        id="billToAddress"
                        name="billToAddress"
                        value={formData.billToAddress}
                        onChange={handleChange}
                        type="text"
                        placeholder="456 Innovation Ave, Austin, TX 73301"
                      />
                      <Input
                        id="billToEmail"
                        name="billToEmail"
                        value={formData.billToEmail}
                        onChange={handleChange}
                        type="text"
                        placeholder="finance@globex.com"
                      />
                      <Input
                        id="billToPhone"
                        name="billToPhone"
                        value={formData.billToPhone}
                        onChange={handleChange}
                        type="text"
                        placeholder="7379876543"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 flex-1 text-muted text-sm">
                      <p>{formData.billTo}</p>
                      <p>{formData.billToEmail}</p>
                      <p>{formData.billToAddress}</p>
                      <p>{formData.billToPhone}</p>
                    </div>
                  )}
                  <button
                    className="p-2 rounded-full hover:cursor-pointer hover:bg-lightprimary hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleEditModeTo();
                    }}
                  >
                    {editModeTo ? (
                      <Icon icon={'solar:check-read-linear'} width={20} height={20} />
                    ) : (
                      <Icon icon={'solar:pen-linear'} width={20} height={20} />
                    )}
                  </button>
                </div>
              </div>
              {/* due date */}
              <div className="py-5">
                <h6 className="text-sm">Due date</h6>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={` w-full justify-start text-left font-normal border border-ld hover:bg-transparent hover:border-primary ${
                        !formData.dueDate
                          ? 'text-muted-foreground hover:text-muted-foreground'
                          : 'text-ld hover:text-ld'
                      }`}
                    >
                      {formData.dueDate
                        ? format(new Date(formData.dueDate), 'MMMM d, yyyy')
                        : format(new Date(), 'MMMM d, yyyy')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={formData.dueDate ? new Date(formData.dueDate) : new Date()}
                      onSelect={(date) => {
                        if (date) {
                          setFormData((prev) => ({
                            ...prev,
                            dueDate: date.toISOString(),
                          }));
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        {/* Orders Table */}
        <div className="mt-6">
          <div className="overflow-x-auto overflow-y-hidden">
            <div className="mt-4 mb-10 border border-ld !rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Units</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead></TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-border dark:divide-darkborder">
                  {formData.orders.map((order, index) => (
                    <TableRow key={index}>
                      {/* Item Name */}
                      <TableCell className="whitespace-nowrap min-w-44">
                        <Input
                          type="text"
                          value={order.itemName}
                          placeholder="Item Name"
                          onChange={(e) => handleOrderChange(index, 'itemName', e.target.value)}
                        />
                      </TableCell>

                      {/* Unit Price */}
                      <TableCell className="whitespace-nowrap min-w-44">
                        <Input
                          type="number"
                          value={order.unitPrice}
                          placeholder="Unit Price"
                          onChange={(e) => handleOrderChange(index, 'unitPrice', e.target.value)}
                        />
                      </TableCell>

                      {/* Units */}
                      <TableCell className="whitespace-nowrap min-w-44">
                        <Input
                          type="number"
                          value={order.units}
                          placeholder="Units"
                          onChange={(e) => handleOrderChange(index, 'units', e.target.value)}
                        />
                      </TableCell>

                      {/* Total Cost */}
                      <TableCell className="whitespace-nowrap min-w-32">
                        {order.unitTotalPrice}
                      </TableCell>

                      <TableCell className="whitespace-nowrap"></TableCell>

                      {/* Action Buttons */}
                      <TableCell className="whitespace-nowrap flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="lightprimary"
                                size="icon"
                                onClick={handleAddItem}
                              >
                                <Icon icon="mdi:plus-circle" height={18} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent> Add Item </TooltipContent>
                          </Tooltip>

                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                variant="lighterror"
                                size="icon"
                                className="group"
                                onClick={() => handleDeleteItem(index)}
                              >
                                <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent> Delete Item </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        {/* Totals */}
        <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-md flex flex-col gap-1">
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full text-black/60 dark:text-white/60 font-normal">
                Sub Total:
              </h2>
              <h3 className="ms-auto  text-black/60 dark:text-white/60 font-normal">
                ${formData.subtotal}
              </h3>
            </div>
          </div>
          <div className="flex justify-end mb-3">
            <div className="flex gap-3 lg:w-1/5 border-b border-ld">
              <h2 className="max-w-52 w-full text-black/60 dark:text-white/60 font-normal">Tax:</h2>
              <h3 className="ms-auto text-black/60 dark:text-white/60 font-normal">
                {formData.vat}%
              </h3>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex gap-3 lg:w-1/5">
              <h2 className="max-w-52 w-full">Grand Total:</h2>
              <h3 className="ms-auto text-base">${formData.grandTotal}</h3>
            </div>
          </div>
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-end gap-3 mt-2">
            <Button className="mt-6" onClick={handleSubmit}>
              Create Invoice
            </Button>

            <Button
              variant={'destructive'}
              className="mt-6"
              onClick={() => {
                navigate('/apps/invoice/list');
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      {showAlert && (
        <div className="flex items-center justify-center">
          <Alert variant="warning" className="max-w-sm w-full text-center fixed top-3 rounded">
            <AlertTriangle className="h-4 w-4 " color="white" />
            <AlertDescription>Invoice added successfully.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
}

export default CreateInvoice;
