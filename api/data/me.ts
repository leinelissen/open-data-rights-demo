import { NowRequest, NowResponse } from '@vercel/node'
import withAuth from '../../lib/auth';
import { dataTypes } from '../../lib/singleRequest';

export default withAuth(function (req: NowRequest, res: NowResponse) {
    res.send(Object.keys(dataTypes));
});
