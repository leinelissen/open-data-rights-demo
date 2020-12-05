import { NowRequest, NowResponse } from '@vercel/node';

type Route = (req: NowRequest, res: NowResponse) => void;

function withAuth(handler: Route) {
    return function(req: NowRequest, res: NowResponse) {
        // Check if the user is authenticated
        if (req.headers.authorization !== 'Bearer 1') {
            res.status(401).send({
                "error": "Unauthorized",
                "message": "You are not authorized. Generate authentication tokens via OAuth to access this resource."
            })
            return;
        }

        return handler(req, res);
    }
}

export default withAuth;