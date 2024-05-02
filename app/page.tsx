"use client";
import ThemeToggleBtn from "@/components/theme-change-btn";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { AudioLines, Github, LoaderIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [audioURL, setAudioURL] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    setAudioURL("");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input,
        }),
      });
      const audioData = await response.arrayBuffer();
      const blob = new Blob([audioData], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="w-[80%] md:max-w-xl mx-auto flex flex-col gap-4 h-screen justify-center items-center">
      <div className="flex justify-between w-full items-center px-2">
        <p className="text-xl font-serif">/text-2-speech</p>
        <div className="flex gap-2">
          <ThemeToggleBtn />
          <Button asChild className="p-2 rounded-full">
            <Link href={"https://github.com/i-akv/text-2-speech.git"}>
              <Github />
            </Link>
          </Button>
        </div>
      </div>
      <Textarea
        className="border-accent-foreground"
        onChange={(e) => setInput(e.target.value)}
        rows={9}
      />
      <Button onClick={handleClick} className="w-full">
        <AudioLines/>
      </Button>
      {loading && <LoaderIcon className="animate-spin" />}
      {audioURL && (
        <>
          <Separator className="bg-accent-foreground" />
          <audio className="w-full h-8" src={audioURL} controls autoPlay title={input+".mp4"}></audio>
        </>
      )}
    </main>
  );
}
