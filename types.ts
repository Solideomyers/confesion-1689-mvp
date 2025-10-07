
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

export interface Bookmark {
  id: string; // e.g., "confession-ch1-p2"
  note?: string;
  tags?: string[];
}

export interface Highlight {
  id: string;
  paragraphId: string;
  text: string;
  color: 'yellow' | 'pink' | 'blue' | 'green';
  startOffset: number;
  endOffset: number;
}

export interface ReadingSettings {
  fontSize: number; // in rem
  lineHeight: 'normal' | 'relaxed' | 'loose';
  fontFamily: 'serif' | 'sans' | 'baskerville' | 'lora';
  textAlign: 'justify' | 'left';
}