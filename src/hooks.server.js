import { sequence } from '@sveltejs/kit/hooks';

/** @type {import('@sveltejs/kit').Handle} */
export async function hook1({ event, resolve }) {
    event.locals.user = "프리라이프";

    console.log("hook1 실행됨");

    return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function hook2({ event, resolve }) {
    console.log("hook2 실행됨");

    return resolve(event);
}

export const handle = sequence(hook1, hook2);