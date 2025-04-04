import { NewWishlistDetail } from "@db/schema/wishlistDetail";
import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse, UnauthorizedResponse } from "@src/commons/patterns";
import { addProductToWishlist } from "../dao/addProductToWishlist.dao";
import { getWishlistById } from "../dao/getWishlistById.dao";
import { User } from "@src/types";

export const addProductToWishlistServiceV2 = async (
    wishlist_id: string,
    product_id: string,
    user: User,
) => {
    try {
        const SERVER_TENANT_ID = process.env.TENANT_ID;
        if (!SERVER_TENANT_ID) {
            return new InternalServerErrorResponse('Server tenant ID is missing').generate();
        }

        if (!user.id) {
            return new BadRequestResponse('User ID is missing').generate();
        }

        const wishlist = await getWishlistById(SERVER_TENANT_ID, wishlist_id);
        if (!wishlist) {
            return new NotFoundResponse('Wishlist not found').generate();
        }

        if (wishlist.user_id !== user.id) {
            return new UnauthorizedResponse('User is not authorized to add product to this wishlist').generate();
        }

        const wishlistDetailData: NewWishlistDetail = {
            product_id,
            wishlist_id,
        }

        const wishlistDetail = await addProductToWishlist(wishlistDetailData);

        return {
            data: wishlistDetail,
            status: 201,
        };
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}