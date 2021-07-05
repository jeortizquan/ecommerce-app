import { Router, Request, Response } from 'express';
import { validateRequest } from '@src/controllers';
import { createProductHandler } from '@src/controllers/post-products-store';
import {
  createProductSchema,
  setProductInStockSchema,
  reserveProductSchema,
  unreserveProductSchema,
} from '@src/entities/schemas';
import { getAllProductsHandler, getProductHandler } from '@src/controllers/get-products';
import { updateProductStockHandler } from '@src/controllers/patch-product-set-in-stock';
import { productReserveStockHandler } from '@src/controllers/post-product-reserve-stock';
import { productUnReserveStockHandler } from '@src/controllers/post-product-unreserve-stock';
import { productSellStockHandler } from '@src/controllers/post-product-sell-stock';
import { healthHandler } from '@src/controllers/get-health';
import { welcomeHandler } from '@src/controllers/get-welcome';

const router = Router();

// welcome endpoint
router.get('/', welcomeHandler);

// health endpoint
router.get('/health', healthHandler);

// Create a product
router.post('/api/products', validateRequest(createProductSchema), createProductHandler);

// Update the stok
router.patch('/api/products/:id/stock', validateRequest(setProductInStockSchema), updateProductStockHandler);

// Get all products
router.get('/api/products/', getAllProductsHandler);

// Get a product
router.get('/api/products/:id', getProductHandler);

// Reserve a product
router.post('/api/products/:id/reserve', validateRequest(reserveProductSchema), productReserveStockHandler);

// Unreserve a product
router.post('/api/products/:id/unreserve', validateRequest(unreserveProductSchema), productUnReserveStockHandler);

// Sell a product
router.post('/api/products/:id/sold', validateRequest(unreserveProductSchema), productSellStockHandler);

export default router;
