import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { PerlinMaterial, PerlinMaterialImpl } from '../utils/PerlinMaterial';


// TODO: Find out why the extend is not working from PerlinMaterial.tsx
extend({ PerlinMaterial })

interface PerlinSphere {
    pauseSphere?: boolean
}

const PerlinSphere = ({ pauseSphere = false }: PerlinSphere) => {
    const materialRef = useRef<PerlinMaterialImpl>(null);

    const timeRef = useRef<{
        value: number;
        lastTime: number | null;
        momentum: number;
    }>({
        value: 0,
        lastTime: null,
        momentum: 0
    });

    useFrame(({ clock }) => {
        if (materialRef.current) {
            const currentTime = clock.getElapsedTime();
            const targetMomentum = pauseSphere ? 0 : 1;

            if (timeRef.current.lastTime !== null) {
                const delta = currentTime - timeRef.current.lastTime;

                const momentumDiff = targetMomentum - timeRef.current.momentum
                timeRef.current.momentum += momentumDiff *
                    Math.min(delta * 3, 1)

                if (timeRef.current.momentum > 0.001)
                    timeRef.current.value += delta * timeRef.current.momentum;

            }

            timeRef.current.lastTime = currentTime;

            materialRef.current.uTime = timeRef.current.value / 5;
        }
    });

    return (
        <mesh>
            <icosahedronGeometry args={[1, 128]} />
            {/* @ts-expect-error - Already declared in types.ts. For some reason not getting picked up by lint*/}
            <perlinMaterial ref={materialRef} />
        </mesh>
    );
};



export default PerlinSphere;