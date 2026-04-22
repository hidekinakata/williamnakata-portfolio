import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const articleData = [
  {
    slug: "rag-systems-in-production",
    number: "01",
    icon: "brain",
    readTime: "12 min read",
    relatedSlugs: ["nextjs-16-app-router-patterns", "building-ai-agents-with-langgraph"],
    published: true,
    publishedAt: new Date("2026-03-14"),
    tags: ["Python", "LangChain", "RAG"],
    en: {
      title: "RAG Systems in Production",
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
              code: 'from langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=512,\n    chunk_overlap=64,\n    separators=["\\n\\n", "\\n", ". ", " ", ""]\n)\n\ndocs = splitter.split_documents(raw_documents)\n# Result: ~2,340 chunks from 47 PDFs\nprint(f"Generated {len(docs)} chunks")',
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
                { number: "01", text: "Cache aggressively. Embedding calls are the biggest latency contributor. Cache embeddings in Redis with a 24h TTL." },
                { number: "02", text: "Log retrieval sets. Track which chunks were retrieved and whether they were actually used in the final answer." },
                { number: "03", text: "Fallback gracefully. When the vector store is degraded, return a pre-computed response, not an error." },
              ],
            },
          ],
        },
      ],
    },
    pt: {
      title: "RAG Systems em Produção",
      intro:
        "A Geração Aumentada por Recuperação reformulou fundamentalmente como construímos sistemas de IA. Em vez de depender apenas do conhecimento paramétrico congelado no momento do treinamento, os pipelines RAG fundamentam as saídas do modelo em dados externos em tempo real — reduzindo alucinações e permitindo raciocínio específico de domínio.",
      sections: [
        {
          id: "chunking",
          number: "01",
          title: "O Problema do Chunking",
          blocks: [
            { type: "paragraph", text: "O primeiro desafio em qualquer sistema RAG é como você divide seus documentos. A divisão ingênua baseada em caracteres destrói a coerência semântica — você acaba com fragmentos que referenciam além dos limites do chunk, tornando a recuperação não confiável." },
            { type: "paragraph", text: "A divisão recursiva de caracteres com sobreposição lida bem com a maioria dos textos. Para código, use divisão com reconhecimento de AST. Para dados estruturados como tabelas ou JSON, preserve os limites hierárquicos." },
            { type: "code", filename: "chunking_strategy.py", language: "PYTHON", code: 'from langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=512,\n    chunk_overlap=64,\n    separators=["\\n\\n", "\\n", ". ", " ", ""]\n)\n\ndocs = splitter.split_documents(raw_documents)\nprint(f"Gerados {len(docs)} chunks")' },
            { type: "quote", text: "A qualidade do seu pipeline de recuperação determina a qualidade da sua geração. Lixo entra, lixo sai — mas com vetores, o lixo está apenas em uma dimensão diferente.", author: "William Nakata", year: "2026" },
          ],
        },
        {
          id: "vector-store",
          number: "02",
          title: "Otimização do Vector Store",
          blocks: [
            { type: "paragraph", text: "Uma vez que os chunks são incorporados, eles precisam de um lar. Pinecone, Weaviate e pgvector oferecem diferentes trade-offs entre latência, custo e capacidade de filtragem." },
            { type: "paragraph", text: "O parâmetro crítico é o modelo de embedding. O text-embedding-3-small da OpenAI oferece excelente custo-benefício, mas para corpora específicos de domínio, ajustar um modelo menor nos seus dados produz melhor recall." },
          ],
        },
        {
          id: "production",
          number: "03",
          title: "Considerações de Produção",
          blocks: [
            { type: "paragraph", text: "Implantar RAG em produção não é apenas sobre precisão — é sobre latência, custo e observabilidade. Aqui está o que aprendemos após servir mais de 2M+ consultas por mês:" },
            { type: "numberedList", items: [
              { number: "01", text: "Cache agressivamente. As chamadas de embedding são o maior contribuinte de latência. Cache embeddings no Redis com TTL de 24h." },
              { number: "02", text: "Registre os conjuntos de recuperação. Rastreie quais chunks foram recuperados e se foram realmente usados na resposta final." },
              { number: "03", text: "Falhe graciosamente. Quando o vector store estiver degradado, retorne uma resposta pré-computada, não um erro." },
            ]},
          ],
        },
      ],
    },
  },
  {
    slug: "nextjs-16-app-router-patterns",
    number: "02",
    icon: "code-2",
    readTime: "10 min read",
    relatedSlugs: ["rag-systems-in-production", "creative-engineering-with-webgl"],
    published: true,
    publishedAt: new Date("2025-12-03"),
    tags: ["Next.js", "TypeScript", "Frontend"],
    en: {
      title: "Next.js 16 App Router Patterns",
      intro:
        "Next.js 16 marks a significant evolution in the React ecosystem. With the App Router now stable, Turbopack replacing Webpack, and React 19's concurrent features fully integrated, building production-grade fullstack applications has never been more powerful — or more complex.",
      sections: [
        {
          id: "app-router",
          number: "01",
          title: "The App Router Architecture",
          blocks: [
            { type: "paragraph", text: "The App Router fundamentally changes how we think about routing in Next.js. Instead of file-system based pages, we now have a nested layout system where every folder can define a layout, loading state, error boundary, and page." },
            { type: "paragraph", text: "Server Components are the default in the App Router. This means your components render on the server unless you explicitly mark them with 'use client'. The benefit is zero JavaScript bundle for server-only code." },
          ],
        },
        {
          id: "turbopack",
          number: "02",
          title: "Turbopack Integration",
          blocks: [
            { type: "paragraph", text: "Turbopack, built in Rust, replaces Webpack as the bundler in Next.js 16. In development, we've seen 10x faster HMR and 5x faster cold starts." },
            { type: "code", filename: "next.config.ts", language: "TYPESCRIPT", code: 'import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {\n  turbopack: {\n    resolveAlias: {\n      "@db/*": "./generated/prisma/*",\n    },\n  },\n  experimental: {\n    optimizePackageImports: ["lucide-react"],\n  },\n};\n\nexport default nextConfig;' },
          ],
        },
        {
          id: "react-19",
          number: "03",
          title: "React 19 Concurrent Features",
          blocks: [
            { type: "paragraph", text: "React 19 brings the Actions API, useOptimistic hook, and automatic memoization through the React Compiler. In Next.js 16, these features are fully integrated." },
            { type: "quote", text: "The future of React is server-first, client-enhanced. Next.js 16 embraces this philosophy without sacrificing the developer experience we've come to expect.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
    pt: {
      title: "Padrões do App Router do Next.js 16",
      intro:
        "O Next.js 16 marca uma evolução significativa no ecossistema React. Com o App Router agora estável, Turbopack substituindo o Webpack e os recursos concorrentes do React 19 totalmente integrados, construir aplicações fullstack de nível de produção nunca foi tão poderoso.",
      sections: [
        {
          id: "app-router",
          number: "01",
          title: "A Arquitetura do App Router",
          blocks: [
            { type: "paragraph", text: "O App Router muda fundamentalmente como pensamos sobre roteamento no Next.js. Em vez de páginas baseadas em sistema de arquivos, agora temos um sistema de layout aninhado." },
            { type: "paragraph", text: "Os Server Components são o padrão no App Router. Isso significa que seus componentes renderizam no servidor, a menos que você os marque explicitamente com 'use client'." },
          ],
        },
        {
          id: "turbopack",
          number: "02",
          title: "Integração com Turbopack",
          blocks: [
            { type: "paragraph", text: "O Turbopack, construído em Rust, substitui o Webpack como bundler no Next.js 16. No desenvolvimento, vimos HMR 10x mais rápido e cold starts 5x mais rápidos." },
            { type: "code", filename: "next.config.ts", language: "TYPESCRIPT", code: 'import type { NextConfig } from "next";\n\nconst nextConfig: NextConfig = {\n  turbopack: {\n    resolveAlias: {\n      "@db/*": "./generated/prisma/*",\n    },\n  },\n};\n\nexport default nextConfig;' },
          ],
        },
        {
          id: "react-19",
          number: "03",
          title: "Recursos Concorrentes do React 19",
          blocks: [
            { type: "paragraph", text: "O React 19 traz a API de Actions, o hook useOptimistic e memoização automática através do React Compiler." },
            { type: "quote", text: "O futuro do React é server-first, client-enhanced. O Next.js 16 abraça essa filosofia sem sacrificar a experiência do desenvolvedor.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
  },
  {
    slug: "creative-engineering-with-webgl",
    number: "03",
    icon: "palette",
    readTime: "8 min read",
    relatedSlugs: ["nextjs-16-app-router-patterns", "scalable-backends-with-dotnet-8"],
    published: true,
    publishedAt: new Date("2025-10-22"),
    tags: ["WebGL", "OGL", "Design"],
    en: {
      title: "Creative Engineering with WebGL",
      intro:
        "The intersection of creative coding and product engineering is where the most memorable digital experiences are born. WebGL, once reserved for games and experiments, has matured into a viable tool for interface design — when wielded with discipline.",
      sections: [
        {
          id: "shaders",
          number: "01",
          title: "The Shader Pipeline",
          blocks: [
            { type: "paragraph", text: "Shaders are the atomic unit of WebGL visuals. A vertex shader transforms geometry; a fragment shader colors pixels. By offloading visual computation to the GPU, we achieve 60fps effects that would cripple the CPU." },
            { type: "code", filename: "vertex.glsl", language: "GLSL", code: "attribute vec2 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}" },
          ],
        },
        {
          id: "performance",
          number: "02",
          title: "Performance Budgets",
          blocks: [
            { type: "paragraph", text: "Every WebGL effect must have a performance budget. For portfolio sites, we allocate 4-6ms per frame for shaders. This means no ray marching, no complex noise functions, and aggressive LOD on geometries." },
          ],
        },
        {
          id: "integration",
          number: "03",
          title: "React Integration",
          blocks: [
            { type: "paragraph", text: "Integrating WebGL with React requires careful lifecycle management. We use refs for the canvas and OGL instances, keeping all WebGL operations outside React's render cycle." },
            { type: "quote", text: "The best WebGL integration is invisible. It should feel like magic, not machinery.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
    pt: {
      title: "Engenharia Criativa com WebGL",
      intro:
        "A interseção entre programação criativa e engenharia de produto é onde as experiências digitais mais memoráveis nascem. O WebGL, antes reservado para jogos e experimentos, amadureceu como uma ferramenta viável para design de interfaces.",
      sections: [
        {
          id: "shaders",
          number: "01",
          title: "O Pipeline de Shaders",
          blocks: [
            { type: "paragraph", text: "Shaders são a unidade atômica dos visuais WebGL. Um vertex shader transforma geometria; um fragment shader colore pixels. Ao descarregar a computação visual para a GPU, alcançamos efeitos a 60fps." },
            { type: "code", filename: "vertex.glsl", language: "GLSL", code: "attribute vec2 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n  gl_Position = vec4(position, 0.0, 1.0);\n}" },
          ],
        },
        {
          id: "performance",
          number: "02",
          title: "Orçamentos de Performance",
          blocks: [
            { type: "paragraph", text: "Todo efeito WebGL deve ter um orçamento de performance. Para sites de portfólio, alocamos 4-6ms por frame para shaders." },
          ],
        },
        {
          id: "integration",
          number: "03",
          title: "Integração com React",
          blocks: [
            { type: "paragraph", text: "Integrar WebGL com React requer gerenciamento cuidadoso do ciclo de vida. Usamos refs para o canvas e instâncias OGL, mantendo todas as operações WebGL fora do ciclo de renderização do React." },
            { type: "quote", text: "A melhor integração WebGL é invisível. Deve parecer mágica, não maquinaria.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
  },
  {
    slug: "scalable-backends-with-dotnet-8",
    number: "04",
    icon: "server",
    readTime: "10 min read",
    relatedSlugs: ["rag-systems-in-production", "creative-engineering-with-webgl"],
    published: true,
    publishedAt: new Date("2025-09-10"),
    tags: ["C#", ".NET 8", "Backend"],
    en: {
      title: "Scalable Backends with .NET 8",
      intro:
        "Building backend systems that handle millions of requests per day requires more than just fast frameworks. It demands disciplined architecture, careful resource management, and a deep understanding of the data layer. .NET 8 delivers on all fronts.",
      sections: [
        {
          id: "architecture",
          number: "01",
          title: "Clean Architecture",
          blocks: [
            { type: "paragraph", text: "The Clean Architecture pattern separates concerns into layers: Domain, Application, Infrastructure, and Presentation. In .NET 8, we implement this with class libraries and dependency injection." },
            { type: "code", filename: "Program.cs", language: "C#", code: 'var builder = WebApplication.CreateBuilder(args);\n\nbuilder.Services.AddControllers();\nbuilder.Services.AddDbContext<AppDbContext>(options =>\n    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));\n\nbuilder.Services.AddScoped<IUnitOfWork, UnitOfWork>();\nbuilder.Services.AddScoped<ICollectionService, CollectionService>();\n\nvar app = builder.Build();\napp.MapControllers();\napp.Run();' },
          ],
        },
        {
          id: "ef-core",
          number: "02",
          title: "EF Core Patterns",
          blocks: [
            { type: "paragraph", text: "Entity Framework Core in .NET 8 introduces complex type mapping, primitive collections, and significant performance improvements. For high-throughput APIs, we use split queries, compiled models, and connection pooling." },
          ],
        },
        {
          id: "performance",
          number: "03",
          title: "Performance Tuning",
          blocks: [
            { type: "paragraph", text: "Performance in .NET 8 backends comes from three areas: async I/O, caching, and connection management. We use Polly for resilience, Redis for distributed caching, and PostgreSQL advisory locks for concurrency." },
            { type: "quote", text: "Performance is not an accident. It's the result of thousands of small decisions made correctly.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
    pt: {
      title: "Backends Escaláveis com .NET 8",
      intro:
        "Construir sistemas backend que lidam com milhões de requisições por dia requer mais do que apenas frameworks rápidos. Exige arquitetura disciplinada, gerenciamento cuidadoso de recursos e profundo entendimento da camada de dados.",
      sections: [
        {
          id: "architecture",
          number: "01",
          title: "Clean Architecture",
          blocks: [
            { type: "paragraph", text: "O padrão Clean Architecture separa as preocupações em camadas: Domain, Application, Infrastructure e Presentation. No .NET 8, implementamos isso com bibliotecas de classes e injeção de dependência." },
            { type: "code", filename: "Program.cs", language: "C#", code: 'var builder = WebApplication.CreateBuilder(args);\n\nbuilder.Services.AddControllers();\nbuilder.Services.AddDbContext<AppDbContext>(options =>\n    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));\n\nvar app = builder.Build();\napp.MapControllers();\napp.Run();' },
          ],
        },
        {
          id: "ef-core",
          number: "02",
          title: "Padrões do EF Core",
          blocks: [
            { type: "paragraph", text: "O Entity Framework Core no .NET 8 introduz mapeamento de tipos complexos, coleções primitivas e melhorias significativas de performance." },
          ],
        },
        {
          id: "performance",
          number: "03",
          title: "Ajuste de Performance",
          blocks: [
            { type: "paragraph", text: "A performance em backends .NET 8 vem de três áreas: I/O assíncrono, cache e gerenciamento de conexões. Usamos Polly para resiliência, Redis para cache distribuído e advisory locks do PostgreSQL para concorrência." },
            { type: "quote", text: "Performance não é acidente. É o resultado de milhares de pequenas decisões tomadas corretamente.", author: "William Nakata", year: "2025" },
          ],
        },
      ],
    },
  },
];

async function main() {
  console.log("Seeding articles...");

  for (const data of articleData) {
    const tagRecords = await Promise.all(
      data.tags.map((name) => {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return prisma.tag.upsert({
          where: { slug },
          update: { name },
          create: { name, slug },
        });
      })
    );

    const article = await prisma.article.upsert({
      where: { slug: data.slug },
      update: {
        number: data.number,
        icon: data.icon,
        readTime: data.readTime,
        relatedSlugs: data.relatedSlugs,
        published: data.published,
        publishedAt: data.publishedAt,
      },
      create: {
        slug: data.slug,
        number: data.number,
        icon: data.icon,
        readTime: data.readTime,
        relatedSlugs: data.relatedSlugs,
        published: data.published,
        publishedAt: data.publishedAt,
      },
    });

    await prisma.articleTag.deleteMany({ where: { articleId: article.id } });
    await prisma.articleTag.createMany({
      data: tagRecords.map((tag) => ({ articleId: article.id, tagId: tag.id })),
    });

    await prisma.articleTranslation.upsert({
      where: { articleId_language: { articleId: article.id, language: "en" } },
      update: { title: data.en.title, intro: data.en.intro, sections: data.en.sections },
      create: { articleId: article.id, language: "en", title: data.en.title, intro: data.en.intro, sections: data.en.sections },
    });

    await prisma.articleTranslation.upsert({
      where: { articleId_language: { articleId: article.id, language: "pt_BR" } },
      update: { title: data.pt.title, intro: data.pt.intro, sections: data.pt.sections },
      create: { articleId: article.id, language: "pt_BR", title: data.pt.title, intro: data.pt.intro, sections: data.pt.sections },
    });

    console.log(`  ✓ ${data.slug}`);
  }

  console.log("Done.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
