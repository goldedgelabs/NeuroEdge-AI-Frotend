import React, { useRef, useState, useEffect } from "react";

export default function VoicePlayer({ blob }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!blob) return;
    const u = URL.createObjectURL(blob);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [blob]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <div className="voice-player">
      <audio
        ref={audioRef}
        src={url}
        onEnded={() => setPlaying(false)}
      />
      <button className="btn-outline" onClick={toggle}>
        {playing ? "Pause" : "Play"}
      </button>

      {url && (
        <a className="btn-ghost" href={url} download="recording.webm">
          ⤓ Download
        </a>
      )}
    </div>
  );
}
