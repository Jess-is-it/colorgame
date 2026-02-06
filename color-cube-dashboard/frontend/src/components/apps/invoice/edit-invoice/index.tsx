import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { InvoiceContext } from 'src/context/invoice-context';
import { Icon } from '@iconify/react';
import FullLogo from 'src/layouts/full/shared/logo/FullLogo';
import { Calendar } from 'src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import { Badge, BadgeProps } from 'src/components/ui/badge';
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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from 'src/components/ui/tooltip';
import { Button } from 'src/components/ui/button';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { order } from 'src/types/apps/invoice';

const EditInvoicePage = () => {
  const { invoices, updateInvoice } = useContext(InvoiceContext);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [_, setEditing] = useState(false);
  const [editedInvoice, setEditedInvoice]: any = useState(null);
  // form edit toggle
  const [editModeFrom, seteditModeFrom] = useState(false);
  const [editModeTo, seteditModeTo] = useState(false);

  const location = useLocation();
  const pathName = location.pathname;

  let getTitle = pathName.split('/').pop();
  if (getTitle) {
    getTitle = decodeURIComponent(getTitle);
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (invoices.length > 0) {
      if (getTitle) {
        const invoice = invoices.find((inv: { billFrom: string }) => inv.billFrom === getTitle);
        if (invoice) {
          setSelectedInvoice(invoice);
          setEditedInvoice({ ...invoice });
          setEditing(true);
        } else {
          setSelectedInvoice(invoices[0]);
          setEditedInvoice({ ...invoices[0] });
          setEditing(true);
        }
      } else {
        setSelectedInvoice(invoices[0]);
        setEditedInvoice({ ...invoices[0] });
        setEditing(true);
      }
    }
  }, [getTitle, invoices]);

  const handleSave = async () => {
    try {
      await updateInvoice(editedInvoice);
      setSelectedInvoice({ ...editedInvoice });
      setEditing(false); // Exit editing mode
      setShowAlert(true);

      // Navigate to the list page
      navigate('/apps/invoice/list');
    } catch (error) {
      console.error('Error updating invoice:', error);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  // Function to cancel editing
  const handleCancel = () => {
    setEditing(false);
    navigate('/apps/invoice/list');
  };
  const handleOrderChange = (
    index: string | number | any,
    field: string,
    value: string | number,
  ) => {
    const updatedOrders = [...editedInvoice.orders];
    updatedOrders[index][field] = value;

    // Calculate unitTotalPrice for the changed item
    if (field === 'unitPrice' || field === 'units') {
      updatedOrders[index].unitTotalPrice =
        updatedOrders[index].unitPrice * updatedOrders[index].units;
    }

    // Update editedInvoice with updated orders and recalculate totals
    const updatedInvoice = {
      ...editedInvoice,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };

    setEditedInvoice(updatedInvoice);
  };

  // Function to add a new item to the invoice
  const handleAddItem = () => {
    const newItem = {
      itemName: '',
      unitPrice: 0,
      units: 0,
      unitTotalPrice: 0,
      vat: 0,
    };
    const updatedOrders = [...editedInvoice.orders, newItem];

    // Update editedInvoice with updated orders and recalculate totals
    const updatedInvoice = {
      ...editedInvoice,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };
    setEditedInvoice(updatedInvoice);
  };

  // Function to delete an item from the invoice

  const handleDeleteItem = (index: any) => {
    const updatedOrders = editedInvoice.orders.filter((_: any, i: any) => i !== index);

    const updatedInvoice = {
      ...editedInvoice,
      orders: updatedOrders,
      totalCost: calculateTotalCost(updatedOrders),
      vat: calculateVAT(updatedOrders),
      grandTotal: calculateGrandTotal(
        calculateTotalCost(updatedOrders),
        calculateVAT(updatedOrders),
      ),
    };
    setEditedInvoice(updatedInvoice);
  };

  // Function to calculate total cost based on updated orders
  const calculateTotalCost = (orders: order[]) => {
    return orders.reduce((total, order) => total + order.unitTotalPrice, 0);
  };

  // Function to calculate total VAT based on updated orders
  const calculateVAT = (orders: order[]) => {
    return orders.reduce((totalVAT, order) => totalVAT + order.units, 0);
  };

  // Function to calculate grand total based on total cost and VAT
  const calculateGrandTotal = (totalCost: number, vat: number) => {
    return (totalCost += (totalCost * vat) / 100);
  };

  if (!selectedInvoice) {
    return <div>please select invoice</div>;
  }
  type StatusType = (typeof statusOptions)[number];

  const handleSelect = (status: StatusType) => {
    setEditedInvoice({ ...editedInvoice, status });
  };
  // status
  const statusOptions = ['Paid', 'Overdue', 'Pending', 'Draft'] as const;

  const statusBadgeColorMap: Record<string, string> = {
    Paid: 'lightSuccess',
    Overdue: 'lightError',
    Pending: 'lightWarning',
    Draft: 'lightInfo',
  };

  // toggle edit mode from
  const toggleEditModeFrom = () => seteditModeFrom((prev) => !prev);
  const toggleEditModeTo = () => seteditModeTo((prev) => !prev);

  return (
    <div>
      <div className="flex sm:flex-row flex-col justify-between items-start mb-6 gap-5">
        <h3 className="items-center mt-1 text-xl sm:order-1 order-2"># {editedInvoice.id}</h3>
        <div className="sm:order-2 order-1">
          <FullLogo />
        </div>
        <div className="sm:order-3 order-3">
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  role="button"
                  aria-label="Select invoice status"
                  className="bg-white dark:bg-dark border border-ld text-black hover:border-primary px-3 py-1 rounded cursor-pointer"
                >
                  <Badge
                    variant={
                      (statusBadgeColorMap[editedInvoice.status] as BadgeProps['variant']) ||
                      'warning'
                    }
                  >
                    {editedInvoice.status}
                  </Badge>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-background">
                {statusOptions.map((status) => (
                  <DropdownMenuItem key={status} onClick={() => handleSelect(status)}>
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="billFrom" className="text-base">
                Bill From
              </Label>
            </div>
            <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-2xl">
              <div className="flex justify-between items-start gap-2">
                {editModeFrom ? (
                  <div className="flex flex-col gap-1 flex-1">
                    <Input
                      id="billFrom"
                      name="billFrom"
                      value={editedInvoice.billFrom}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billFrom: e.target.value,
                        })
                      }
                      type="text"
                    />
                    <Input
                      id="billFromAddress"
                      name="billFromAddress"
                      value={editedInvoice.billFromAddress}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billFromAddress: e.target.value,
                        })
                      }
                      type="text"
                    />
                    <Input
                      id="billFromEmail"
                      name="billFromEmail"
                      value={editedInvoice.billFromEmail}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billFromEmail: e.target.value,
                        })
                      }
                      type="email"
                    />
                    <Input
                      id="billFromPhone"
                      name="billFromPhone"
                      value={editedInvoice.billFromPhone}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billFromPhone: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-foreground">{editedInvoice.billFrom}</p>
                    <p className="text-foreground">{editedInvoice.billFromEmail}</p>
                    <p className="text-foreground">{editedInvoice.billFromAddress}</p>
                    <p className="text-foreground">{editedInvoice.billFromPhone}</p>
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
              <Label className="text-sm">Create date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={` w-full justify-start text-left font-normal border border-ld hover:bg-transparent hover:border-primary ${
                      !editedInvoice.createdDate
                        ? 'text-muted hover:text-muted'
                        : 'text-muted hover:text-muted'
                    }`}
                  >
                    {editedInvoice.createdDate
                      ? format(new Date(editedInvoice.createdDate), 'MMMM d, yyyy')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={
                      editedInvoice.createdDate ? new Date(editedInvoice.createdDate) : undefined
                    }
                    onSelect={(date) => {
                      if (date instanceof Date && !isNaN(date.getTime())) {
                        setEditedInvoice((prev: order) => ({
                          ...prev,
                          createdDate: date,
                        }));
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/*  */}
          <div className="lg:col-span-6 md:col-span-6 col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="billTo" className="text-base">
                Bill To
              </Label>
            </div>
            <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-2xl flex flex-col gap-1">
              <div className="flex justify-between items-start gap-2">
                {editModeTo ? (
                  <div className="flex flex-col gap-1 flex-1">
                    <Input
                      id="billTo"
                      name="billTo"
                      value={editedInvoice.billTo}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billTo: e.target.value,
                        })
                      }
                      type="text"
                    />
                    <Input
                      id="billToAddress"
                      name="billToAddress"
                      value={editedInvoice.billToAddress}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billToAddress: e.target.value,
                        })
                      }
                      type="text"
                    />
                    <Input
                      id="billToEmail"
                      name="billToEmail"
                      value={editedInvoice.billToEmail}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billToEmail: e.target.value,
                        })
                      }
                      type="email"
                    />
                    <Input
                      id="billToPhone"
                      name="billToPhone"
                      value={editedInvoice.billToPhone}
                      onChange={(e) =>
                        setEditedInvoice({
                          ...editedInvoice,
                          billToPhone: e.target.value,
                        })
                      }
                      type="text"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-foreground">{editedInvoice.billTo}</p>
                    <p className="text-foreground">{editedInvoice.billToEmail}</p>
                    <p className="text-foreground">{editedInvoice.billToAddress}</p>
                    <p className="text-foreground">{editedInvoice.billToPhone}</p>
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
              <Label className="text-sm">Due date</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal border border-ld hover:bg-transparent hover:border-primary ${
                      !editedInvoice.dueDate
                        ? 'text-muted  hover:text-muted'
                        : 'text-muted hover:text-muted'
                    }`}
                  >
                    {editedInvoice.dueDate
                      ? format(new Date(editedInvoice.dueDate), 'MMMM d, yyyy')
                      : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={editedInvoice.dueDate ? new Date(editedInvoice.dueDate) : undefined}
                    onSelect={(date) => {
                      if (date instanceof Date && !isNaN(date.getTime())) {
                        setEditedInvoice((prev: any) => ({
                          ...prev,
                          dueDate: date,
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
      <div className="mt-4 mb-10 border border-border rounded-2xl!">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Name</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-border">
              {editedInvoice.orders.map(
                (
                  order: {
                    itemName: string | number | readonly string[] | undefined;
                    unitPrice: string | number | readonly string[] | undefined;
                    units: string | number | readonly string[] | undefined;
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
                  <TableRow key={index} className="">
                    <TableCell className="whitespace-nowrap min-w-44">
                      <Input
                        type="text"
                        value={order.itemName}
                        onChange={(e) => handleOrderChange(index, 'itemName', e.target.value)}
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap min-w-44">
                      <Input
                        type="number"
                        value={order.unitPrice}
                        onChange={(e) =>
                          handleOrderChange(index, 'unitPrice', parseFloat(e.target.value))
                        }
                      />
                    </TableCell>
                    <TableCell className="whitespace-nowrap min-w-44">
                      <Input
                        type="number"
                        value={order.units}
                        onChange={(e) =>
                          handleOrderChange(index, 'units', parseInt(e.target.value))
                        }
                      />
                    </TableCell>

                    <TableCell className="whitespace-nowrap min-w-32">
                      {order.unitTotalPrice}
                    </TableCell>
                    <TableCell className="whitespace-nowrap flex item-center gap-2">
                      <TooltipProvider>
                        {/* Add Item Button with Tooltip */}
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
                          <TooltipContent side="bottom">Add Item</TooltipContent>
                        </Tooltip>

                        {/* Delete Invoice Button with Tooltip */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              variant="lighterror"
                              size="icon"
                              onClick={() => handleDeleteItem(index)}
                            >
                              <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="bottom">Delete Invoice</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="p-4 bg-body dark:bg-darkbody border border-ld rounded-2xl flex flex-col gap-1 mb-10">
        <div className="flex justify-end mb-3">
          <div className="flex gap-3 lg:w-1/5">
            <p className="max-w-52 w-full font-normal">Sub Total:</p>
            <p className="ms-auto font-normal">${editedInvoice.totalCost}</p>
          </div>
        </div>
        <div className="flex justify-end mb-3">
          <div className="flex gap-3 lg:w-1/5 border-b border-ld">
            <p className="max-w-52 w-full font-normal">Tax:</p>
            <p className="ms-auto font-normal">{editedInvoice.vat}%</p>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex gap-3 lg:w-1/5">
            <h4 className="max-w-52 w-full">Grand Total:</h4>
            <h3 className="ms-auto text-base">${editedInvoice.grandTotal}</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <Button onClick={handleSave}>Update Invoice</Button>
        <Button variant={'error'} onClick={handleCancel}>
          Cancel
        </Button>
      </div>

      {showAlert && (
        <div className="flex items-center justify-center">
          <Alert variant="warning" className="max-w-sm w-full text-center fixed top-3 rounded">
            <AlertTriangle className="h-4 w-4 " color="white" />

            <AlertDescription>Invoice data updated successfully.</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};
export default EditInvoicePage;
