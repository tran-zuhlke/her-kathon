import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const result =
        {
            id: "1",
            title: "Example Web App using Next.js for Her-kathon ",
            content: "How to Build a Fullstack App with Next.js, Prisma, and Vercel Postgres: [Full tutorial](https://vercel.com/guides/nextjs-prisma-postgres)",
            published: false,
            author: {
                name: "Zuhlke Team",
                email: "nguyenbaotran.doan@zuhlke.com",
            },
        };
    res.json(result);
}
