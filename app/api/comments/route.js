import prisma from "@/lib/prisma";

export async function GET(){
    const comments = await prisma.comment.findMany({
        include: {
            user: true,
            post: true,
        },
    });

    return Response.json(comments);
}

export async function POST(request){
    const { content, postId } = await request.json();

    if(!content || !postId){
        return Response.json({
            error: "Please provide content and a post ID for the comment.",
        }, {
            status: 400,
        });
    }

    const post = await prisma.post.findUnique({
        where: {
            id: postId,
        },
    });

    if(!post){
        return Response.json({
            error: "The post you are trying to comment on does not exist.",
        }, {
            status: 404,
        });
    }

    const comment = await prisma.comment.create({
        data: {
            content,
            user: {
                connect: {
                    id: 1,
                },
            },
            post: {
                connect: {
                    id: postId,
                },
            },
        },
    });

    return Response.json(comment);
}