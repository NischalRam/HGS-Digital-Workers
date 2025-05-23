import React from "react";
import { SessionStatus } from "@/app/types";
import { useSearchParams } from "next/navigation";

interface SimpleToolbarProps {
  isTranscriptExpanded?: boolean;
  setIsTranscriptExpanded?: (val: boolean) => void;
  isEventsPaneExpanded: boolean;
  setIsEventsPaneExpanded: (val: boolean) => void;
}

interface CompleteToolbarProps extends SimpleToolbarProps {
  sessionStatus: SessionStatus;
  onToggleConnection: () => void;
  isPTTActive: boolean;
  setIsPTTActive: (val: boolean) => void;
  isPTTUserSpeaking: boolean;
  handleTalkButtonDown?: () => void;
  handleTalkButtonUp?: () => void;
  isAudioPlaybackEnabled: boolean;
  setIsAudioPlaybackEnabled: (val: boolean) => void;
}

interface BottomToolbarProps extends CompleteToolbarProps {
  legacy: boolean;
}

function LegacyToolBar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
}: CompleteToolbarProps) {
  const isConnected = sessionStatus === "CONNECTED";
  const isConnecting = sessionStatus === "CONNECTING";

  function getConnectionButtonLabel() {
    if (isConnected) return "Disconnect";
    if (isConnecting) return "Connecting...";
    return "Connect";
  }

  function getConnectionButtonClasses() {
    const baseClasses = "text-white text-base p-2 w-36 rounded-full h-full";
    const cursorClass = isConnecting ? "cursor-not-allowed" : "cursor-pointer";

    if (isConnected) {
      // Connected -> label "Disconnect" -> red
      return `bg-red-600 hover:bg-red-700 ${cursorClass} ${baseClasses}`;
    }
    // Disconnected or connecting -> label is either "Connect" or "Connecting" -> black
    return `bg-black hover:bg-gray-900 ${cursorClass} ${baseClasses}`;
  }

  return (
    <div className="p-4 flex flex-row items-center justify-center gap-x-8">
      <button
        onClick={onToggleConnection}
        className={getConnectionButtonClasses()}
        disabled={isConnecting}
      >
        {getConnectionButtonLabel()}
      </button>

      <div className="flex flex-row items-center gap-2">
        <input
          id="push-to-talk"
          type="checkbox"
          checked={isPTTActive}
          onChange={e => setIsPTTActive(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label htmlFor="push-to-talk" className="flex items-center cursor-pointer">
          Push to talk
        </label>
        <button
          onMouseDown={handleTalkButtonDown}
          onMouseUp={handleTalkButtonUp}
          onTouchStart={handleTalkButtonDown}
          onTouchEnd={handleTalkButtonUp}
          disabled={!isPTTActive}
          className={
            (isPTTUserSpeaking ? "bg-gray-300" : "bg-gray-200") +
            " py-1 px-4 cursor-pointer rounded-full" +
            (!isPTTActive ? " bg-gray-100 text-gray-400" : "")
          }
        >
          Talk
        </button>
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          id="audio-playback"
          type="checkbox"
          checked={isAudioPlaybackEnabled}
          onChange={e => setIsAudioPlaybackEnabled(e.target.checked)}
          disabled={!isConnected}
          className="w-4 h-4"
        />
        <label htmlFor="audio-playback" className="flex items-center cursor-pointer">
          Audio playback
        </label>
      </div>

      <div className="flex flex-row items-center gap-2">
        <input
          id="logs"
          type="checkbox"
          checked={isEventsPaneExpanded}
          onChange={e => setIsEventsPaneExpanded(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="logs" className="flex items-center cursor-pointer">
          Logs
        </label>
      </div>
    </div>
  );
}

function ToolBar({
  isTranscriptExpanded = true,
  setIsTranscriptExpanded = () => { },
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
}: SimpleToolbarProps) {
  const searchParams = useSearchParams();

  const handleInstructions = () => {
    const url = new URL(window.location.toString())
    url.pathname = url.pathname + "instruction"
    url.searchParams.set("agentConfig", searchParams.get("agentConfig") ?? "none")
    window.open(url, "_blank")
  }

  return (
    <div className="p-4 grid grid-cols-12 items-center gap-2">
      <div className="col-span-1 flex"></div>
      <div className="col-span-10 flex flex-row items-center justify-center gap-2">
        <button
          onClick={() => setIsTranscriptExpanded(!isTranscriptExpanded)}
          className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
          style={{ borderRadius: "0.5rem" }}
        >
          {isTranscriptExpanded ? "Disable" : "Enable"} Transcript
        </button>
        <button
          onClick={() => setIsEventsPaneExpanded(!isEventsPaneExpanded)}
          className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
          style={{ borderRadius: "0.5rem", marginRight: "15px" }}
        >
          {isEventsPaneExpanded ? "Disable" : "Enable"} Events
        </button>
      </div>
      <div className="col-span-1 flex justify-end">
        <button
          onClick={handleInstructions}
          className="bg-black hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors duration-200 text-sm font-medium"
          style={{ borderRadius: "0.5rem" }}
        >
          Read Me!
        </button>
      </div>
    </div>
  )
}

function BottomToolbar({
  sessionStatus,
  onToggleConnection,
  isPTTActive,
  setIsPTTActive,
  isPTTUserSpeaking,
  handleTalkButtonDown,
  handleTalkButtonUp,
  isEventsPaneExpanded,
  setIsEventsPaneExpanded,
  isAudioPlaybackEnabled,
  setIsAudioPlaybackEnabled,
  legacy = false,
  isTranscriptExpanded = true,
  setIsTranscriptExpanded = () => { },
}: BottomToolbarProps) {
  return legacy ?
    <LegacyToolBar
      sessionStatus={sessionStatus}
      onToggleConnection={onToggleConnection}
      isPTTActive={isPTTActive}
      setIsPTTActive={setIsPTTActive}
      isPTTUserSpeaking={isPTTUserSpeaking}
      handleTalkButtonDown={handleTalkButtonDown}
      handleTalkButtonUp={handleTalkButtonUp}
      isEventsPaneExpanded={isEventsPaneExpanded}
      setIsEventsPaneExpanded={setIsEventsPaneExpanded}
      isAudioPlaybackEnabled={isAudioPlaybackEnabled}
      setIsAudioPlaybackEnabled={setIsAudioPlaybackEnabled}
    />
    :
    <ToolBar
      isTranscriptExpanded={isTranscriptExpanded}
      setIsTranscriptExpanded={setIsTranscriptExpanded}
      isEventsPaneExpanded={isEventsPaneExpanded}
      setIsEventsPaneExpanded={setIsEventsPaneExpanded}
    />

}

export default BottomToolbar;
