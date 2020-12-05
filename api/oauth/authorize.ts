import { NowRequest, NowResponse } from '@vercel/node'

export default function (req: NowRequest, res: NowResponse) {
    const { redirect_uri } = req.query; 
    res.redirect(302, `/static/?redirect=${redirect_uri}`)
}
