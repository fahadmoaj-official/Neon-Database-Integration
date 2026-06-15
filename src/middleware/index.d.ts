import { JwtPayload } from "jsonwebtoken";
declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload; // You can replace 'any' with a specific type for your user object
        }
    }
}