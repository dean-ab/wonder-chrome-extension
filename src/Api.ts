import axios from 'axios';

const client = axios.create({});

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function generateTextFromPrompt(prompt: string): Promise<string> {
  await sleep(1000);
  return `Dispatched entreaties boisterous say why stimulated. Certain forbade picture now prevent carried she get see sitting. Up twenty limits as months. Inhabit so perhaps of in to certain. Sex excuse chatty was seemed warmth. Nay add far few immediate sweetness earnestly dejection.`;
}
