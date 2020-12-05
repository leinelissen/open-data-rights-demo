import { NowRequest, NowResponse } from '@vercel/node';
import withAuth from './auth';

type Route = (req: NowRequest, res: NowResponse) => void;

function withRequest(handler: Route) {
    return withAuth(function(req: NowRequest, res: NowResponse) {
        // Check if the right request id is issued
        if (req.query.requestId !== '1') {
            res.status(404).send({
                "error": "Not Found",
                "message": "Could not find a data request with this id."
            });
            return;
        }

        return handler(req, res);
    });
}

export default withRequest;