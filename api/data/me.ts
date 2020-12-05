import { NowRequest, NowResponse } from '@vercel/node'
import withAuth from '../../lib/auth';
import faker from 'faker';
import { dataTypes } from '../../lib/singleRequest';

export default withAuth(function (req: NowRequest, res: NowResponse) {
    res.send({
        account: faker.internet.exampleEmail(),
        data: Object.keys(dataTypes)
    });
});
