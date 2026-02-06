import { useContext } from 'react';
import { TicketContext } from 'src/context/ticket-context';
import { TicketType } from 'src/types/apps/ticket';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import { Alert, AlertTitle } from 'src/components/ui/alert';

import { Avatar, AvatarFallback, AvatarImage } from 'src/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';
import { Table, TableCell, TableHead, TableHeader, TableRow } from 'src/components/ui/table';
import {
  AnimatedTableWrapper,
  AnimatedTableBody,
  AnimatedTableRow,
} from 'src/components/animated-component/AnimatedTable';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';

const TicketListing = () => {
  const { tickets, deleteTicket, ticketSearch, setTicketSearch, filter } =
    useContext(TicketContext);

  const navigate = useNavigate();

  const getVisibleTickets = (tickets: TicketType[], filter: string, ticketSearch: string) => {
    switch (filter) {
      case 'total_tickets':
        return tickets.filter(
          (c) => !c.deleted && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Pending':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Pending' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Closed':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Closed' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Open':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Open' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const visibleTickets = getVisibleTickets(tickets, filter, ticketSearch.toLowerCase());

  const ticketBadge = (ticket: TicketType) => {
    return ticket.Status === 'Open'
      ? 'lightSuccess'
      : ticket.Status === 'Closed'
      ? 'lightError'
      : ticket.Status === 'Pending'
      ? 'lightWarning'
      : 'default';
  };

  return (
    <>
      {visibleTickets.length === 0 ? (
        <div className="px-6 pt-3 flex justify-center">
          <Alert variant="lighterror" className="max-w-sm w-full text-center">
            <Icon icon="tabler:alert-circle" height={18} color="red" />
            <AlertTitle className="ml-2 text-error">No Tickets available.</AlertTitle>
          </Alert>
        </div>
      ) : (
        <div className="my-6">
          <div className="flex justify-between items-center mb-4 gap-4">
            <Button onClick={() => navigate('/apps/tickets/create')} className="whitespace-nowrap">
              Create Ticket
            </Button>
            <div className="relative sm:max-w-60 max-w-full w-full">
              <Icon
                icon="solar:magnifer-line-duotone"
                height={18}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <InputPlaceholderAnimate
                value={ticketSearch}
                onChange={setTicketSearch}
                placeholders={['Search ticket...', 'Find ticket...', 'Look up ticket...']}
              />
            </div>
          </div>
          <AnimatedTableWrapper className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-base font-semibold py-3 whitespace-nowrap">
                    Id
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3 whitespace-nowrap">
                    Ticket
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3 whitespace-nowrap">
                    Assigned To
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3 whitespace-nowrap">
                    Status
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3 whitespace-nowrap">
                    Date
                  </TableHead>
                  <TableHead className="text-base font-semibold py-3 text-end">Action</TableHead>
                </TableRow>
              </TableHeader>
              <AnimatedTableBody className="divide-y divide-border dark:divide-darkborder">
                {visibleTickets.map((ticket, index) => (
                  <AnimatedTableRow key={ticket.Id} index={index}>
                    <TableCell className="whitespace-nowrap">{ticket.Id}</TableCell>
                    <TableCell className="max-w-md">
                      <h6 className="text-base truncate line-clamp-1">{ticket.ticketTitle}</h6>
                      <p className="text-sm text-darklink truncate line-clamp-1 text-wrap sm:max-w-56">
                        {ticket.ticketDescription}
                      </p>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div>
                          <Avatar>
                            <AvatarImage src={ticket.thumb} alt={ticket.AgentName} />
                            <AvatarFallback>{ticket.AgentName?.charAt(0) || 'A'}</AvatarFallback>
                          </Avatar>
                        </div>
                        <h6 className="text-base"> {ticket.AgentName}</h6>
                      </div>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge
                        variant={`${ticketBadge(ticket)}` as BadgeProps['variant']}
                        className={` rounded-md`}
                      >
                        {ticket.Status}
                      </Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <p className="text-sm text-darklink">
                        {format(new Date(ticket.Date), 'E, MMM d')}
                      </p>
                    </TableCell>
                    <TableCell className="text-end">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghosterror"
                              size="icon"
                              onClick={() => deleteTicket(ticket.Id)}
                            >
                              <Icon icon="tabler:trash" height="18" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete Ticket</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  </AnimatedTableRow>
                ))}
              </AnimatedTableBody>
            </Table>
          </AnimatedTableWrapper>
        </div>
      )}
    </>
  );
};

export default TicketListing;
