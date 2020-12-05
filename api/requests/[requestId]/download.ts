import { NowRequest, NowResponse } from '@vercel/node'
import { generateArchive } from '../../../lib/generate-archive';

export default async function (req: NowRequest, res: NowResponse) {
    const archive = await generateArchive();
    res.send(archive);
}
