import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Sculpture({
  paused,
  mode,
}: {
  paused: boolean;
  mode: number;
}) {
  const mount = useRef<HTMLDivElement>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const pauseRef = useRef(paused);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    pauseRef.current = paused;
  }, [paused]);
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const colors = [0xc4ec6b, 0xbcb4ff, 0xf4a576];
    group.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh)
        (child.material as THREE.MeshStandardMaterial).color.setHex(
          i % 3 === 0 ? 0x292d27 : colors[mode],
        );
    });
  }, [mode]);
  useEffect(() => {
    const host = mount.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setUnavailable(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 8.8);
    const group = new THREE.Group();
    groupRef.current = group;
    scene.add(group);
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    for (let i = 0; i < 9; i++) {
      const geometry = new THREE.TorusGeometry(1.38, 0.125, 18, 100);
      const material = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x292d27 : 0xc4ec6b,
        metalness: 0.25,
        roughness: 0.34,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2 + (i * Math.PI) / 9;
      ring.rotation.y = (i * Math.PI) / 9;
      group.add(ring);
      geometries.push(geometry);
      materials.push(material);
    }
    const coreGeo = new THREE.IcosahedronGeometry(0.64, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x292d27,
      metalness: 0.6,
      roughness: 0.2,
    });
    group.add(new THREE.Mesh(coreGeo, coreMat));
    geometries.push(coreGeo);
    materials.push(coreMat);
    scene.add(new THREE.AmbientLight(0xffffff, 2.1));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(-3, 5, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xdbffc0, 2);
    fill.position.set(4, -1, 2);
    scene.add(fill);
    const pointer = { x: 0, y: 0 };
    let visible = true,
      raf = 0,
      previous = 0;
    const move = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.7;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.7;
    };
    const leave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    const resize = new ResizeObserver(() => {
      const width = host.clientWidth,
        height = host.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    });
    resize.observe(host);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(host);
    group.rotation.set(0.45, -0.4, -0.2);
    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      const delta = Math.min((time - previous) / 1000, 0.05);
      previous = time;
      if (!visible || document.hidden) return;
      if (!pauseRef.current) {
        group.rotation.y += delta * 0.14;
        group.rotation.x += (0.45 + pointer.y - group.rotation.x) * 0.03;
        group.rotation.z += (-0.2 + pointer.x - group.rotation.z) * 0.03;
        group.position.y = Math.sin(time * 0.0005) * 0.08;
      }
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      observer.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      host.removeChild(renderer.domElement);
      groupRef.current = null;
    };
  }, []);
  return (
    <div
      ref={mount}
      className="sculpture-canvas"
      role="img"
      aria-label="Interactive sculpture of interlocking lime and graphite rings"
    >
      {unavailable && <div className="sculpture-fallback">✳</div>}
    </div>
  );
}
