import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "./mongoDB";
import { safe } from "./errors";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export function protect(
  handler: (req: NextRequest) => Promise<NextResponse>
): (req: NextRequest) => Promise<NextResponse> {
  return safe(async (req) => {
    const session = await getServerSession(authOptions);
    if (session) {
      return await handler(req);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  });
}

// non-null assertions are ok because users must have an email, and also are guaranteed to be logged in by protect
export const assumeLoggedInGetEmail = async (
  req: NextRequest
): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return (await getServerSession(authOptions))!.user!.email!;
};

export async function isAdmin(req: NextRequest): Promise<boolean> {
  const email = await assumeLoggedInGetEmail(req);
  const { userDataCollection } = await connectToDatabase();
  const data = await userDataCollection.findOne({ email });
  return Boolean(data?.isAdmin);
}
