// frontend/src/app/api/users/route.js

import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/users";

export async function GET() {
  try {
    const res = await fetch(BACKEND_URL);
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal mengambil data user" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menambahkan user" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/${body.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal update user" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const res = await fetch(`${BACKEND_URL}/${body.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal menghapus user" }, { status: 500 });
  }
}
