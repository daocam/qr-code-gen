"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://daocam-dev.vercel.app");
  const [qrCode, setQRCode] = useState("https://daocam-dev.vercel.app");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    // Simulate a small delay for visual feedback
    setTimeout(() => {
      setQRCode(url);
      setIsGenerating(false);
    }, 300);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-3xl">
        <Card className="border shadow-lg py-0">
          <CardHeader className="text-center border-b bg-primary/5 py-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              QR Code Generator
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Create customized QR codes for your websites and applications
            </CardDescription>
          </CardHeader>

          <Tabs defaultValue="generate" className="w-full">
            <div className="px-6 pt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="generate" className="p-6 pb-0 pt-4 space-y-4">
              <form onSubmit={generateQRCode} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="url" className="text-sm font-medium">
                    URL
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="Enter a URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="w-full transition-all focus-visible:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="color"
                      className="text-sm font-medium flex justify-between"
                    >
                      <span>QR Code Color</span>
                      <span className="text-muted-foreground">{color}</span>
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: color }}
                      />
                      <Input
                        id="color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="backgroundColor"
                      className="text-sm font-medium flex justify-between"
                    >
                      <span>Background Color</span>
                      <span className="text-muted-foreground">
                        {backgroundColor}
                      </span>
                    </Label>
                    <div className="flex gap-2">
                      <div
                        className="w-10 h-10 rounded border"
                        style={{ backgroundColor: backgroundColor }}
                      />
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-full h-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="size"
                    className="text-sm font-medium flex justify-between"
                  >
                    <span>Size</span>
                    <span className="text-muted-foreground">
                      {size}x{size} px
                    </span>
                  </Label>
                  <Slider
                    id="size"
                    min={100}
                    max={400}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="errorCorrection"
                    className="text-sm font-medium"
                  >
                    Error Correction Level
                  </Label>
                  <Select
                    value={errorCorrection}
                    onValueChange={setErrorCorrection}
                  >
                    <SelectTrigger id="errorCorrection" className="w-full">
                      <SelectValue placeholder="Select error correction level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full transition-all hover:shadow-md"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate QR Code"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent
              value="preview"
              className="p-6 flex flex-col items-center justify-center"
            >
              <div className="bg-white p-6 rounded-lg shadow-inner border mb-4">
                <QRCodeSVG
                  id="qr-code"
                  value={qrCode}
                  size={size}
                  fgColor={color}
                  bgColor={backgroundColor}
                  level={errorCorrection as "L" | "M" | "Q" | "H"}
                  className="transition-all duration-300"
                />
              </div>

              <Button
                onClick={downloadQRCode}
                variant="default"
                className="flex items-center gap-2 "
              >
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
            </TabsContent>
          </Tabs>

          <CardFooter className="flex justify-center border-t p-2 text-sm text-muted-foreground">
            Scan with any QR code reader app
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
