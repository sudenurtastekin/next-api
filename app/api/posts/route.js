import prisma from "@/lib/prisma";

export async function GET(){
    const posts = await prisma.post.findMany({
        include: {
            user: true,
        },
    });

    return Response.json(posts);
}

export async function POST(request){
    const { title, content } = await request.json();

    if(!title || !content){
        return Response.json({
            error: "Please provide a title and content for the post.",
        }, {
            status: 400,
        });
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            user: {
                connect: {
                    id: 1,
                },
            },
        },
    });

    return Response.json(post);
}