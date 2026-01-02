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
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Animated node component for NeuralMesh
const AnimatedNode = ({ basePosition, scale, color, speed, offset }) => {
	const meshRef = useRef();

	useFrame((state) => {
		if (meshRef.current) {
			const t = state.clock.elapsedTime * speed + offset;
			meshRef.current.position.x = basePosition.x + Math.sin(t) * 0.15;
			meshRef.current.position.y = basePosition.y + Math.cos(t * 0.8) * 0.15;
			meshRef.current.position.z = basePosition.z + Math.sin(t * 0.6) * 0.15;
		}
	});

	return (
		<mesh ref={meshRef} position={[basePosition.x, basePosition.y, basePosition.z]}>
			<sphereGeometry args={[scale, 16, 16]} />
			<meshBasicMaterial color={color} />
		</mesh>
	);
};

// Neural mesh visualization - interconnected nodes representing agentic systems
const NeuralMesh = () => {
	const accentColor = '#FDD840'; // yellow accent

	// Generate node data
	const nodes = useMemo(() => {
		const points = [];
		const count = 55;
		for (let i = 0; i < count; i++) {
			const theta = Math.random() * Math.PI * 2;
			const phi = Math.acos(2 * Math.random() - 1);
			const r = 1.2 + Math.random() * 1.3;
			const position = new THREE.Vector3(
				r * Math.sin(phi) * Math.cos(theta),
				r * Math.sin(phi) * Math.sin(theta),
				r * Math.cos(phi)
			);
			const isAccent = Math.random() < 0.08;
			points.push({
				position,
				scale: isAccent ? 0.04 + Math.random() * 0.03 : 0.015 + Math.random() * 0.025,
				color: isAccent ? accentColor : '#ffffff',
				isAccent,
				speed: 0.3 + Math.random() * 0.4,
				offset: Math.random() * Math.PI * 2,
			});
		}
		return points;
	}, []);

	// Static connections (won't move with nodes for performance)
	const connections = useMemo(() => {
		const lines = [];
		for (let i = 0; i < nodes.length; i++) {
			for (let j = i + 1; j < nodes.length; j++) {
				const dist = nodes[i].position.distanceTo(nodes[j].position);
				if (dist < 1.4) {
					lines.push({
						start: nodes[i].position,
						end: nodes[j].position,
						hasAccent: nodes[i].isAccent || nodes[j].isAccent,
					});
				}
			}
		}
		return lines;
	}, [nodes]);

	return (
		<Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
			<group>
				{/* Connections */}
				{connections.map((line, i) => (
					<line key={`line-${i}`}>
						<bufferGeometry>
							<bufferAttribute
								attach="attributes-position"
								count={2}
								array={new Float32Array([
									line.start.x, line.start.y, line.start.z,
									line.end.x, line.end.y, line.end.z,
								])}
								itemSize={3}
							/>
						</bufferGeometry>
						<lineBasicMaterial
							color="#ffffff"
							transparent
							opacity={0.12}
						/>
					</line>
				))}
				{/* Animated Nodes */}
				{nodes.map((node, i) => (
					<AnimatedNode
						key={i}
						basePosition={node.position}
						scale={node.scale}
						color={node.color}
						speed={node.speed}
						offset={node.offset}
					/>
				))}
				{/* Central core */}
				<mesh position={[0, 0, 0]}>
					<sphereGeometry args={[0.08, 32, 32]} />
					<meshBasicMaterial color={accentColor} />
				</mesh>
				<mesh position={[0, 0, 0]}>
					<sphereGeometry args={[0.12, 32, 32]} />
					<meshBasicMaterial color={accentColor} transparent opacity={0.3} />
				</mesh>
			</group>
		</Float>
	);
};

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

export const BlockScene = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 1024);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<Canvas
			camera={{ position: [-4, 4, 8], fov: 30 }}
			style={isMobile ? { touchAction: 'pan-y' } : {}}
		>
			{!isMobile && <OrbitControls enableZoom={false} />}
			<Block />
		</Canvas>
	);
};

export const SphereScene = () => (
	<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
		<OrbitControls enableZoom={false} />
		<Sphere />
	</Canvas>
);

export const NeuralMeshScene = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 1024);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<Canvas
			camera={{ position: [0, 0, isMobile ? 4 : 5], fov: 50 }}
			style={isMobile ? { touchAction: 'pan-y' } : {}}
		>
			<NeuralMesh />
			{!isMobile && (
				<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
			)}
		</Canvas>
	);
};
