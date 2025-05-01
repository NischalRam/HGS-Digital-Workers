import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const PerlinMaterial = shaderMaterial(
    // Uniforms
    {
        uTime: 0,
        lightPosition: new THREE.Vector3(-10, -10, -5),
        lightColor: new THREE.Vector3(1, 1, 1),
        lightIntensity: 0.5
    },
    // Vertex shader
    `
    uniform float uTime;
    varying float vDisplacement;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    
    //	Classic Perlin 3D Noise 
    //	by Stefan Gustavson
    //
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
    vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
    
    float noise(vec3 P){
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;
        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);
        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);
        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);
        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);
        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;
        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);
        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
    }
    
    /* 
    * SMOOTH MOD
    * - authored by @charstiles -
    * based on https://math.stackexchange.com/questions/2491494/does-there-exist-a-smooth-approximation-of-x-bmod-y
    * (axis) input axis to modify
    * (amp) amplitude of each edge/tip
    * (rad) radius of each edge/tip
    * returns => smooth edges
    */
    float smoothMod(float axis, float amp, float rad){
        float top = cos(3.14159265359 * (axis / amp)) * sin(3.14159265359 * (axis / amp));
        float bottom = pow(sin(3.14159265359 * (axis / amp)), 2.0) + pow(rad, 2.0);
        float at = atan(top / bottom);
        return amp * (1.0 / 2.0) - (1.0 / 3.14159265359) * at;
    }
    
    float fit(float unscaled, float originalMin, float originalMax, float minAllowed, float maxAllowed) {
        return (maxAllowed - minAllowed) * (unscaled - originalMin) / (originalMax - originalMin) + minAllowed;
    }
    
    float wave(vec3 position) {
        return fit(smoothMod(position.y * 6.0, 1.0, 1.5), 0.35, 0.6, 0.0, 1.0);
    }
    
    void main() {
        vec3 coords = normal;
        coords.y += uTime;
        vec3 noisePattern = vec3(noise(coords / 1.5));
        float pattern = wave(noisePattern);
        
        vDisplacement = pattern;
        float displacement = vDisplacement / 5.0;
        
        // Apply the displacement
        vec3 newPosition = position + normal * displacement;
        
        vNormal = normalMatrix * normal; // Normal in view space
        vPosition = (modelViewMatrix * vec4(newPosition, 1.0)).xyz; // Position in view space
        vUv = uv; // Pass UV coordinates
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
    `,
    // Fragment shader
    `
    uniform float uTime;
    varying float vDisplacement;

    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;

    uniform vec3 lightPosition; // Position of the light in world space
    uniform vec3 lightColor; // Color of the light
    uniform float lightIntensity; // Intensity of the light

    vec3 perturbNormalArb(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection) {
        vec3 vSigmaX = dFdx(surf_pos.xyz);
        vec3 vSigmaY = dFdy(surf_pos.xyz);
        vec3 vN = surf_norm; // normalized
        vec3 R1 = cross(vSigmaY, vN);
        vec3 R2 = cross(vN, vSigmaX);
        float fDet = dot(vSigmaX, R1) * faceDirection;
        vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
        return normalize(abs(fDet) * surf_norm - vGrad);
    }
    
    void main() {
        // Calculate the derivatives of the displacement for normal map
        vec2 dHdxy = vec2(
            dFdx(vDisplacement) * 0.5,
            dFdy(vDisplacement) * 0.5
        );
        
        // Perturb the normal based on displacement map
        vec3 normal = perturbNormalArb(vPosition, normalize(vNormal), dHdxy, 1.0);
        
        // Calculate light direction
        vec3 lightDir = normalize(lightPosition - vPosition);
        
        // Basic diffuse lighting
        float diff = max(dot(normal, lightDir), 0.0);
        
        // Base color 
        vec3 baseColor = vec3(0.1, 0.3, 0.8);
        
        // Apply lighting to color
        vec3 diffuse = lightColor * baseColor * diff * lightIntensity;
        
        // Add ambient light
        vec3 ambient = baseColor * 0.2;
        
        // Final color
        vec3 finalColor = ambient + diffuse;
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
    `
);

export type PerlinMaterialImpl = {
    uTime: number;
    lightPosition: THREE.Vector3;
    lightColor: THREE.Vector3;
    lightIntensity: number;
} & THREE.ShaderMaterial;

extend({ PerlinMaterial });

export { PerlinMaterial };

