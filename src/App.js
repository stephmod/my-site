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
import querystring from 'querystring';
import axios from 'axios';

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
			<pointLight args={[10, 10, 10]} color={'#eaeaea'} />
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
				<meshStandardMaterial />
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
	const name = useRef();
	const email = useRef();
	const message = useRef();

	const cards = [
		{
			title: 'AI and machine learning',
			description: 'Better understand sophisticated models and monitor performance in production',
		},
		{
			title: 'payments and web3',
			description: 'Discover insights from payment rails and blockchains through sensory experience',
		},
		{
			title: 'patents and litigation',
			description: 'Uncover portfolios and litigations of patent trolls and alt investment vehicles',
		},
	];

	function handleSubmit(event) {
		event.preventDefault();

		const data = querystring.stringify({
			name: name.current.value,
			email: email.current.value,
			message: message.current.value,
			'form-name': 'contact',
		});

		axios
			.post('/', data)
			.then((response) => {
				console.log('AXIOS RESPONSE ', response);
				name.current.value = '';
				email.current.value = '';
				message.current.value = '';
				document.querySelector('#submitBtn').innerHTML = 'Sent!';
				document.querySelector('#submitBtn').style.backgroundColor = 'lightgreen';
			})
			.catch((err) => {
				console.log('AXIOS ERROR ', err);
				document.querySelector('#submitBtn').innerHTML = 'Not sent!';
				document.querySelector('#submitBtn').style.backgroundColor = 'pink';
			});

		setInterval(() => {
			document.querySelector('#submitBtn').innerHTML = 'Send';
			document.querySelector('#submitBtn').style.backgroundColor = '#FDD840';
		}, 3000);

		clearInterval();
	}

	return (
		<div id="home" className="App">
			<div className="Header flex flex-row items-center justify-between py-4 px-6 sm:px-10 md:px-20 border-b border-black lowercase bg-white text-zinc-900 sticky top-0 z-10">
				<a href="#home">
					<h3 className="font-unbound font-medium text-lg sm:text-xl">Stephanie Modica</h3>
				</a>
				<div className="flex flex-row items-center justify-end gap-10">
					<a href="#about" className="hidden sm:block">
						<p className="font-inter text-md sm:text-lg">About</p>
					</a>
					<a href="https://www.figma.com/board/moYtwSNfqVwn9wE6QRANRq/Portfolio" target="_blank" rel="noreferrer">
						<p className="font-inter text-md sm:text-lg">resume + portfolio</p>
					</a>
					{/* <a
						target="_blank"
						href="https://ff8add042b815782ca7c1565b2e65310e9c4ff4200f1abb3951503c-apidata.googleusercontent.com/download/storage/v1/b/dependable-aloe/o/smodica-resume-030923.pdf?jk=AahUMlsjrOS0JOfVSFss0S9gP8qZYp3tVl4TK5epKq9aJedApx3Wu1A308Pob8nwCNQSuVE55iddTON_GRLlRm-2onVc0iuFezDZWOCq2Xerqjegvl8wE-ffeBuBKZDRaeu3oaIIw4Cu_m29sB2tX2Q_etxx2mKNnWGNZOhUMWsDh1eU0AtPNT-2gDBjiETBSOR3RIfmyQZta3n3Y8gO-xSwUnie4PxZEvquQD6kwJ8IOyLJX0grha8mQq8qyu_e60JHLVUbxsD1zaT9f--3k2c_OaeM4ve3KNrQfGIm5I0Vpv3XpQMKb9_E-x4nwE2D1x--0d6LUqTGh0o69KeGrIqr0lkA_IdKaYY1InMrao1rDgGARknnmr4nlSU1f6jd5UnoOQc-R8wG7VVpnYyCnLxaPc2-rgi2HHkZ7dZ3qf6rq0TBuMQxTyOWI92DU3sVTsxdqdRTz-VdeUqc55l6SAlNZ5-zisvbfqMOl-dlS8CpDEH8Fh5dq0nMZyEIRFggybthNH4XaadOznd_0mTW5r83zWNt0mOmp2XDVXA-rPsMkcaZSDWH_096tLGVkMxex74Pb7Iww27DdLAMoagSLGSNXUT3DQvIyBE3BiypfHC_HpJwjZIiKM5NHM534er5awN2w2oIk2cDZ3tosNpJiY_4v08Pb0s_ss9F4ZDoN42rhk8G5qhNxTTER0Hrt0xX1D35tHK6n6AP-dy6xZfXX2P1Im6AU1oliJAL0u98AJmmY4gvvs_PW-la9dMRe6zro30GFZpMRFDx5QqwYDCI-D20ygwRppRh_P4-atg6ZbA5SIFi_K6cPEm4kELLTMY9F2Nj1WwXjr_8pPFefZNxDODvJDhZqgrYoGWvK5PYMbgxpKCf35Fa0QoacR0q6rWcqgIWZkEJ9XMqibsLNJ6OGEG0-oSwUrVmsrRO6cgVhNsXvplw21oLIWm5CO9QwCmSmSBAFut0_Ug9Zi9KxuCKZFWdH40SvvFkeKh75vkop02DELt7ft_KK4KfDxrXPp43IXMhhRZGYbQHhFsjfbm9aM5DA9Z0VmkVSo0JeSKiMjh1UPm79QEfbdWB_FtN0t82j37qmrPIfVWTBOyRwR-125Tcb4QlUJWbQcJjK2XQvZI5VNREkTHEbJX_REmIFOV_q7-C8-oQ-1wq_glDvYGfr0JPU8vbMEK0hLe3u6iMgDRvGA9kAwQOZJUkA11k9GqTNFfCRa4tt4sdGNN1&isca=1"
						className="sm:block hidden"
					>
						<p className="font-inter text-md sm:text-lg">Resume</p>
					</a> */}
					<a href="#contact" className="hidden sm:block">
						<p className="font-inter text-md sm:text-lg">Contact</p>
					</a>
				</div>
			</div>
			<div className="Main flex flex-col py-10 px-6 sm:px-10 md:px-20 pt-20 bg-[#eaeaea] text-zinc-900 border-b border-black">
				<h2 className="text-xl sm:text-2xl md:text-subheader font-thin uppercase font-inter py-2">
					Engineer & Designer
				</h2>
				<h1 className="text-5xl md:text-header leading-none tracking-tighter font-unbound font-medium pb-4">
					Transforming complex data into meaningful experiences
				</h1>
				<div className="flex flex-row py-10 md:py-20 justify-start items-center flex-wrap gap-5 sm:gap-10">
					{cards.map((card, i) => (
						<div
							key={`card_${i}`}
							className="flex flex-col basis-1/4 min-w-[88vw] md:min-w-[390px] border border-black p-8 sm:p-10 rounded-md bg-white drop-shadow-[5px_5px_0px_#18181b]"
						>
							<h3 className="font-unbound font-medium text-lg md:text-xl">{card.title}</h3>
							<p className="font-inter pt-2 text-base">{card.description}</p>
						</div>
					))}
				</div>
			</div>
			<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[50vh] border-b border-black">
				<h3 className="text-2xl sm:text-4xl leading-tight tracking-tight font-unbound font-light">
					"What we need is <span className="font-bold underline">not more information</span> but the ability
					to present <span className="font-bold underline">the right information</span> to the right people at
					the right time, in the most <span className="font-bold underline">effective and efficient</span>{' '}
					form."
				</h3>
				<p className="font-inter font-light uppercase">Robert E. Horn</p>
			</div>
			<div id="about" className="grid lg:grid-cols-2 scroll-mt-10">
				<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[70vh] lg:min-h-[95vh] border-b lg:border-b-0 border-black">
					<h3 className="font-unbound lowercase font-medium text-xl">About me</h3>
					<p className="font-inter pt-2 text-base">
					I combine engineering with design thinking to make complex systems accessible. Today, I'm leading the product and engineering teams at a 10+ person startup building an AI/ML-powered "Zillow for moneyball."
					</p>
					<p className="font-inter pt-2 text-base">Previously, I designed and developed 3D blockchain visualizations for Visa's global Innovation Centers and led analytics projects at the intersection of fintech and IP law in San Francisco.
					</p>
					<p className="font-inter pt-2 text-base">
					When I'm not nerding out on my computer, you can find me outside enjoying the sunshine and making pottery.
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
						<Block key={`block0`} />
					</Canvas>
				</div>
			</div>
			<div className="flex flex-col place-content-center px-6 sm:px-20 min-h-[50vh] border-b border-t border-black">
				<h3 className="text-2xl sm:text-4xl leading-tight tracking-tight font-unbound font-light">
					"What we like most is <span className="font-bold underline">translating complex information</span>{' '}
					into visually <span className="font-bold underline">effective and intelligent</span> design
					solutions."
				</h3>
				<p className="font-inter font-light uppercase">MGMT. design</p>
			</div>
			<div className="grid lg:grid-cols-2">
				<div className="bg-[#eaeaea] border-r border-black flex flex-col place-content-center lg:h-[95vh] h-[70vh]">
					<Canvas camera={{ position: [-4, 4, 8], fov: 30 }}>
						<OrbitControls enableZoom={false} />
						<Sphere key={`sphere0`} />
					</Canvas>
				</div>
				<div
					id="contact"
					className="flex flex-col place-content-center px-6 sm:px-20 min-h-[70vh] lg:min-h-[95vh] border-t lg:border-t-0 border-black scroll-mt-10"
				>
					<h3 className="font-unbound lowercase font-medium text-xl">Contact me</h3>
					{/* <p className="font-inter pt-2 text-base">
						I'd love to hear from you. Have a cool idea you want my help with? I'm always interested in
						learning about new and exciting projects.
					</p> */}
					<form name="contact" className="flex flex-col" onSubmit={handleSubmit}>
						<input
							placeholder="Your name"
							className="border border-black rounded-md mt-8 py-2 px-4 font-inter"
							required={true}
							name="name"
							type="text"
							ref={name}
						/>
						<input
							placeholder="Your email"
							className="border border-black rounded-md mt-4 py-2 px-4 font-inter"
							required={true}
							name="email"
							type="email"
							ref={email}
						/>
						<textarea
							placeholder="Message"
							className="border border-black rounded-md mt-4 py-2 px-4 font-inter"
							required={true}
							name="message"
							type="text"
							ref={message}
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
				<p className="font-inter text-md sm:text-base">© {new Date().getFullYear()}, Stephanie Modica</p>
			</div>
		</div>
	);
}

export default App;
