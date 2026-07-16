import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { extractTextFromImage } from "@/lib/timetable-ocr";
import { parseTimetableText } from "@/lib/timetable-parser";

export const runtime = "nodejs";
export const maxDuration = 60;

const maxImageSize = 6 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Sign in before extracting a timetable." }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");

  if (!(image instanceof File)) {
    return NextResponse.json({ message: "Upload a timetable image first." }, { status: 400 });
  }

  if (!image.type.startsWith("image/")) {
    return NextResponse.json({ message: "The uploaded file must be an image." }, { status: 400 });
  }

  if (image.size > maxImageSize) {
    return NextResponse.json(
      { message: "This image is too large for local OCR. Upload a screenshot under 6MB." },
      { status: 413 },
    );
  }

  try {
    const rawText = await extractTextFromImage(image);
    const rows = parseTimetableText(rawText);

    return NextResponse.json({
      rows,
      rawText,
      source: {
        fileName: image.name,
        fileSize: image.size,
        mode: "tesseract-ocr",
      },
      message:
        rows.length > 0
          ? "OCR found timetable rows. Review and correct them before generating your study plan."
          : "OCR read the image, but no class rows were detected. Add rows manually or upload a clearer image.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not read this timetable image.";

    return NextResponse.json({ message, rows: [], rawText: "" }, { status: 422 });
  }
}
