import { OptionEntry } from '@/types/auction';
import { ITestQuestion } from '@/interfaces/tests';

const getOptionRows = (question: ITestQuestion, option: 'A' | 'B'): OptionEntry[] => {
  const rows: OptionEntry[] = [];
  const iterations = question[`LotNum${option}`];

  for (let i = 1; i <= iterations; i++) {
    const rowKey = `${option}${i}`;
    const rowEntry: OptionEntry = [
      question[`P${rowKey}` as keyof ITestQuestion] as number,
      question[`V${rowKey}` as keyof ITestQuestion] as number
    ];

    rows.push(rowEntry);
  }

  return rows;
};

export { getOptionRows };
