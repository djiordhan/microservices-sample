import { Router } from 'express';

const router = Router();

// POST /orders - Create a new order
router.post('/orders', (req, res) => {
    const orderData = req.body;
    // Logic to create a new order
    res.status(201).send({ message: 'Order created successfully', order: orderData });
});

// DELETE /orders/:tracking_number - Cancel an order
router.delete('/orders/:tracking_number', (req, res) => {
    const { tracking_number } = req.params;
    // Logic to cancel the order
    res.send({ message: `Order with tracking number ${tracking_number} canceled successfully` });
});

// GET /orders/:tracking_number/label - Get label information for an order
router.get('/orders/:tracking_number/label', (req, res) => {
    const { tracking_number } = req.params;
    // Logic to get label information
    const labelInfo = { tracking_number, label: 'Sample Label Information' };
    res.send(labelInfo);
});

export default router;