import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { texture, textureLoad } from 'three/webgpu';


// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(10,20,15)
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.update();

// lights configuration
const directLight = new THREE.DirectionalLight(0x6d7391, 3);
directLight.position.set(5, 15, 5).normalize();
directLight.castShadow = true;
scene.add(directLight);

const ambientLight = new THREE.AmbientLight(0x2e2cc7,0.05);
scene.add(ambientLight);

const spotLightTarget = new THREE.Object3D();
scene.add(spotLightTarget);
spotLightTarget.position.set(-5,2,-2);

const spotLight = new THREE.SpotLight(0xffffff,300);
spotLight.position.set(10,20,10);
spotLight.penumbra = 0.6;
spotLight.angle = 0.8;
spotLight.decay = 1.5;
spotLight.target = spotLightTarget;
spotLight.castShadow = true;
scene.add(spotLight);


let horizontalRotation = -Math.PI/2;

function createMaterial(type,color) {
    if (type == "lambert") {
        return new THREE.MeshLambertMaterial({color});
    } else if (type == "phong") {
        return new THREE.MeshPhongMaterial({color});
    } else {
        return new THREE.MeshStandardMaterial({ color });
    }
}


function spawnRoom() {
	const roomMaterial = createMaterial("lambert",0xffffff);
    const floorMaterial = createMaterial("lambert",0xc29957);

	const floorGeometry = new THREE.PlaneGeometry(25, 20);
	const floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = horizontalRotation;
	scene.add(floor);

	const backWall = new THREE.Mesh(new THREE.BoxGeometry(25, 10, 0.1), roomMaterial);
	backWall.position.set(0, 5, -10);
	scene.add(backWall);

	const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.1, 10, 20), roomMaterial);
	leftWall.position.set(-12.5, 5, 0);
	scene.add(leftWall);

	// const ceiling = new THREE.Mesh(new THREE.BoxGeometry(25 , 0.1, 20), roomMaterial);
	// ceiling.position.set(0,10,0);
	// scene.add(ceiling);

	
	
}

function tableComp(width,height,depth){
	const texture = new THREE.TextureLoader().load('textures/Screenshot 2024-11-09 142856.png' ); 
	const tabMaterial = new THREE.MeshBasicMaterial( { map:texture } );

	const TabGeo = new THREE.BoxGeometry(width,height,depth);
	const table = new THREE.Mesh(TabGeo,tabMaterial);

	return table;	
}

function SpawnTable(){
	const tab = tableComp(10,0.3,5);
	tab.position.set(0,2.9,0);
	scene.add(tab);

	const tableg1 = tableComp(0.2,3,0.2);
	tableg1.position.set(4.9,1.3,2.3);
	scene.add(tableg1);

	const tableg2 = tableComp(0.2,3,0.2);
	tableg2.position.set(-4.9,1.3,2.3);
	scene.add(tableg2);

	const tableg3 = tableComp(0.2,3,0.2);
	tableg3.position.set(-4.9,1.3,-2.3);
	scene.add(tableg3);

	const tableg4 = tableComp(0.2,3,0.2);
	tableg4.position.set(4.9,1.3,-2.3);
	scene.add(tableg4);
}


function ChairComponents(width, height, depth){
	const Text = new THREE.TextureLoader();
	const chairText = Text.load('textures/Screenshot 2024-11-09 142856.png');

	const chairGeo = new THREE.BoxGeometry(width,height,depth);
	const chairMat = new THREE.MeshBasicMaterial({map:chairText});
	const chair = new THREE.Mesh(chairGeo,chairMat);

	return chair;
}

function spawnchair(){
	const chair = ChairComponents(3,0.1,3);
	chair.position.set(8.1,1.5,0);
	scene.add(chair);

	const chairBack = ChairComponents(0.2,3,3);
	chairBack.position.set(9.5,3,0);
	scene.add(chairBack);

	const leg1 = ChairComponents(0.2,3,0.2);
	leg1.position.set(9.5,0,1.3);
	scene.add(leg1);

	const leg2 = ChairComponents(0.2,3,0.2);
	leg2.position.set(9.5,0,-1.3);
	scene.add(leg2);

	const leg3 = ChairComponents(0.2,3,0.2);
	leg3.position.set(7,0,1.3);
	scene.add(leg3);

	const leg4 = ChairComponents(0.2,3,0.2);
	leg4.position.set(7,0,-1.3);
	scene.add(leg4);


	const chair2 = ChairComponents(3,0.1,3);
	chair2.position.set(-3,1.5,4);
	scene.add(chair2);

	const chair2Back = ChairComponents(3,3,0.2);
	chair2Back.position.set(-3,3,5.4);
	scene.add(chair2Back);

	const chair2leg1 = ChairComponents(0.2,3,0.2);
	chair2leg1.position.set(-4.4,0,5.4);
	scene.add(chair2leg1);

	const chair2leg2 = ChairComponents(0.2,3,0.2);
	chair2leg2.position.set(-1.6,0,5.4);
	scene.add(chair2leg2);

	const chair2leg3 = ChairComponents(0.2,3,0.2);
	chair2leg3.position.set(-4.4,0,3);
	scene.add(chair2leg3);

	const chair2leg4 = ChairComponents(0.2,3,0.2);
	chair2leg4.position.set(-1.6,0,3);
	scene.add(chair2leg4);

}

function importChair(x,y,z,rotationY){
	loader.load('3d objects/old_wooden_chair_low_poly.glb',(object)=> {
		const chairTexture = textureLoader.load('3d objects/old_wooden_chair_low_poly.glb');

		object.position.set(x,y,z);
		object.scale.set(0,0,0);
		object.rotation.y = rotationY;
		scene.add(object);
	});







spawnRoom();
SpawnTable();
spawnchair();


function animate() {
	renderer.render( scene, camera );
    controls.update();
    
}
renderer.setAnimationLoop( animate );