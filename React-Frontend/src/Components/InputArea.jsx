import { useState, useEffect } from "react";
import { Paperclip, Send, Mic, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useReactMediaRecorder } from "react-media-recorder";
import { useTranslation } from "react-i18next";
import "../styles/index.css";

export default function InputArea({ sendMessage }) {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");
  const { startRecording, stopRecording } = useReactMediaRecorder({
    audio: true,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [files, setFiles] = useState([]);
  const [showUploadMenu, setShowUploadMenu] = useState(false);

  const handleRecord = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  const handleSend = () => {
    if (message.trim() || files.length > 0) {
      sendMessage(message, files);
      setMessage("");
      setFiles([]);
    }
  };

  const handleFileUpload = (event) => {
    setFiles([...files, ...event.target.files]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".upload-menu") &&
        !event.target.closest(".upload-button")
      ) {
        setShowUploadMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-4 p-4 py-2 border border-gray-200 rounded-3xl backdrop-blur-lg shadow-xl flex items-center gap-2 bg-white dark:bg-[#2d2f3d]">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 upload-button"
        onClick={() => setShowUploadMenu(!showUploadMenu)}
        title={t("upload")}
      >
        <Paperclip className="h-5 w-5 text-muted-foreground" />
      </Button>

      {showUploadMenu && (
        <div className="absolute bottom-12 left-0 bg-white dark:bg-[#1F2937] shadow-lg rounded-lg p-3 flex flex-col gap-3 upload-menu z-10">
          <label
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#444c63] rounded transition duration-300"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {t("image")}
          </label>
          <label
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#444c63] rounded transition duration-300"
            onClick={() => document.getElementById("audioUpload").click()}
          >
            {t("audio")}
          </label>
          <label
            className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-[#444c63] rounded transition duration-300"
            onClick={() => document.getElementById("pdfUpload").click()}
          >
            {t("pdf")}
          </label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            id="audioUpload"
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <input
            id="pdfUpload"
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      )}

      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={t("messagePlaceholder")}
        className={`flex-grow text-sm resize-none rounded-2xl px-6 py-1 border bg-[#f7f7f7] dark:bg-[#3b414d] shadow-lg focus:ring-2 focus:ring-primary transition-all ease-in-out ${
          document.documentElement.classList.contains("dark")
            ? "focus:border-white"
            : "focus:border-primary"
        }`}
      />

      <Button
        onClick={handleRecord}
        variant="ghost"
        size="icon"
        className="shrink-0"
        title={t("record")}
      >
        <Mic
          className={`h-5 w-5 ${
            isRecording ? "text-red-500" : "text-muted-foreground"
          }`}
        />
      </Button>

      {message.trim() ? (
        <Button
          onClick={handleSend}
          className="shrink-0 bg-primary text-white transition-all duration-300 rounded-xl px-6 py-3"
          size="icon"
          title={t("send")}
        >
          <Send className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0"
          title={t("audioChat")}
        >
          <AudioLines className="h-5 w-5 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
}
