import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { PerlinMaterial, PerlinMaterialImpl } from '../utils/PerlinMaterial';


// TODO: Find out why the extend is not working from PerlinMaterial.tsx
extend({ PerlinMaterial })

const PerlinSphere = ({ }) => {
    const materialRef = useRef<PerlinMaterialImpl>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.elapsedTime / 5;
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