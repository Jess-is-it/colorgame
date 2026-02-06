
import { useState } from "react";
import { Card } from "src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Badge } from "src/components/ui/badge";


const Status = () => {

  const [selectedStatus, setSelectedStatus] = useState("Publish");
  const statuses = ["Draft", "Schedule", "Publish", "Inactive"];

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <h5 className="card-title">Blog Status</h5>
          {selectedStatus === "Publish" ? (
            <Badge variant={"success"} className="h-3 w-3 p-0"></Badge>
          ) : selectedStatus === "Schedule" ? (
            <Badge variant={"secondary"} className="h-3 w-3 p-0"></Badge>
          ) : selectedStatus === "Draft" ? (
            <Badge variant={"error"} className="h-3 w-3 p-0"></Badge>
          ) : (
            <Badge variant={"warning"} className="h-3 w-3 p-0"></Badge>
          )}
        </div>
        <div >
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="select-md" id="countries">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <small className="text-xs text-dark dark:text-darklink">
            Set the blog status.
          </small>
        </div>
      </Card>
    </>
  );
};

export default Status;
