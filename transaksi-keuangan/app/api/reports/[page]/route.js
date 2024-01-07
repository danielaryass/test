import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  try {
    const { page } = params;
    const response = await axios.get(`http://localhost:8080/api/reports?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return NextResponse.json(
      { status: true, data: response.data },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { status: false, message: error.message },
      { status: 401 }
    );
  }
}

