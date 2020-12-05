import { NowRequest, NowResponse } from '@vercel/node'

export default function (req: NowRequest, res: NowResponse) {
    res.send({
        access_token: 1,
        refresh_token: 1,
    });
}
