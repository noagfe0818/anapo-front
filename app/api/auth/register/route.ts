//app/api/auth/register/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto"; // <-- ✅ 1. 'id' 생성기 import

export const runtime = "nodejs";

const pool = mysql.createPool(process.env.DATABASE_URL || "");

export async function GET(request: Request) {
  return NextResponse.json({ message: "살아있음! API 작동 중!" });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, date } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "이름, 이메일, 비밀번호는 필수입니다." },
        { status: 400 }
      );
    }

    // 1. 이메일 중복 확인 (Raw SQL)
    const [rows]: any[] = await pool.execute(
      "SELECT email FROM User WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      return NextResponse.json(
        { message: "이미 사용 중인 이메일입니다." },
        { status: 409 }
      );
    }

    //2. 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    //  3. ✅ 'id' 생성
    const newId = randomUUID();

    //  4. DB에 유저 생성 (Raw SQL)
    const [result] = await pool.execute(
      //  ✅ 4-1. 'id' 필드 추가
      `INSERT INTO User (id, name, email, password, phone, birthDate, createdAt, updatedAt) 
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        //  ✅ 4-2. 'newId' 값 추가
        newId,
        name,
        email,
        hashedPassword,
        phone || null,
        date || null,
      ]
    );

    // 5. 성공 응답
    return NextResponse.json(
      { message: "회원가입 성공!", userId: newId },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 API 에러 (MySQL2):", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다. (DB 작업 실패)" },
      { status: 500 }
    );
  }
}
