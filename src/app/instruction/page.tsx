"use client"

import React, { Suspense, useEffect, useRef, useState } from "react"
import remarkGfm from 'remark-gfm';
import ReactMarkdown from "react-markdown";
import { AgentConfig, TranscriptMessage } from "../types";
import { instructionsAndTranscripts } from "../data/agentInstruction";
import { allAgentSets, defaultAgentSetKey } from "@/app/agentConfigs";
import Image from 'next/image';
import { useSearchParams } from "next/navigation";
import agentMappings, { landingMappings } from "../data/agentMappings";

interface TranscriptProps {
    agent: string;
}

const lightenColor = (hex: string, percent: number) => {
    const num = parseInt(hex.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
};

const Transcript = ({ agent }: TranscriptProps) => {
    const [transcriptItems, setTranscript] = useState<TranscriptMessage[]>([])
    const transcriptRef = useRef<HTMLDivElement | null>(null);

    function scrollToTop() {
        requestAnimationFrame(() => {
            if (transcriptRef.current) {
                transcriptRef.current.scrollTop = 0;
            }
        });
    }
    useEffect(() => {
        if (agent in instructionsAndTranscripts) {
            setTranscript(instructionsAndTranscripts[agent].transcript)
            scrollToTop()
        } else {
            setTranscript([])
        }
    }, [agent])
    return (
        <div
            className="flex flex-col flex-1 bg-white min-h-0 rounded-2xl"
            style={{
                height: "100%"
            }}
        >
            <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                    Example Conversation
                </h3>
            </div>
            <div className="relative flex-1 min-h-0">
                <div
                    className="overflow-auto p-4 flex flex-col gap-y-4 h-full"
                >
                    {transcriptItems.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-gray-500 text-center">
                                No Example Conversation
                            </div>
                        </div>
                    ) : (
                        transcriptItems.map((item) => {
                            const { itemId, role, title = "" } = item;
                            const isUser = role === "user";
                            const baseContainer = "flex justify-end flex-col";
                            const containerClasses = `${baseContainer} ${isUser ? "items-end" : "items-start"}`;
                            const bubbleBase = `max-w-lg p-3 rounded-xl ${isUser ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}`;
                            const isBracketedMessage = title.startsWith("[") && title.endsWith("]");
                            const messageStyle = isBracketedMessage ? "italic text-gray-400" : "";
                            const displayTitle = isBracketedMessage ? title.slice(1, -1) : title;
                            return (
                                <div key={itemId} className={containerClasses}>
                                    <div className={bubbleBase}>
                                        <div className={`text-xs ${isUser ? "text-gray-400" : "text-gray-500"} font-mono`}>
                                        </div>
                                        <div className={`whitespace-pre-wrap ${messageStyle}`}>
                                            <ReactMarkdown>{displayTitle}</ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

function Page() {
    const searchParams = useSearchParams();
    const [selectedAgentName, setSelectedAgentName] = useState<string>("");
    const agentSetKey = searchParams.get("agentConfig") || "default";
    const [selectedAgentConfigSet, setSelectedAgentConfigSet] =
        useState<AgentConfig[] | null>(null);

    const currentAgentColor = agentMappings[agentSetKey as keyof typeof agentMappings]?.fontColor || "#2A3B8F";
    const lightCurrentAgentColor = lightenColor(currentAgentColor, 85);

    const handleAgentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newAgentConfig = e.target.value;
        const url = new URL(window.location.toString());
        url.searchParams.set("agentConfig", newAgentConfig);
        window.location.replace(url.toString());
    };

    const handleSelectedAgentChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const newAgentName = e.target.value;
        setSelectedAgentName(newAgentName);
    };

    useEffect(() => {
        let finalAgentConfig = searchParams.get("agentConfig");
        if (!finalAgentConfig || !allAgentSets[finalAgentConfig]) {
            finalAgentConfig = defaultAgentSetKey;
            const url = new URL(window.location.toString());
            url.searchParams.set("agentConfig", finalAgentConfig);
            window.location.replace(url.toString());
            return;
        }

        const agents = allAgentSets[finalAgentConfig];
        const agentKeyToUse = agents[0]?.name || "";

        setSelectedAgentName(agentKeyToUse);
        setSelectedAgentConfigSet(agents);
    }, [searchParams]);

    return (
        <div className="flex flex-col h-screen bg-gray-100 text-gray-800">
            {/* Header */}
            <div className="p-5 text-lg font-semibold flex justify-between items-center bg-white shadow-sm">
                <div className="flex items-center">
                    <div style={{ cursor: 'pointer' }}>
                        <Image
                            src="/HGS-Logomark_Blue.svg"
                            alt="HGS Logo"
                            width={20}
                            height={20}
                            className="mr-2"
                        />
                    </div>
                    <div>
                        HGS Digital <span className="text-gray-500">Assistants</span>
                    </div>

                </div>

                <div className="flex items-center">
                    <label className="flex items-center text-base gap-1 mr-2 font-medium">
                        Scenario
                    </label>
                    <div className="relative inline-block">
                        <select
                            value={agentSetKey}
                            onChange={handleAgentChange}
                            className="appearance-none border border-gray-300 rounded-lg text-base px-2 py-1 pr-8 cursor-pointer font-normal focus:outline-none"
                        >
                            {Object.keys(allAgentSets).map((agentKey) => (
                                <option key={agentKey} value={agentKey}>
                                    {agentKey}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600">
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.25 3.65a.75.75 0 01-1.04 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    </div>
                    {agentSetKey && (
                        <div className="flex items-center ml-6">
                            <label className="flex items-center text-base gap-1 mr-2 font-medium">
                                Agent
                            </label>
                            <div className="relative inline-block">
                                <select
                                    value={selectedAgentName}
                                    onChange={handleSelectedAgentChange}
                                    className="appearance-none border border-gray-300 rounded-lg text-base px-2 py-1 pr-8 cursor-pointer font-normal focus:outline-none"
                                >
                                    {selectedAgentConfigSet?.map(agent => (
                                        <option key={agent.name} value={agent.name}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-600">
                                    <svg
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M5.23 7.21a.75.75 0 011.06.02L10 10.44l3.71-3.21a.75.75 0 111.04 1.08l-4.25 3.65a.75.75 0 01-1.04 0L5.21 8.27a.75.75 0 01.02-1.06z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Maing content */}
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2" style={{
                marginTop: "30px", marginBottom: "30px",
                marginLeft: "8px", marginRight: "8px"
            }}>
                <div className="col">
                    <div
                        className="rounded-2xl"
                        style={{
                            overflowY: "scroll",
                            height: "85vh"
                        }}
                    >
                        <Transcript agent={agentSetKey} />
                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    style={{
                        height: "85vh"
                    }}
                >
                    <div
                        className="px-6 py-4 border-b border-gray-100"
                        style={{
                            background: `linear-gradient(135deg, ${lightCurrentAgentColor} 0%, ${currentAgentColor}15 50%, white 100%)`
                        }}
                    >
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                            <div
                                className="w-2 h-2 rounded-full mr-3 shadow-sm"
                                style={{ backgroundColor: currentAgentColor }}
                            ></div>
                            {landingMappings[agentSetKey]?.name || "Agent"} Instructions
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                        <div className="p-6">
                            <ReactMarkdown
                                className="markdown prose prose-gray max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-gray-200"
                                remarkPlugins={[remarkGfm]}
                            >
                                {instructionsAndTranscripts[agentSetKey]?.instruction || "No instructions available for this agent."}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function SuspensePage() {
    return (
        <Suspense fallback={<div className="p-5">Loading...</div>}>
            <Page />
        </Suspense>
    )
}