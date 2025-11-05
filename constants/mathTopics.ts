import { icons as images } from './icons';

type IconKeys = keyof typeof images;

export interface MathTopic {
    id: number;
    title: string;
    icon: IconKeys;
}

export const mathTopics: MathTopic[] = [
    { id: 1, title: 'Liczby rzeczywiste', icon: 'LR' },
    { id: 2, title: 'Wyrażenia algebraiczne', icon: 'WA' },
    { id: 3, title: 'Równania i nierówności', icon: 'RN' },
    { id: 4, title: 'Funkcje', icon: 'F' },
    { id: 5, title: 'Ciągi', icon: 'C' },
    { id: 6, title: 'Trygonometria', icon: 'T' },
    { id: 7, title: 'Planimetria', icon: 'P' },
    { id: 8, title: 'Geometria analityczna', icon: 'GA' },
    { id: 9, title: 'Stereometria', icon: 'S' },
    { id: 10, title: 'Statystyka i rachunek prawdopodobieństwa', icon: 'SP' },
];