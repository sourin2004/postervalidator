"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type ValidationResult } from "@/app/actions";

type ResultCardProps = {
  result: ValidationResult;
};

export function ResultCard({ result }: ResultCardProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const drawBoundingBox = () => {
      const image = imageRef.current;
      const canvas = canvasRef.current;
      if (!image || !canvas || !result.boundingBox) return;

      const { naturalWidth, naturalHeight } = image;
      const { width: displayWidth, height: displayHeight } = image.getBoundingClientRect();

      canvas.width = displayWidth;
      canvas.height = displayHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { x, y, width, height } = result.boundingBox;

      const scaleX = displayWidth / naturalWidth;
      const scaleY = displayHeight / naturalHeight;

      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 3;
      ctx.strokeRect(
        x * scaleX,
        y * scaleY,
        width * scaleX,
        height * scaleY
      );
    };

    const image = imageRef.current;
    if (image?.complete) {
        setImageSize({width: image.naturalWidth, height: image.naturalHeight});
        drawBoundingBox();
    } else if (image) {
      image.onload = () => {
        setImageSize({width: image.naturalWidth, height: image.naturalHeight});
        drawBoundingBox();
      };
    }

    window.addEventListener('resize', drawBoundingBox);
    return () => window.removeEventListener('resize', drawBoundingBox);

  }, [result]);

  return (
    <Card className="mt-8 overflow-hidden shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader>
        <CardTitle>Analysis Result</CardTitle>
        <CardDescription>
          Here's the breakdown of the poster detection analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {result.imageUrl && (
          <div className="relative mb-6 rounded-md overflow-hidden border">
            <Image
              ref={imageRef}
              src={result.imageUrl}
              alt="Analyzed poster"
              width={600}
              height={800}
              className="w-full h-auto object-contain"
              onLoad={(e) => {
                const img = e.currentTarget;
                setImageSize({width: img.naturalWidth, height: img.naturalHeight});
              }}
              data-ai-hint="poster abstract"
              priority
            />
            {result.boundingBox && (
              <canvas
                ref={canvasRef}
                className="absolute top-0 left-0 pointer-events-none"
              />
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-muted-foreground">Poster Detected:</span>
            <Badge variant={result.containsPoster ? "default" : "destructive"} className={result.containsPoster ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}>
              {result.containsPoster ? "Yes" : "No"}
            </Badge>
          </div>

          {result.containsPoster && result.boundingBox && (
            <>
             <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">Confidence:</span>
                <span className="font-mono text-foreground">
                  {((result.confidence ?? 0) * 100).toFixed(2)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">Dimensions (cm):</span>
                <span className="font-mono text-foreground">
                  {result.dimensionsCm?.width} x {result.dimensionsCm?.height}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-muted-foreground">Bounding Box:</span>
                <span className="font-mono text-foreground text-xs sm:text-sm">
                  (x: {result.boundingBox.x}, y: {result.boundingBox.y}, w: {result.boundingBox.width}, h: {result.boundingBox.height})
                </span>
              </div>

              <div>
                <h3 className="font-medium text-muted-foreground mb-2">AI-Improved Text:</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md border text-foreground whitespace-pre-wrap">
                  {result.detectedText || "No text detected."}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
