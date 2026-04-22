export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; filename: string; language: string; code: string }
  | { type: "quote"; text: string; author: string; year: string }
  | { type: "numberedList"; items: { number: string; text: string }[] };

export type ArticleSection = {
  id: string;
  number: string;
  title: string;
  blocks: ContentBlock[];
};

export type Article = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  icon: string;
  number: string;
  readTime: string;
  intro: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
};

export const articles: Article[] = [
  {
    slug: "rag-systems-in-production",
    title: "RAG Systems in Production",
    date: "2026.03.14",
    description:
      "Building retrieval-augmented generation pipelines that scale — from chunking strategies to vector store optimization.",
    tags: ["Python", "LangChain", "RAG"],
    icon: "brain",
    number: "01",
    readTime: "12 min read",
    intro:
      "Retrieval-Augmented Generation has fundamentally reshaped how we build AI systems. Instead of relying solely on parametric knowledge frozen at training time, RAG pipelines ground model outputs in real-time, external data — reducing hallucinations and enabling domain-specific reasoning that would be impossible with a standalone LLM.",
    sections: [
      {
        id: "chunking",
        number: "01",
        title: "The Chunking Problem",
        blocks: [
          {
            type: "paragraph",
            text: "The first challenge in any RAG system is how you split your documents. Naive character-based splitting destroys semantic coherence — you end up with fragments that reference across chunk boundaries, making retrieval unreliable. The key insight is that chunking strategy must reflect the structure of your data.",
          },
          {
            type: "paragraph",
            text: "Recursive character splitting with overlap handles most prose well. For code, use AST-aware splitting. For structured data like tables or JSON, preserve hierarchical boundaries. The chunk size sweet spot typically lands between 512 and 1024 tokens — small enough for precise retrieval, large enough to carry context.",
          },
          {
            type: "code",
            filename: "chunking_strategy.py",
            language: "PYTHON",
            code: `from langchain.text_splitter import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,
    separators=["\\n\\n", "\\n", ". ", " ", ""]
)

docs = splitter.split_documents(raw_documents)
# Result: ~2,340 chunks from 47 PDFs
print(f"Generated {len(docs)} chunks")`,
          },
          {
            type: "quote",
            text: "The quality of your retrieval pipeline determines the quality of your generation. Garbage in, garbage out — but with vectors, the garbage is just in a different dimension.",
            author: "William Nakata",
            year: "2026",
          },
        ],
      },
      {
        id: "vector-store",
        number: "02",
        title: "Vector Store Optimization",
        blocks: [
          {
            type: "paragraph",
            text: "Once chunks are embedded, they need a home. Pinecone, Weaviate, and pgvector each offer different tradeoffs between latency, cost, and filtering capability. In production, we found that hybrid search — combining dense and sparse retrieval — outperforms pure semantic search by 15-20% on precision@5.",
          },
          {
            type: "paragraph",
            text: "The critical parameter is the embedding model. OpenAI's text-embedding-3-small offers excellent bang for buck, but for domain-specific corpora, fine-tuning a smaller model on your data yields better recall. We switched from ada-002 to a fine-tuned BGE-M3 and saw a 34% improvement in retrieval accuracy on legal documents.",
          },
        ],
      },
      {
        id: "production",
        number: "03",
        title: "Production Considerations",
        blocks: [
          {
            type: "paragraph",
            text: "Deploying RAG to production isn't just about accuracy — it's about latency, cost, and observability. Here's what we learned after serving 2M+ queries per month:",
          },
          {
            type: "numberedList",
            items: [
              {
                number: "01",
                text: "Cache aggressively. Embedding calls are the biggest latency contributor. Cache embeddings in Redis with a 24h TTL.",
              },
              {
                number: "02",
                text: "Log retrieval sets. Track which chunks were retrieved and whether they were actually used in the final answer.",
              },
              {
                number: "03",
                text: "Fallback gracefully. When the vector store is degraded, return a pre-computed response, not an error.",
              },
            ],
          },
        ],
      },
    ],
    relatedSlugs: ["nextjs-16-app-router-patterns", "building-ai-agents-with-langgraph"],
  },
  {
    slug: "nextjs-16-app-router-patterns",
    title: "Next.js 16 App Router Patterns",
    date: "2025.12.03",
    description:
      "Exploring advanced routing strategies, server components, and the new Turbopack integration for high-performance fullstack applications.",
    tags: ["Next.js", "TypeScript", "Frontend"],
    icon: "code-2",
    number: "02",
    readTime: "10 min read",
    intro:
      "Next.js 16 marks a significant evolution in the React ecosystem. With the App Router now stable, Turbopack replacing Webpack, and React 19's concurrent features fully integrated, building production-grade fullstack applications has never been more powerful — or more complex.",
    sections: [
      {
        id: "app-router",
        number: "01",
        title: "The App Router Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "The App Router fundamentally changes how we think about routing in Next.js. Instead of file-system based pages, we now have a nested layout system where every folder can define a layout, loading state, error boundary, and page. This enables powerful composition patterns but requires a mental model shift.",
          },
          {
            type: "paragraph",
            text: "Server Components are the default in the App Router. This means your components render on the server unless you explicitly mark them with 'use client'. The benefit is zero JavaScript bundle for server-only code, but it means you need to carefully architect which parts of your UI need interactivity.",
          },
        ],
      },
      {
        id: "turbopack",
        number: "02",
        title: "Turbopack Integration",
        blocks: [
          {
            type: "paragraph",
            text: "Turbopack, built in Rust, replaces Webpack as the bundler in Next.js 16. In development, we've seen 10x faster HMR and 5x faster cold starts. The incremental compilation model means only changed modules are recompiled, making large codebases feel snappy again.",
          },
          {
            type: "code",
            filename: "next.config.ts",
            language: "TYPESCRIPT",
            code: `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@db/*": "./generated/prisma/*",
    },
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;`,
          },
        ],
      },
      {
        id: "react-19",
        number: "03",
        title: "React 19 Concurrent Features",
        blocks: [
          {
            type: "paragraph",
            text: "React 19 brings the Actions API, useOptimistic hook, and automatic memoization through the React Compiler. In Next.js 16, these features are fully integrated, making state transitions smoother and reducing the need for manual useMemo and useCallback.",
          },
          {
            type: "quote",
            text: "The future of React is server-first, client-enhanced. Next.js 16 embraces this philosophy without sacrificing the developer experience we've come to expect.",
            author: "William Nakata",
            year: "2025",
          },
        ],
      },
    ],
    relatedSlugs: ["rag-systems-in-production", "creative-engineering-with-webgl"],
  },
  {
    slug: "creative-engineering-with-webgl",
    title: "Creative Engineering with WebGL",
    date: "2025.10.22",
    description:
      "Merging generative art with product engineering. How OGL and custom shaders can elevate interface design without sacrificing performance.",
    tags: ["WebGL", "OGL", "Design"],
    icon: "palette",
    number: "03",
    readTime: "8 min read",
    intro:
      "The intersection of creative coding and product engineering is where the most memorable digital experiences are born. WebGL, once reserved for games and experiments, has matured into a viable tool for interface design — when wielded with discipline.",
    sections: [
      {
        id: "shaders",
        number: "01",
        title: "The Shader Pipeline",
        blocks: [
          {
            type: "paragraph",
            text: "Shaders are the atomic unit of WebGL visuals. A vertex shader transforms geometry; a fragment shader colors pixels. By offloading visual computation to the GPU, we achieve 60fps effects that would cripple the CPU. The key is keeping shader complexity proportional to the visual payoff.",
          },
          {
            type: "code",
            filename: "vertex.glsl",
            language: "GLSL",
            code: `attribute vec2 position;
attribute vec2 uv;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`,
          },
        ],
      },
      {
        id: "performance",
        number: "02",
        title: "Performance Budgets",
        blocks: [
          {
            type: "paragraph",
            text: "Every WebGL effect must have a performance budget. For portfolio sites, we allocate 4-6ms per frame for shaders. This means no ray marching, no complex noise functions, and aggressive LOD on geometries. The Grainient effect on this portfolio, for example, uses a simple 2D noise function at quarter resolution, upscaled with bilinear filtering.",
          },
        ],
      },
      {
        id: "integration",
        number: "03",
        title: "React Integration",
        blocks: [
          {
            type: "paragraph",
            text: "Integrating WebGL with React requires careful lifecycle management. We use refs for the canvas and OGL instances, keeping all WebGL operations outside React's render cycle. The component only re-renders when props change uniforms, not when the animation frame updates.",
          },
          {
            type: "quote",
            text: "The best WebGL integration is invisible. It should feel like magic, not machinery.",
            author: "William Nakata",
            year: "2025",
          },
        ],
      },
    ],
    relatedSlugs: ["nextjs-16-app-router-patterns", "scalable-backends-with-dotnet-8"],
  },
  {
    slug: "scalable-backends-with-dotnet-8",
    title: "Scalable Backends with .NET 8",
    date: "2025.09.10",
    description:
      "Architecting high-throughput APIs using .NET 8, EF Core, and PostgreSQL. Patterns for collections, payments, and real-time data pipelines.",
    tags: ["C#", ".NET 8", "Backend"],
    icon: "server",
    number: "04",
    readTime: "10 min read",
    intro:
      "Building backend systems that handle millions of requests per day requires more than just fast frameworks. It demands disciplined architecture, careful resource management, and a deep understanding of the data layer. .NET 8 delivers on all fronts.",
    sections: [
      {
        id: "architecture",
        number: "01",
        title: "Clean Architecture",
        blocks: [
          {
            type: "paragraph",
            text: "The Clean Architecture pattern separates concerns into layers: Domain, Application, Infrastructure, and Presentation. In .NET 8, we implement this with class libraries and dependency injection. The key rule is that inner layers know nothing about outer layers. This makes testing trivial and refactoring safe.",
          },
          {
            type: "code",
            filename: "Program.cs",
            language: "C#",
            code: `var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ICollectionService, CollectionService>();

var app = builder.Build();
app.MapControllers();
app.Run();`,
          },
        ],
      },
      {
        id: "ef-core",
        number: "02",
        title: "EF Core Patterns",
        blocks: [
          {
            type: "paragraph",
            text: "Entity Framework Core in .NET 8 introduces complex type mapping, primitive collections, and significant performance improvements. For high-throughput APIs, we use split queries, compiled models, and connection pooling. The key is measuring before optimizing — EF Core's change tracking is fast enough for most scenarios until you hit thousands of entities.",
          },
        ],
      },
      {
        id: "performance",
        number: "03",
        title: "Performance Tuning",
        blocks: [
          {
            type: "paragraph",
            text: "Performance in .NET 8 backends comes from three areas: async I/O, caching, and connection management. We use Polly for resilience, Redis for distributed caching, and PostgreSQL advisory locks for concurrency. The result is a collections API that processes 10,000+ requests per minute with p99 latency under 50ms.",
          },
          {
            type: "quote",
            text: "Performance is not an accident. It's the result of thousands of small decisions made correctly.",
            author: "William Nakata",
            year: "2025",
          },
        ],
      },
    ],
    relatedSlugs: ["rag-systems-in-production", "creative-engineering-with-webgl"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>();
  articles.forEach((a) => a.tags.forEach((t) => tagSet.add(t)));
  return Array.from(tagSet).sort();
}

export function getRelatedArticles(
  currentSlug: string,
  relatedSlugs: string[],
): Article[] {
  return relatedSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is Article => a !== undefined && a.slug !== currentSlug);
}
