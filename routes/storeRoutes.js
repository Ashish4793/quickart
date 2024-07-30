import express from 'express';
const router = express.Router();
import { getFPA } from '../controllers/getFPA.js';
import { getProduct } from '../controllers/getProduct.js';
import { getCategoryProduct } from '../controllers/getCategoryProduct.js';
import { addNewAddress, getUserAddress } from '../controllers/addressController.js';
import { getSearch } from '../controllers/searchController.js';
import { quickartElitePage , quickartEliteBilling } from '../controllers/quickartEliteMembershipController.js';

router.get("/" , getFPA);

router.get("/search" , getSearch);

router.get("/product" , getProduct);

router.get("/categories" , getCategoryProduct);

router.get("/select-address" , getUserAddress);

router.post("/add-address" , addNewAddress);

router.get("/quickart-elite" , quickartElitePage);

router.get("/quickart-elite/billing" , quickartEliteBilling);

export default router;