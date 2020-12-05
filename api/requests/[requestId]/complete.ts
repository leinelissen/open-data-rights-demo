import { NowRequest, NowResponse } from '@vercel/node';
import withRequest from '../../../lib/request';

export default withRequest(function (req: NowRequest, res: NowResponse) {
    res.send('1');
});
