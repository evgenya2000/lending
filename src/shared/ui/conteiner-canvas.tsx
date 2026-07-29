import { Canvas } from "@react-three/fiber";

export const ConteinerCanvas = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Canvas
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 0,
            }}
        >
            {children}
        </Canvas>

    );
}