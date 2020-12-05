import { NowRequest, NowResponse } from '@vercel/node'

export default function (req: NowRequest, res: NowResponse) {
    res.redirect(302, `/public/archive.zip`);
}
