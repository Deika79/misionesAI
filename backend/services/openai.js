import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔥 GENERAR MISIÓN
export async function generateMission(curso, asignatura, contenido) {
  const prompt = `
Eres un profesor experto creando contenido educativo gamificado.

Genera una misión educativa en formato JSON.

IMPORTANTE:
- El nodo de tipo "info" debe tener una explicación CLARA, DETALLADA y EDUCATIVA
- Debe tener entre 120 y 200 palabras
- Lenguaje adaptado al nivel del curso
- Explica conceptos, ejemplos y contexto
- Usa ejemplos reales
- Divide en 2-3 ideas clave dentro del texto
- NO hagas texto corto

Formato exacto:
{
  "title": "",
  "theme": "",
  "nodes": [
    {
      "type": "info",
      "title": "",
      "content": "explicación larga y detallada"
    },
    {
      "type": "video",
      "title": "",
      "videoUrl": ""
    },
    {
      "type": "quiz",
      "title": "",
      "quiz": [
        {
          "question": "",
          "options": ["", "", "", ""],
          "answer": ""
        }
      ]
    },
    {
      "type": "reto",
      "title": "",
      "content": ""
    }
  ]
}

Curso: ${curso}
Asignatura: ${asignatura}
Contenido: ${contenido}

IMPORTANTE:
- SOLO devuelve JSON válido
- NO uses markdown
- El texto del nodo info debe ser amplio y útil para estudiar
- El video debe ser embed de YouTube (https://www.youtube.com/embed/...)
`;

  const completion = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  const raw = completion.choices[0].message.content;

  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}

// 🔥 GENERAR IMAGEN
export async function generateImage(theme, contenido) {
  const prompt = `
Mapa estilo videojuego educativo.
Tema: ${theme}
Contenido: ${contenido}

Estilo:
- vista tipo mapa
- colorido
- estilo videojuego / cartoon
- sin texto
`;

  const result = await client.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1024",
  });

  const base64 = result.data[0].b64_json;

  return `data:image/png;base64,${base64}`;
}