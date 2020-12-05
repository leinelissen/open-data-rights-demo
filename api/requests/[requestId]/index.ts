import { NowRequest, NowResponse } from '@vercel/node';
import withRequest from '../../../lib/request';
import request from '../../../lib/singleRequest';

export default withRequest(function (req: NowRequest, res: NowResponse) {
    if (req.method === 'DELETE') {
        res.status(200).send('');
        return;
    }
    
    res.send(request);
});
