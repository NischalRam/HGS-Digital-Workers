import React, { useEffect, useRef, memo, useState } from "react"
import PerlinSphere from "./PerlinNoiseSphere";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { MicOff, Mic, Phone, PhoneOff } from "lucide-react"
import { Center } from "@react-three/drei";
import { SessionStatus } from "@/app/types";
import agentMappings from "../data/agentMappings"

interface CallProps {
    agentName: string;
    sessionStatus: SessionStatus;
    onToggleConnection: () => void;
    isPTTActive: boolean;
    setIsPTTActive: (val: boolean) => void;
}

const Call = memo(function Call({
    agentName,
    sessionStatus,
    onToggleConnection,
    isPTTActive,
    setIsPTTActive
}: CallProps) {
    const containerRef = useRef(null);

    const [fontColor, setFontColor] = useState("")
    const [filter, setFilter] = useState("")


    // Force canvas to properly resize with container
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver(() => {
            // Trigger a window resize event to make Three.js recalculate dimensions
            window.dispatchEvent(new Event('resize'));
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    useEffect(() => {
        if (agentMappings.hasOwnProperty(agentName.toLowerCase())) {
            setFontColor(agentMappings[agentName.toLowerCase()].fontColor)
            setFilter(agentMappings[agentName.toLowerCase()].filter)
            console.log("Font color:", agentMappings[agentName.toLowerCase()].fontColor)
            console.log("Filter color:", agentMappings[agentName.toLowerCase()].filter)
        }
        else {
            setFontColor("")
            setFilter("")
        }
    }, [agentName])

    return (
        <>
            <div className="items-center justify-center overflow-hidden w-full h-full"
                style={{
                    transform: "scale(1)",
                    position: "absolute",
                    zIndex: 10
                }}
                ref={containerRef}
            >
                <div
                    className="scaleSpring"
                    style={{
                        ...(filter != "" ? { filter: filter } : {}),
                        height: "90%",
                    }}
                >
                    <Canvas
                        style={{
                            paddingLeft: "60px",
                            height: "100%",
                            width: "100%"
                        }}
                    >
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                        <Center>
                            <PerlinSphere
                            />
                        </Center>
                        <EffectComposer>
                            <Bloom
                                intensity={0.2}
                                luminanceThreshold={0.2}
                                luminanceSmoothing={0.4}
                            />
                        </EffectComposer>
                    </Canvas>
                </div>
                <div className="flex items-center justify-between px-6 py-4 bg-black bg-opacity-40 rounded-full mx-auto max-w-xs absolute bottom-8 left-0 right-0">
                    {/* Connect Button (Left) */}
                    <button
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${sessionStatus === "CONNECTED"
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-gray-500 hover:bg-gray-600"
                            }`}
                        onClick={onToggleConnection}
                    >
                        {sessionStatus === "CONNECTED" ?
                            <Phone
                                className={`text-white`}
                                size={24}
                            />
                            :
                            <PhoneOff
                                className={`text-white`}
                                size={24}
                            />
                        }
                    </button>

                    {/* Mic Button (Right) */}
                    <button
                        className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${!isPTTActive
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                            }`}
                        onClick={() => setIsPTTActive(!isPTTActive)}
                    >
                        {!isPTTActive ? (
                            <MicOff className="text-white" size={24} />
                        ) : (
                            <Mic className="text-white" size={24} />
                        )}
                    </button>
                </div>
            </div>

            <div
                className="flex items-center justify-center overflow-hidden w-full h-full"
                style={{
                    position: "relative",
                }}
            >
                <h2
                    className="text-4xl font-bold tracking-wide"
                    style={{
                        ...(fontColor != "" ? { color: fontColor } : { color: "#2A3B8F" }),
                        textShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                        fontFamily: "'Montserrat', sans-serif",
                        letterSpacing: "0.5px",
                        paddingTop: "20px"
                    }}
                >
                    {agentName}
                </h2>
            </div>
        </>
    )
})

export default memo(Call)