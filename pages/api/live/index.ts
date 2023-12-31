import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result =
        {
            "totalTime": 180000,
            "totalView": 2000000,
            "brands": ["Brita", "Glico", "Masan"],
            "customerData": {"location": "Ho Chi Minh", "malePercent": 40, "femalePercent": 60},
            "platformData": [
                {
                    "liveTime": 120, "deals": 60, "brand": "Glico", "platform": "LAZADA", "nextTimeLive": "2023-09-17T12:00:00",
                },
                {
                    "liveTime": 60, "deals": 80, "brand": "Brita", "platform": "Shopee", "nextTimeLive": "2023-09-17T12:00:00",
                }
            ]
        };
    res.json(result);
}
