import { categories } from './categories';

export const categoryProvider = (key: string) => {
    return !!key ? categories.find(c => c.name.toLowerCase() === key.toLowerCase()) : null;
}