import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, {params}) {
  try {
    const { id } = params;
    const response = await axios.get(`http://localhost:8080/api/reports/${id}`, {
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


export async function PUT(req, {params}) {
  try {
    const { id } = params;
    const data = await req.json();
    const response = await axios.put(`http://localhost:8080/api/reports/${id}`, {...data, amount: parseInt(data.amount)}, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
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

export async function DELETE(req, {params}) {
try{
  const { id } = params;
  const response = await axios.delete(`http://localhost:8080/api/reports/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return NextResponse.json(
    { status: true, data: response.data },
    { status: 200 }
  );
}catch(error){
  return NextResponse.json(
    { status: false, message: error.message },
    { status: 401 }
  );
}
}