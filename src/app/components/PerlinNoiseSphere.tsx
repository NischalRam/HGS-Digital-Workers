import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import { PerlinMaterial, PerlinMaterialImpl } from '../utils/PerlinMaterial';


// TODO: Find out why the extend is not working from PerlinMaterial.tsx
extend({ PerlinMaterial })

interface PerlinSphereProps {
    width: number,
    height: number
}

const PerlinSphere = ({ width, height }: PerlinSphereProps) => {
    const materialRef = useRef<PerlinMaterialImpl>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uTime = clock.elapsedTime / 5;
        }
    });

    return (
        <mesh>
            <icosahedronGeometry args={[1, 64]} />
            <perlinMaterial ref={materialRef} />
        </mesh>
    );
};



export default PerlinSphere;