import {prisma} from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    console.log("Dữ liệu Dự án đã được lấy thành công:", projects);
    return NextResponse.json(projects); // Thêm dòng này để trả về dữ liệu
  } catch (error) {
    console.error("Lỗi Không thể lấy dữ liệu Dự án", error);
    return NextResponse.json({ error: "Lỗi Không thể lấy dữ liệu Dự án" }, { status: 500 });
  }
} 

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const project = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        tags: body.tech.split(',').map((t: string) => t.trim()),
      },
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        demoUrl: body.demoUrl,
        githubUrl: body.githubUrl,
        tags: body.tech.split(',').map((t: string) => t.trim()),
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}