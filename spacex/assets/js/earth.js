
var container, camera, scene, renderer, group;
  var windowHalfX =  $(container).width() / 2,
      windowHalfY =  $(container).height() / 2;
    
  //запускает инициализацию
  init();
  animate();
  //Функция инициализирует сцену, 
  //создает камеру и устанавливает режим отображения
  function init() {
    //получает контейнер для добавления канваса в него
    container = document.getElementById( 'container' );
    //поворачивает наши 3D объекты, при наведении мыши
    container.onmousemove=function(event){
      group.rotation.y+=event.movementX/30;
      group.rotation.x+=event.movementY/30;
    }
    //создаем камеру
    camera = new THREE.PerspectiveCamera( 
        60, 
        $(container).width() / $(container).height(),
        1, 2000 
    );
    camera.position.z = 500;
      
    //создаем сцену, группу. добавляем группу в сцену
    scene = new THREE.Scene();
    group = new THREE.Group();
    scene.add( group );
      
    //создаем загрузчик текстур
    var loader = new THREE.TextureLoader();
    //грузим
    loader.load( '/images/news/101-earth.jpg', /* тут колбек */function ( texture ) {
      //вызывается при загрузке
      //создает примитив, материал
      var geometry = new THREE.SphereGeometry( 200, 20, 20 );
      var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );
      //создает меш(поверхность) планеты по геометрии
      var mesh = new THREE.Mesh( geometry, material );
      //добавляет объект в группу
      group.add( mesh );
    } );    
    //получает канвас (хост)
    //т.е. место на чем будет рисовать
    var canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;
    //создаем рисующий объект
    renderer = new THREE.WebGLRenderer();
    //устанавливаем цвет фона
    renderer.setClearColor(0xeeeeee);
    //разрешение
    renderer.setPixelRatio(window.devicePixelRatio);
    //размеры рисуемого хоста
    renderer.setSize($(container).width(), $(container).height());
    //добавляем в контейнер
    container.appendChild(renderer.domElement);
  }
  //отобразит анимацию модели, если она есть
  function animate() {
    requestAnimationFrame( animate );
    render();
  }
  //поворачивает модель планеты
  //вызывает перерисовку сцены
  function render() {
    //поворачиваем камеру
    camera.lookAt( scene.position );
    //поворачиваем модель
    group.rotation.y -= 0.01;
    //отрисовываем
    renderer.render( scene, camera );
  }