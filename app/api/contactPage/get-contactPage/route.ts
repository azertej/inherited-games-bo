import { connectToDB } from "@/utils/database";
import { contactPageModel } from "@/models/contactPageModel";

export const GET = async (req: any) => {
  try {
    await connectToDB();
    const infos = await contactPageModel.find();
    return new Response(JSON.stringify(infos), {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(`${error}`, { status: 500 });
  }
};