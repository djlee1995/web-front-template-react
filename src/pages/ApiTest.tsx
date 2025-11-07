import { useState } from "react";
import { apiTest, type ApiTestResponse } from "../api/test";

const wrap: React.CSSProperties = {
  minHeight: "100vh",
  background: "#f4f6f8",
  padding: "32px",
  boxSizing: "border-box",
  fontFamily:
    "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
};

const card: React.CSSProperties = {
  maxWidth: 800,
  margin: "0 auto",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 20,
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};

const row: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};
const small: React.CSSProperties = { fontSize: 12, color: "#6b7280" };
const badge: React.CSSProperties = {
  fontSize: 12,
  color: "#374151",
  background: "#eef2ff",
  border: "1px solid #c7d2fe",
  padding: "4px 8px",
  borderRadius: 8,
};

const btn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #111827",
  background: "#111827",
  color: "#fff",
  cursor: "pointer",
};
const btnDisabled: React.CSSProperties = { ...btn, opacity: 0.6, cursor: "not-allowed" };
const monoBox: React.CSSProperties = {
  background: "#0b1020",
  color: "#e5e7eb",
  padding: 12,
  borderRadius: 8,
  overflow: "auto",
  maxHeight: 320,
  fontSize: 13,
};

export default function ApiTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiTestResponse | null>(null);
  const [error, setError] = useState<string>("");

  const base = import.meta.env.VITE_API_BASE || "";
  // 프로젝트 이름: 우선순위 VITE_APP_NAME > VITE_PROJECT_NAME > package.json name(빌드 시 주입) > fallback
  const projectName =
    import.meta.env.VITE_APP_NAME ||
    import.meta.env.VITE_PROJECT_NAME ||
    (import.meta.env as any).npm_package_name ||
    "unknown-project";

  const onPing = async () => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await apiTest();
      setResult(res);
    } catch (e: any) {
      setError(
        e?.response?.data ? JSON.stringify(e.response.data) : e?.message || "요청 실패"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrap}>
      <div style={card}>
        <div style={row}>
          <h1 style={{ fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", gap: 8 }}>
            🔌 API 통신 테스트
            <span style={badge}>프로젝트: {projectName}</span>
          </h1>
          <span style={small}>BASE: {base}</span>
        </div>

        <p style={{ color: "#374151", marginTop: 8 }}>
          백엔드의 <code>/api-test</code> 엔드포인트를 호출해 통신 여부를 확인합니다.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
          <button onClick={onPing} style={loading ? btnDisabled : btn} disabled={loading}>
            {loading ? "요청 중..." : "/api-test 호출"}
          </button>
        </div>

        {error && (
          <div
            style={{
              marginTop: 16,
              border: "1px solid #fecaca",
              background: "#fef2f2",
              color: "#991b1b",
              padding: 12,
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            {error}
          </div>
        )}

        {result && (
          <div style={{ marginTop: 16 }}>
            <div style={small}>응답</div>
            <pre style={monoBox}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
