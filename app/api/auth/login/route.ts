//app/api/auth/login/route.ts

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";

export const runtime = "nodejs"; // Node.js 런타임 유지

const pool = mysql.createPool(process.env.DATABASE_URL || "");

//--- 로그인 '뇌' (POST 함수) ---
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "이메일과 비밀번호를 입력하세요." },
        { status: 400 }
      );
    }

    //   1. DB에서 이메일로 유저 찾기 (Raw SQL)
    const [rows]: any[] = await pool.execute(
      //  🚨 주의: 실제 앱에서는 password를 절대 SELECT하지 마세요!
      //여기서는 비교를 위해 가져옵니다.
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    // 2. 유저가 없는지 확인
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "존재하지 않는 이메일입니다." },
        { status: 404 }
      );
    }

    const user = rows[0];

    //  3. 비밀번호 비교 (!!!)
    // DB의 암호화된 비번(user.password)과 폼의 날 비번(password)을 비교
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    //  4. 성공! (나중엔 여기에 JWT 토큰이나 세션 쿠키를 발행합니다)
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(
      { message: "로그인 성공!", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인 API 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
