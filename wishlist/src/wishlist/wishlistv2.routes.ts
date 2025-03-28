import express from "express";
import { validate, verifyJWT } from "@src/middleware";
import * as Validation from './validation';
import * as Handler from './wishlist.handler';

const router = express.Router();

router.delete('/remove', verifyJWT, validate(Validation.removeProductFromWishlistSchema), Handler.removeProductFromWishlistHandlerV2);
router.post('/add', verifyJWT, validate(Validation.addProductToWishlistSchema), Handler.addProductToWishlistHandlerV2);


export default router;