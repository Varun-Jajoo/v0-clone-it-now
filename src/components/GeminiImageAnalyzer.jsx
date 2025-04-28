"use client";

import { useState, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import axios from "axios";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2, Download, Eraser, PenTool } from "lucide-react";
import App from "./ok2";

const GeminiImageAnalyzer = () => {
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [penColor, setPenColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(5);
  const [subdomain, setSubdomain] = useState("");

  const canvasRef = useRef(null);

  const clearCanvas = () => {
    canvasRef.current.resetCanvas();
  };

  const analyzeImage = async () => {
    setLoading(true);
    try {
      const dataURL = await canvasRef.current.exportImage("png");
      setGeneratedImage(dataURL);

      const formData = new FormData();
      formData.append("image", dataURLtoFile(dataURL, "sketched_image.png"));

      const res = await axios.post("http://localhost:5000/sketch", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const responseText = res.data.description || "No code received.";
      const formattedCode = responseText.replace(/```jsx|```/g, "").trim();

      setGeneratedCode(formattedCode);
    } catch (error) {
      console.error("Error analyzing image:", error);
      setGeneratedCode("Failed to analyze image.");
    } finally {
      setLoading(false);
    }
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const downloadImage = async () => {
    try {
      const dataURL = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "sketch.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  const handleHostApp = async () => {
    try {
      await axios.post("http://localhost:5000/host", {
        subdomain,
        code: generatedCode,
      });
      alert(`App hosted at: http://localhost:5173/${subdomain}`);
    } catch (err) {
      console.error("Error hosting app:", err);
      alert("Failed to host app.");
    }
  };

  return (
    <div className="container w-[98vw] mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Gemini Image Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <ReactSketchCanvas
              ref={canvasRef}
              style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem" }}
              width="100%"
              height="80vh"
              strokeWidth={strokeWidth}
              strokeColor={penColor}
              eraserWidth={20}
              className="cursor-crosshair"
            />
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-md space-y-2">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pen Color:
                </label>
                <input
                  type="color"
                  value={penColor}
                  onChange={(e) => setPenColor(e.target.value)}
                  className="w-full h-8 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Stroke Width:
                </label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <div className="space-x-2">
              <Button onClick={clearCanvas} variant="outline">
                <Eraser className="mr-2 h-4 w-4" /> Clear
              </Button>
              <Button onClick={analyzeImage} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Analyzing...
                  </>
                ) : (
                  <>
                    <PenTool className="mr-2 h-4 w-4" /> Analyze
                  </>
                )}
              </Button>
              <Button onClick={downloadImage} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>

          <div className="mt-4 space-x-2">
            <input
              type="text"
              placeholder="Enter subdomain name"
              className="border rounded p-2 text-sm"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value)}
            />
            <Button
              onClick={handleHostApp}
              disabled={!generatedCode || !subdomain}
            >
              Host
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="code">Generated Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle>Generated Code</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[60vh]">
                <code className="text-sm">{generatedCode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-4 rounded-lg">
                <App />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GeminiImageAnalyzer;
