import { useContext, useState } from 'react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { Icon } from '@iconify/react';
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SimpleBar from 'simplebar-react';
import { ProductType } from 'src/types/apps/ecommerce';
import { EcommerceContext } from 'src/context/ecommerce-context';
import { Card } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Alert, AlertDescription } from 'src/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'src/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from 'src/components/ui/dialog';
import { Table, TableHead, TableRow, TableHeader, TableCell } from 'src/components/ui/table';
import { Checkbox } from 'src/components/ui/checkbox';
import {
  AnimatedTableWrapper,
  AnimatedTableBody,
  AnimatedTableRow,
} from 'src/components/animated-component/AnimatedTable';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';
import noData from 'src/assets/images/svgs/no-data.webp';

const ProductTablelist = () => {
  const {
    filteredAndSortedProducts,
    deleteProduct,
    deleteAllProducts,
    searchProducts,
    updateProduct,
    getProductById,
  } = useContext(EcommerceContext);
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [imageURL, setImageURL] = useState<string>('');

  const handleSearch = (value: string) => {
    setSearch(String(value));
    searchProducts(value);
  };

  const handleEdit = (productId: string) => {
    const product = getProductById(productId);

    if (product) {
      setEditedProduct(product);
      setImageURL(product.photo);
      setOpenEditModal(true);
    }
  };

  const handleCloseEditModals = () => {
    setOpenEditModal(false);
    setEditedProduct(null);
    setImageURL('');
  };

  const handleSaveEdit = () => {
    if (editedProduct) {
      const updatedProduct = {
        ...editedProduct,
        photo: imageURL,
        created: selectedDate || editedProduct.created,
      };
      updateProduct(editedProduct.id.toString(), updatedProduct);
      handleCloseEditModals();
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedProducts(filteredAndSortedProducts.map((product) => Number(product.id)));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelectProduct = (productId: number) => {
    const index = selectedProducts.indexOf(productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter((id: number) => id !== productId));
    }
  };

  const handleDelete = () => {
    if (selectedProducts.length === 0) {
      setShowAlert(true); // Show alert after adding contact
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    if (selectedProducts.length > 0) {
      if (selectedProducts.length === filteredAndSortedProducts.length) {
        deleteAllProducts();
      } else {
        selectedProducts.forEach((productId: number) => {
          deleteProduct(productId);
        });
      }
      setSelectedProducts([]);
      setSelectAll(false);
    }
    setOpenDeleteDialog(false);
  };

  const handleDateChange = (created: Date | null) => {
    setSelectedDate(created);
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, created: created || new Date() });
    }
  };

  return (
    <>
      <Card>
        {/* Search  */}
        <div className="flex gap-3 justify-between items-center mb-5">
          <div className="relative w-full sm:max-w-60">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Icon icon="solar:magnifer-linear" height={18} />
            </span>
            <InputPlaceholderAnimate
              value={search}
              onChange={handleSearch}
              placeholders={['Search products...', 'Find top products...', 'Look up products...']}
            />
          </div>
          <div className="flex gap-4">
            {selectAll ? (
              <Button variant={'lighterror'} className="btn-circle p-0" onClick={handleDelete}>
                <Icon icon="tabler:trash" height={18} />
              </Button>
            ) : (
              <Button variant={'lightprimary'} className="btn-circle p-0">
                <Icon icon="tabler:filter" height={18} />
              </Button>
            )}
          </div>
        </div>
        {/* Table */}
        <SimpleBar className="max-h-[580px]">
          <AnimatedTableWrapper className="border rounded-md border-border dark:border-darkborder overflow-x-auto">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base font-semibold py-3">
                    <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3">Products</TableHead>
                  <TableHead className="text-base font-semibold py-3">Date</TableHead>
                  <TableHead className="text-base font-semibold py-3">Status</TableHead>
                  <TableHead className="text-base font-semibold py-3">Price</TableHead>
                  <TableHead className="text-base font-semibold py-3">Action</TableHead>
                </TableRow>
              </TableHeader>
              <AnimatedTableBody className="divide-y divide-border dark:divide-darkborder">
                {filteredAndSortedProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-ld">
                      <div className="flex flex-col items-center">
                        <img src={noData} alt="No data" height={100} width={100} className="mb-4" />
                      </div>
                      No products available.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAndSortedProducts.map((item: ProductType, index: number) => (
                    <AnimatedTableRow key={index} index={index}>
                      <TableCell className="whitespace-nowrap">
                        <Checkbox
                          checked={selectedProducts.includes(Number(item.id))}
                          onCheckedChange={() => toggleSelectProduct(Number(item.id))}
                        />
                      </TableCell>
                      <TableCell className="whitespace-nowrap lg:min-w-auto min-w-[250px]">
                        <div className="flex  gap-3 items-center">
                          <img
                            src={item.photo}
                            alt="icon"
                            width={56}
                            height={56}
                            className="h-14 w-14 rounded-full"
                          />
                          <div className="text-no-wrap">
                            <h6 className="text-base">{item.title}</h6>
                            <p className="text-sm ">{item.category}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <p className="text-sm  font-medium">
                          {format(new Date(item.created), 'E, MMM d yyyy')}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex gap-2 text-sm items-center  font-medium">
                          {item.stock ? (
                            <Badge variant={'success'} className="h-2 w-2 p-0 rounded-md"></Badge>
                          ) : (
                            <Badge variant={'error'} className="h-2 w-2 p-0 rounded-md"></Badge>
                          )}
                          {item.stock ? 'InStock' : 'Out of Stock'}
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <h5 className="text-base text-muted">${item.price}</h5>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <DropdownMenu modal={openDeleteDialog || openEditModal ? false : true}>
                          <DropdownMenuTrigger asChild>
                            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                              <HiOutlineDotsVertical size={22} />
                            </span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              className="flex gap-3 items-center cursor-pointer"
                              onClick={() => handleEdit(item.id.toString())}
                            >
                              <Icon icon="solar:pen-new-square-broken" height={18} />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="flex gap-3 items-center cursor-pointer"
                              onClick={handleDelete}
                            >
                              <Icon icon="solar:trash-bin-minimalistic-outline" height={18} />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </AnimatedTableRow>
                  ))
                )}
              </AnimatedTableBody>
            </Table>
          </AnimatedTableWrapper>
        </SimpleBar>
      </Card>
      <Dialog open={openDeleteDialog} onOpenChange={handleCloseDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Confirmation</DialogTitle>
          </DialogHeader>
          <p className="text-center text-lg my-6">
            Are you sure you want to delete selected products?
          </p>
          <DialogFooter className="flex justify-center gap-2">
            <Button variant="destructive" className="rounded-md" onClick={handleConfirmDelete}>
              Delete
            </Button>
            <Button variant="outline" className="rounded-md" onClick={handleCloseDeleteDialog}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Modal */}
      <Dialog open={openEditModal} onOpenChange={handleCloseEditModals}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {editedProduct && (
            <div className="grid grid-cols-12 gap-6 pt-4">
              <div className="col-span-12 lg:col-span-6">
                <Label htmlFor="ttl" className="mb-2 block capitalize">
                  Title
                </Label>
                <Input
                  id="ttl"
                  value={editedProduct.title}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Label htmlFor="price" className="mb-2 block capitalize">
                  Price
                </Label>
                <Input
                  id="price"
                  value={editedProduct.price}
                  onChange={(e) =>
                    setEditedProduct({
                      ...editedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Label htmlFor="stck" className="mb-2 block capitalize">
                  Stock
                </Label>
                <Select
                  value={editedProduct.stock ? 'In Stock' : 'Out of Stock'}
                  onValueChange={(value) =>
                    setEditedProduct({
                      ...editedProduct,
                      stock: value === 'In Stock',
                    })
                  }
                >
                  <SelectTrigger id="stck" className="select-md-contact">
                    <SelectValue placeholder="Select Stock Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Stock">IN Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Label htmlFor="dt" className="mb-2 block capitalize">
                  Date
                </Label>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="MMMM d, yyyy"
                  className="form-control-input w-full max-w-full py-[10px] border border-input rounded-md px-3"
                  id="dt"
                />
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Label htmlFor="img" className="mb-2 block capitalize">
                  Image URL
                </Label>
                <Input
                  id="img"
                  placeholder="Paste image URL"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                />
              </div>
              <div className="col-span-12">
                <Label htmlFor="imgPreview" className="mb-2 block capitalize">
                  Image Preview
                </Label>
                {imageURL && (
                  <img
                    id="imgPreview"
                    src={imageURL}
                    alt="Preview"
                    className="w-full max-w-[200px] h-auto object-cover rounded-md"
                  />
                )}
              </div>
            </div>
          )}
          <DialogFooter className="mt-6">
            <Button className="rounded-md" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button
              type="button"
              onClick={handleCloseEditModals}
              className="rounded-md border border-destructive text-destructive hover:bg-red-50"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showAlert && (
        <Alert variant="warning" className="fixed mx-auto start-0 end-0 top-15 w-fit">
          <AlertDescription className="ms-2 text-center ">
            Please select products to delete.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};

export default ProductTablelist;
