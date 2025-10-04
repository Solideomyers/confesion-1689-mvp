
export interface ScriptureProof {
  ref: string;
  verses: string[];
  fullText?: string[];
}

export interface Paragraph {
  paragraph: number;
  text: string;
  proofs: ScriptureProof[];
}

export interface Chapter {
  chapter: number; // 0 for Preface
  title: string;
  paragraphs: Paragraph[];
}

export type Bookmark = string;
