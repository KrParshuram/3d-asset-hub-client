import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Environment } from "@react-three/drei";
import { Html } from "@react-three/drei";

import * as THREE from "three";

function ErrorFallback({ error }) {
  return (
    <div>
      <h3>Viewer Error</h3>
      <pre>{error.message}</pre>
    </div>
  );
}


function Model({ url }) {
  const gltf = useGLTF(url);
  const modelRef = useRef();

  useEffect(() => {
    if (!modelRef.current) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());

    modelRef.current.position.sub(center);
  }, [gltf]);

  return <primitive ref={modelRef} object={gltf.scene} scale={1} />;
}



function CameraController({ cameraState, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (cameraState?.position) {
      camera.position.set(...cameraState.position);
      camera.zoom = cameraState.zoom || 1;
      camera.updateProjectionMatrix();
    }

    if (controlsRef.current && cameraState?.target) {
      controlsRef.current.target.set(...cameraState.target);
      controlsRef.current.update();
    }
  }, [camera, cameraState, controlsRef]);

  return null;
}

export default function ModelViewer({ modelUrl, cameraState, onSaveView }) {
  const controlsRef = useRef();
  const viewerRef = useRef();
  const canvasRef = useRef();

  const canvas = document.querySelector("canvas");
  const captureThumbnail = () => {
  const canvas =
    document.querySelector("canvas");

  if (!canvas) return null;

  return canvas.toDataURL(
    "image/png"
  );
};

  const handleFullscreen = () => {
  if (viewerRef.current) {
    viewerRef.current.requestFullscreen();
  }
};
const handleSave = () => {
  if (!controlsRef.current) return;

  const camera = controlsRef.current.object;
  const target = controlsRef.current.target;

  onSaveView({
    position: [
      camera.position.x,
      camera.position.y,
      camera.position.z,
    ],
    target: [
      target.x,
      target.y,
      target.z,
    ],
    zoom: camera.zoom,
  });
};

  const handleReset = () => {
  const camera = controlsRef.current.object;
  const controls = controlsRef.current;

  camera.position.set(0, 1, 8);
  camera.zoom = 1;
  camera.updateProjectionMatrix();

  controls.target.set(0, 0, 0);
  controls.update();
};

const handleControlsChangeEnd = () => {
  const camera = controlsRef.current.object;
  const target = controlsRef.current.target;

  onSaveView({
    position: [camera.position.x, camera.position.y, camera.position.z],
    target: [target.x, target.y, target.z],
    zoom: camera.zoom,
  });
};
const generateThumbnail = () => {
  const canvas = document.querySelector("canvas");

  if (!canvas) return;

  const image = canvas.toDataURL("image/png");

  if (onThumbnailGenerated) {
    onThumbnailGenerated(image);
  }
};

useEffect(() => {
  const timer = setTimeout(() => {
    generateThumbnail();
  }, 4000);

  return () => clearTimeout(timer);
}, []);

  

return (
  <div ref={viewerRef} className="viewer-card">
      <div className="viewer-toolbar">
  <div>
    <h3>3D Viewer</h3>
    <p className="muted">
      Rotate, zoom and inspect your model.
    </p>
  </div>

  <div className="viewer-actions">
    <button
      className="btn-secondary"
      onClick={handleReset}
    >
      Reset
    </button>

    <button
      className="btn-secondary"
      onClick={handleFullscreen}
    >
      Fullscreen
    </button>

    <button
      className="btn-primary"
      onClick={handleSave}
    >
      Save View
    </button>
  </div>
  </div>

    <div className="canvas-box">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Canvas ref={canvasRef} camera={{ position: [0, 1, 8], fov: 45 }}>
            <Environment preset="studio" />

            <ambientLight intensity={1.5} />

              <directionalLight
                position={[10, 10, 5]}
                intensity={2}
              />

              <directionalLight
                position={[-10, 5, -5]}
                intensity={1}
              />

            <CameraController
              cameraState={cameraState}
              controlsRef={controlsRef}
            />

            <Suspense fallback={<Html center>Loading...</Html>}>
              <Model url={modelUrl} />
            </Suspense>

            <OrbitControls
              ref={controlsRef}
              enablePan
              enableZoom
              enableRotate
              // onEnd={handleControlsChangeEnd}
            />
          </Canvas>
        </ErrorBoundary>
    </div>
  </div>
);
}