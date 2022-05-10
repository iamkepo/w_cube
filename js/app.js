let scene, camera, renderer;
let select_list = document.querySelector(".select-list");
let tapon = document.querySelector(".tampon");
let img = localStorage.getItem("img") === null ? "arid" : localStorage.getItem("img");
tapon.innerText = img + " ( courant )";
tapon.addEventListener("click", e =>{
  select_list.style.height = "100%";
  select_list.style.overflowY = "auto";

  let select = document.querySelectorAll(".select");
  for (let i = 0; i < select.length; i++) {
    if (select[i].innerText === img) {
      select[i].style.display = "none";
    }
    select[i].addEventListener("click", e =>{
      localStorage.setItem("img", select[i].innerText);
      window.location.reload();
    })
  
  }
})
  init();
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(55,window.innerWidth/window.innerHeight,45,30000);
  camera.position.set(-900,-200,-900);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.getElementById('app').appendChild(renderer.domElement);

  let controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener('change', renderer.domElement);
  //controls.minDistance = 500;
  //controls.maxDistance = 1500;
  
  let materialArray = [];
  let texture = {
    ft : new THREE.TextureLoader().load( './img/'+img+'_ft.jpg'),
    bk : new THREE.TextureLoader().load( './img/'+img+'_bk.jpg'),
    up : new THREE.TextureLoader().load( './img/'+img+'_up.jpg'),
    dn : new THREE.TextureLoader().load( './img/'+img+'_dn.jpg'),
    rt : new THREE.TextureLoader().load( './img/'+img+'_rt.jpg'),
    lf : new THREE.TextureLoader().load( './img/'+img+'_lf.jpg'),
  }
    
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.ft }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.bk }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.up }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.dn }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.rt }));
  materialArray.push(new THREE.MeshBasicMaterial( { map: texture.lf }));

  for (let i = 0; i < 6; i++)
      materialArray[i].side = THREE.BackSide;
  let skyboxGeo = new THREE.BoxGeometry( 10000, 10000, 10000);
  let skybox = new THREE.Mesh( skyboxGeo, materialArray );
  scene.add( skybox );
  animate();
}
function animate() {
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

