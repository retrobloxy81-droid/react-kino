import { Kino, Scene } from "react-kino";

export default function __PROJECT_NAME__() {
  return (
    <Kino>
      <Scene duration="200vh">
        <div style={{ padding: "20vh 2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "3rem", fontWeight: 700 }}>__PROJECT_NAME__</h1>
          <p style={{ opacity: 0.6, marginTop: "1rem" }}>
            Start building your scroll experience here.
          </p>
        </div>
      </Scene>

      <Scene duration="200vh">
        <div style={{ padding: "10vh 2rem", maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Section Two</h2>
          <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
            Add your content here. Each Scene pins its children while the user
            scrolls through the specified duration.
          </p>
        </div>
      </Scene>
    </Kino>
  );
}
