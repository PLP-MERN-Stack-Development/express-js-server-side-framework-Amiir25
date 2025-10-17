const express = require('express');
router.put(
'/:id',
validateProductBody,
asyncHandler(async (req, res, next) => {
const { id } = req.params;
const { name, description, price, category, inStock } = req.body;
const idx = products.findIndex((p) => p.id === id);
if (idx === -1) return next(new NotFoundError('Product not found'));


const updated = {
...products[idx],
name,
description,
price,
category,
inStock,
};


products[idx] = updated;
res.json(updated);
})
);


// DELETE /api/products/:id - delete
router.delete(
'/:id',
asyncHandler(async (req, res, next) => {
const { id } = req.params;
const idx = products.findIndex((p) => p.id === id);
if (idx === -1) return next(new NotFoundError('Product not found'));
const deleted = products.splice(idx, 1)[0];
res.json({ message: 'Product deleted', product: deleted });
})
);


// GET /api/products/search?q=term - search by name (case-insensitive, substring)
router.get(
'/search',
asyncHandler(async (req, res) => {
const { q } = req.query;
if (!q) return res.json({ total: 0, data: [] });
const term = String(q).toLowerCase();
const results = products.filter((p) => p.name.toLowerCase().includes(term));
res.json({ total: results.length, data: results });
})
);


// GET /api/products/stats - product statistics (count by category)
router.get(
'/stats',
asyncHandler(async (req, res) => {
const stats = products.reduce((acc, p) => {
const cat = p.category || 'uncategorized';
acc[cat] = (acc[cat] || 0) + 1;
return acc;
}, {});
res.json({ total: products.length, countByCategory: stats });
})
);


module.exports = router;
