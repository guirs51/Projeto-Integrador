import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export async function verifyGoogleToken(idToken: string) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    if (!payload) throw new Error("Token invalido!")
    

    return {
        googleId: payload.sub,
        email: payload.email!,
        name: payload.name!,
        foto: payload.picture,
    };
}

