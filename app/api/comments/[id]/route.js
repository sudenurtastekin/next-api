import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
    const searchParams = request.nextUrl.searchParams;
    if(searchParams.has("like")){
        const post = await prisma.comment.update({
            where: {
                id: Number(params.id)
            },
            data: {
                likes: {
                    increment: 1
                }
            }
        });

        return Response.json(post);
    }

    if(searchParams.has("dislike")){
        const post = await prisma.comment.update({
            where: {
                id: Number(params.id)
            },
            data: {
                dislikes: {
                    increment: 1
                }
            }
        });

        return Response.json(post);

    }
    const post = await prisma.comment.findUnique({
        where: {
            id: Number(params.id)
        },
        include: {
            user: true
        }
    });
  return Response.json(post);
}