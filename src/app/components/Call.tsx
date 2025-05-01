import React from "react"
import PerlinSphere from "./PerlinNoiseSphere";
import { Canvas } from "@react-three/fiber";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

function Call({ }) {
    return (
        <div className="items-center justify-center overflow-hidden w-full h-full scale-spring"
            style={{
                transform: "scale(0.9)"
            }}
        >
            <Canvas style={{ width: '100%', height: '100%' }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
                <PerlinSphere
                />
                <EffectComposer>
                    <Bloom
                        intensity={0.2}
                        luminanceThreshold={0.2}
                        luminanceSmoothing={0.4}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}

export default Call