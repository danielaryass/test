import axios from "axios";
import { NextResponse } from "next/server";
export async function POST(req) {
    try {
      const data = await req.json();
      const response = await axios.post(
        "http://localhost:8080/api/reports",
       { ...data, amount: parseInt(data.amount)},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
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
  