const { ensureAuthenticated } = require('../Middlewares/Auth');

const router = require('express').Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of products (protected route)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Products
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *       403:
 *         description: Unauthorized, JWT token is required
 */


router.get('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 10000
        },
        {
            name: "charger",
            price: 8000
        },
    ]);
});

module.exports = router;
