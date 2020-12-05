import { NowRequest, NowResponse } from '@vercel/node';
import withAuth from '../../lib/auth';
import request from '../../lib/singleRequest';

export default withAuth(function (req: NowRequest, res: NowResponse) {
    if (req.method === 'POST') {
        res.send(request);
        return;
    }

    res.send([ request ]);
});
