import './App.css';
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
			Array.from({ length: 100 }, () => {
				return {
					size: THREE.MathUtils.randFloat(0.5, 3),
					position: {
						x: THREE.MathUtils.randFloat(-1.5, 1.5),
						y: THREE.MathUtils.randFloat(-1.5, 1.5),
						z: THREE.MathUtils.randFloat(-1.5, 1.5),
					},
				};
			}),
		[]
	);

	return (
		<Float>
			<mesh key={`block`} position={[0, 0, 0]}>
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
			<Instances key={`spheres`}>
				<sphereGeometry args={[0.1, 64, 64]} />
				<meshBasicMaterial />
				{data.map((d, i) => (
					<Instance
						key={`sphere_${i}`}
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
			<mesh key={`sphere`} position={[0, 0, 0]}>
				<sphereGeometry args={[1.5, 64, 64]} />
				<MeshTransmissionMaterial
					transmission={1}
					roughness={0.2}
					thickness={1}
					ior={3}
					background={new THREE.Color('#fff')}
				/>
			</mesh>
			<mesh key={`distorted_sphere`} position={[0, 0, 0]}>
				<sphereGeometry args={[0.35, 64, 64]} />
				<MeshDistortMaterial distort={1} color="#000" />
			</mesh>
		</group>
	);
};

function App() {
	const cards = [
		{
			title: 'AI and machine learning',
			description: 'Better understand your models and monitor performance in production.',
		},
		{
			title: 'payments and web3',
			description: 'Discover insights from payment rails and blockchains, and communicate visually.',
		},
		{
			title: 'patents and litigation',
			description: 'Know patent troll portfolios and litigation histories better than they do.',
		},
	];

	return (
		<div id="home" className="App">
			<div className="Header flex flex-row items-center justify-between py-4 px-6 sm:px-10 md:px-20 border-b border-black lowercase bg-white text-zinc-900 sticky top-0 z-10">
				<a href="#home">
					<h3 className="font-unbound font-medium text-lg sm:text-xl">Stephanie Modica</h3>
				</a>
				<div className="flex flex-row items-center justify-end gap-10">
					<a href="#about">
						<p className="font-inter text-md sm:text-lg">About</p>
					</a>
					<a href="#contact">
						<p className="font-inter text-md sm:text-lg">Contact</p>
					</a>
				</div>
			</div>
			<div className="Main flex flex-col py-10 px-6 sm:px-10 md:px-20 pt-20 bg-[#eaeaea] text-zinc-900 border-b border-black">
				<h2 className="text-xl sm:text-2xl md:text-subheader font-thin uppercase font-inter py-2">
					Engineer & Designer
				</h2>
				<h1 className="text-5xl md:text-header leading-none tracking-tighter font-unbound font-medium pb-4">
					Specializing in the visualization of complex data systems
				</h1>
				<div className="flex flex-row py-10 md:py-20 justify-start items-center flex-wrap gap-5 sm:gap-10">
					{cards.map((card, i) => (
						<div
							key={`card_${i}`}
							className="flex flex-col basis-1/4 min-w-[88vw] md:min-w-[390px] border border-black p-8 sm:p-10 rounded-md bg-white drop-shadow-[5px_5px_0px_#18181b]"
						>
							<h3 className="font-unbound font-medium text-lg md:text-xl">{card.title}</h3>
							<p className="font-inter pt-2 text-md md:text-base">{card.description}</p>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[50vh] border-b border-black">
				<h3 className="text-2xl sm:text-4xl leading-tight tracking-tight font-unbound font-light">
					"What we need is <span className="font-bold">not more information</span> but the ability to present{' '}
					<span className="font-bold">the right information</span> to the right people at the right time, in
					the most <span className="font-bold">effective and efficient</span> form."
				</h3>
				<p className="font-inter font-light uppercase">Robert E. Horn</p>
			</div>
			<div id="about" className="grid lg:grid-cols-2 scroll-mt-10">
				<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[70vh] lg:min-h-[95vh] border-b lg:border-b-0 border-black">
					<h3 className="font-unbound lowercase font-medium text-xl">About me</h3>
					<p className="font-inter pt-2 text-md sm:text-base">
						I'm a Staff Design Engineer on the Data Experience team at Visa, and specialize in the
						visualization of complex data systems like AI and machine learning, payments and web3, and
						patents and litigation.
					</p>
					<p className="font-inter pt-2 text-md sm:text-base">
						Before Visa, I spent several years working in San Francisco as a data analyst turned data
						scientist turned software engineer, focused on data analysis tooling and interactive
						visualization applications.
					</p>
					<div className="flex flex-row gap-5">
						<a href="https://www.linkedin.com/in/smodica" target="_blank" rel="noreferrer">
							<button className="border border-black rounded-md w-32 mt-8 p-2 bg-[#FDD840] font-inter drop-shadow-[5px_5px_0px_#18181b] hover:bg-yellow-100">
								LinkedIn
							</button>
						</a>
					</div>
				</div>
				<div className="bg-[#eaeaea] border-l border-black flex flex-col place-content-center sm:h-[95vh] h-[70vh]">
					<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
						<OrbitControls enableZoom={false} />
						<ambientLight intensity={1} />
						<Block key={`block0`} />
					</Canvas>
				</div>
			</div>
			<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[50vh] border-b border-t border-black">
				<h3 className="text-2xl sm:text-4xl leading-tight tracking-tight font-unbound font-light">
					"What we like most is <span className="font-bold">translating complex information</span> into{' '}
					<span className="font-bold">visually effective and intelligent</span> design solutions."
				</h3>
				<p className="font-inter font-light uppercase">MGMT. design</p>
			</div>
			<div id="contact" className="grid lg:grid-cols-2 scroll-mt-10">
				<div className="bg-[#eaeaea] border-r border-black flex flex-col place-content-center lg:h-[95vh] h-[70vh]">
					<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
						<OrbitControls enableZoom={false} />
						<ambientLight intensity={1} />
						<Sphere key={`sphere0`} />
					</Canvas>
				</div>
				<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[70vh] lg:min-h-[95vh] border-t lg:border-t-0 border-black">
					<h3 className="font-unbound lowercase font-medium text-xl">Contact me</h3>
					<p className="font-inter pt-2 text-md sm:text-base">
						I'd love to hear from you. Have a cool idea you want my help with? I'm always interested in
						learning about new and exciting projects.
					</p>
					<form name="contact" method="POST" className="flex flex-col" netlify>
						<input
							placeholder="Your name"
							className="border border-black rounded-md mt-8 py-2 px-4 font-inter"
							required={true}
							name="name"
							type="text"
						/>
						<input
							placeholder="Your email"
							className="border border-black rounded-md mt-4 py-2 px-4 font-inter"
							required={true}
							name="email"
							type="email"
						/>
						<textarea
							placeholder="Message"
							className="border border-black rounded-md mt-4 py-2 px-4 font-inter"
							required={true}
							name="message"
							type="text"
						/>
						<button
							id="submitBtn"
							type="submit"
							className="border border-black rounded-md w-32 mt-8 p-2 bg-[#FDD840] font-inter drop-shadow-[5px_5px_0px_#18181b] hover:bg-yellow-100"
						>
							Send
						</button>
					</form>
				</div>
			</div>
			<div className="border border-t-black py-4 px-6 sm:px-10 md:px-20">
				<p className="font-inter text-md sm:text-base">© 2023, Stephanie Modica</p>
			</div>
		</div>
	);
}

export default App;
