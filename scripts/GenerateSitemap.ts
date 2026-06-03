import * as fs from "node:fs";
import path from "path";
import { getDocsData } from "../src/data/docsdata";

export async function generateSitemap(publicFolder: string) {
    const currentDate = new Date().toISOString().split('T')[0];

    // Get all locales from the locales directory
    const localesDir = path.resolve(__dirname, "..", "src", "i18n", "locales");
    const locales = fs.readdirSync(localesDir)
        .filter(file => file.endsWith(".json"))
        .map(file => file.replace(".json", ""));

    // Build homepage alternates
    const alternatesHtml = locales.map(locale => {
        const hreflang = locale.toLowerCase();
        return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="https://abdownloadmanager.com/?lang=${locale}"/>`;
    }).join("\n");

    // Build docs pages urls dynamically
    const docs = getDocsData().flatMap(cat => cat.items.map(item => item.id));
    const docsUrlsHtml = docs.map(id => {
        return `  <url>
    <loc>https://abdownloadmanager.com/docs/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }).join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://abdownloadmanager.com/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${alternatesHtml}
  </url>
${docsUrlsHtml}
</urlset>
`;

    const file = path.resolve(publicFolder, "sitemap.xml");
    fs.writeFileSync(file, xml.trim() + "\n");
}
