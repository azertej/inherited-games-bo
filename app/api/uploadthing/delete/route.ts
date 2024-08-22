import { UTApi } from "uploadthing/server";

const utapi = new UTApi()

export const POST = async (req: any) => {
    const { imageKey } = await req.json()
    try {
        const res = await utapi.deleteFiles(imageKey)
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response(`${error}`, { status: 500 })
    }
}