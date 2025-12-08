import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

// Animated node component
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

function AppV2() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth < 1024);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const stats = [
		{ value: '$13M', label: 'Revenue from a single analysis' },
		{ value: '70%', label: 'Cost reduction through design-led innovation' },
		{ value: '10+', label: 'Engineers and data scientists led' },
		{ value: '4', label: 'Time zones managed simultaneously' },
	];

	const work = [
		{
			company: 'AI Startup',
			role: 'Chief Product & Technology Officer',
			year: '2022–2025',
			description:
				'Scaled a seed-stage AI startup from zero to production. Led a distributed team of 10+ engineers and data scientists across 4 time zones. Shipped agentic AI systems with MCP architecture—before it was mainstream.',
		},
		{
			company: 'Visa',
			role: 'Staff Design Engineer, Data Experience',
			year: '2021–2023',
			description:
				'Established Visa\'s first data-driven design analytics function, measuring adoption across their global product portfolio. Built interactive blockchain visualizations for Innovation Centers worldwide and scaled the open-source @visa/charts library.',
		},
		{
			company: 'Legal Fintech',
			role: 'Senior Manager, Analytics',
			year: '2016–2021',
			description:
				'Designed and launched Clarity, a custom analytics platform serving 50+ enterprise clients. Built scalable workflows that transformed complex patent analysis into actionable intelligence for legal and investment teams.',
		},
	];

	const themes = [
		{
			name: 'Building with AI',
			description:
				'Using AI as a force multiplier to ship software faster. Claude, Cursor, and modern tooling let me move from idea to production at startup speed.',
		},
		{
			name: 'Building AI Systems',
			description:
				'Designing agentic architectures that automate complex workflows. Multi-LLM orchestration, MCP integrations, and intelligent systems that actually ship.',
		},
		{
			name: 'Helping Founders Ship',
			description:
				'Strategic advisory for early-stage teams building AI products. Product leadership, technical strategy, and hands-on guidance for founders I believe in.',
		},
	];

	return (
		<div className="bg-black text-white min-h-screen overflow-x-clip">
			{/* Navigation */}
			<nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 bg-black/80 backdrop-blur-sm">
				<span className="font-unbound font-medium text-lg tracking-tight">SM</span>
				<div className="flex gap-8 font-inter text-sm tracking-wide">
					<a href="#work" className="hover:text-gray-400 transition-colors">Work</a>
					<a href="#about" className="hover:text-gray-400 transition-colors">About</a>
					<a href="#contact" className="hover:text-gray-400 transition-colors">Contact</a>
				</div>
			</nav>

			<main>
			{/* Hero */}
			<section className="min-h-screen flex flex-col lg:flex-row">
				<div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 lg:pt-0">
					<p className="font-inter text-sm tracking-widest uppercase text-gray-400 mb-4">
						Product & Technology Leader
					</p>
					<h1 className="font-unbound font-medium text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight mb-6">
						I build products and teams that ship.
					</h1>
					<p className="font-inter text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
						Startup CPTO with enterprise experience. Transforming workflows into AI-powered systems.
					</p>
					<div className="flex gap-4 mt-10">
						<a
							href="#work"
							className="font-inter text-sm px-6 py-3 bg-white text-black hover:bg-gray-200 transition-colors"
						>
							View Work
						</a>
						<a
							href="#contact"
							className="font-inter text-sm px-6 py-3 border border-white/30 hover:border-white transition-colors"
						>
							Get in Touch
						</a>
					</div>
				</div>
				<div className={`min-h-[280px] h-[35vh] lg:h-screen lg:flex-1 overflow-visible ${isMobile ? 'pointer-events-none' : ''}`}>
					<Canvas camera={{ position: [0, 0, isMobile ? 4 : 5], fov: 50 }}>
						<NeuralMesh />
						<OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} />
					</Canvas>
				</div>
			</section>

			{/* Stats */}
			<section className="border-t border-white/10 py-16 md:py-24 mt-8 lg:mt-0">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 px-6 md:px-12 lg:px-20">
					{stats.map((stat, i) => (
						<div key={i}>
							<p className="font-unbound font-medium text-4xl md:text-5xl tracking-tight">{stat.value}</p>
							<p className="font-inter text-sm text-gray-400 mt-2">{stat.label}</p>
						</div>
					))}
				</div>
			</section>

			{/* Work */}
			<section id="work" className="border-t border-white/10 py-16 md:py-24 px-6 md:px-12 lg:px-20">
				<h2 className="font-inter text-sm tracking-widest uppercase text-gray-400 mb-12">Selected Work</h2>
				<div className="space-y-16">
					{work.map((item, i) => (
						<div key={i} className="grid lg:grid-cols-3 gap-6 lg:gap-12">
							<div>
								<h3 className="font-unbound font-medium text-2xl tracking-tight">{item.company}</h3>
								<p className="font-inter text-gray-400 mt-1">{item.role}</p>
								<p className="font-inter text-gray-400 text-sm mt-1">{item.year}</p>
							</div>
							<p className="font-inter text-gray-300 leading-relaxed lg:col-span-2">{item.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* What I Do */}
			<section className="border-t border-white/10 py-16 md:py-24 px-6 md:px-12 lg:px-20">
				<h2 className="font-inter text-sm tracking-widest uppercase text-gray-400 mb-12">What I Do</h2>
				<div className="grid md:grid-cols-3 gap-8">
					{themes.map((item, i) => (
						<div key={i} className="border border-white/10 p-8">
							<h3 className="font-unbound font-medium text-xl tracking-tight mb-4">{item.name}</h3>
							<p className="font-inter text-gray-400 text-sm leading-relaxed">{item.description}</p>
						</div>
					))}
				</div>
			</section>

			{/* About */}
			<section id="about" className="border-t border-white/10 py-16 md:py-24 px-6 md:px-12 lg:px-20">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
					<div>
						<h2 className="font-inter text-sm tracking-widest uppercase text-gray-400 mb-6">About</h2>
						<p className="font-unbound font-medium text-3xl md:text-4xl tracking-tight leading-tight">
							Different by design.
						</p>
					</div>
					<div className="space-y-6 font-inter text-gray-300 leading-relaxed">
						<p>
							I'm wired to build. Whether it's software or something physical, I think in visuals, reason in systems, and get antsy when ideas stay abstract. I gravitate toward hard problems, curious collaborators, and anything that ends up in real people's hands.
						</p>
						<p>
							With AI making code abundant, what matters most is taste, judgment, and perspective. Choosing the right problem and shaping how the solution should feel. That's where I do my best work.
						</p>
						<p>
							Now in Miami after years in San Francisco. Same drive, more sun.
						</p>
						<div className="flex flex-wrap gap-2 pt-2">
							{['MBA', 'Engineering', 'Design', 'Data', 'AI', 'Product', 'Leadership'].map((chip) => (
								<span key={chip} className="px-3 py-1 text-sm border border-white/20 text-gray-400">
									{chip}
								</span>
							))}
						</div>
					</div>
				</div>
				<div className="flex gap-6 mt-12">
					<a
						href="https://www.linkedin.com/in/smodica"
						target="_blank"
						rel="noreferrer"
						className="font-inter text-sm text-gray-400 hover:text-white transition-colors"
					>
						LinkedIn →
					</a>
				</div>
			</section>

			{/* Contact */}
			<section id="contact" className="border-t border-white/10 py-16 md:py-24 px-6 md:px-12 lg:px-20">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div>
						<h2 className="font-inter text-sm tracking-widest uppercase text-gray-400 mb-6">Contact</h2>
						<p className="font-unbound font-medium text-3xl md:text-4xl tracking-tight mb-6">
							Let's build something.
						</p>
						<p className="font-inter text-gray-400 mb-8">
							Whether you're scaling an AI product, need technical leadership, or have an interesting problem to solve.
						</p>
						<a
							href="mailto:modica.steph@gmail.com"
							className="font-inter text-xl md:text-2xl hover:text-gray-400 transition-colors"
						>
							modica.steph@gmail.com
						</a>
					</div>
					<div className="flex justify-center lg:justify-end">
						<img
							src="/headshot.webp"
							alt="Stephanie Modica"
							className="w-64 h-auto object-cover"
							width={346}
							height={512}
							loading="lazy"
						/>
					</div>
				</div>
			</section>
			</main>

			{/* Footer */}
			<footer className="border-t border-white/10 py-8 px-6 md:px-12 lg:px-20 flex justify-between items-center">
				<span className="font-inter text-sm text-gray-400">© {new Date().getFullYear()} Stephanie Modica</span>
				<span className="font-inter text-sm text-gray-400">Miami</span>
			</footer>
		</div>
	);
}

export default AppV2;
