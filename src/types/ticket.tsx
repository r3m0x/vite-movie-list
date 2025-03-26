import { Slot } from "./slot";

interface Ticket {
    id: number;
    movie_id: number;
}

interface TicketDetails {
    title: string;
    selected_seats: Slot;
    selected_seats_count: number;
}

export interface TicketListingItemType extends Ticket, TicketDetails{};