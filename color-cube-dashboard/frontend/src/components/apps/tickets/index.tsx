import TicketFilter from 'src/components/apps/tickets/TicketFilter';
import TicketListing from 'src/components/apps/tickets/TicketListing';
import { TicketProvider } from 'src/context/ticket-context/index';
import { Card } from 'src/components/ui/card';

const TicketsApp = () => {
  return (
    <>
      <TicketProvider>
        <Card>
          <TicketFilter />
          <TicketListing />
        </Card>
      </TicketProvider>
    </>
  );
};

export default TicketsApp;
