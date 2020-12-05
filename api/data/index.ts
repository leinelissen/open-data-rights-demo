import { NowRequest, NowResponse } from '@vercel/node'
import { dataTypes } from '../../lib/singleRequest'

export default function (req: NowRequest, res: NowResponse) {
    res.send(Object.keys(dataTypes).map(type => {
        return {
            type,
            description: dataTypes[type],
            context: null,
            processingGround: "consent",
            isErasable: true,
            isRectifiable: true,
        }
    }));
}
