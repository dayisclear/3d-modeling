/*Read from file and store in object*/
window.onload = function() {
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /text.*/;

		if (file.type.match(textType)) {
			var reader = new FileReader();
			reader.onload = function(e) {
				var dataString =reader.result;
				init(dataString); 
				render();
			}
			reader.readAsText(file);
		} else {
			console.log("File not supported!");
		}
	});	
}



var scene;
var camera;
var renderer;
var cubeX = 1;
var cubeY = 1;
var cubeZ = 50;

var init = function(dataString) {

scene = new THREE.Scene();
scene.position.x = -500;
scene.position.y = -300;
camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 2000 );
/*
camera.position.x = 0;
camera.position.y = 0;
camera.position.z =  600;
*/
camera.position.x = 0;
camera.position.y = -475;
camera.position.z =  715;
camera.rotation.x = 0.60;
camera.rotation.y = 0;
camera.rotation.z = 0; 



//camera.up = new THREE.Vector3(0,0,1);
//camera.lookAt(new THREE.Vector3(0,0,0));
 
var directionalLight = new THREE.DirectionalLight( 0x00ff00, 1 );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

var geometry = new THREE.PlaneGeometry( 8192, 8192, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x5bc0c7, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );


var texture = THREE.ImageUtils.loadTexture('resource/block.jpg');
var mats = [];
mats.push(new THREE.MeshBasicMaterial( { color: 0xbcbfa4} ));//RIGHT:dark white
mats.push(new THREE.MeshBasicMaterial({color: 0xbcbfa4})); //LEFT: dark white
mats.push(new THREE.MeshBasicMaterial({color: 0xbcbfa4}));//Back: dark white
mats.push(new THREE.MeshBasicMaterial({color: 0xd0d3b7}));//Front: white
mats.push(new THREE.MeshBasicMaterial({color: 0x5b5b5b}));//TOP: Grey
mats.push(new THREE.MeshBasicMaterial({color: 0x0000}));//Bottom:black
var faceMaterial = new THREE.MeshFaceMaterial(mats);

//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );


var geometry = new THREE.BoxGeometry( cubeX, cubeY, cubeZ );
//var material = new THREE.MeshBasicMaterial( { color: 0xd0d3b7, wireframe: false, wireframeLinewidth: 10, map:texture} );
material = faceMaterial;
var controls = new THREE.OrbitControls( camera, renderer.domElement );


var blockMap = dataString.split('\n');

//var length = blockMap.length;
for (var row = 0; row < blockMap.length; row++) {
	for (var col = 0; col < blockMap[row].length; col++) {
		if (blockMap[row][col] > 0){
			//console.log("x: " + row + " y: " + col + "  " + blockMap[row][col])
			var cube = new THREE.Mesh( geometry, material );
			cube.position.x = row;
			cube.position.y = col;
			scene.add( cube );
		}
		
	}
}


}


var render = function () {
	requestAnimationFrame( render );
	//console.log(camera.position);
	//console.log("POS - ROT")
	//console.log(camera.rotation);
	renderer.render(scene, camera);
};


