import express from 'express';
import flightControllers from '../controllers/flightControllers.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const {
    getAllFlights,
    getFlightById,
    addFlightForm,
    addFlight,
    updateFlight,
    deleteFlight
} = flightControllers;

router.get('/flights', getAllFlights);
router.get('/flights/:id', getFlightById);
router.get('/add-flight', verifyToken, addFlightForm);
router.post('/add-flight', addFlight);
router.put('/update-flight', updateFlight);
router.delete('/delete-flight', deleteFlight);

export default router;
