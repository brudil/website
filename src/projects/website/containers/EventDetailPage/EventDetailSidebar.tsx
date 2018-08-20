import React from 'react';
import { Event, TicketType } from '~types/events';
// import { MSLTickets } from '~components/EventDetailPage/MSLTickets';
import { SocialArray } from '~components/SocialArray';
import { EventAccessSidebar } from '~website/containers/EventDetailPage/EventAccessSidebar';
import { BuyButton } from '~website/containers/EventDetailPage/BuyButton';

interface IProps {
  event: Event;
  msl: any;
  onTicketButton(): void;
}

function mslSubtitle(msl: any) {
  if (!msl) {
    return 'loading';
  }

  if (msl.tickets.length <= 0) {
    return 'Not currently on sale';
  }

  const costs = msl.tickets.map((ticket: any) => ticket.value);

  const min = Math.min.apply(Math, costs);
  const max = Math.min.apply(Math, costs);

  if (min <= 0 && max <= 0) {
    return 'Free!';
  }

  return min === max ? `£${min}` : `from £${min}`;
}

export const EventDetailSidebar = (props: IProps) => {
  const { event, msl } = props;

  return (
    <aside>
      {event.ticketType === TicketType.Native ? (
        <BuyButton
          href={event.ticketData}
          title="Tickets"
          subtitle="via native.fm"
        />
      ) : null}
      {event.ticketType === TicketType.Eventbrite ? (
        <BuyButton
          href={event.ticketData}
          title="Tickets"
          subtitle="via Eventbrite"
        />
      ) : null}
      {event.ticketType === TicketType.MSL ? (
        <React.Fragment>
          {/*<BuyButton onClick={onTicketButton} title="Tickets" subtitle={mslSubtitle(msl)} />*/}
          <BuyButton
            href={event.ticketData}
            title="Get Tickets"
            subtitle={mslSubtitle(msl)}
          />
        </React.Fragment>
      ) : null}
      <EventAccessSidebar event={event} />
      {event.socialFacebook ? (
        <div>
          <h3>Social</h3>
          <SocialArray
            networks={{ facebook: { link: event.socialFacebook } }}
          />
        </div>
      ) : null}
    </aside>
  );
};
