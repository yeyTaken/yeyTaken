import { ImageResponse } from "next/og";
import { BsCircleFill } from "react-icons/bs";

export const runtime = "edge";
export const alt = "Israel R. Jatobá - Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  bgStart: "#09090b",
  bgEnd: "#18181b",
  primary: "#3b82f6",
  textMain: "#ffffff",
  textMuted: "#a1a1a1",
  textSoft: "#d4d4d8",
  success: "#22c55e",
};

const flex = (style: React.CSSProperties = {}): React.CSSProperties => ({
  display: "flex",
  ...style,
});

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={flex({
          width: "100%",
          height: "100%",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${colors.bgStart}, ${colors.bgEnd})`,
          fontFamily: "Poppins, system-ui, sans-serif",
        })}
      >
        {/* Glow */}
        <div
          style={flex({
            position: "absolute",
            inset: "-25%",
            background: `radial-gradient(circle at top left, ${colors.primary}33, transparent 60%)`,
            filter: "blur(90px)",
          })}
        />

        {/* Content */}
        <div
          style={flex({
            zIndex: 1,
            maxWidth: 960,
            padding: 64,
            flexDirection: "column",
            alignItems: "center",
            gap: 32,
            textAlign: "center",
          })}
        >
          {/* Status */}
          <div
            style={flex({
              alignItems: "center",
              gap: 10,
              padding: "8px 18px",
              borderRadius: 999,
              border: `1px solid ${colors.success}55`,
              backgroundColor: `${colors.success}14`,
              color: colors.success,
              fontSize: 16,
              fontWeight: 500,
            })}
          >
            <BsCircleFill size={8} color={colors.success} />
            Available for new projects
          </div>

          {/* Title */}
          <div style={flex({ flexDirection: "column", gap: 12 })}>
            <h1
              style={{
                margin: 0,
                fontSize: 84,
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-1.5px",
                background: "linear-gradient(90deg, #ffffff, #b3b3b3)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Israel R. Jatobá
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: 28,
                color: colors.textMuted,
                fontWeight: 400,
              }}
            >
              Full Stack Developer • Backend • Clean Architecture
            </p>
          </div>

          {/* Tagline */}
          <div
            style={flex({
              alignItems: "center",
              gap: 14,
              marginTop: 8,
            })}
          >
            <div
              style={flex({
                width: 4,
                height: 36,
                borderRadius: 2,
                backgroundColor: colors.primary,
              })}
            />
            <p
              style={{
                margin: 0,
                fontSize: 20,
                color: colors.textSoft,
                fontWeight: 500,
              }}
            >
              Predictable, observable, high-performance systems
            </p>
          </div>
        </div>

        {/* Bottom Accent */}
        <div
          style={flex({
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${colors.primary}, transparent)`,
          })}
        />
      </div>
    ),
    size
  );
}
