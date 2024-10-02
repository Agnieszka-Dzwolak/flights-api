import { v4 as Id } from 'uuid';

const flights = [
    {
        id: Id(),
        from: 'Paris',
        to: 'Warsaw',
        date: '2024-01-02',
        price: 700,
        company: 'Air France'
    },
    {
        id: Id(),
        from: 'Brussels',
        to: 'Berlin',
        date: '2024-08-04',
        price: 800,
        company: 'Brussels Airlines'
    }
];

class Flight {
    static getAll() {
        return flights;
    }
    static getById(id) {
        return flights.find((flight) => flight.id === id);
    }
    static add(flight) {
        const newFlight = {
            id: Id(),
            ...flight
        };
        flights.unshift(newFlight);
        return newFlight;
    }

    static update(id, flight) {
        const updatedFlight = flights.find((flight) => flight.id === id);
        if (updatedFlight) {
            updatedFlight.from = flight.from;
            updatedFlight.to = flight.to;
            updatedFlight.date = flight.date;
            updatedFlight.price = flight.price;
            updatedFlight.company = flight.company;
        }
    }
    static deleteFlight(id, flight) {
        const index = flights.findIndex((flight) => flight.id === id);
        flights.splice(index, 1);
        return { id };
    }
}

export default Flight;
