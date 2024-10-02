import Flight from '../models/flightModels.js';

const flightControllers = {
    getAllFlights: (req, res) => {
        const flights = Flight.getAll();
        const { token } = req.cookies;
        res.status(200).render('flights', { flights, token });
    },
    getFlightById: (req, res) => {
        const { id } = req.params;
        const flight = Flight.getById(id);
        if (flight) {
            res.status(200).render('flight', { flight });
        } else {
            res.status(404).render('404', {
                title: 'The flight does not exist',
                message: 'The flight does not exist'
            });
        }
    },
    addFlightForm: (req, res) => {
        res.status(200).render('add-flight-form');
    },
    addFlight: (req, res) => {
        const { from, to, date, price, company } = req.body;

        if (from && to && date && price && company) {
            Flight.add({ from, to, date, price, company });
            res.status(201).redirect('/api/flights');
        } else {
            res.status(400).render('404', {
                title: 'Invalid input',
                message: 'All fields should be filled in'
            });
        }
    },
    updateFlight: (req, res) => {
        const { from, to, date, price, company } = req.body;
        const { id } = req.params;

        const flight = Flight.getById(id);
        if (flight) {
            if (from && to && date && price && company) {
                Flight.update(id, { from, to, date, price, company });
                res.status(200).json(flight);
            }
        } else {
            res.status(400).json({
                title: 'Flight not found',
                message: 'Flight not found'
            });
        }
    },
    deleteFlight: (req, res) => {
        const { id } = req.params;
        const flight = Flight.getById(id);
        if (flight) {
            Flight.deleteFlight(id);
            res.status(200).json(flight);
        } else {
            res.status(404).json({
                title: 'Flight not found',
                message: 'Flight not found'
            });
        }
    }
};

export default flightControllers;
