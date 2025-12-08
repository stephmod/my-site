import { Canvas, useFrame } from '@react-three/fiber';
import {
	OrbitControls,
	RoundedBox,
	Instance,
	Instances,
	Float,
	MeshTransmissionMaterial,
	MeshDistortMaterial,
} from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const Block = () => {
	const data = useMemo(
		() =>
			Array.from({ length: 100 }, () => ({
				size: THREE.MathUtils.randFloat(0.5, 3),
				position: {
					x: THREE.MathUtils.randFloat(-1.5, 1.5),
					y: THREE.MathUtils.randFloat(-1.5, 1.5),
					z: THREE.MathUtils.randFloat(-1.5, 1.5),
				},
			})),
		[]
	);

	return (
		<Float>
			<pointLight args={[10, 10, 10]} color={'#eaeaea'} />
			<mesh position={[0, 0, 0]}>
				<RoundedBox args={[2.2, 2.2, 2.2]}>
					<MeshTransmissionMaterial
						transmission={1}
						roughness={0.3}
						thickness={1}
						ior={2}
						background={new THREE.Color('#fff')}
					/>
				</RoundedBox>
			</mesh>
			<Instances>
				<sphereGeometry args={[0.1, 64, 64]} />
				<meshStandardMaterial />
				{data.map((d, i) => (
					<Instance
						key={i}
						position={[d.position.x, d.position.y, d.position.z]}
						color={'#000'}
						scale={d.size}
					/>
				))}
			</Instances>
		</Float>
	);
};

const Sphere = () => {
	const sphere = useRef();

	useFrame(() => {
		sphere.current.rotation.y += 0.001;
	});

	return (
		<group ref={sphere}>
			<mesh position={[0, 0, 0]}>
				<sphereGeometry args={[1.5, 64, 64]} />
				<MeshTransmissionMaterial
					transmission={1}
					roughness={0.2}
					thickness={1}
					ior={3}
					background={new THREE.Color('#fff')}
				/>
			</mesh>
			<mesh position={[0, 0, 0]}>
				<sphereGeometry args={[0.35, 64, 64]} />
				<MeshDistortMaterial distort={1} color="#000" />
			</mesh>
		</group>
	);
};

export const BlockScene = () => (
	<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
		<OrbitControls enableZoom={false} />
		<Block />
	</Canvas>
);

export const SphereScene = () => (
	<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
		<OrbitControls enableZoom={false} />
		<Sphere />
	</Canvas>
);
