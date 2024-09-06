import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { Db, GridFSBucket } from "mongodb";
import { connectToDB } from "@/lib/mongoose";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const imageId = pathname.split("/").pop();

  if (!imageId || !mongoose.Types.ObjectId.isValid(imageId)) {
    console.error("Invalid or missing imageId:", imageId);
    return NextResponse.json(
      { error: "Invalid or missing imageId" },
      { status: 400 }
    );
  }

  try {
    await connectToDB();
    const db = mongoose.connection.db as unknown as Db;

    if (!db) {
      console.error("Database connection is not established");
      return NextResponse.json(
        { error: "Database connection is not established" },
        { status: 500 }
      );
    }

    const gfs = new GridFSBucket(db, { bucketName: "uploads" });
    const objectId = new mongoose.Types.ObjectId(imageId);

    const downloadStream = gfs.openDownloadStream(objectId);

    return new Promise<NextResponse>((resolve, reject) => {
      const chunks: Buffer[] = [];

      downloadStream.on("data", (chunk) => chunks.push(chunk));
      downloadStream.on("end", () => {
        const buffer = Buffer.concat(chunks);

        // Determine content type based on file extension or metadata if available
        const contentType = "image/jpeg"; // Default, adjust as needed

        resolve(
          new NextResponse(buffer, {
            headers: { "Content-Type": contentType },
          })
        );
      });
      downloadStream.on("error", (err) => {
        console.error("Error streaming image:", err);
        resolve(
          NextResponse.json({ error: "Error fetching image" }, { status: 500 })
        );
      });
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json(
      { error: "Error fetching image" },
      { status: 500 }
    );
  }
}
