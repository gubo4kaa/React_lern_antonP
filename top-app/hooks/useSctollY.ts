import { isBrowser } from "framer-motion";
import { useEffect, useState } from "react"


export const useScrollY = (): number => { // функция хука

    const isBrowser = typeof window !== 'undefined';

    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll =() => {
        const currentScrollY = isBrowser ? window.scrollY : 0;
        setScrollY(currentScrollY);
        }



    useEffect(() => {
        window.addEventListener('scroll', handleScroll, {passive: true});// подписываемся на скролл и если он происходит, то выполняем функцию handleScroll

        return () => window.removeEventListener('scroll', handleScroll);// отписываемся от подписки на скролл
    }, [])

    return scrollY;
}