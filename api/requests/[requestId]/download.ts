import { NowRequest, NowResponse } from '@vercel/node'
import { generateArchive } from '../../../lib/generate-archive';

export default async function (req: NowRequest, res: NowResponse) {
    const archive = await generateArchive();
    res.setHeader('Content-disposition', 'attachment; filename=archive.zip');
    res.setHeader('Content-type', 'application/zip');
    res.send(archive);
}
