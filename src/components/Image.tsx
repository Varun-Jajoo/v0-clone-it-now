import { useState } from "react";
import axios from "axios";
import App from "./ok";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Sparkle, PenTool, ImageIcon, Wrench } from "lucide-react";

const GeminiImageAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImage(reader.result);
      };
    }
  };

  const analyzeImage = async () => {
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", dataURLtoFile(image, "uploaded_image.png"));

    try {
      const res = await axios.post("http://127.0.0.1:5000/analyze", formData, {
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
    let arr = dataurl.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className="flex">
      <div className="w-20 bg-gray-900 text-white flex flex-col justify-center items-center py-4 space-y-12">
        <a
          href="/playground"
          className="hover:text-blue-400 flex flex-col items-center justify-center"
        >
          <Sparkle className="h-8 w-8 mx-auto" />
          <span className="text-xs mt-1">Playground</span>
        </a>
        <a
          href="/gemini"
          className="hover:text-blue-400 flex flex-col items-center justify-center"
        >
          <PenTool className="h-8 w-8 mx-auto" />
          <span className="text-xs mt-1">AI Canvas</span>
        </a>
        <a
          href="/image"
          className="hover:text-blue-400 flex flex-col items-center justify-center"
        >
          <ImageIcon className="h-8 w-8 mx-auto" />
          <span className="text-xs mt-1">Image</span>
        </a>
        <a
          href="/builder"
          className="hover:text-blue-400 flex flex-col items-center justify-center"
        >
          <Wrench className="h-8 w-8 mx-auto" />
          <span className="text-xs mt-1">Builder</span>
        </a>
      </div>
      <div className="w-screen mx-auto p-6 border rounded-lg shadow-lg min-h-screen ">
        {/* Image Upload */}
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Upload an Image</span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="block w-full text-sm mt-2 border p-2 rounded-lg cursor-pointer"
          />
        </label>

        {image && (
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-full mb-4 rounded-lg border shadow-md"
          />
        )}

        {/* Analyze Button */}
        <button
          onClick={analyzeImage}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Tabs for Code & Preview */}
        <Tabs defaultValue="code" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-lg p-1">
            <TabsTrigger value="code">Generated Code</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="code">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Generated Code</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-64 border">
                  <code className="text-sm text-gray-700">{generatedCode}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preview">
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-100 p-4 rounded-lg border shadow-sm">
                  <App />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GeminiImageAnalyzer;
