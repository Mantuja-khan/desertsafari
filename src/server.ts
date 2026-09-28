import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

import {
  getAllBlogs,
  getBlogBySlug,
  incrementBlogView,
  toggleBlogLike,
  getBlogCategories,
} from "./server/blogService";

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // REST API Endpoints for Blogs
    if (url.pathname.startsWith("/api/blogs")) {
      const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      };

      if (request.method === "OPTIONS") {
        return new Response(null, { headers, status: 204 });
      }

      // GET /api/blogs/categories
      if (url.pathname === "/api/blogs/categories") {
        const categories = getBlogCategories();
        return new Response(JSON.stringify(categories), { headers });
      }

      // POST /api/blogs/:slug/view
      const viewMatch = url.pathname.match(/^\/api\/blogs\/([^/]+)\/view$/);
      if (viewMatch && viewMatch[1] && request.method === "POST") {
        const slug = viewMatch[1];
        const result = incrementBlogView(slug);
        return new Response(JSON.stringify(result), { headers });
      }

      // POST /api/blogs/:slug/like
      const likeMatch = url.pathname.match(/^\/api\/blogs\/([^/]+)\/like$/);
      if (likeMatch && likeMatch[1] && request.method === "POST") {
        const slug = likeMatch[1];
        let action: "like" | "unlike" = "like";
        try {
          const body = await request.json();
          if (body?.action === "unlike") action = "unlike";
        } catch {
          // default to like
        }
        const result = toggleBlogLike(slug, action);
        return new Response(JSON.stringify(result), { headers });
      }

      // GET /api/blogs/:slug
      const singleMatch = url.pathname.match(/^\/api\/blogs\/([^/]+)$/);
      if (singleMatch && singleMatch[1] && request.method === "GET") {
        const slug = singleMatch[1];
        const post = getBlogBySlug(slug);
        if (!post) {
          return new Response(JSON.stringify({ error: "Post not found" }), {
            headers,
            status: 404,
          });
        }
        return new Response(JSON.stringify(post), { headers });
      }

      // GET /api/blogs
      if (url.pathname === "/api/blogs" && request.method === "GET") {
        const blogs = getAllBlogs();
        return new Response(JSON.stringify(blogs), { headers });
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
