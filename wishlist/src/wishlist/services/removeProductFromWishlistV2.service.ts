import { BadRequestResponse, InternalServerErrorResponse, NotFoundResponse, UnauthorizedResponse } from "@src/commons/patterns";
import { getWishlistDetailById } from "../dao/getWishlistDetailById.dao";
import { getWishlistById } from "../dao/getWishlistById.dao";
import { removeProductFromWishlist } from "../dao/removeProductFromWishlist.dao";
import { User } from "@src/types";

export const removeProductFromWishlistServiceV2 = async (
    id: string,
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
        
        const wishlistDetail = await getWishlistDetailById(id);
        if (!wishlistDetail) {
            return new NotFoundResponse('Wishlist detail not found').generate();
        }

        const wishlist = await getWishlistById(SERVER_TENANT_ID, wishlistDetail.wishlist_id);
        if (!wishlist) {
            return new NotFoundResponse('Wishlist not found').generate();
        }

        if (wishlist.user_id !== user.id) {
            return new UnauthorizedResponse('User is not authorized to remove product from this wishlist').generate();
        }

        const removeWishlistDetailData = await removeProductFromWishlist(id);

        return {
            data: removeWishlistDetailData,
            status: 200,
        };
    } catch (err: any) {
        return new InternalServerErrorResponse(err).generate();
    }
}