import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

// Tách ID TikTok
function extractId(url: string): string | null {
    const match = url.match(/(?:video|photo)\/(\d+)/);
    return match ? match[1] : null;
}

// Resolve link rút gọn vt.tiktok.com
async function resolveTikTok(url: string) {
    let current = url;

    for (let i = 0; i < 5; i++) {
        const res = await fetch(current, { redirect: "manual" });

        const loc = res.headers.get("location");
        if (!loc) return current;

        const next = new URL(loc, current).toString();
        current = next;

        if (current.includes("/video/") || current.includes("/photo/")) return current;
    }

    return current;
}

app.get("/resolve-tiktok", async (req, res) => {
    try {
        const input = String(req.query.url || "");
        if (!input.startsWith("http")) {
            return res.status(400).json({ error: "URL không hợp lệ" });
        }

        const finalUrl = await resolveTikTok(input);
        const id = extractId(finalUrl);

        if (!id) return res.status(422).json({ error: "Không tìm thấy ID video", finalUrl });

        return res.json({ id, finalUrl });

    } catch (err) {
        console.error("Lỗi backend:", err);
        return res.status(500).json({ error: "Lỗi server" });
    }
});

app.listen(3001, () => console.log("Server đang chạy tại http://localhost:3001"));