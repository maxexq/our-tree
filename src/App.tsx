import React, { useRef, useState, useEffect } from "react";
import { useSpring, a } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { Container, Title, Frame, Content, toggle } from "./styles";
import * as Icons from "./icons";

import styles from "./styles.module.css";

import OurMemory from "./assets/images/our-photo.jpg";

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => void (ref.current = value), [value]);
  return ref.current;
}

const Tree = React.memo<
  React.HTMLAttributes<HTMLDivElement> & {
    defaultOpen?: boolean;
    name: string | JSX.Element;
  }
>(({ children, name, style, defaultOpen = false }) => {
  const [isOpen, setOpen] = useState(defaultOpen);
  const previous = usePrevious(isOpen);
  const [ref, { height: viewHeight }] = useMeasure();
  const { height, opacity, y } = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });

  const Icon =
    Icons[`${children ? (isOpen ? "Minus" : "Plus") : "Close"}SquareO`];
  return (
    <Frame>
      <Icon
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        style={{ ...toggle, opacity: children ? 1 : 0.3 }}
        onClick={() => setOpen(!isOpen)}
      />
      <Title style={style}>{name}</Title>
      <Content
        style={{
          opacity,
          height: isOpen && previous === isOpen ? "auto" : height,
        }}
      >
        <a.div ref={ref} style={{ y }} children={children} />
      </Content>
    </Frame>
  );
});

export default function App() {
  return (
    <Container>
      <Tree name="เตงคับ" defaultOpen>
        <Tree name="วันนี้วันอะไรหว่า" />
        <Tree name={<span>🙀 เค้ามีอะไรจะบอก ลองกดๆๆๆ</span>}>
          <Tree name="เค้าจะบอกว่าๆๆ" />
          <Tree name="ขอบคุณที่">
            <Tree name="ที่เราได้เจอกัน" style={{ color: "#ff8fab" }} />
            <Tree
              name="เป็นกำลังใจให้กันในทุกๆ วัน"
              style={{ color: "#ff8fab" }}
            />
            <Tree
              name="เจอเรื่องอะไรมาก็เล่าให้กันฟังตลอด"
              style={{ color: "#ff8fab" }}
            />
            <Tree name="ขอบคุณที่อยู่ข้างๆ กันนะ" style={{ color: "#fb6f92" }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  // height: 200,
                  padding: 10,
                  paddingBottom: 26,
                }}
              >
                <div
                  className={styles.card}
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "white",
                    borderRadius: 5,
                    padding: "12px 12px 3px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <img src={OurMemory} alt="our memory" width={160} />
                  <div className={styles.decs}>
                    <p
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      สุขสันต์วันครบรอบเดือนแรก
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                      }}
                    >
                      ของเรานะ ❤️
                    </p>
                  </div>
                </div>
              </div>
            </Tree>
          </Tree>
          <Tree name="มีกันวันนี้นะ" />
        </Tree>
        <Tree name="คัดถึงจริง" />
        <Tree name="คิดถึงจัง" />
      </Tree>
    </Container>
  );
}
