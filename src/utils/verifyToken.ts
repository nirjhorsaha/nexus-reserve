import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    role: 'user' | 'admin';
}

export const verifyToken = (token: string): CustomJwtPayload => {
    return jwtDecode<CustomJwtPayload>(token);
};
